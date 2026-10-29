import React from 'react';
import { motion } from 'framer-motion';
import gunungan from '../assets/illustrations/gunungan.png';
import gapuraKiri from '../assets/illustrations/gapura-kiri.png';
import gapuraKanan from '../assets/illustrations/gapura-kanan.png';
import couplePhoto from '../assets/illustrations/KEDUA-MEMPELAI-BACKGORUND-PELAMINAN.jpg';
import bgPenutup2 from '../assets/illustrations/bg-surat-pambuka.png';
import logoDiamora from '../assets/illustrations/logo-diamora.png';
import ShinyText from '../components/ShinyText';

export default function ClosingSection({ groomNickname, brideNickname, photo }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.9, ease: 'easeOut' }
  };

  return (
    <section className="relative w-full flex flex-col items-center z-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bgPenutup2})`, backgroundSize: '120% auto' }}
      />

      <div className="relative z-10 w-full flex flex-col items-center pb-0">
        <motion.div
          {...fadeInUp}
          className="relative flex justify-center mt-10 mb-2 w-[55%] max-w-[210px] aspect-[3/4]"
        >
          <div
            className="w-full h-full p-2 rounded-[50%/50%] shadow-xl flex items-center justify-center bg-white border border-[#8c7457]/20"
            style={{
              boxShadow: '0 10px 28px rgba(77, 58, 48, 0.22)',
            }}
          >
            <div className="w-full h-full rounded-[50%/50%] overflow-hidden border-[3px] border-[#9c7b56] relative bg-[#8c7457]/10">
              <img
                src={photo || couplePhoto}
                alt="Foto Berdua"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </motion.div>

        <motion.p
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="text-[#4d3a30] text-[11px] min-[400px]:text-[13px] text-center leading-relaxed px-10 min-[400px]:px-14 mt-8 mb-8"
          style={{ fontFamily: 'Futura Bk BT, sans-serif', fontStyle: 'normal' }}
        >
          Merupakan kebahagiaan tersendiri bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir di hari yang penuh makna ini. Atas segala doa, ucapan,
          dan perhatian yang diberikan, kami ucapkan terima kasih.
        </motion.p>

        <motion.p
          {...fadeInUp}
          transition={{ delay: 0.3 }}
          className="text-[#4d3a30] text-[38px] min-[400px]:text-[44px] text-center mt-2 mb-0 leading-none"
          style={{ fontFamily: 'Photograph Signature, cursive' }}
        >
          Wassalamu'alaikum
        </motion.p>

        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          src={gunungan}
          alt="Gunungan"
          className="w-24 min-[400px]:w-28 h-auto mt-6 -mb-6 drop-shadow-md"
          loading="lazy"
          decoding="async"
        />

        <div className="relative w-full flex items-end justify-between mt-1 pointer-events-none">
          <motion.img
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            src={gapuraKiri}
            alt="Gapura Kiri"
            className="w-[30%] max-w-[140px] h-auto self-end"
            loading="lazy"
            decoding="async"
          />

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center justify-end pb-8 pointer-events-auto flex-1"
          >
            <ShinyText
              image={logoDiamora}
              shineColor="#ffffff"
              speed={2.8}
              shineWidth={50}
              imgClassName="h-4 min-[400px]:h-[24px] w-auto object-contain opacity-80 drop-shadow-sm pointer-events-none"
              alt="Diamora"
            />
          </motion.div>

          <motion.img
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            src={gapuraKanan}
            alt="Gapura Kanan"
            className="w-[26%] max-w-[130px] h-auto self-end"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
