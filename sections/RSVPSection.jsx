import React from 'react';
import { motion } from 'framer-motion';

import kupu2 from '../assets/illustrations/kupu-2.png';
import catMerged from '../assets/illustrations/cat-merged.png';

export default function RSVPSection({ invitationId, guestName }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, ease: "easeOut" }
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

        <form className="flex flex-col gap-4 text-left w-full" style={{ fontFamily: 'Futura Md BT, sans-serif' }}>
          <div className="flex flex-col">
            <label className="text-white text-[11px] min-[375px]:text-[13px] mb-1.5 ml-1">Nama *</label>
            <input 
              type="text" 
              defaultValue={guestName !== 'Tamu Undangan' ? guestName : ''}
              className="w-full px-4 py-3 rounded-lg text-[#4d3a30] text-sm focus:outline-none focus:ring-2 focus:ring-[#6b492b]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white text-[11px] min-[375px]:text-[13px] mb-1.5 ml-1">Konfirmasi kehadiran *</label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-lg text-[#4d3a30] text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#6b492b]">
                <option value=""></option>
                <option value="Hadir">Hadir</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-white text-[11px] min-[375px]:text-[13px] mb-1.5 ml-1">Jumlah pengunjung *</label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-lg text-[#4d3a30] text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#6b492b]">
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
        </form>
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
