import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchUcapan, submitUcapan } from '../wp-api';

export default function GuestBookSection({ invitationId, guestName }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, ease: 'easeOut' }
  };

  const initialName = guestName && guestName !== 'Tamu Undangan' ? guestName : '';
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState(initialName);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error', text: '' }

  // Muat ucapan dari API
  useEffect(() => {
    if (!invitationId) return;
    let isCancelled = false;
    setIsLoading(true);

    fetchUcapan(invitationId)
      .then((res) => {
        if (!isCancelled && res?.data) {
          setEntries(res.data);
        }
      })
      .catch((err) => {
        console.warn('Gagal memuat ucapan dari API:', err);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => { isCancelled = true; };
  }, [invitationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatusMessage({ type: 'error', text: 'Nama dan ucapan wajib diisi.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await submitUcapan({
        invitationId: invitationId || 0,
        name: name.trim(),
        pesan: message.trim(),
      });

      // Tambahkan ucapan ke list di UI
      const newEntry = {
        id: res?.id || Date.now(),
        nama: name.trim(),
        pesan: message.trim(),
        created_at: new Date().toISOString(),
      };
      setEntries((prev) => [newEntry, ...prev]);

      setMessage('');
      setStatusMessage({ type: 'success', text: 'Terima kasih atas doa dan ucapannya!' });
    } catch (err) {
      console.error('Submit ucapan error:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Gagal mengirim ucapan.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  return (
    <section className="relative w-full flex flex-col items-center z-20">
      {/* Content */}
      <div className="w-full max-w-[500px] px-8 min-[400px]:px-10 py-10 flex flex-col items-center">

        {/* Title */}
        <motion.h3
          {...fadeInUp}
          className="text-[22px] min-[400px]:text-[26px] text-[#4D3A30] mb-8 tracking-[0.25em] uppercase text-center"
          style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
        >
          Best Wishes
        </motion.h3>

        {/* Form */}
        <motion.form
          {...fadeInUp}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4"
        >
          {statusMessage && (
            <div
              className={`p-3 rounded-lg text-xs font-sans ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-100 border border-emerald-300 text-emerald-800'
                  : 'bg-red-100 border border-red-300 text-red-800'
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          {/* Nama field */}
          <div className="flex flex-col gap-1">
            <label
              className="text-[#4D3A30] font-semibold text-[13px] min-[400px]:text-[14px]"
              style={{ fontFamily: 'Futura Md BT, sans-serif' }}
            >
              Nama <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Anda"
              required
              className="w-full bg-white rounded-lg px-4 py-3 text-[#4d3a30] text-[12px] outline-none focus:ring-2 focus:ring-[#6b492b] shadow-sm placeholder-gray-400"
              style={{ fontFamily: 'Futura Md BT, sans-serif' }}
            />
          </div>

          {/* Ucapan field */}
          <div className="flex flex-col gap-1">
            <label
              className="text-[#4D3A30] font-semibold text-[13px] min-[400px]:text-[14px]"
              style={{ fontFamily: 'Futura Md BT, sans-serif' }}
            >
              Ucapan dan Do'a <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan dan doa restu untuk kedua mempelai..."
              required
              className="w-full bg-white rounded-lg px-4 py-3 text-[#4d3a30] text-[12px] outline-none focus:ring-2 focus:ring-[#6b492b] shadow-sm resize-none placeholder-gray-400"
              style={{ fontFamily: 'Futura Md BT, sans-serif' }}
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-48 mx-auto bg-[#6b492b] hover:bg-[#4d3a30] text-white tracking-[0.3em] uppercase py-3 rounded-lg text-[11px] min-[400px]:text-[12px] font-semibold transition-colors mt-2 shadow-md disabled:opacity-60"
            style={{ fontFamily: 'Futura Md BT, sans-serif' }}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim'}
          </motion.button>
        </motion.form>

        {/* Loading state */}
        {isLoading && (
          <div className="w-full text-center py-6 text-xs text-gray-500 font-sans">
            Memuat ucapan...
          </div>
        )}

        {/* Submitted entries list */}
        {!isLoading && entries.length > 0 && (
          <div className="w-full mt-8 flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1">
            {entries.map((entry, idx) => (
              <motion.div
                key={entry.id || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-stone-200/90 backdrop-blur-sm rounded-xl px-5 py-4 text-left shadow-sm border border-stone-300/40"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p
                    className="text-[#4D3A30] font-semibold text-[13px]"
                    style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
                  >
                    {entry.nama || entry.name}
                  </p>
                  {entry.created_at && (
                    <span className="text-[10px] text-gray-500 font-sans">
                      {formatDate(entry.created_at)}
                    </span>
                  )}
                </div>
                <p
                  className="text-[#4D3A30] text-[13px] leading-relaxed whitespace-pre-line"
                  style={{ fontFamily: 'Futura Md BT, sans-serif' }}
                >
                  {entry.pesan || entry.message}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
