import React from 'react';
import { motion } from 'framer-motion';

import framePenutup from '../assets/illustrations/frame-penutup.png';
import gunungan from '../assets/illustrations/gunungan.png';
import gapuraKiri from '../assets/illustrations/gapura-kiri.png';
import gapuraKanan from '../assets/illustrations/gapura-kanan.png';
import couplePhoto from '../assets/illustrations/KEDUA-MEMPELAI-BACKGORUND-PELAMINAN.jpg';
import bgPenutup2 from '../assets/illustrations/bg-surat-pambuka.png';

export default function ClosingSection({ groomNickname, brideNickname, photo }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.9, ease: 'easeOut' }
  };

  return (
    <section className="relative w-full flex flex-col items-center z-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bgPenutup2})`, backgroundSize: '120% auto' }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 w-full flex flex-col items-center pb-0">

        {/* Couple photo inside frame — frame as base, photo behind it */}
        <motion.div
          {...fadeInUp}
          className="relative flex justify-center mt-10 mb-2 w-[60%] max-w-[230px]"
        >
          {/* Frame image as sizing reference */}
          <img
            src={framePenutup}
            alt="Frame"
            className="w-full h-auto relative z-10 pointer-events-none"
          />

          {/* Photo behind frame, cropped to match frame shape */}
          <div
            className="absolute inset-0 z-0"
            style={{
              clipPath: 'ellipse(46% 48% at 50% 48%)',
            }}
          >
            <img
              src={photo || couplePhoto}
              alt="Couple"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Closing text */}
        <motion.p
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="text-[#4d3a30] text-[11px] min-[400px]:text-[12px] text-center leading-relaxed px-10 min-[400px]:px-14 mt-4 mb-2"
          style={{ fontFamily: 'Futura Md BT, sans-serif', fontStyle: 'italic' }}
        >
          Merupakan kebahagiaan tersendiri bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir di hari yang penuh makna ini. Atas segala doa, ucapan,
          dan perhatian yang diberikan, kami ucapkan terima kasih.
        </motion.p>

        {/* Wassalamu'alaikum signature */}
        <motion.p
          {...fadeInUp}
          transition={{ delay: 0.3 }}
          className="text-[#4d3a30] text-[38px] min-[400px]:text-[44px] text-center mt-2 mb-0 leading-none"
          style={{ fontFamily: 'Photograph Signature, cursive' }}
        >
          Wassalamu'alaikum
        </motion.p>

        {/* Gunungan ornament */}
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          src={gunungan}
          alt="Gunungan"
          className="w-24 min-[400px]:w-28 h-auto mt-6 -mb-6 drop-shadow-md"
        />

        {/* Bottom area: gapura kiri + DIAMORA + gapura kanan */}
        <div className="relative w-full flex items-end justify-between mt-1 pointer-events-none">
          {/* Gapura Kiri */}
          <motion.img
           initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            src={gapuraKiri}
            alt="Gapura Kanan"
            className="w-[30%] max-w-[140px] h-auto self-end"
          />

          {/* DIAMORA branding — centred between gapuras */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center justify-end pb-8 pointer-events-auto flex-1"
          >
            <span
              className="text-[#4d3a30] tracking-[0.3em] uppercase text-[11px] min-[400px]:text-[13px] font-bold"
              style={{ fontFamily: 'var(--font-wedding-gift-title)' }}
            >
              ✦ DIAMORA
            </span>
          </motion.div>

          {/* Gapura Kanan */}
          <motion.img
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            src={gapuraKanan}
            alt="Gapura Kanan"
            className="w-[26%] max-w-[130px] h-auto self-end"
          />
        </div>
      </div>
    </section>
  );
}
