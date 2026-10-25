import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { fetchUndangan } from './wp-api';
import JawaKlasikTemplate from './JawaKlasikTemplate';
import FloralModernTemplate from './FloralModernTemplate';

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
          setInvitation(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Gagal memuat dari WP API, fallback ke default template', err);
        if (!cancelled) {
          setInvitation({ template: 'jawa-klasik' });
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 font-sans">
        Memuat undangan...
      </div>
    );
  }

  // Pilih template sesuai field 'pilihan_template' dari ACF WordPress
  switch (invitation?.template) {
    case 'floral-modern':
      return <FloralModernTemplate initialData={invitation} />;
    case 'jawa-klasik':
    default:
      return <JawaKlasikTemplate initialData={invitation} />;
  }
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TemplateDispatcher />} />
      <Route path="/:slug" element={<TemplateDispatcher />} />
    </Routes>
  );
}

