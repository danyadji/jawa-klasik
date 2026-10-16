import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // If targetDate is not provided or invalid, use a dummy date in the future
    const target = new Date(targetDate || '2026-12-31T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  // Color palette for dress code
  const colors = ['#6b492b', '#ba7845', '#f3caa7', '#fcf6e8'];

  return (
    <section className="relative w-full flex flex-col items-center py-16 z-20 px-6 min-[400px]:px-10">
      
      {/* Dress Code Box */}
      <motion.div 
        {...fadeInUp}
        className="w-full bg-[#edeae1] rounded-xl p-6 min-[400px]:p-8 flex flex-col items-center text-center shadow-md relative mb-16"
      >
        <h3 className="text-xl min-[400px]:text-2xl text-[#4d3a30] mb-3 tracking-widest uppercase" style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}>
          Dress Code
        </h3>
        <p className="font-isi text-[#4d3a30] text-[11px] min-[375px]:text-[12px] leading-relaxed mb-6 italic" style={{ fontFamily: 'Futura Md BT, sans-serif' }}>
          Dengan hormat kami meminta anda untuk mengenakan pakaian dengan warna berikut di hari istimewa kami:
        </p>
        
        {/* Color circles overlapping the bottom edge */}
        <div className="absolute -bottom-6 min-[400px]:-bottom-7 flex gap-3 min-[400px]:gap-4">
          {colors.map((color, idx) => (
            <div 
              key={idx}
              className="w-12 h-12 min-[400px]:w-14 min-[400px]:h-14 rounded-full border-4 border-[#edeae1] shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </motion.div>

      {/* Countdown Section */}
      <motion.div 
        {...fadeInUp} 
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center w-full mt-6"
      >
        <h3 className="text-sm min-[400px]:text-base text-[#4d3a30] mb-6 tracking-widest uppercase" style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}>
          Counting Down To The Day
        </h3>

        <div className="flex justify-center gap-2 min-[400px]:gap-3 mb-8 w-full">
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center w-[22%] max-w-[70px] bg-[#edeae1] py-4 rounded-[2rem] shadow-sm">
              <span className="text-3xl min-[400px]:text-4xl text-[#4d3a30] mb-1 leading-none" style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}>
                {item.value.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] min-[400px]:text-xs text-[#4d3a30] font-bold tracking-wider capitalize" style={{ fontFamily: 'Futura Md BT, sans-serif' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <a 
          href="#"
          className="bg-[#6b492b] text-white py-3 px-8 rounded-lg font-bold text-[11px] min-[375px]:text-xs tracking-widest hover:bg-[#4d3a30] transition-colors uppercase shadow-md"
          style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
        >
          Save The Date
        </a>
      </motion.div>
    </section>
  );
}
