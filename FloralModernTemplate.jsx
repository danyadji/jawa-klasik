import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchUndangan } from './wp-api';

export default function FloralModernTemplate({ initialData = null }) {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';

  const [invitationData, setInvitationData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setInvitationData(initialData);
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
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
            groom: { nickname: 'Danu', fullName: 'Danu Rahmansyah' },
            bride: { nickname: 'Fifi', fullName: 'Fifi Puspita' },
            events: [],
            gallery: [],
          });
          setIsLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [slug, initialData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#faf8f5] text-[#5a4d41] font-serif">
        Memuat Undangan Floral Modern...
      </div>
    );
  }

  const groom = invitationData?.groom || {};
  const bride = invitationData?.bride || {};

  return (
    <div className="min-h-screen bg-[#fcf9f6] text-[#3d3835] font-sans">
      <main className="max-w-[480px] mx-auto min-h-screen bg-white shadow-xl flex flex-col relative overflow-hidden">
        {/* Cover / Welcome Screen */}
        {!isOpen ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#fbf4ee] to-white relative">
            <div className="w-16 h-16 mb-4 rounded-full border border-[#c4a482] flex items-center justify-center text-[#9c7247] text-xl font-serif">
              ❀
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#9c7247] mb-3">Wedding Invitation</p>
            <h1 className="text-3xl font-serif text-[#3f3123] mb-2 tracking-wide">
              {groom.nickname} & {bride.nickname}
            </h1>
            <div className="w-12 h-[1px] bg-[#c4a482] my-4"></div>
            <p className="text-xs text-gray-500 mb-1">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
            <p className="text-base font-semibold text-[#3f3123] mb-8">{guestName}</p>

            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-2.5 rounded-full bg-[#9c7247] hover:bg-[#855f3a] text-white text-xs tracking-wider uppercase shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Buka Undangan
            </button>
          </div>
        ) : (
          /* Main Content */
          <div className="flex-1 flex flex-col p-6 space-y-10 animate-fade-in">
            {/* Header / Intro */}
            <header className="text-center pt-8">
              <span className="text-xs uppercase tracking-widest text-[#9c7247]">The Wedding Of</span>
              <h2 className="text-3xl font-serif text-[#3f3123] mt-2 mb-1">
                {groom.nickname} & {bride.nickname}
              </h2>
              {invitationData.eventDate && (
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(invitationData.eventDate).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </header>

            {/* Couple Profile */}
            <section className="bg-[#fbf7f2] p-6 rounded-2xl border border-[#ede3d8] text-center space-y-4">
              <div>
                <h3 className="text-xl font-serif text-[#3f3123]">{groom.fullName || groom.nickname}</h3>
                {groom.parents && <p className="text-xs text-gray-500 mt-1">{groom.parents}</p>}
              </div>
              <div className="text-lg text-[#9c7247] font-serif">&</div>
              <div>
                <h3 className="text-xl font-serif text-[#3f3123]">{bride.fullName || bride.nickname}</h3>
                {bride.parents && <p className="text-xs text-gray-500 mt-1">{bride.parents}</p>}
              </div>
            </section>

            {/* Events */}
            {invitationData.events && invitationData.events.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-center font-serif text-lg text-[#3f3123]">Rangkaian Acara</h3>
                {invitationData.events.map((evt, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-100 shadow-sm bg-white text-center">
                    <h4 className="font-semibold text-sm text-[#9c7247]">{evt.title}</h4>
                    {evt.date && <p className="text-xs text-gray-600 mt-1">{evt.date}</p>}
                    {evt.time && <p className="text-xs text-gray-500">{evt.time}</p>}
                    {evt.location && <p className="text-xs font-medium text-gray-700 mt-2">{evt.location}</p>}
                    {evt.address && <p className="text-[11px] text-gray-400 mt-0.5">{evt.address}</p>}
                    {evt.url && (
                      <a
                        href={evt.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-3 px-3 py-1 text-[11px] bg-[#fbf7f2] text-[#9c7247] border border-[#ede3d8] rounded-full hover:bg-[#ede3d8]"
                      >
                        Lihat Google Maps
                      </a>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Gallery */}
            {invitationData.gallery && invitationData.gallery.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-center font-serif text-lg text-[#3f3123]">Momen Bahagia</h3>
                <div className="grid grid-cols-2 gap-2">
                  {invitationData.gallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Galeri ${idx + 1}`}
                      className="w-full h-36 object-cover rounded-lg shadow-sm"
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Footer */}
            <footer className="text-center pb-8 text-xs text-gray-400">
              <p>Terima kasih atas doa dan restunya</p>
              <p className="mt-1 font-serif text-[#9c7247]">{groom.nickname} & {bride.nickname}</p>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}
