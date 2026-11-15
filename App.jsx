import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, useSearchParams } from 'react-router-dom';
import { DEFAULT_INVITATION } from './defaultData';
import JawaKlasikTemplate from './JawaKlasikTemplate';
import { getInvitation, getGuest } from './prefetch';
import GuestNotFoundScreen from './components/GuestNotFoundScreen';

function LoadingSpinner({ message = 'Memuat Undangan...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#faf8f5] text-stone-600 font-sans gap-3">
      <div className="w-9 h-9 border-3 border-stone-200 border-t-[#6b492b] rounded-full animate-spin"></div>
      <p className="text-xs tracking-wider uppercase opacity-75">{message}</p>
    </div>
  );
}

/**
 * Pengaturan mode sapaan untuk tamu tidak dikenal (tanpa kode 'k' atau kode tidak valid):
 * - 'general' (default): tampilkan sapaan umum "Bapak/Ibu/Saudara/i", RSVP nonaktif.
 * - 'fallback_to_param': tampilkan nama dari query parameter ?to=..., RSVP nonaktif.
 */
const UNRECOGNIZED_GUEST_MODE = 'general';
const GENERAL_GREETING = 'Bapak/Ibu/Saudara/i';

function UndanganPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const toParam = (searchParams.get('to') || '').trim();
  const kParam = (searchParams.get('k') || '').trim();
  const targetSlug = slug || 'danu-fifi';

  const [invitation, setInvitation] = useState(null);
  const [guestResults, setGuestResults] = useState({});

  useEffect(() => {
    let cancelled = false;
    getInvitation(targetSlug)
      .then((data) => {
        if (!cancelled) {
          setInvitation(data || DEFAULT_INVITATION);
        }
      })
      .catch((err) => {
        console.warn('Gagal memuat dari WP API, fallback ke default template', err);
        if (!cancelled) {
          setInvitation(DEFAULT_INVITATION);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [targetSlug]);

  const guestKey = `${targetSlug}|${kParam}`;
  const guestResult = kParam ? guestResults[guestKey] : null;

  let guestStatus = 'none';
  if (kParam) {
    if (!guestResult) {
      guestStatus = 'checking';
    } else {
      guestStatus = guestResult.status;
    }
  }

  useEffect(() => {
    if (!kParam) return;
    if (guestResults[guestKey]) return;

    let cancelled = false;
    getGuest(targetSlug, kParam)
      .then((res) => {
        if (cancelled) return;
        if (res?.registered && res.guest?.nama) {
          setGuestResults((prev) => ({
            ...prev,
            [guestKey]: { status: 'ok', guest: res.guest },
          }));
        } else {
          // Kode tidak dikenal atau link tidak valid: jangan tampilkan notfound screen, fallback umum
          setGuestResults((prev) => ({
            ...prev,
            [guestKey]: { status: 'unrecognized' },
          }));
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setGuestResults((prev) => ({
          ...prev,
          [guestKey]: { status: 'unrecognized', error: err },
        }));
      });

    return () => {
      cancelled = true;
    };
  }, [targetSlug, kParam, guestKey, guestResults]);

  if (!invitation || guestStatus === 'checking') {
    return (
      <LoadingSpinner
        message={guestStatus === 'checking' ? 'Memverifikasi Tamu...' : 'Memuat Undangan...'}
      />
    );
  }

  const isRegisteredGuest = guestStatus === 'ok';
  let guestName = GENERAL_GREETING;
  if (isRegisteredGuest) {
    // Nama diambil dari database, BUKAN dari URL parameter ?to=
    guestName = guestResult?.guest?.nama || GENERAL_GREETING;
  } else if (UNRECOGNIZED_GUEST_MODE === 'fallback_to_param' && toParam) {
    guestName = toParam;
  } else {
    guestName = GENERAL_GREETING;
  }

  return (
    <JawaKlasikTemplate
      data={invitation}
      guestName={guestName}
      isRegisteredGuest={isRegisteredGuest}
    />
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UndanganPage />} />
      <Route path="/:slug" element={<UndanganPage />} />
    </Routes>
  );
}
