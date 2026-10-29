import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, useSearchParams } from 'react-router-dom';
import { fetchUndangan } from './wp-api';
import { DEFAULT_INVITATION } from './defaultData';
import JawaKlasikTemplate from './JawaKlasikTemplate';

function UndanganPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchUndangan(slug || 'danu-fifi')
      .then((data) => {
        if (!cancelled) {
          setInvitation(data || DEFAULT_INVITATION);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Gagal memuat dari WP API, fallback ke default template', err);
        if (!cancelled) {
          setInvitation(DEFAULT_INVITATION);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#faf8f5] text-stone-600 font-sans gap-3">
        <div className="w-9 h-9 border-3 border-stone-200 border-t-[#6b492b] rounded-full animate-spin"></div>
        <p className="text-xs tracking-wider uppercase opacity-75">Memuat Undangan...</p>
      </div>
    );
  }

  return <JawaKlasikTemplate data={invitation} guestName={guestName} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UndanganPage />} />
      <Route path="/:slug" element={<UndanganPage />} />
    </Routes>
  );
}


