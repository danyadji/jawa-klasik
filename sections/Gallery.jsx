import React from 'react';
import { motion } from 'framer-motion';

export default function Gallery({ photos = [], videoUrl = '' }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const hasPhotos = photos.length > 0;
  // 5 foto pertama untuk slider portrait, sisanya untuk landscape
  const portraitPhotos = hasPhotos ? photos.slice(0, 5) : [];
  const landscapePhotos = hasPhotos ? photos.slice(5, 9) : [];

  return (
    <section className="relative w-full flex flex-col items-center py-12 z-20 overflow-hidden">
      
      <motion.h3 
        {...fadeInUp}
        className="text-xl min-[400px]:text-2xl text-[#6b492b] mb-6 tracking-widest uppercase" 
        style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
      >
        Gallery
      </motion.h3>

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
              key={`portrait-${item}`} 
              className="flex-none w-[140px] min-[400px]:w-[160px] aspect-[3/4] bg-white rounded-xl shadow-sm border border-black/5 snap-start flex items-center justify-center"
            >
              <span className="text-[#8c7457]/50 text-[10px] font-bold uppercase tracking-widest">Frame</span>
            </div>
          ))}
        </div>
        
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-full flex items-center justify-end pr-2 pointer-events-none">
          <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </motion.div>

      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.3 }}
        className="w-full relative mb-4"
      >
        <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2 px-6 min-[400px]:px-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {landscapePhotos.length ? landscapePhotos.map((src, idx) => (
            <div
              key={`landscape-${idx}`}
              className="flex-none w-[220px] min-[400px]:w-[260px] aspect-[4/3] bg-white rounded-xl shadow-sm border border-black/5 snap-start overflow-hidden"
            >
              <img src={src} alt={`Galeri landscape ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>
          )) : [1, 2, 3, 4].map((item) => (
            <div 
              key={`landscape-${item}`} 
              className="flex-none w-[220px] min-[400px]:w-[260px] aspect-[4/3] bg-white rounded-xl shadow-sm border border-black/5 snap-start flex items-center justify-center"
            >
              <span className="text-[#8c7457]/50 text-[10px] font-bold uppercase tracking-widest">Frame</span>
            </div>
          ))}
        </div>
        
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-full flex items-center justify-start pl-2 pointer-events-none">
          <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 5v14l-11-7z" />
          </svg>
        </div>
      </motion.div>

      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.4 }}
        className="w-full px-6 min-[400px]:px-10 flex justify-center mb-10"
      >
        <div className="relative w-full max-w-[400px] aspect-video bg-white rounded-xl shadow-sm border border-black/5 flex items-center justify-center overflow-hidden group cursor-pointer">
          <span className="text-[#8c7457]/50 text-[10px] font-bold uppercase tracking-widest">Video Thumbnail</span>
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors">
            <div className="w-[60px] h-[40px] bg-[#FF0000] rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{__html: `
        .flex::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
