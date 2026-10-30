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

function UndanganPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const toParam = (searchParams.get('to') || '').trim();
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

  const guestKey = `${targetSlug}|${toParam}`;
  const guestResult = toParam ? guestResults[guestKey] : null;

  let guestStatus = 'none';
  if (toParam) {
    if (!guestResult) {
      guestStatus = 'checking';
    } else {
      guestStatus = guestResult.status;
    }
  }

  useEffect(() => {
    if (!toParam) return;
    if (guestResults[guestKey]) return;

    let cancelled = false;
    getGuest(targetSlug, toParam)
      .then((res) => {
        if (cancelled) return;
        if (res?.registered && res.guest?.nama) {
          setGuestResults((prev) => ({
            ...prev,
            [guestKey]: { status: 'ok', guest: res.guest },
          }));
        } else {
          setGuestResults((prev) => ({
            ...prev,
            [guestKey]: { status: 'notfound' },
          }));
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setGuestResults((prev) => ({
          ...prev,
          [guestKey]: { status: 'error', error: err },
        }));
      });

    return () => {
      cancelled = true;
    };
  }, [targetSlug, toParam, guestKey, guestResults]);

  const handleRetryGuest = () => {
    setGuestResults((prev) => {
      const next = { ...prev };
      delete next[guestKey];
      return next;
    });
    getGuest(targetSlug, toParam).catch(() => {});
  };

  if (!invitation || guestStatus === 'checking') {
    return (
      <LoadingSpinner
        message={guestStatus === 'checking' ? 'Memverifikasi Tamu...' : 'Memuat Undangan...'}
      />
    );
  }

  if (guestStatus === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#faf8f5] text-stone-700 px-6 text-center font-sans">
        <div className="w-12 h-12 rounded-full bg-amber-100 text-[#6b492b] flex items-center justify-center mb-4 text-xl font-bold">
          !
        </div>
        <h2 className="text-lg font-serif font-semibold mb-2">Gagal Memverifikasi Nama Tamu</h2>
        <p className="text-xs text-stone-500 max-w-sm mb-6 leading-relaxed">
          Terjadi kendala jaringan saat memeriksa data undangan Anda. Silakan coba kembali.
        </p>
        <button
          onClick={handleRetryGuest}
          className="px-6 py-2.5 bg-[#6b492b] text-white rounded-full text-xs uppercase tracking-wider font-medium hover:bg-[#543820] transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (guestStatus === 'notfound') {
    return (
      <GuestNotFoundScreen
        onOpenAsGeneral={() => {
          const next = new URLSearchParams(searchParams);
          next.delete('to');
          setSearchParams(next, { replace: true });
        }}
      />
    );
  }

  const isRegisteredGuest = guestStatus === 'ok';
  const guestName = isRegisteredGuest ? (guestResult?.guest?.nama || 'Tamu') : 'Tamu';

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
