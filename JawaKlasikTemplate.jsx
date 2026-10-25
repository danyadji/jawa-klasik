import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchUndangan } from './wp-api';
import './jawa-klasik.css';

// Layout sections
import HeroSection from './sections/HeroSection';
import CoverSection from './sections/CoverSection';
import QuoteSection from './sections/QuoteSection';
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
import MusicToggle from './sections/components/MusicToggle';

// Assets
import pelaminanMerged from './assets/illustrations/pelaminan- (merged).png';
import bgImage from './assets/backgrounds/bg.jpg';

export default function JawaKlasikTemplate({ initialData = null }) {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';

  const [invitationData, setInvitationData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    if (initialData) {
      setInvitationData(initialData);
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    // Ambil data dari WordPress (CPT undangan, by slug).
    // Kalau WP mati / slug tidak ada, pakai data dummy biar template tetap bisa dibuka.
    fetchUndangan(slug || 'danu-fifi')
      .then((data) => {
        if (!cancelled) {
          setInvitationData(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
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
            eventDate: '2026-08-24T00:00:00',
            events: [],
            gallery: [],
            stories: [],
            bankAccounts: []
          });
          setIsLoading(false);
        }
      });
    return () => { cancelled = true; };
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
            onOpen={() => {
              setIsOpen(true);
              setIsMusicPlaying(true);
            }}
          />
        )}

        {isOpen && (
          <>
            <MusicToggle
              musicUrl={invitationData.musicUrl}
              isPlaying={isMusicPlaying}
              onToggle={() => setIsMusicPlaying((prev) => !prev)}
            />

            <div className="animate-fade-in absolute inset-0 overflow-y-auto overflow-x-hidden">
              <QuoteSection />

              <VideoSection
                videoUrl={invitationData.videoUrl}
                onVideoPlay={() => setIsMusicPlaying(false)}
              />

              <CoupleProfile
                groom={invitationData.groom}
                bride={invitationData.bride}
              />
            
            <div className="w-full flex justify-center max-w-[480px] mx-auto relative z-10 -mt-24 mb-10 pointer-events-none">
              <img src={pelaminanMerged} alt="Pelaminan" className="w-[70%] min-[400px]:w-[75%] h-auto drop-shadow-md" />
            </div>
            
            <EventDetails events={invitationData.events || []} />
            
            <CountdownTimer 
              targetDate={invitationData.eventDate} 
              dresscodeColors={invitationData.dresscodeColors}
              dresscodeInfo={invitationData.dresscodeInfo}
              groomName={invitationData.groom?.nickname || 'Danu'}
              brideName={invitationData.bride?.nickname || 'Fifi'}
              events={invitationData.events}
            />
            
            <RSVPSection
              invitationId={invitationData.id}
              guestName={guestName}
            />
            
            <OurStory stories={invitationData.stories} />
            
            <Gallery photos={invitationData.gallery} videoUrl={invitationData.videoUrl} />
            
            <WeddingGift 
              bankAccounts={invitationData.bankAccounts || []} 
              giftAddress={invitationData.giftAddress}
              events={invitationData.events}
              groomName={invitationData.groom?.nickname || 'Danu'}
              brideName={invitationData.bride?.nickname || 'Fifi'}
            />

            <GuestBookSection
              invitationId={invitationData.id}
              guestName={guestName}
            />
            
            <ClosingSection 
              groomNickname={invitationData.groom.nickname}
              brideNickname={invitationData.bride.nickname}
              photo={invitationData.couplePhoto}
            />
          </div>
        </>
      )}
      </main>
    </div>
  );
} 