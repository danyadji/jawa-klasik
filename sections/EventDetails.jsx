import React from 'react';
import { motion } from 'framer-motion';

import bgOrnamen from '../assets/illustrations/bg-ornamen-2.png';
import catImg from '../assets/illustrations/cat-merged.png';
import arrowSign from '../assets/illustrations/tanda-panah-kanan.png'; 

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-[14px] w-[14px] mr-2" viewBox="0 0 384 512" fill="currentColor">
    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
  </svg>
);

export default function EventDetails({ events }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const defaultEvents = [
    {
      title: 'Akad Nikah',
      date: 'Sabtu, 2* Maret 202*',
      time: 'Pukul 08.00',
      location: 'Di Gedung Mawar',
      address: 'Jl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      url: '#'
    },
    {
      title: 'Resepsi',
      date: 'Sabtu, 2* Maret 202*',
      time: 'Pukul 09.30',
      location: 'Di Gedung Mawar',
      address: 'Jl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      url: '#'
    },
    {
      title: 'Ngunduh Mantu',
      date: 'Minggu, 2* Maret 202*',
      time: 'Pukul 08.00',
      location: 'Di Gedung Melati',
      address: 'Jl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      url: '#'
    }
  ];

  const displayEvents = events?.length ? events : defaultEvents;

  return (
    <section className="relative w-full flex flex-col items-center py-4 z-20 overflow-visible">
      
      {/* Paper Container */}
      <div className="relative w-full flex flex-col items-center pt-16 pb-24">
        {/* Background Layer: bg-ornamen-2 */}
        <div 
          className="absolute inset-y-0 left-0 right-0 z-0 bg-no-repeat bg-[size:100%_100%] mx-4 min-[400px]:mx-8"
          style={{ backgroundImage: `url(${bgOrnamen})` }}
        ></div>

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center px-12 min-[400px]:px-16 gap-y-12">
          
          {displayEvents.map((event, idx) => (
            <motion.div 
              key={idx} 
              {...fadeInUp} 
              transition={{ delay: idx * 0.2 }}
              className="flex flex-col items-center text-center w-full"
            >
              <h3 className="text-4xl min-[400px]:text-5xl text-[#877d5e] mb-4" style={{ fontFamily: 'Great Vibes, cursive' }}>
                {event.title}
              </h3>
              
              <div className="font-isi text-[#4d3a30] text-[11px] min-[375px]:text-[13px] leading-relaxed mb-4" style={{ fontFamily: 'Futura Md BT, sans-serif' }}>
                <p className="font-bold">{event.date}</p>
                <p>{event.time}</p>
                <p className="font-bold mt-2">{event.location}</p>
                <p className="opacity-80 leading-snug max-w-[200px] mx-auto">{event.address}</p>
              </div>

              <a 
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center bg-[#6b492b] text-white py-2 px-6 rounded-md font-bold text-[10px] min-[375px]:text-[11px] tracking-wider hover:bg-[#4d3a30] transition-colors"
                style={{ fontFamily: 'Futura Md BT, sans-serif' }}
              >
                <MapPinIcon />
                LIHAT LOKASI
              </a>
            </motion.div>
          ))}

        </div>

        {/* Decorative Assets */}
        {/* Sign arrow pointing right */}
        <motion.img 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          src={arrowSign} 
          alt="Sign" 
          className="absolute left-0 top-[40%] w-24 min-[400px]:w-32 h-auto z-20 pointer-events-none drop-shadow-md"
          loading="lazy"
          decoding="async"
        />

        {/* Cat at bottom right */}
        <motion.img 
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          src={catImg} 
          alt="Cat" 
          className="absolute right-0 bottom-0 w-48 min-[400px]:w-56 h-auto z-20 pointer-events-none drop-shadow-md"
          loading="lazy"
          decoding="async"
        />

      </div>
    </section>
  );
}
