import React from 'react';
import { motion } from 'framer-motion';

import priaPhoto from '../assets/illustrations/PRIA-BACKGORUND-PELAMINAN.webp';
import wanitaPhoto from '../assets/illustrations/WANITA-BACKGORUND-PELAMINAN.webp';
import doveImg from '../assets/illustrations/merpati-terbang.webp';
import janurKiri from '../assets/illustrations/janur-kuning-kiri.webp';
import janurKanan from '../assets/illustrations/janur-kuning-kanan.webp';
import flowerLeft from '../assets/illustrations/bunga-kiri.webp';
import flowerRight from '../assets/illustrations/bunga-kanan.webp';
import igIcon from '../assets/illustrations/instagram-button.webp';
import bgOrnamen2 from '../assets/illustrations/bg-ornamen-2.webp';

function formatQuote(text) {
  if (!text) return { body: '', source: '' };

  let cleaned = String(text)
    .replace(/&lt;\/?br\s*\/?&gt;/gi, '\n')
    .replace(/<\/?br\s*\/?>/gi, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();

  // Pisahkan sitasi jika ada di akhir (misal QS. Ar-Rum: 21)
  let body = cleaned;
  let source = '';

  const rawLines = cleaned.split('\n').map((l) => l.trim());
  const nonEmptyLines = rawLines.filter(Boolean);

  if (nonEmptyLines.length > 1) {
    const last = nonEmptyLines[nonEmptyLines.length - 1];
    if (/^\(?\s*(?:QS|Q\.S|Surat|HR|H\.R|Qur'?an|Hadits?)\b/i.test(last) || /^\([^\n\r]+\)$/.test(last)) {
      const lastIdx = rawLines.lastIndexOf(last);
      body = rawLines.slice(0, lastIdx).join(' ').replace(/\s+/g, ' ').trim();
      source = last;
    } else {
      body = nonEmptyLines.join(' ').replace(/\s+/g, ' ').trim();
    }
  } else {
    const match = cleaned.match(/^(.*?)\s*(\((?:QS|Q\.S|Surat|HR|H\.R|Qur'?an|Hadits?)[\.:\w\s\d\-–—]+\))\s*$/is);
    if (match) {
      body = match[1].trim();
      source = match[2].trim();
    }
  }

  // Bersihkan newline berlebih agar teks mengalir seimbang di segala ukuran layar HP
  body = body.replace(/\s+/g, ' ').trim();

  return {
    body,
    source: source || '(QS. Ar-Rum: 21)',
  };
}

export default function CoupleProfile({ groom, bride, quote }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 1, ease: "easeOut" }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center z-20 overflow-visible">
      <div className="relative w-full max-w-[500px] min-h-screen overflow-x-hidden mx-auto flex flex-col items-center">
        <div className="relative z-10 flex flex-col items-center w-full pb-32">
          <div className="pt-20 min-[400px]:pt-28 pb-4 px-3 min-[375px]:px-4 min-[400px]:px-6 flex flex-col items-center w-full">
            <motion.img
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              src={doveImg}
              alt="Dove"
              className="w-16 min-[400px]:w-20 h-auto -mt-10 min-[400px]:-mt-12 mb-1 min-[400px]:mb-8 drop-shadow-sm"
            />

            <motion.div {...fadeInUp} className="text-center mt-6 mb-4 min-[400px]:mb-6 relative w-full max-w-[460px] mx-auto px-2 min-[375px]:px-4">
              <div
                className="font-isi text-[#4d3a30] text-[12.5px] min-[360px]:text-[13.5px] min-[400px]:text-[15px] leading-[1.8] mb-4 min-[400px]:mb-6 px-1"
                style={{ fontFamily: 'Futura Bk BT, sans-serif', textWrap: 'balance' }}
              >
                {quote ? (
                  (() => {
                    const parsed = formatQuote(quote);
                    return (
                      <>
                        <span className="block italic leading-[1.8]">{parsed.body}</span>
                        {parsed.source && (
                          <span className="mt-3 min-[400px]:mt-4 block not-italic opacity-95 text-[11.5px] min-[375px]:text-[12.5px] min-[400px]:text-[13.5px] font-medium">
                            {parsed.source}
                          </span>
                        )}
                      </>
                    );
                  })()
                ) : (
                  <>
                    <span className="block italic leading-[1.8]">
                      Di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.
                    </span>
                    <span className="mt-3 min-[400px]:mt-4 block not-italic opacity-95 text-[11.5px] min-[375px]:text-[12.5px] min-[400px]:text-[13.5px] font-medium">
                      (QS. Ar-Rum: 21)
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          <div className="relative w-full flex flex-col items-center px-2 min-[375px]:px-3 min-[400px]:px-5 pt-6 pb-28">
            <div
              className="absolute inset-y-0 left-0 right-0 z-0 bg-no-repeat bg-[size:100%_100%] mx-2 min-[375px]:mx-3 min-[400px]:mx-4"
              style={{ backgroundImage: `url(${bgOrnamen2})` }}
            ></div>
            <div className="relative z-10 flex flex-col items-center w-full px-2 pt-10 min-[400px]:pt-14">
              <div className="relative w-full flex justify-center mb-2">
                <motion.img
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={janurKiri}
                  className="absolute left-[-20px] min-[400px]:left-[-24px] top-[-65px] w-36 min-[400px]:w-40 h-auto rotate-[-15deg]"
                />
                <motion.img
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={janurKanan}
                  className="absolute right-[-20px] min-[400px]:right-[-24px] top-[-65px] w-36 min-[400px]:w-40 h-auto rotate-[15deg]"
                />

                <div className="text-center relative mt-6 mb-4 min-[400px]:mb-6 z-20">
                  <h2 className="font-nama text-3xl min-[375px]:text-4xl min-[400px]:text-5xl text-[#4d3a30] pt-1" style={{ fontFamily: 'Photograph Signature, cursive' }}>
                    Assalamu’alaikum
                  </h2>
                </div>
              </div>

              <motion.p {...fadeInUp} className="w-full max-w-[440px] mx-auto font-isi not-italic text-[#4d3a30] text-[12px] min-[375px]:text-[13px] min-[400px]:text-[14.5px] text-center leading-[1.75] mb-5 min-[400px]:mb-6 px-4 min-[375px]:px-5 min-[400px]:px-7" style={{ fontFamily: 'Futura Bk BT, sans-serif', fontStyle: 'normal' }}>
                Dengan memohon Rahmat dan Ridho Allah SWT<br />
                Kami bermaksud mengundang Bapak/Ibu/Saudara/i<br />
                untuk menghadiri acara pernikahan kami
              </motion.p>

              <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="flex flex-col items-center mb-1 w-full relative">
                <img
                  src={flowerLeft}
                  className="absolute left-[-18px] min-[375px]:left-[-24px] min-[400px]:left-[-32px] top-[20%] w-20 min-[375px]:w-24 min-[400px]:w-24 h-auto opacity-95 pointer-events-none z-20"
                  alt="deco"
                  loading="lazy"
                  decoding="async"
                />

                <div className="w-[82%] max-w-[205px] min-[400px]:max-w-[225px] aspect-[4/5] rounded-[100%] mt-3 overflow-hidden border-[3.5px] border-white shadow-xl relative z-10 bg-white">
                  <img src={bride?.photo || wanitaPhoto} alt="Bride" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>

                <div className="mt-2 min-[400px]:mt-3 text-center px-2 min-[400px]:px-4">
                  <h3 className="text-5xl min-[375px]:text-6xl min-[400px]:text-7xl text-[#6b492b] font-nama mt-2 mb-1" style={{ fontFamily: 'Great Vibes, cursive' }}>
                    {bride?.nickname || 'Fifi'}
                  </h3>
                  <h4 className="font-judul font-bold not-italic tracking-widest text-[16px] min-[375px]:text-[18px] min-[400px]:text-[20px] text-[#4d3a30] uppercase mb-2" style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif', fontStyle: 'normal' }}>
                    {bride?.fullName || 'MAGFIROH NUR PUSPITA'}
                  </h4>
                  <p className="font-isi not-italic text-[14px] min-[375px]:text-[15px] min-[400px]:text-[16px] text-[#4d3a30] mb-3 px-2 leading-relaxed" style={{ fontFamily: 'Futura Bk BT, sans-serif', fontStyle: 'normal' }}>
                    Putri dari <br /> {bride?.parents || 'Bapak dan Ibu'}
                  </p>
                  <a href={bride?.ig || '#'} target={bride?.ig ? '_blank' : undefined} rel="noreferrer" className="inline-block transition-transform hover:scale-110">
                    <img src={igIcon} alt="Instagram" className="w-[42px] h-[42px] object-contain mx-auto" loading="lazy" decoding="async" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="text-5xl min-[375px]:text-6xl min-[400px]:text-7xl text-[#6b492b] font-judul my-2 min-[400px]:my-3 opacity-70 px-8 text-center"
                style={{ fontFamily: 'Great Vibes, cursive' }}
              >
                &
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="flex flex-col items-center mb-2 w-full relative">
                <img
                  src={flowerRight}
                  className="absolute right-[-18px] min-[375px]:right-[-24px] min-[400px]:right-[-32px] top-[20%] w-20 min-[375px]:w-24 min-[400px]:w-24 h-auto opacity-95 pointer-events-none z-20"
                  alt="deco"
                  loading="lazy"
                  decoding="async"
                />

                <div className="w-[82%] max-w-[205px] min-[400px]:max-w-[225px] aspect-[4/5] rounded-[100%] mt-3 overflow-hidden border-[3.5px] border-white shadow-xl relative z-10 bg-white">
                  <img src={groom?.photo || priaPhoto} alt="Groom" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>

                <div className="mt-2 min-[400px]:mt-3 text-center px-2 min-[400px]:px-4">
                  <h3 className="text-5xl min-[375px]:text-6xl min-[400px]:text-7xl text-[#6b492b] font-nama mt-2 mb-1" style={{ fontFamily: 'Great Vibes, cursive' }}>
                    {groom?.nickname || 'Danu'}
                  </h3>
                  <h4 className="font-judul font-bold not-italic tracking-widest text-[16px] min-[375px]:text-[18px] min-[400px]:text-[20px] text-[#4d3a30] uppercase mb-2" style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif', fontStyle: 'normal' }}>
                    {groom?.fullName || 'MUHAMAD ALDANU RAHMANSYAH'}
                  </h4>
                  <p className="font-isi not-italic text-[14px] min-[375px]:text-[15px] min-[400px]:text-[16px] text-[#4d3a30] mb-3 px-2 leading-relaxed" style={{ fontFamily: 'Futura Bk BT, sans-serif', fontStyle: 'normal' }}>
                    Putra dari <br /> {groom?.parents || 'Bapak dan Ibu'}
                  </p>
                  <a href={groom?.ig || '#'} target={groom?.ig ? '_blank' : undefined} rel="noreferrer" className="inline-block transition-transform hover:scale-110">
                    <img src={igIcon} alt="Instagram" className="w-[42px] h-[42px] object-contain mx-auto" loading="lazy" decoding="async" />
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
