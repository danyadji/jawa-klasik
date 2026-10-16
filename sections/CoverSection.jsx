import React from 'react';
import { motion } from 'framer-motion';

// Import assets from the relative path
import bgImage from '../assets/backgrounds/bg.jpg';
import boardName from '../assets/illustrations/board-name.png';
import bungaTop from '../assets/illustrations/bunga11.png';
import bungaBottom from '../assets/illustrations/bunga-2.png';
import janurKiri from '../assets/illustrations/janur-kuning-kiri.png';
import janurKanan from '../assets/illustrations/janur-kuning-kanan.png';
import kupu1 from '../assets/illustrations/kupu-1.png';
import kupu2 from '../assets/illustrations/kupu-2.png';
import batuan from '../assets/illustrations/batuan.png';

export default function CoverSection({ guestName, groomNickname, brideNickname, onOpen }) {
  // Floating animation for butterflies
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="fixed inset-0 z-[100] w-full min-h-screen flex items-center justify-center bg-[#FFFFEE] overflow-hidden">
      {/* 
        The Mobile Frame: 
        This container forces the invitation to stay in a mobile-like aspect ratio on Desktop 
      */}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.2 }}
        className="relative w-full max-w-[500px] h-screen shadow-2xl overflow-hidden bg-white mx-auto flex flex-col items-center"
      >
        {/* Layer 1: Background (Inside Frame) */}
        <div className="absolute inset-0 z-0">
          <img 
            src={bgImage} 
            alt="Jawa Landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/10" />
        </div>

        {/* Layer 2: Janur Kuning (Side Ornaments) */}
        <motion.img
          initial={{ y: -10, opacity: 0, rotate: 0 }}
          animate={{ y: 0, opacity: 1, rotate: [-2, 2, -2] }}
          transition={{
            y: { duration: 2, ease: "easeOut" },
            opacity: { duration: 2, ease: "easeOut" },
            rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          src={janurKiri}
          className="absolute left-0 top-12 h-[35%] w-auto object-contain z-[25] pointer-events-none origin-top-left"
        />
        <motion.img
          initial={{ y: -10, opacity: 0, rotate: 0 }}
          animate={{ y: 0, opacity: 1, rotate: [2, -2, 2] }}
          transition={{
            y: { duration: 2, ease: "easeOut" },
            opacity: { duration: 2, ease: "easeOut" },
            rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          src={janurKanan}
          className="absolute right-0 top-12 h-[35%] w-auto object-contain z-[25] pointer-events-none origin-top-right"
        />

        {/* Layer 3: Ornamen Atas (Bunga) */}
        <motion.div 
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ y: 0, opacity: 1, rotate: [-2, 2, -2] }}
          transition={{
            y: { duration: 1.5, ease: "easeOut", delay: 0.5 },
            opacity: { duration: 1.5, ease: "easeOut", delay: 0.5 },
            rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-0 left-0 right-0 z-20 flex justify-center pointer-events-none origin-top"
        >
          <img 
            src={bungaTop} 
            alt="Ornamen Atas" 
            className="w-full max-w-full h-auto -pt-2"
          />
        </motion.div>

        {/* Layer 4 & 5: Bingkai Utama (Board) & Teks Nama */}
        <div className="relative z-30 flex flex-col items-center justify-center flex-1 w-full pt-10 px-4 min-[400px]:px-6">
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="font-label text-[12px] min-[375px]:text-[14px] tracking-[0.3em] min-[400px]:tracking-[0.4em] uppercase text-[#6b492b] mb-4 font-medium"
            style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
          >
            THE WEDDING OF
          </motion.p>
 
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            className="relative flex flex-col items-center justify-center p-2 w-full"
          >
            {/* Main Board Container */}
            <div className="relative flex items-center justify-center w-full max-w-[400px]">
              {/* Main Board Image */}
              <img 
                src={boardName} 
                alt="Name Board" 
                className="w-11/12 max-w-[320px] h-auto drop-shadow-xl"
              />
              
              {/* Names inside the board */}
              <div className="absolute inset-0 flex items-center justify-center pt-[10%] min-[400px]:pt-[8%]">
                <motion.h1 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="text-3xl min-[360px]:text-4xl min-[400px]:text-5xl text-[#6b492b] font-script text-center leading-none px-4"
                  style={{ fontFamily: 'var(--font-nama)' }}
                >
                  {brideNickname} & {groomNickname}
                </motion.h1>
              </div>
 
              {/* Kupu-2 (Pinned to the Board Anchor) */}
              <motion.img 
                src={kupu2} 
                alt="Butterfly" 
                animate={{
                  ...floatingAnimation,
                  y: [0, 8, 0],
                  x: [0, 5, 0],
                  transition: { ...floatingAnimation.transition, delay: 1.2 }
                }}
                className="absolute right-0 bottom-[10%] w-10 min-[400px]:w-14 h-auto z-40 rotate-[12deg] drop-shadow-md"
              />
 
               {/* Bloom below the board - Responsive Size */}
                            <motion.div
                initial={{ y: 50, opacity: 0, rotate: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  // Kita buat rotasi mengayun sebagai animasi terpisah agar tidak bentrok
                  rotate: [-2, 2, -2] 
                }}
                transition={{
                  // Transisi untuk y dan opacity (Animasi Masuk)
                  y: { duration: 1.2, ease: "easeOut" },
                  opacity: { duration: 1.2, ease: "easeOut" },
                  
                  // Transisi untuk rotate (Animasi Loop Mengayun)
                  rotate: {
                    delay: 2,           // Tunggu sampai animasi 'y' selesai
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }
                }}
                className="absolute -bottom-6 min-[400px]:-bottom-10 left-0 right-0 flex justify-center z-40 will-change-transform"
              >
                <img 
                  src={bungaBottom}
                  className="w-1/2 max-w-[180px] h-auto"
                  alt="Flower bottom"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
 
        {/* Guest Info + Kupu-1 */}
        <div className="relative flex justify-center w-full pb-28 px-4 min-[400px]:px-6 z-50">
          <motion.section 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 2 }}
            className="w-11/12 max-w-[300px] text-center relative"
          >
            <div className="backdrop-blur-md bg-white/80 p-4 rounded-2xl border border-white opacity-100 shadow-xl flex flex-col items-center px-4 min-[375px]:px-8">
              <p className="font-label text-[12px] min-[375px]:text-[14px] tracking-wider text-[#4d3a30] mb-2 font-bold capitalize">
                Kepada Yth <br/> 
                Bapak/Ibu/Saudara/i
              </p>
              <h2 className="font-display text-[16px] min-[375px]:text-[18px] font-bold text-[#4d3a30] mb-4 leading-tight" style={{ fontFamily: 'var(--font-judul)' }}>
                {guestName}
              </h2>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpen}
                className="w-full bg-[#6b492b] text-white py-3 rounded-xl font-label tracking-widest text-[11px] min-[375px]:text-[12px] font-bold shadow-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all border-none"
                style={{ fontFamily: 'var(--font-isi)' }}
              >
                OPEN INVITATION
              </motion.button>
            </div>
 
            {/* Kupu-1 (Pinned to Guest Card Corner) */}
            <motion.img 
              src={kupu1} 
              alt="Butterfly" 
              animate={floatingAnimation}
              className="absolute -bottom-6 right-0 w-12 min-[400px]:w-14 h-auto z-[55] rotate-[-15deg] drop-shadow-md"
            />
          </motion.section>
        </div>

        {/* Ornamen Batuan (Pinned to Frame Bottom-Left) */}
        <motion.img 
        initial={{ y: 50, opacity: 0 }} // Berawal dari bawah (y positif)
        animate={{ y: 0, opacity: 1 }}   // Naik ke posisi asli
        transition={{ 
          duration: 1.5, 
          delay: 2.2,
          ease: "easeOut" 
        }}
        src={batuan} 
        alt="Batuan" 
        className="absolute bottom-12 left-0 w-[42%] max-w-[250px] h-auto z-[60] drop-shadow-2xl pointer-events-none"
      />
      </motion.main>
    </div>
  );
}
