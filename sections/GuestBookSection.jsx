import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function GuestBookSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, ease: 'easeOut' }
  };

  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      setEntries([{ name: name.trim(), message: message.trim() }, ...entries]);
      setName('');
      setMessage('');
    }
  };

  return (
    <section
      className="relative w-full flex flex-col items-center z-20"
      
    >
      {/* Content */}
      <div className="w-full max-w-[500px] px-8 min-[400px]:px-10 py-10 flex flex-col items-center">

        {/* Title */}
        <motion.h3
          {...fadeInUp}
          className="text-[22px] min-[400px]:text-[26px] text-[#4D3A30] mb-8 tracking-[0.25em] uppercase text-center"
          style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
        >
          Best Wishes
        </motion.h3>

        {/* Form */}
        <motion.form
          {...fadeInUp}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4"
        >
          {/* Nama field */}
          <div className="flex flex-col gap-1">
            <label
              className="text-[#4D3A30] font-semibold text-[13px] min-[400px]:text-[14px]"
              style={{ fontFamily: 'Futura Md BT, sans-serif' }}
            >
              Nama <span className="text-red-200">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white rounded-lg px-4 py-3 text-[#4d3a30] text-[12px] outline-none focus:ring-2 focus:ring-[#6b492b] shadow-sm placeholder-gray-300"
              style={{ fontFamily: 'Futura Md BT, sans-serif' }}
            />
          </div>

          {/* Ucapan field */}
          <div className="flex flex-col gap-1">
            <label
              className="text-[#4D3A30] font-semibold text-[13px] min-[400px]:text-[14px]"
              style={{ fontFamily: 'Futura Md BT, sans-serif' }}
            >
              Ucapan dan Do'a
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full bg-white rounded-lg px-4 py-3 text-[#4d3a30] text-[12px] outline-none focus:ring-2 focus:ring-[#6b492b] shadow-sm resize-none placeholder-gray-300"
              style={{ fontFamily: 'Futura Md BT, sans-serif' }}
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-48 mx-auto bg-[#6b492b] hover:bg-[#4d3a30] text-white tracking-[0.3em] uppercase py-3 rounded-lg text-[11px] min-[400px]:text-[12px] font-semibold transition-colors mt-2 shadow-md"
            style={{ fontFamily: 'Futura Md BT, sans-serif' }}
          >
            Kirim
          </motion.button>
        </motion.form>

        {/* Submitted entries */}
        {entries.length > 0 && (
          <div className="w-full mt-8 flex flex-col gap-3">
            {entries.map((entry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-stone-200 rounded-xl px-5 py-4 text-left shadow-sm"
              >
                <p
                  className="text-[#4D3A30] font-semibold font-semibold text-[13px] mb-1"
                  style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
                >
                  {entry.name}
                </p>
                <p
                  className="text-[#4D3A30] font-semibold text-[14px] leading-relaxed"
                  style={{ fontFamily: 'Futura Md BT, sans-serif' }}
                >
                  {entry.message}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
