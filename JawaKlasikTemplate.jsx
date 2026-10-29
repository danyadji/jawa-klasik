import { useState, useRef } from 'react';
import './jawa-klasik.css';

// Layout sections
import CoverSection from './sections/CoverSection';
import VideoSection from './sections/VideoSection';
import CoupleProfile from './sections/CoupleProfile';
import EventDetails from './sections/EventDetails';
import CountdownTimer from './sections/CountdownTimer';
import WeddingGift from './sections/WeddingGift';
import RSVPSection from './sections/RSVPSection';
import OurStory from './sections/OurStory';
import Gallery from './sections/Gallery';
import GuestBookSection from './sections/GuestBookSection';
import ClosingSection from './sections/ClosingSection';

// Shared components
import MusicToggle from './components/MusicToggle';
import BottomNavbar from './components/BottomNavbar';

// Assets
import pelaminanMerged from './assets/illustrations/pelaminan- (merged).png';
import bgImage from './assets/backgrounds/bg.jpg';
import { DEFAULT_INVITATION } from './defaultData';

export default function JawaKlasikTemplate({ data: rawData, guestName = 'Tamu Undangan' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const scrollContainerRef = useRef(null);

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
            src={bgImage}
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
          <>
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
                />
              </div>
              
              <ClosingSection 
                groomNickname={data.groom.nickname}
                brideNickname={data.bride.nickname}
                photo={data.couplePhoto}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
