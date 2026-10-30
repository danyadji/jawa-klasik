import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import './jawa-klasik.css';

// Layout sections: CoverSection is statically imported for instant initial paint & LCP
import CoverSection from './sections/CoverSection';

// Lazy-loaded post-cover sections for code splitting
const VideoSection = lazy(() => import('./sections/VideoSection'));
const CoupleProfile = lazy(() => import('./sections/CoupleProfile'));
const EventDetails = lazy(() => import('./sections/EventDetails'));
const CountdownTimer = lazy(() => import('./sections/CountdownTimer'));
const WeddingGift = lazy(() => import('./sections/WeddingGift'));
const RSVPSection = lazy(() => import('./sections/RSVPSection'));
const OurStory = lazy(() => import('./sections/OurStory'));
const Gallery = lazy(() => import('./sections/Gallery'));
const GuestBookSection = lazy(() => import('./sections/GuestBookSection'));
const ClosingSection = lazy(() => import('./sections/ClosingSection'));

// Shared components lazy-loaded
const MusicToggle = lazy(() => import('./components/MusicToggle'));
const BottomNavbar = lazy(() => import('./components/BottomNavbar'));

// Assets
import pelaminanMerged from './assets/illustrations/pelaminan- (merged).webp';
import { DEFAULT_INVITATION } from './defaultData';

// Prefetch post-cover components during browser idle time
function prefetchPostCover() {
  import('./sections/VideoSection');
  import('./sections/CoupleProfile');
  import('./sections/EventDetails');
  import('./sections/CountdownTimer');
  import('./sections/WeddingGift');
  import('./sections/RSVPSection');
  import('./sections/OurStory');
  import('./sections/Gallery');
  import('./sections/GuestBookSection');
  import('./sections/ClosingSection');
  import('./components/MusicToggle');
  import('./components/BottomNavbar');
}

export default function JawaKlasikTemplate({ data: rawData, guestName = 'Tamu Undangan', isRegisteredGuest = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const scrollContainerRef = useRef(null);

  // Prefetch sections after cover has loaded and browser is idle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const id = window.requestIdleCallback(prefetchPostCover, { timeout: 2000 });
        return () => window.cancelIdleCallback?.(id);
      } else {
        const t = setTimeout(prefetchPostCover, 1500);
        return () => clearTimeout(t);
      }
    }
  }, []);

  // Robust data merge: pastikan properti penting tidak pernah undefined
  const data = {
    ...DEFAULT_INVITATION,
    ...(rawData || {}),
    groom: {
      ...DEFAULT_INVITATION.groom,
      ...(rawData?.groom || {}),
    },
    bride: {
      ...DEFAULT_INVITATION.bride,
      ...(rawData?.bride || {}),
    },
  };

  return (
    <div className="tema-jawa-klasik w-full overflow-x-hidden relative"> 
      <main 
        className="max-w-[500px] mx-auto min-h-[100dvh] h-[100dvh] relative overflow-hidden bg-white shadow-2xl"
      >
        {/* Background Fixed untuk semua section (terkunci di frame 500px, tidak kepotong) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/bg.webp"
            alt="Background"
            className="w-full h-full object-cover object-center"
            fetchpriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-white/10" />
        </div>

        {!isOpen && (
          <CoverSection
            guestName={guestName}
            groomNickname={data.groom.nickname}
            brideNickname={data.bride.nickname}
            onOpen={() => {
              setIsOpen(true);
              setIsMusicPlaying(true);
            }}
          />
        )}

        {isOpen && (
          <Suspense fallback={null}>
            <MusicToggle
              musicUrl={data.musicUrl}
              isPlaying={isMusicPlaying}
              onToggle={() => setIsMusicPlaying((prev) => !prev)}
            />

            <BottomNavbar scrollContainerRef={scrollContainerRef} />

            <div 
              ref={scrollContainerRef}
              className="animate-fade-in absolute inset-0 overflow-y-auto overflow-x-hidden pb-24 scroll-smooth z-10"
            >
              <div id="section-home">
                <VideoSection
                  videoUrl={data.videoUrl}
                  onVideoPlay={() => setIsMusicPlaying(false)}
                />
              </div>

              <div id="section-couple">
                <CoupleProfile
                  groom={data.groom}
                  bride={data.bride}
                  quote={data.quote}
                />
              </div>
            
              <div className="w-full flex justify-center max-w-[480px] mx-auto relative z-10 -mt-24 mb-10 pointer-events-none">
                <img src={pelaminanMerged} alt="Pelaminan" className="w-[70%] min-[400px]:w-[75%] h-auto drop-shadow-md" loading="lazy" decoding="async" />
              </div>
            
              <div id="section-event">
                <EventDetails events={data.events || []} />
                
                <CountdownTimer 
                  targetDate={data.eventDate} 
                  dresscodeColors={data.dresscodeColors}
                  dresscodeInfo={data.dresscodeInfo}
                  groomName={data.groom.nickname}
                  brideName={data.bride.nickname}
                  events={data.events}
                />
              </div>
            
              <div id="section-rsvp">
                <RSVPSection
                  invitationId={data.id}
                  guestName={guestName}
                  isRegisteredGuest={isRegisteredGuest}
                />
              </div>
            
              <OurStory stories={data.stories} />
              
              <Gallery photos={data.gallery} videoUrl={data.videoUrl} />
              
              <div id="section-gift">
                <WeddingGift 
                  bankAccounts={data.bankAccounts || []} 
                  giftAddress={data.giftAddress}
                  events={data.events}
                  groomName={data.groom.nickname}
                  brideName={data.bride.nickname}
                />

                <GuestBookSection
                  invitationId={data.id}
                  guestName={guestName}
                  isRegisteredGuest={isRegisteredGuest}
                />
              </div>
              
              <ClosingSection 
                groomNickname={data.groom.nickname}
                brideNickname={data.bride.nickname}
                photo={data.couplePhoto}
              />
            </div>
          </Suspense>
        )}
      </main>
    </div>
  );
}
