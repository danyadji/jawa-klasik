import React from 'react';
import { motion } from 'framer-motion';

import bgOrnamen from '../assets/illustrations/bg-ornamen-2.webp';
import catImg from '../assets/illustrations/cat-merged.webp';
import arrowSign from '../assets/illustrations/tanda-panah-kanan.webp';

const FoldedMapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-[14px] w-[14px] mr-2 flex-shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);

function getGoogleMapsUrl(event) {
  if (event?.url && typeof event.url === 'string') {
    const trimmed = event.url.trim();
    if (trimmed && trimmed !== '#') {
      if (/^(https?:)?\/\//i.test(trimmed)) {
        return trimmed.startsWith('//') ? `https:${trimmed}` : trimmed;
      }
      return `https://${trimmed}`;
    }
  }

  const query = [event?.location, event?.address].filter(Boolean).join(', ').trim();
  if (query) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  return 'https://maps.google.com';
}

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
      time: 'Pukul 10.00',
      location: 'Di Gedung Melati',
      address: 'Jl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      url: '#'
    },
    {
      title: 'Ngunduh Mantu',
      date: 'Sabtu, 2* Maret 202*',
      time: 'Pukul 10.00',
      location: 'Di Gedung Kenanga',
      address: 'Jl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      url: '#'
    }
  ];

  const displayEvents = (!events || events.length === 0)
    ? defaultEvents
    : (events.length === 2
      ? [...events, defaultEvents[2]]
      : events);

  return (
    <section className="relative w-full flex flex-col items-center py-4 z-20 overflow-visible">
      <div className="relative w-full flex flex-col items-center pt-16 pb-24">
        <div
          className="absolute inset-y-0 left-0 right-0 z-0 bg-no-repeat bg-[size:100%_100%] mx-4 min-[400px]:mx-8"
          style={{ backgroundImage: `url(${bgOrnamen})` }}
        ></div>

        <div className="relative z-10 w-full flex flex-col items-center px-12 min-[400px]:px-16 gap-y-12">
          {displayEvents.map((event, idx) => {
            const mapUrl = getGoogleMapsUrl(event);
            return (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center text-center w-full"
              >
                <h3 className="text-4xl min-[400px]:text-5xl text-[#7c8363] mb-3 italic" style={{ fontFamily: 'Great Vibes, cursive' }}>
                  {event.title}
                </h3>

                <div className="font-isi not-italic text-[#4d3a30] text-[13px] min-[375px]:text-[14px] min-[400px]:text-[18px] leading-tight mb-3" style={{ fontFamily: 'Futura Bk BT, sans-serif', fontStyle: 'normal' }}>
                  {event.date ? <p className="font-bold not-italic" style={{ fontStyle: 'normal', fontWeight: 700, WebkitTextStroke: '0.45px currentColor' }}>{event.date}</p> : null}
                  {event.time ? <p className="font-bold not-italic" style={{ fontStyle: 'normal', fontWeight: 700, WebkitTextStroke: '0.45px currentColor' }}>{event.time}</p> : null}
                  {event.location ? <p className="font-bold not-italic" style={{ fontStyle: 'normal', fontWeight: 700, WebkitTextStroke: '0.45px currentColor' }}>{event.location}</p> : null}
                  {event.address ? <p className="font-medium opacity-90 text-[11px] min-[375px]:text-[12px] min-[400px]:text-[12.5px] leading-snug max-w-[220px] mx-auto mt-2 not-italic" style={{ fontStyle: 'normal', fontWeight: 500, WebkitTextStroke: '0.2px currentColor' }}>{event.address}</p> : null}
                </div>

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-[#6b492b] text-white py-2 px-6 rounded-lg font-bold text-[11px] min-[375px]:text-[12px] tracking-wider hover:bg-[#4d3a30] active:scale-95 transition-all shadow-sm hover:shadow-md cursor-pointer not-italic"
                  style={{ fontFamily: 'Futura Bk BT, sans-serif', fontStyle: 'normal' }}
                >
                  <FoldedMapIcon />
                  LIHAT LOKASI
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.img
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          src={arrowSign}
          alt="Sign"
          className="absolute left-0 top-[35%] w-24 min-[400px]:w-32 h-auto z-20 pointer-events-none drop-shadow-md"
          loading="lazy"
          decoding="async"
        />

        <motion.img
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          src={catImg}
          alt="Cat"
          className="absolute right-0 bottom-[-5px] w-48 min-[400px]:w-56 h-auto z-20 pointer-events-none drop-shadow-md"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
