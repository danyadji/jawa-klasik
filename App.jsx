import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JawaKlasikTemplate from './JawaKlasikTemplate';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<JawaKlasikTemplate />} />
      <Route path="/:slug" element={<JawaKlasikTemplate />} />
    </Routes>
  );
}
