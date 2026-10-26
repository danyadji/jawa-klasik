import React, { useState } from 'react';
import { motion } from 'framer-motion';

function getYoutubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function Gallery({ photos = [], videoUrl = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const cleanPhotos = Array.isArray(photos) ? photos.filter(Boolean) : [];
  const hasPhotos = cleanPhotos.length > 0;
  
  const portraitPhotos = hasPhotos 
    ? (cleanPhotos.length <= 4 ? cleanPhotos : cleanPhotos.slice(0, Math.ceil(cleanPhotos.length / 2)))
    : [];
  const landscapePhotos = hasPhotos && cleanPhotos.length > 4
    ? cleanPhotos.slice(Math.ceil(cleanPhotos.length / 2))
    : [];

  const youtubeId = getYoutubeId(videoUrl);

  return (
    <section className="relative w-full flex flex-col items-center py-12 z-20 overflow-hidden">
      
      <motion.h3 
        {...fadeInUp}
        className="text-xl min-[400px]:text-2xl text-[#6b492b] mb-6 tracking-widest uppercase" 
        style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
      >
        Gallery
      </motion.h3>

      {/* Row 1: Portrait / Grid Slider */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.2 }}
        className="w-full relative mb-2"
      >
        <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2 px-6 min-[400px]:px-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {hasPhotos ? portraitPhotos.map((src, idx) => (
            <div
              key={`portrait-${idx}`}
              className="flex-none w-[140px] min-[400px]:w-[160px] aspect-[3/4] bg-white rounded-xl shadow-sm border border-black/5 snap-start overflow-hidden"
            >
              <img src={src} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>
          )) : [1, 2, 3, 4, 5].map((item) => (
            <div 
              key={`portrait-empty-${item}`} 
              className="flex-none w-[140px] min-[400px]:w-[160px] aspect-[3/4] bg-white rounded-xl shadow-sm border border-black/5 snap-start flex items-center justify-center"
            >
              <span className="text-[#8c7457]/50 text-[10px] font-bold uppercase tracking-widest">Foto {item}</span>
            </div>
          ))}
        </div>
        
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-full flex items-center justify-end pr-2 pointer-events-none">
          <svg className="w-6 h-6 text-black/60" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </motion.div>

      {/* Row 2: Landscape Slider (hanya jika foto > 4 atau tidak ada foto) */}
      {(landscapePhotos.length > 0 || !hasPhotos) && (
        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.3 }}
          className="w-full relative mb-4"
        >
          <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2 px-6 min-[400px]:px-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {hasPhotos ? landscapePhotos.map((src, idx) => (
              <div
                key={`landscape-${idx}`}
                className="flex-none w-[220px] min-[400px]:w-[260px] aspect-[4/3] bg-white rounded-xl shadow-sm border border-black/5 snap-start overflow-hidden"
              >
                <img src={src} alt={`Galeri landscape ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
            )) : [1, 2, 3, 4].map((item) => (
              <div 
                key={`landscape-empty-${item}`} 
                className="flex-none w-[220px] min-[400px]:w-[260px] aspect-[4/3] bg-white rounded-xl shadow-sm border border-black/5 snap-start flex items-center justify-center"
              >
                <span className="text-[#8c7457]/50 text-[10px] font-bold uppercase tracking-widest">Foto {item + 5}</span>
              </div>
            ))}
          </div>
          
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-full flex items-center justify-start pl-2 pointer-events-none">
            <svg className="w-6 h-6 text-black/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 5v14l-11-7z" />
            </svg>
          </div>
        </motion.div>
      )}

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
                    <span className="text-white text-xs font-semibold drop-shadow-md bg-black/40 px-2.5 py-1 rounded-md">
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
        .flex::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
