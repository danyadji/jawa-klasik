import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitRsvp } from '../../wp-api';

export default function RSVPSection({
  invitationId,
  guestName,
  bgColor = '#6b492b',
  textColor = '#ffffff',
  fontHeading = 'Chyntia Oesman Sans, sans-serif',
  fontBody = 'Futura Md BT, sans-serif',
  topOrnament = null,
  bottomOrnament = null,
  description = 'Di hari yang penuh makna ini, kehadiran serta doa restu Bapak/Ibu/Saudara/i akan menjadi bagian indah dari perjalanan baru kami. Terima kasih atas segala doa dan kasih yang diberikan.',
}) {
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
      <motion.div
        {...fadeInUp}
        className="relative w-full rounded-xl p-6 min-[400px]:p-8 shadow-lg mt-8"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {topOrnament}

        <h3 className="text-2xl min-[400px]:text-3xl text-center mb-4 tracking-widest uppercase" style={{ fontFamily: fontHeading }}>
          RSVP
        </h3>

        <p className="text-center text-[11px] min-[375px]:text-[12px] leading-relaxed mb-6 opacity-90" style={{ fontFamily: fontBody }}>
          {description}
        </p>

        {isSubmitted ? (
          <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center backdrop-blur-sm">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-2xl font-bold">
              ✓
            </div>
            <h4 className="text-lg font-semibold mb-2" style={{ fontFamily: fontHeading }}>
              Terima Kasih!
            </h4>
            <p className="text-xs leading-relaxed mb-4 opacity-90" style={{ fontFamily: fontBody }}>
              Konfirmasi kehadiran atas nama <strong>{name}</strong> telah berhasil kami terima.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="text-[11px] underline opacity-80 hover:opacity-100 transition cursor-pointer"
              style={{ fontFamily: fontBody }}
            >
              Ubah Konfirmasi
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left w-full" style={{ fontFamily: fontBody }}>
            {errorMessage && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-100 px-3 py-2 rounded-lg text-xs">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="text-[11px] min-[375px]:text-[12px] block mb-1 font-medium">
                Nama Tamu
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Isi nama Anda..."
                required
                className="w-full bg-white text-[#4d3a30] px-4 py-2.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
              />
            </div>

            <div>
              <label className="text-[11px] min-[375px]:text-[12px] block mb-1 font-medium">
                Konfirmasi Kehadiran
              </label>
              <div className="flex gap-4 items-center mt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="radio"
                    name="kehadiran"
                    value="Hadir"
                    checked={kehadiran === 'Hadir'}
                    onChange={(e) => setKehadiran(e.target.value)}
                    className="accent-amber-600 w-4 h-4"
                  />
                  Hadir
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="radio"
                    name="kehadiran"
                    value="Tidak Hadir"
                    checked={kehadiran === 'Tidak Hadir'}
                    onChange={(e) => setKehadiran(e.target.value)}
                    className="accent-amber-600 w-4 h-4"
                  />
                  Tidak Hadir
                </label>
              </div>
            </div>

            {kehadiran === 'Hadir' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="text-[11px] min-[375px]:text-[12px] block mb-1 font-medium">
                  Jumlah Tamu
                </label>
                <select
                  value={jumlah}
                  onChange={(e) => setJumlah(e.target.value)}
                  className="w-full bg-white text-[#4d3a30] px-3 py-2.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                  <option value="3">3 Orang</option>
                  <option value="4">4 Orang</option>
                </select>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-[#6b492b] hover:bg-stone-100 font-bold tracking-widest uppercase py-3 rounded-lg text-xs transition-colors mt-2 shadow-md disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
            </motion.button>
          </form>
        )}

        {bottomOrnament}
      </motion.div>
    </section>
  );
}
