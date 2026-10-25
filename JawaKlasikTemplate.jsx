import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchUndangan } from './wp-api';
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
import MusicToggle from './sections/components/MusicToggle';

// Assets
import pelaminanMerged from './assets/illustrations/pelaminan- (merged).png';
import bgImage from './assets/backgrounds/bg.jpg';
import { DEFAULT_INVITATION } from './defaultData';

export default function JawaKlasikTemplate({ initialData = null }) {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';

  const [invitationData, setInvitationData] = useState(initialData || DEFAULT_INVITATION);
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
          setInvitationData(data || DEFAULT_INVITATION);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setInvitationData(DEFAULT_INVITATION);
          setIsLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [slug, initialData]);

  // Robust data merge: pastikan properti penting tidak pernah undefined
  const data = {
    ...DEFAULT_INVITATION,
    ...(invitationData || {}),
    groom: {
      ...DEFAULT_INVITATION.groom,
      ...(invitationData?.groom || {}),
    },
    bride: {
      ...DEFAULT_INVITATION.bride,
      ...(invitationData?.bride || {}),
    },
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen font-body text-jawa-charcoal">Unduhan sedang dimuat...</div>;

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

            <div className="animate-fade-in absolute inset-0 overflow-y-auto overflow-x-hidden">
              <VideoSection
                videoUrl={data.videoUrl}
                onVideoPlay={() => setIsMusicPlaying(false)}
              />

              <CoupleProfile
                groom={data.groom}
                bride={data.bride}
              />
            
            <div className="w-full flex justify-center max-w-[480px] mx-auto relative z-10 -mt-24 mb-10 pointer-events-none">
              <img src={pelaminanMerged} alt="Pelaminan" className="w-[70%] min-[400px]:w-[75%] h-auto drop-shadow-md" loading="lazy" decoding="async" />
            </div>
            
            <EventDetails events={data.events || []} />
            
            <CountdownTimer 
              targetDate={data.eventDate} 
              dresscodeColors={data.dresscodeColors}
              dresscodeInfo={data.dresscodeInfo}
              groomName={data.groom.nickname}
              brideName={data.bride.nickname}
              events={data.events}
            />
            
            <RSVPSection
              invitationId={data.id}
              guestName={guestName}
            />
            
            <OurStory stories={data.stories} />
            
            <Gallery photos={data.gallery} videoUrl={data.videoUrl} />
            
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