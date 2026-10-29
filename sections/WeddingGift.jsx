import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bgWeddingGift from '../assets/illustrations/BG-WEDDING-GIFT.png';

export default function WeddingGift({ 
  bankAccounts = [], 
  giftAddress = '', 
  events = [],
  groomName = 'Danu',
  brideName = 'Fifi'
}) {
  const [showCards, setShowCards] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  // Fallback bank accounts if not specified in WP
  const displayAccounts = (bankAccounts && bankAccounts.length > 0)
    ? bankAccounts
    : [
        { bank: 'BCA', number: '1234567890', holder: `${groomName} & ${brideName}` },
        { bank: 'MANDIRI', number: '0987654321', holder: `${brideName} & ${groomName}` }
      ];

  // Address for sending physical gifts
  const targetAddress = giftAddress || events?.[0]?.address || events?.[0]?.location || 'Alamat Gedung / Kediaman Mempelai';

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey(null);
      }, 2500);
    });
  };

  return (
    <section className="relative w-full flex flex-col items-center z-20 overflow-visible mt-10">
      <div className="relative w-full flex flex-col items-center pt-16 pb-20">
        <div
          className="absolute inset-y-0 left-0 right-0 z-0 bg-no-repeat bg-[size:100%_100%] mx-0"
          style={{ backgroundImage: `url(${bgWeddingGift})` }}
        ></div>

        <div className="relative z-10 w-full flex flex-col items-center px-10 min-[400px]:px-14 text-center mt-6">
          <motion.h3
            {...fadeInUp}
            className="text-2xl font-bold min-[400px]:text-3xl text-[#4d3a30] mb-4 tracking-widest uppercase"
            style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
          >
            Wedding Gift
          </motion.h3>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-[#4d3a30] text-[11px] min-[375px]:text-[13px] font-medium leading-relaxed mb-8 max-w-[90%] mx-auto"
            style={{ fontFamily: 'Futura Bk BT, sans-serif' }}
          >
            Restu dan langkah Anda yang hadir adalah hadiah paling indah. Bila ingin menitipkan tanda kasih, kami dengan penuh syukur menerima melalui informasi berikut:
          </motion.p>

          <motion.button
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            type="button"
            onClick={() => setShowCards(!showCards)}
            className="flex items-center justify-center bg-[#6b492b] text-white py-3 px-8 rounded-lg font-medium text-[10px] min-[375px]:text-[12px] tracking-widest hover:bg-[#4d3a30] active:scale-95 transition-all shadow-lg cursor-pointer"
            style={{ fontFamily: 'Futura Bk BT, sans-serif' }}
          >
            <i className={`fa-solid ${showCards ? 'fa-chevron-up' : 'fa-gift'} mr-2 text-sm`}></i>
            {showCards ? 'TUTUP HADIAH' : 'KIRIM HADIAH'}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showCards && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -15 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-[420px] px-6 min-[400px]:px-8 flex flex-col gap-5 mt-2 mb-10 z-20 overflow-hidden"
          >
            <div className="bg-[#edeae1] rounded-2xl p-5 shadow-lg border border-[#ded9cd] text-center">
              <div className="flex items-center justify-center gap-2 mb-3 text-[#4d3a30]">
                <div className="w-8 h-8 rounded-full bg-[#6b492b]/15 flex items-center justify-center text-[#6b492b]">
                  <i className="fa-solid fa-credit-card text-sm"></i>
                </div>
                <h4 
                  className="text-base font-bold tracking-wider uppercase"
                  style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
                >
                  Amplop Digital
                </h4>
              </div>
              
              <p className="text-[11px] text-[#6b492b] mb-4 font-medium not-italic" style={{ fontFamily: 'Futura Bk BT, sans-serif' }}>
                Silakan transfer tanda kasih ke nomor rekening berikut:
              </p>

              <div className="flex flex-col gap-3">
                {displayAccounts.map((acc, idx) => {
                  const key = `acc-${idx}`;
                  const isCopied = copiedKey === key;
                  return (
                    <div 
                      key={idx}
                      className="bg-white/80 rounded-xl p-3.5 border border-[#dfdad0] text-left flex flex-col gap-1.5 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="bg-[#6b492b] text-white text-[10px] font-bold px-2.5 py-0.5 rounded tracking-wider uppercase">
                          {acc.bank || 'BANK'}
                        </span>
                        <span className="text-[11px] text-[#7d6b5c]">
                          a.n. <strong className="text-[#4d3a30]">{acc.holder || 'Mempelai'}</strong>
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm min-[375px]:text-base font-bold font-mono tracking-wider text-[#4d3a30]">
                          {acc.number}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(acc.number, key)}
                          className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all shadow-sm active:scale-95 cursor-pointer ${
                            isCopied 
                              ? 'bg-emerald-600 text-white' 
                              : 'bg-[#6b492b] hover:bg-[#4d3a30] text-white'
                          }`}
                        >
                          <i className={`fa-solid ${isCopied ? 'fa-check' : 'fa-copy'}`}></i>
                          {isCopied ? 'Tersalin' : 'Salin'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#edeae1] rounded-2xl p-5 shadow-lg border border-[#ded9cd] text-center">
              <div className="flex items-center justify-center gap-2 mb-3 text-[#4d3a30]">
                <div className="w-8 h-8 rounded-full bg-[#6b492b]/15 flex items-center justify-center text-[#6b492b]">
                  <i className="fa-solid fa-box-open text-sm"></i>
                </div>
                <h4 
                  className="text-base font-bold tracking-wider uppercase"
                  style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
                >
                  Kirim Kado Fisik
                </h4>
              </div>

              <p className="text-[11px] text-[#6b492b] mb-4 font-medium not-italic" style={{ fontFamily: 'Futura Bk BT, sans-serif' }}>
                Kado fisik dapat dikirimkan ke alamat berikut:
              </p>

              <div className="bg-white/80 rounded-xl p-3.5 border border-[#dfdad0] text-left flex flex-col gap-2 shadow-sm">
                <div className="flex items-center gap-2 text-xs text-[#6b492b] font-semibold">
                  <i className="fa-solid fa-user-tag text-[11px]"></i>
                  <span>Penerima: <strong className="text-[#4d3a30]">{groomName} & {brideName}</strong></span>
                </div>

                <div className="flex items-start gap-2 text-xs text-[#4d3a30] leading-relaxed">
                  <i className="fa-solid fa-location-dot text-[#6b492b] mt-1 shrink-0"></i>
                  <span>{targetAddress}</span>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleCopy(targetAddress, 'address')}
                    className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all shadow-sm active:scale-95 cursor-pointer ${
                      copiedKey === 'address'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#6b492b] hover:bg-[#4d3a30] text-white'
                    }`}
                  >
                    <i className={`fa-solid ${copiedKey === 'address' ? 'fa-check' : 'fa-copy'}`}></i>
                    {copiedKey === 'address' ? 'Alamat Tersalin' : 'Salin Alamat'}
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
