import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function CountdownTimer({ 
  targetDate, 
  dresscodeColors, 
  dresscodeInfo,
  groomName = 'Danu',
  brideName = 'Fifi',
  events = []
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Color palette for dress code (from WP or default fallback)
  const defaultColors = ['#6b492b', '#ba7845', '#f3caa7', '#fcf6e8'];
  const colors = (Array.isArray(dresscodeColors) && dresscodeColors.length > 0)
    ? dresscodeColors
    : defaultColors;

  const infoText = dresscodeInfo || 'Dengan hormat kami meminta anda untuk mengenakan pakaian dengan warna berikut di hari istimewa kami:';

  // --- CALENDAR DATA PREPARATION ---
  const getCalendarData = () => {
    let start = new Date(targetDate || '2026-12-31T09:00:00');
    if (isNaN(start.getTime())) {
      start = new Date('2026-12-31T09:00:00');
    }

    // Attempt to extract time from events if present
    const firstEventTime = events?.[0]?.time || '';
    const timeMatch = String(firstEventTime).match(/(\d{1,2})[:.](\d{2})/);
    if (timeMatch) {
      start.setHours(parseInt(timeMatch[1], 10), parseInt(timeMatch[2], 10), 0, 0);
    } else if (start.getHours() === 0 && start.getMinutes() === 0) {
      start.setHours(9, 0, 0, 0);
    }

    // Default duration 4 hours
    const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);

    const title = `The Wedding of ${groomName} & ${brideName}`;
    const location = events?.[0]?.location || 'Lokasi Acara Pernikahan';
    const address = events?.[0]?.address || '';
    const fullLocation = address ? `${location}, ${address}` : location;
    const description = `Pernikahan ${groomName} & ${brideName}.\n\nDengan penuh rasa syukur kami mengundang Anda untuk hadir dan memberikan doa restu di hari bahagia kami.\n\nLokasi: ${fullLocation}`;

    return { start, end, title, location: fullLocation, description };
  };

  const handleGoogleCalendar = () => {
    const { start, end, title, location, description } = getCalendarData();
    const formatUtc = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatUtc(start)}/${formatUtc(end)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsModalOpen(false);
  };

  const handleAppleCalendar = () => {
    const { start, end, title, location, description } = getCalendarData();
    const pad = (n) => String(n).padStart(2, '0');
    const formatIcs = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Diamora//Wedding Invitation//ID',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@diamora.id`,
      `DTSTAMP:${formatIcs(new Date())}`,
      `DTSTART:${formatIcs(start)}`,
      `DTEND:${formatIcs(end)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Wedding-${groomName}-${brideName}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsModalOpen(false);
  };

  const displayDateStr = () => {
    const { start } = getCalendarData();
    try {
      return start.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return 'Hari Bahagia';
    }
  };

  const displayTimeStr = () => {
    const { start, end } = getCalendarData();
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(start.getHours())}:${pad(start.getMinutes())} - ${pad(end.getHours())}:${pad(end.getMinutes())} WIB`;
  };

  return (
    <section className="relative w-full flex flex-col items-center py-16 z-20 px-6 min-[400px]:px-10">
      <motion.div 
        {...fadeInUp}
        className="w-full bg-[#edeae1] rounded-xl p-6 min-[400px]:p-8 flex flex-col items-center text-center shadow-md relative mb-16"
      >
        <h3 className="text-xl font-bold min-[400px]:text-2xl text-[#4d3a30] mb-3 tracking-widest uppercase" style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}>
          Dress Code
        </h3>
        <p className="font-isi not-italic text-[#4d3a30] text-[12px] min-[375px]:text-[13px] min-[400px]:text-[14px] leading-relaxed mb-6" style={{ fontFamily: 'Futura Bk BT, sans-serif', fontStyle: 'normal' }}>
          {infoText}
        </p>
        
        <div className="absolute -bottom-6 min-[400px]:-bottom-7 flex gap-3 min-[400px]:gap-4">
          {colors.map((color, idx) => (
            <div 
              key={idx}
              className="w-12 h-12 min-[400px]:w-14 min-[400px]:h-14 rounded-full shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div 
        {...fadeInUp} 
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center w-full mt-6"
      >
        <h3 className="text-sm font-bold min-[400px]:text-base text-[#4d3a30] mb-6 tracking-widest uppercase" style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}>
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
              <span className="text-[10px] min-[400px]:text-xs text-[#4d3a30] font-bold tracking-wider capitalize not-italic" style={{ fontFamily: 'Futura Bk BT, sans-serif', fontStyle: 'normal' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <button 
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#6b492b] text-white py-3 px-8 rounded-lg font-bold text-[11px] min-[375px]:text-xs tracking-widest hover:bg-[#4d3a30] active:scale-95 transition-all uppercase shadow-md cursor-pointer"
          style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
        >
          <i className="fa-solid fa-calendar-check text-sm"></i>
          Save The Date
        </button>
      </motion.div>

      {/* Modal Popup: Pilih Kalender (mounted via createPortal to document.body so it is always on top) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div 
              className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full max-w-sm bg-[#edeae1] rounded-2xl p-6 text-center shadow-2xl border border-[#ded9cd] relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-[#6b492b] hover:text-[#4d3a30] p-1 text-base font-bold transition-colors cursor-pointer"
                  aria-label="Tutup"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>

                {/* Icon badge */}
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#6b492b]/10 flex items-center justify-center text-[#6b492b]">
                  <i className="fa-solid fa-calendar-days text-xl"></i>
                </div>

                <h4 
                  className="text-lg min-[400px]:text-xl font-bold text-[#4d3a30] mb-1 tracking-wider uppercase"
                  style={{ fontFamily: 'Chyntia Oesman Sans, sans-serif' }}
                >
                  Simpan ke Kalender
                </h4>
                <p className="text-xs text-[#6b492b] font-medium mb-4">
                  The Wedding of {groomName} & {brideName}
                </p>

                {/* Event Summary Box */}
                <div className="bg-white/75 rounded-xl p-3.5 mb-5 text-left text-xs text-[#4d3a30] space-y-2 border border-[#dfdad0]">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center gap-1.5 font-semibold text-[#6b492b] w-20 shrink-0">
                      <i className="fa-solid fa-calendar-days text-[#6b492b] text-[13px] w-4 text-center"></i>
                      Tanggal:
                    </span>
                    <span className="text-[#4d3a30] font-bold">{displayDateStr()}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center gap-1.5 font-semibold text-[#6b492b] w-20 shrink-0">
                      <i className="fa-regular fa-clock text-[#6b492b] text-[13px] w-4 text-center"></i>
                      Waktu:
                    </span>
                    <span className="text-[#4d3a30] font-medium">{displayTimeStr()}</span>
                  </div>
                  {events?.[0]?.location && (
                    <div className="flex items-start gap-2.5">
                      <span className="flex items-center gap-1.5 font-semibold text-[#6b492b] w-20 shrink-0 mt-0.5">
                        <i className="fa-solid fa-location-dot text-[#6b492b] text-[13px] w-4 text-center"></i>
                        Lokasi:
                      </span>
                      <span className="text-[#4d3a30] leading-snug">{events[0].location}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2.5">
                  {/* Google Calendar Button */}
                  <button
                    type="button"
                    onClick={handleGoogleCalendar}
                    className="w-full flex items-center justify-center gap-2.5 bg-[#4285F4] hover:bg-[#3367D6] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                  >
                    <i className="fa-brands fa-google text-white text-sm"></i>
                    Google Calendar (Android & PC)
                  </button>

                  {/* Apple / Phone Calendar (.ics) */}
                  <button
                    type="button"
                    onClick={handleAppleCalendar}
                    className="w-full flex items-center justify-center gap-2.5 bg-[#2d2522] hover:bg-[#1a1513] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                  >
                    <i className="fa-brands fa-apple text-white text-base"></i>
                    Apple & Kalender HP (.ics)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 text-[11px] text-[#7d6b5c] hover:text-[#4d3a30] underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
