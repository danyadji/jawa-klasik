import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { fetchUndangan } from './wp-api';
import { DEFAULT_INVITATION } from './defaultData';

// Master Blueprint Theme Registry:
// Menggunakan React.lazy() agar browser hanya mengunduh bundle tema yang sedang aktif.
// Untuk menambah tema baru (misal tema ke-3 s.d ke-100), cukup daftarkan 1 baris di sini!
const THEME_REGISTRY = {
  'jawa-klasik': lazy(() => import('./templates/jawa-klasik')),
  'floral-modern': lazy(() => import('./templates/floral-modern')),
  // Contoh penambahan tema berikutnya:
  // 'sunda-elegan': lazy(() => import('./templates/sunda-elegan')),
  // 'minimalist-white': lazy(() => import('./templates/minimalist-white')),
};

function TemplateDispatcher() {
  const { slug } = useParams();
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

  // Pilih template sesuai field 'template' dari ACF WordPress (default: jawa-klasik)
  const templateKey = invitation?.template || 'jawa-klasik';
  const ActiveTemplate = THEME_REGISTRY[templateKey] || THEME_REGISTRY['jawa-klasik'];

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#faf8f5] text-stone-600 font-sans gap-3">
          <div className="w-9 h-9 border-3 border-stone-200 border-t-[#6b492b] rounded-full animate-spin"></div>
          <p className="text-xs tracking-wider uppercase opacity-75">Memuat Tema...</p>
        </div>
      }
    >
      <ActiveTemplate initialData={invitation} />
    </Suspense>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TemplateDispatcher />} />
      <Route path="/:slug" element={<TemplateDispatcher />} />
    </Routes>
  );
}

