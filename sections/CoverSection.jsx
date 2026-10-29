import React from 'react';
import { motion } from 'framer-motion';
import ShinyText from '../components/ShinyText';
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
  return (
    <div className="fixed inset-0 z-[100] w-full min-h-screen flex items-center justify-center bg-[#FFFFEE] overflow-hidden">
      <main className="relative w-full max-w-[500px] h-screen shadow-2xl overflow-hidden bg-white mx-auto flex flex-col items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Jawa Landscape"
            className="w-full h-full object-cover"
            fetchpriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-white/10" />
        </div>

        <img
          src={janurKiri}
          alt="Janur Kiri"
          className="absolute left-0 top-12 h-[35%] w-auto object-contain z-[25] pointer-events-none origin-top-left"
        />
        <img
          src={janurKanan}
          alt="Janur Kanan"
          className="absolute right-0 top-12 h-[35%] w-auto object-contain z-[25] pointer-events-none origin-top-right"
        />

        <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pointer-events-none origin-top">
          <img
            src={bungaTop}
            alt="Ornamen Atas"
            className="w-full max-w-full h-auto -pt-2"
          />
        </div>

        <div className="relative z-30 flex flex-col items-center justify-center flex-1 w-full pt-10 px-4 min-[400px]:px-6">
          <p
            className="font-label text-[12px] min-[375px]:text-[16px] tracking-[0.3em] min-[400px]:tracking-[0.4em] uppercase text-[#6b492b] mb-4 font-medium"
            style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
          >
            THE WEDDING OF
          </p>

          <div className="relative flex flex-col items-center justify-center p-2 w-full">
            <div className="relative flex items-center justify-center w-full max-w-[400px]">
              <img
                src={boardName}
                alt="Name Board"
                className="w-11/12 max-w-[400px] h-auto drop-shadow-xl"
              />

              <div className="absolute inset-0 flex items-center justify-center pt-[11%] min-[400px]:pt-[12%] px-2">
                <h1
                  className="text-3xl min-[360px]:text-4xl min-[400px]:text-5xl font-script text-center leading-[1.35] px-2 overflow-visible"
                  style={{ fontFamily: 'var(--font-nama)' }}
                >
                  <ShinyText
                    text={`${brideNickname} & ${groomNickname}`}
                    color="#6b492b"
                    shineColor="#fff1b8"
                    speed={3}
                    shineWidth={45}
                    glow={0.2}
                    className="font-script leading-[1.35] overflow-visible"
                  />
                </h1>
              </div>

              <img
                src={kupu2}
                alt="Butterfly"
                className="absolute right-0 bottom-[10%] w-10 min-[400px]:w-14 h-auto z-40 rotate-[12deg] drop-shadow-md"
              />

              <div className="absolute -bottom-6 min-[400px]:-bottom-10 left-0 right-0 flex justify-center z-40">
                <img
                  src={bungaBottom}
                  className="w-1/2 max-w-[180px] h-auto"
                  alt="Flower bottom"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center w-full pb-28 px-4 min-[400px]:px-6 z-50">
          <section className="w-11/12 max-w-[300px] text-center relative">
            <div className="backdrop-blur-md bg-white/80 p-4 rounded-2xl border border-white opacity-100 shadow-xl flex flex-col items-center px-4 min-[375px]:px-8">
              <p className="font-label text-[12px] min-[375px]:text-[14px] tracking-wider text-[#4d3a30] mb-2 font-bold capitalize">
                Kepada Yth <br />
                Bapak/Ibu/Saudara/i
              </p>
              <h2
                className="font-display text-[16px] min-[375px]:text-[20px] font-bold text-[#4d3a30] mb-4 leading-tight"
                style={{ fontFamily: 'var(--font-judul)' }}
              >
                {guestName}
              </h2>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpen}
                className="w-full bg-[#6b492b] text-white py-3 rounded-xl font-label tracking-widest text-[11px] min-[375px]:text-[12px] font-bold shadow-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all border-none cursor-pointer"
                style={{ fontFamily: 'var(--font-isi)' }}
              >
                OPEN INVITATION
              </motion.button>
            </div>

            <img
              src={kupu1}
              alt="Butterfly"
              className="absolute -bottom-6 right-0 w-12 min-[400px]:w-14 h-auto z-[55] rotate-[-15deg] drop-shadow-md"
            />
          </section>
        </div>

        <img
          src={batuan}
          alt="Batuan"
          className="absolute bottom-12 left-0 w-[42%] max-w-[250px] h-auto z-[60] drop-shadow-2xl pointer-events-none"
        />
      </main>
    </div>
  );
}
