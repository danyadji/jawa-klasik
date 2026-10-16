import React from 'react';
import { motion } from 'framer-motion';
import bgWeddingGift from '../assets/illustrations/BG-WEDDING-GIFT.png';

export default function WeddingGift({ bankAccounts }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <section className="relative w-full flex flex-col items-center z-20 overflow-visible mt-10">

      {/* Background Layer: bg-wedding-gift */}
      <div className="relative w-full flex flex-col items-center pt-16 pb-24">
        <div
          className="absolute inset-y-0 left-0 right-0 z-0 bg-no-repeat bg-[size:100%_100%] mx-0"
          style={{ backgroundImage: `url(${bgWeddingGift})` }}
        ></div>

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center px-12 min-[400px]:px-16 text-center mt-6">

          <motion.h3
            {...fadeInUp}
            className="text-2xl min-[400px]:text-3xl text-[#4d3a30] mb-4 tracking-widest uppercase"
            style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
          >
            Wedding Gift
          </motion.h3>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-[#4d3a30] text-[11px] min-[375px]:text-[13px] font-medium leading-relaxed mb-8 max-w-[90%] mx-auto"
            style={{ fontFamily: 'Futura Md BT, sans-serif' }}
          >
            Restu dan langkah Anda yang hadir adalah hadiah paling indah. Bila ingin menitipkan tanda kasih, kami dengan penuh syukur menerima melalui informasi berikut:
          </motion.p>

          <motion.button
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center bg-[#6b492b] text-white py-3 px-8 rounded-lg font-medium text-[10px] min-[375px]:text-[12px] tracking-widest hover:bg-[#4d3a30] transition-colors shadow-lg"
            style={{ fontFamily: 'Futura Md BT, sans-serif' }}
          >
            {/* Gift Box Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 5V3.5C5 2.67157 5.67157 2 6.5 2H13.5C14.3284 2 15 2.67157 15 3.5V5H17C17.5523 5 18 5.44772 18 6V10H2V6C2 5.44772 2.44772 5 3 5H5ZM7 3.5V5H13V3.5C13 3.22386 12.7761 3 12.5 3H7.5C7.22386 3 7 3.22386 7 3.5ZM2 12V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V12H2ZM10 6V18H12V6H10Z" clipRule="evenodd" />
            </svg>
            KIRIM HADIAH
          </motion.button>

        </div>
      </div>
    </section>
  );
}
