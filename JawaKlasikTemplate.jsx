import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import './jawa-klasik.css';

// Layout sections
import HeroSection from './sections/HeroSection';
import CoverSection from './sections/CoverSection';
import QuoteSection from './sections/QuoteSection';
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
import MusicToggle from './sections/components/MusicToggle';

// Assets
import pelaminanMerged from './assets/illustrations/pelaminan- (merged).png';
import bgImage from './assets/backgrounds/bg.jpg';

export default function JawaKlasikTemplate() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';

  const [invitationData, setInvitationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simulated fetch
    const timer = setTimeout(() => {
      setInvitationData({
        id: 1,
        groom: { 
          nickname: 'Danu', 
          fullName: 'MUHAMAD ALDANU RAHMANSYAH',
          parents: 'Bapak Rahman & Ibu Siti'
        },
        bride: { 
          nickname: 'Fifi', 
          fullName: 'MAGFIROH NUR PUSPITA',
          parents: 'Bapak Puspito & Ibu Nur'
        },
        eventDate: '2026-08-24T00:00:00'
      });
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [slug]);

  if (isLoading) return <div className="flex items-center justify-center min-h-screen font-body text-jawa-charcoal">Unduhan sedang dimuat...</div>;
  if (!invitationData) return <div className="flex items-center justify-center min-h-screen font-body">Undangan tidak ditemukan.</div>;

  return (
    <div className="w-full overflow-x-hidden relative"> 
      <main 
        className="max-w-[500px] mx-auto min-h-[100dvh] relative overflow-x-hidden bg-white shadow-2xl"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {!isOpen && (
          <CoverSection
            guestName={guestName}
            groomNickname={invitationData.groom.nickname}
            brideNickname={invitationData.bride.nickname}
            onOpen={() => setIsOpen(true)}
          />
        )}

        {isOpen && (
          <div className="animate-fade-in absolute inset-0 overflow-y-auto overflow-x-hidden">
           
            
          
            
            <QuoteSection />

            <CoupleProfile
              groom={invitationData.groom}
              bride={invitationData.bride}
            />
            
            <div className="w-full flex justify-center max-w-[480px] mx-auto relative z-10 -mt-24 mb-10 pointer-events-none">
              <img src={pelaminanMerged} alt="Pelaminan" className="w-[70%] min-[400px]:w-[75%] h-auto drop-shadow-md" />
            </div>
            
            <EventDetails events={invitationData.events || []} />
            
            <CountdownTimer targetDate={invitationData.eventDate} />
            
            <RSVPSection
              invitationId={invitationData.id}
              guestName={guestName}
            />
            
            <OurStory />
            
            <Gallery />
            
            <WeddingGift bankAccounts={invitationData.bankAccounts || []} />

            <GuestBookSection />
            
            <ClosingSection 
              groomNickname={invitationData.groom.nickname}
              brideNickname={invitationData.bride.nickname}
            />
          </div>
        )}
      </main>
    </div>
  );
} 