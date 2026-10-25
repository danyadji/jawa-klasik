import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitRsvp } from '../wp-api';

import kupu2 from '../assets/illustrations/kupu-2.png';
import catMerged from '../assets/illustrations/cat-merged.png';

export default function RSVPSection({ invitationId, guestName }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const initialName = guestName && guestName !== 'Tamu Undangan' ? guestName : '';
  const [name, setName] = useState(initialName);
  const [kehadiran, setKehadiran] = useState('Hadir');
  const [jumlah, setJumlah] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Mohon isi nama Anda.');
      return;
    }
    if (!kehadiran) {
      setErrorMessage('Mohon pilih status kehadiran.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitRsvp({
        invitationId: invitationId || 0,
        name: name.trim(),
        kehadiran,
        jumlah: parseInt(jumlah, 10) || 1,
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('RSVP submit error:', err);
      setErrorMessage(err.message || 'Terjadi kesalahan saat menyimpan RSVP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full flex flex-col items-center py-12 z-20 px-6 min-[400px]:px-10">
      
      {/* RSVP Box Container */}
      <motion.div 
        {...fadeInUp}
        className="relative w-full bg-[#6b492b] rounded-xl p-6 min-[400px]:p-8 shadow-lg mt-8"
      >
        {/* Butterfly top left */}
        <img 
          src={kupu2} 
          alt="Butterfly" 
          className="absolute -top-6 -left-6 w-12 min-[400px]:w-14 h-auto drop-shadow-sm pointer-events-none"
        />

        <h3 className="text-2xl min-[400px]:text-3xl text-white text-center mb-4 tracking-widest" style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}>
          RSVP
        </h3>
        
        <p className="text-white text-center text-[10px] min-[375px]:text-[12px] leading-relaxed mb-6" style={{ fontFamily: 'Futura Md BT, sans-serif' }}>
          Di hari yang penuh makna ini, kehadiran serta doa restu Bapak/Ibu/Saudara/i akan menjadi bagian indah dari perjalanan baru kami. Terima kasih atas segala doa dan kasih yang diberikan.
        </p>

        {isSubmitted ? (
          <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center text-white backdrop-blur-sm">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-2xl font-bold">
              ✓
            </div>
            <h4 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}>
              Terima Kasih!
            </h4>
            <p className="text-xs text-white/90 leading-relaxed mb-4" style={{ fontFamily: 'Futura Md BT, sans-serif' }}>
              Konfirmasi kehadiran atas nama <strong>{name}</strong> telah berhasil kami terima.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="text-[11px] text-white/70 underline hover:text-white transition"
              style={{ fontFamily: 'Futura Md BT, sans-serif' }}
            >
              Ubah Konfirmasi
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left w-full" style={{ fontFamily: 'Futura Md BT, sans-serif' }}>
            {errorMessage && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-100 px-3 py-2 rounded-lg text-xs">
                {errorMessage}
              </div>
            )}

            <div className="flex flex-col">
              <label className="text-white text-[11px] min-[375px]:text-[13px] mb-1.5 ml-1">Nama *</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap Anda"
                required
                className="w-full px-4 py-3 rounded-lg text-[#4d3a30] text-sm focus:outline-none focus:ring-2 focus:ring-[#9c7247]"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white text-[11px] min-[375px]:text-[13px] mb-1.5 ml-1">Konfirmasi kehadiran *</label>
              <div className="relative">
                <select 
                  value={kehadiran}
                  onChange={(e) => setKehadiran(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-[#4d3a30] text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#9c7247]"
                >
                  <option value="Hadir">Hadir</option>
                  <option value="Tidak Hadir">Tidak Hadir</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>

            {kehadiran === 'Hadir' && (
              <div className="flex flex-col">
                <label className="text-white text-[11px] min-[375px]:text-[13px] mb-1.5 ml-1">Jumlah pengunjung *</label>
                <div className="relative">
                  <select 
                    value={jumlah}
                    onChange={(e) => setJumlah(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-[#4d3a30] text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#9c7247]"
                  >
                    <option value="1">1 Orang</option>
                    <option value="2">2 Orang</option>
                    <option value="3">3 Orang</option>
                    <option value="4">4 Orang</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 bg-white text-[#6b492b] hover:bg-[#fbf7f2] font-semibold py-3 px-6 rounded-lg tracking-widest uppercase text-xs transition shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Mengirim...</span>
              ) : (
                <span>Kirim Konfirmasi</span>
              )}
            </motion.button>
          </form>
        )}
      </motion.div>

      {/* Decorative Cat below */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.3 }}
        className="mt-12 mb-4 flex justify-center"
      >
        <img src={catMerged} alt="Cat" className="w-24 min-[400px]:w-32 h-auto drop-shadow-md pointer-events-none" />
      </motion.div>

    </section>
  );
}
