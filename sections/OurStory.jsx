import React from 'react';
import { motion } from 'framer-motion';

import photoFrame from '../assets/illustrations/OUR-STORY-PHOTO-FRAME.png';

export default function OurStory({ stories: propStories }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const defaultStories = [
    {
      title: 'Pertemuan Pertama',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet imperdiet lorem. Nulla elit lectus, vestibulum non congue eget, mattis sed metus. Sed ac lorem bibendum, lacinia erat non, ultricies diam.'
    },
    {
      title: 'Menjalin Kisah',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet imperdiet lorem. Nulla elit lectus, vestibulum non congue eget, mattis sed metus. Sed ac lorem bibendum, lacinia erat non, ultricies diam.'
    }
  ];

  const stories = propStories?.length ? propStories : defaultStories;

  return (
    <section className="relative w-full flex flex-col items-center py-16 z-20 px-6 min-[400px]:px-10">
      
      <div className="relative w-full flex justify-center mb-10">
        <div className="absolute inset-y-1/2 left-0 right-0 h-[2px] bg-[#8c7457] opacity-20"></div>
        <div className="relative bg-white px-8 py-2 min-[400px]:py-3 rounded-[1rem] shadow-sm z-10">
          <h3 className="text-[#6b492b] tracking-widest text-sm min-[400px]:text-base uppercase font-bold" style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}>
            Our Story
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-12 w-full mt-2">
        {stories.map((story, idx) => (
          <motion.div 
            key={idx}
            {...fadeInUp}
            transition={{ delay: idx * 0.2 }}
            className="flex flex-col items-center text-center w-full"
          >
            <div className="relative w-full max-w-[340px] mb-6 flex items-center justify-center">
              <img src={photoFrame} alt="Frame" className="w-full h-auto relative z-10 pointer-events-none" loading="lazy" decoding="async" />
              
              <div className="absolute inset-0 bg-[#8c7457]/10 m-[3%] rounded-lg flex items-center justify-center overflow-hidden z-0">
                {story.photo ? (
                  <img src={story.photo} alt={story.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <span className="text-[#8c7457]/70 font-bold tracking-widest uppercase text-[10px]" style={{ fontFamily: 'var(--font-judul)' }}>
                    Area Foto
                  </span>
                )}
              </div>
            </div>

            <h4 className="text-3xl min-[400px]:text-4xl text-[#4d3a30] mb-4" style={{ fontFamily: 'Photograph Signature, cursive' }}>
              {story.title}
            </h4>
            
            <p className="font-isi text-[#4d3a30] text-[11px] min-[375px]:text-[12px] leading-relaxed w-full min-[400px]:w-[90%]" style={{ fontFamily: 'Futura Md BT, sans-serif' }}>
              {story.description}
            </p>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
