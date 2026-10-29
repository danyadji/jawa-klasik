import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchUcapan, submitUcapan } from '../../../shared/wp-api';

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
  const [statusMessage, setStatusMessage] = useState(null);

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
      <div className="w-full max-w-[500px] px-8 min-[400px]:px-10 py-10 flex flex-col items-center">

        {/* Title */}
        <motion.h3
          {...fadeInUp}
          className="text-xl min-[400px]:text-2xl font-bold text-[#6b492b] mb-2 tracking-widest uppercase text-center"
          style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
        >
          BEST WISHES
        </motion.h3>

        {/* Form */}
        <motion.form
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4"
        >
          {statusMessage && (
            <div
              className={`w-full py-2.5 px-4 rounded-lg text-center text-xs font-medium ${statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
            >
              {statusMessage.text}
            </div>
          )}

          <div className="flex flex-col gap-1 text-left">
            <label
              className="text-[#4d3a30] text-[11px] min-[400px]:text-[12px] font-semibold"
              style={{ fontFamily: 'Futura Bk BT, sans-serif' }}
            >
              Nama Anda <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Danu & Partner"
              required
              className="w-full bg-white rounded-lg px-4 py-2.5 text-[#4d3a30] text-[12px] outline-none focus:ring-2 focus:ring-[#6b492b] shadow-sm placeholder-gray-400"
              style={{ fontFamily: 'Futura Bk BT, sans-serif' }}
            />
          </div>

          <div className="flex flex-col gap-1 text-left">
            <label
              className="text-[#4d3a30] text-[11px] min-[400px]:text-[12px] font-semibold"
              style={{ fontFamily: 'Futura Bk BT, sans-serif' }}
            >
              Ucapan dan Do'a <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan dan doa restu untuk kedua mempelai..."
              required
              className="w-full bg-white rounded-lg px-4 py-2.5 text-[#4d3a30] text-[12px] outline-none focus:ring-2 focus:ring-[#6b492b] shadow-sm resize-none placeholder-gray-400"
              style={{ fontFamily: 'Futura Bk BT, sans-serif' }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-48 mx-auto bg-[#6b492b] hover:bg-[#4d3a30] text-white tracking-[0.25em] uppercase py-2.5 rounded-lg text-[11px] font-semibold transition-colors mt-1 shadow-md disabled:opacity-60 cursor-pointer"
            style={{ fontFamily: 'Futura Bk BT, sans-serif' }}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
          </motion.button>
        </motion.form>

        {/* Loading state */}
        {isLoading && (
          <div className="w-full text-center py-6 text-xs text-gray-500 font-sans">
            Memuat ucapan...
          </div>
        )}

        {/* Submitted entries list dengan internal scroll & counter badge */}
        {!isLoading && entries.length > 0 && (
          <div className="w-full mt-6 flex flex-col">

            {/* komentar Scrollable list container */}
            <div className="w-full flex flex-col gap-2.5 max-h-[360px] overflow-y-auto pr-1.5 diamora-guestbook-scroll">
              {entries.map((entry, idx) => (
                <motion.div
                  key={entry.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 text-left shadow-sm border border-[#8c7457]/15"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p
                      className="text-[#4D3A30] font-bold text-[12px] min-[400px]:text-[13px]"
                      style={{ fontFamily: 'Futura Bk BT, sans-serif' }}
                    >
                      {entry.nama || entry.name}
                    </p>
                    {entry.created_at && (
                      <span className="text-[12px] text-gray-400 font-sans">
                        {formatDate(entry.created_at)}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-[#4D3A30] leading-relaxed whitespace-pre-line not-italic"
                    style={{ fontFamily: 'Futura Bk BT, sans-serif', fontSize: '10pt', fontWeight: 400, fontStyle: 'normal' }}
                  >
                    {entry.pesan || entry.message}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .diamora-guestbook-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .diamora-guestbook-scroll::-webkit-scrollbar-track {
          background: rgba(140, 116, 87, 0.08);
          border-radius: 4px;
        }
        .diamora-guestbook-scroll::-webkit-scrollbar-thumb {
          background: #8c7457;
          border-radius: 4px;
        }
      `}} />
    </section>
  );
}
