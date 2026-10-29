import React, { useState } from 'react';
import { motion } from 'framer-motion';

function getYoutubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function prepareLoopItems(list, minCount = 6) {
  if (!list || list.length === 0) return [];
  let result = [...list];
  while (result.length < minCount) {
    result = [...result, ...list];
  }
  return result;
}

export default function Gallery({ photos = [], videoUrl = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [row1Paused, setRow1Paused] = useState(false);
  const [row2Paused, setRow2Paused] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const cleanPhotos = Array.isArray(photos) ? photos.filter(Boolean) : [];
  const hasPhotos = cleanPhotos.length > 0;

  // Split photos for Row 1 (top) and Row 2 (bottom)
  let topRaw = [];
  let bottomRaw = [];

  if (hasPhotos) {
    if (cleanPhotos.length <= 3) {
      topRaw = cleanPhotos;
      bottomRaw = [...cleanPhotos].reverse();
    } else {
      const mid = Math.ceil(cleanPhotos.length / 2);
      topRaw = cleanPhotos.slice(0, mid);
      bottomRaw = cleanPhotos.slice(mid);
    }
  } else {
    topRaw = [1, 2, 3, 4, 5];
    bottomRaw = [6, 7, 8, 9];
  }

  const row1Items = prepareLoopItems(topRaw, 6);
  const row2Items = prepareLoopItems(bottomRaw, 6);

  const youtubeId = getYoutubeId(videoUrl);

  return (
    <section className="relative w-full flex flex-col items-center py-12 z-20 overflow-hidden">
      
      <motion.h3 
        {...fadeInUp}
        className="text-xl font-bold min-[400px]:text-2xl text-[#6b492b] mb-6 tracking-widest uppercase not-italic" 
        style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif', fontStyle: 'normal' }}
      >
        Gallery
      </motion.h3>

      {/* Row 1: Top Images - Slider ke Kanan (Slide to Right) */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.2 }}
        className="w-full relative mb-3 overflow-hidden select-none cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setRow1Paused(true)}
        onMouseLeave={() => setRow1Paused(false)}
        onTouchStart={() => setRow1Paused(true)}
        onTouchEnd={() => setRow1Paused(false)}
        onPointerDown={() => setRow1Paused(true)}
        onPointerUp={() => setRow1Paused(false)}
      >
        <div 
          className="marquee-track flex w-max"
          style={{
            animation: 'marqueeRight 55s linear infinite',
            animationPlayState: row1Paused ? 'paused' : 'running',
            willChange: 'transform'
          }}
        >
          {/* Track A */}
          <div className="flex gap-3 pr-3 shrink-0">
            {row1Items.map((item, idx) => (
              <div
                key={`r1-a-${idx}`}
                className="flex-none w-[145px] min-[400px]:w-[165px] aspect-[3/4] bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
              >
                {hasPhotos ? (
                  <img src={item} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover pointer-events-none" loading="lazy" decoding="async" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/80">
                    <span className="text-[#8c7457]/50 text-[10px] font-bold uppercase tracking-widest">Foto {item}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Track B (clone for infinite seamless loop) */}
          <div className="flex gap-3 pr-3 shrink-0" aria-hidden="true">
            {row1Items.map((item, idx) => (
              <div
                key={`r1-b-${idx}`}
                className="flex-none w-[145px] min-[400px]:w-[165px] aspect-[3/4] bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
              >
                {hasPhotos ? (
                  <img src={item} alt="" className="w-full h-full object-cover pointer-events-none" loading="lazy" decoding="async" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/80">
                    <span className="text-[#8c7457]/50 text-[10px] font-bold uppercase tracking-widest">Foto {item}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Row 2: Bottom Images - Slider ke Kiri (Slide to Left, sebelum YouTube) */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.3 }}
        className="w-full relative mb-6 overflow-hidden select-none cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setRow2Paused(true)}
        onMouseLeave={() => setRow2Paused(false)}
        onTouchStart={() => setRow2Paused(true)}
        onTouchEnd={() => setRow2Paused(false)}
        onPointerDown={() => setRow2Paused(true)}
        onPointerUp={() => setRow2Paused(false)}
      >
        <div 
          className="marquee-track flex w-max"
          style={{
            animation: 'marqueeLeft 55s linear infinite',
            animationPlayState: row2Paused ? 'paused' : 'running',
            willChange: 'transform'
          }}
        >
          {/* Track A */}
          <div className="flex gap-3 pr-3 shrink-0">
            {row2Items.map((item, idx) => (
              <div
                key={`r2-a-${idx}`}
                className="flex-none w-[220px] min-[400px]:w-[250px] aspect-[4/3] bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
              >
                {hasPhotos ? (
                  <img src={item} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover pointer-events-none" loading="lazy" decoding="async" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/80">
                    <span className="text-[#8c7457]/50 text-[10px] font-bold uppercase tracking-widest">Foto {item}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Track B (clone for infinite seamless loop) */}
          <div className="flex gap-3 pr-3 shrink-0" aria-hidden="true">
            {row2Items.map((item, idx) => (
              <div
                key={`r2-b-${idx}`}
                className="flex-none w-[220px] min-[400px]:w-[250px] aspect-[4/3] bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
              >
                {hasPhotos ? (
                  <img src={item} alt="" className="w-full h-full object-cover pointer-events-none" loading="lazy" decoding="async" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/80">
                    <span className="text-[#8c7457]/50 text-[10px] font-bold uppercase tracking-widest">Foto {item}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Video / YouTube Section with interactive preview */}
      {(videoUrl || youtubeId) && (
        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.4 }}
          className="w-full px-6 min-[400px]:px-10 flex justify-center mb-10 mt-2"
        >
          <div className="relative w-full max-w-[420px] aspect-video bg-black rounded-2xl shadow-lg border-2 border-white/80 overflow-hidden">
            {youtubeId ? (
              isPlaying ? (
                <iframe
                  className="w-full h-full border-0"
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title="YouTube Video Gallery"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div 
                  onClick={() => setIsPlaying(true)}
                  className="relative w-full h-full group cursor-pointer"
                >
                  <img 
                    src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`} 
                    alt="YouTube Video Thumbnail" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-[68px] h-[48px] bg-[#FF0000] rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#cc0000]">
                      <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="text-white text-xs font-semibold drop-shadow-md bg-black/40 px-2.5 py-1 rounded-md not-italic">
                      Tonton di YouTube
                    </span>
                  </div>
                </div>
              )
            ) : (
              <video 
                src={videoUrl} 
                controls 
                preload="metadata" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </motion.div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeRight {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0%, 0, 0);
          }
        }
        @keyframes marqueeLeft {
          0% {
            transform: translate3d(0%, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-track:hover,
        .marquee-track:active {
          animation-play-state: paused !important;
        }
      `}} />
    </section>
  );
}
