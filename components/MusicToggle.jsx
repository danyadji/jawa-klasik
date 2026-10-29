import { useState, useRef, useEffect } from 'react'
import vinylImg from '../assets/illustrations/vinyl-button-for-music-play.png'

const DEFAULT_WEDDING_MUSIC = 'https://assets.mixkit.co/music/preview/mixkit-wedding-waltz-238.mp3'

function normalizeAudioUrl(url) {
  if (!url) return ''
  const trimmed = url.trim()

  // Google Drive share link auto-convert: /file/d/ID/view -> direct stream
  const gdriveMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (gdriveMatch && gdriveMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${gdriveMatch[1]}`
  }

  // Dropbox share link auto-convert: dl=0 -> raw=1
  if (trimmed.includes('dropbox.com')) {
    return trimmed.replace('dl=0', 'raw=1').replace('?dl=1', '?raw=1')
  }

  // Spotify / YouTube web page links are not direct MP3 files
  if (trimmed.includes('spotify.com') || trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
    return ''
  }

  return trimmed
}

export default function MusicToggle({ musicUrl, isPlaying, onToggle }) {
  const audioRef = useRef(null)

  const [activeSrc, setActiveSrc] = useState(() => {
    return normalizeAudioUrl(musicUrl) || DEFAULT_WEDDING_MUSIC
  })

  useEffect(() => {
    const normalized = normalizeAudioUrl(musicUrl)
    setActiveSrc(normalized || DEFAULT_WEDDING_MUSIC)
  }, [musicUrl])

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, activeSrc])

  function handleAudioError() {
    if (activeSrc !== DEFAULT_WEDDING_MUSIC) {
      setActiveSrc(DEFAULT_WEDDING_MUSIC)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={activeSrc}
        loop
        preload="auto"
        onError={handleAudioError}
      />

      <div className="fixed bottom-[74px] inset-x-0 mx-auto max-w-[480px] px-4 pointer-events-none z-50 flex justify-start">
        <button
          type="button"
          onClick={onToggle}
          aria-label={isPlaying ? 'Matikan musik' : 'Putar musik'}
          className="pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 drop-shadow-[0_4px_14px_rgba(0,0,0,0.45)] cursor-pointer bg-black/20 backdrop-blur-xs"
        >
          <img
            src={vinylImg}
            alt="Vinyl Music Player"
            className={`w-full h-full object-contain ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : 'opacity-85'
            }`}
          />
        </button>
      </div>
    </>
  )
}
