import React, { useState, useEffect } from 'react';

// Custom Handcrafted SVG Icons matching the mockup
function HomeIcon({ className = '', active = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? '2.4' : '1.9'}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6h-4v6H4a1 1 0 01-1-1v-9.5z" />
    </svg>
  );
}

function CoupleIcon({ className = '', active = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? '2.4' : '1.9'}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Figure 1 */}
      <circle cx="8" cy="8" r="3" />
      <path d="M4 19v-1a4 4 0 014-4h1" />
      {/* Figure 2 */}
      <circle cx="16" cy="10" r="2.5" />
      <path d="M12.5 19v-1a3.5 3.5 0 013.5-3.5h1a3 3 0 013 3v1.5" />
    </svg>
  );
}

function CalendarClockIcon({ className = '', active = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? '2.4' : '1.9'}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="4" width="18" height="17" rx="3" />
      <path d="M16 2v4M8 2v4M3 9h18" />
      {/* Mini clock in calendar */}
      <circle cx="15.5" cy="15.5" r="3.5" fill="none" strokeWidth="1.8" />
      <path d="M15.5 13.8v1.7l1.2 0.8" strokeWidth="1.6" />
    </svg>
  );
}

function RsvpIcon({ className = '', active = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? '2.4' : '1.9'}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 18V9.5a1.5 1.5 0 01.7-1.3L12 3l9.3 5.2a1.5 1.5 0 01.7 1.3V18a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
      <path d="M2.5 9l8.8 5.5a1.5 1.5 0 001.4 0l8.8-5.5" />
      {/* Heart inside envelope */}
      <path
        d="M12 11.2c-.7-.9-2.1-.8-2.6.2-.5 1 .6 2 2.6 3.1 2-1.1 3.1-2.1 2.6-3.1-.5-1-1.9-1.1-2.6-.2z"
        fill={active ? 'currentColor' : 'none'}
        strokeWidth="1.5"
      />
    </svg>
  );
}

function GiftIcon({ className = '', active = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? '2.4' : '1.9'}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Gift Box */}
      <rect x="3.5" y="8" width="17" height="13" rx="2" />
      <path d="M2 8h20v3H2z" />
      <path d="M12 8v13" />
      {/* Bow */}
      <path d="M12 8C10.5 4.5 7.5 4 6.5 5.5S8.5 8 12 8z" />
      <path d="M12 8c1.5-3.5 4.5-4 5.5-2.5S15.5 8 12 8z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: 'section-home', label: 'Home', Icon: HomeIcon },
  { id: 'section-couple', label: 'Mempelai', Icon: CoupleIcon },
  { id: 'section-event', label: 'Acara', Icon: CalendarClockIcon },
  { id: 'section-rsvp', label: 'RSVP', Icon: RsvpIcon },
  { id: 'section-gift', label: 'Kado & Ucapan', Icon: GiftIcon },
];

export default function BottomNavbar({ scrollContainerRef }) {
  const [activeTab, setActiveTab] = useState('section-home');

  const handleScrollTo = (targetId) => {
    setActiveTab(targetId);
    const element = document.getElementById(targetId);
    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // IntersectionObserver to sync active tab as user scrolls
  useEffect(() => {
    const sectionElements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        root: scrollContainerRef?.current || null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [scrollContainerRef]);

  return (
    <nav
      aria-label="Navigasi Undangan"
      className="fixed bottom-3 inset-x-0 mx-auto max-w-[480px] px-3 z-50 pointer-events-none"
    >
      <div className="pointer-events-auto w-full bg-[#fcf9f2]/95 backdrop-blur-md rounded-2xl border border-[#d6c4b2]/60 shadow-[0_8px_32px_rgba(77,58,48,0.18)] py-2 px-2 flex items-center justify-around transition-all">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => handleScrollTo(id)}
              aria-label={label}
              className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-[#6b492b] scale-110'
                  : 'text-[#8a684b]/80 hover:text-[#6b492b] hover:scale-105 active:scale-95'
              }`}
            >
              {/* Active subtle pill background */}
              {isActive && (
                <span className="absolute inset-0 bg-[#eadecc]/65 rounded-xl -z-10 shadow-xs" />
              )}
              <Icon className="w-6 h-6 transition-transform duration-200" active={isActive} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
