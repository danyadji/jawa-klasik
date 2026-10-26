import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DEFAULT_FALLBACK_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

function normalizeCloudVideoUrl(url) {
  if (!url) return { isDrive: false, isYoutube: false, url: '' }
  const trimmed = url.trim()

  const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/)
  if (ytMatch && ytMatch[1]) {
    return { isDrive: false, isYoutube: true, ytId: ytMatch[1], url: trimmed }
  }

  const gdriveMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || (trimmed.includes('drive.google.com') && trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/))
  if (gdriveMatch && gdriveMatch[1]) {
    return { isDrive: true, isYoutube: false, driveId: gdriveMatch[1] }
  }

  if (trimmed.includes('dropbox.com')) {
    return { isDrive: false, isYoutube: false, url: trimmed.replace('dl=0', 'raw=1').replace('?dl=1', '?raw=1') }
  }

  return { isDrive: false, isYoutube: false, url: trimmed }
}

export default function VideoSection({ videoUrl, onVideoPlay }) {
  const videoRef = useRef(null)
  const hideControlsTimer = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [videoState, setVideoState] = useState(() => normalizeCloudVideoUrl(videoUrl))

  useEffect(() => {
    setVideoState(normalizeCloudVideoUrl(videoUrl))
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setShowControls(true)
  }, [videoUrl])

  const startAutoHideTimer = useCallback(() => {
    setShowControls(true)
    clearTimeout(hideControlsTimer.current)
    hideControlsTimer.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }, [])

  function handleVideoTap() {
    if (!videoRef.current) return

    if (isPlaying || !videoRef.current.paused) {
      videoRef.current.pause()
      setIsPlaying(false)
      setShowControls(true)
      clearTimeout(hideControlsTimer.current)
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          onVideoPlay?.()
          startAutoHideTimer()
        })
        .catch(() => {})
    }
  }

  function handleTimeUpdate() {
    if (!videoRef.current) return
    setCurrentTime(videoRef.current.currentTime)
  }

  function handleLoadedMetadata() {
    if (!videoRef.current) return
    setDuration(videoRef.current.duration)
  }

  function handleSeek(e) {
    e.stopPropagation()
    const nextTime = Number(e.target.value)
    if (!videoRef.current) return
    videoRef.current.currentTime = nextTime
    setCurrentTime(nextTime)
    if (isPlaying) {
      startAutoHideTimer()
    }
  }

  function handleVideoError() {
    setVideoState({ isDrive: false, url: DEFAULT_FALLBACK_VIDEO })
  }

  useEffect(() => {
    return () => clearTimeout(hideControlsTimer.current)
  }, [])

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0
  const isDrive = videoState.isDrive
  const isYoutube = videoState.isYoutube
  const driveEmbedUrl = isDrive
    ? `https://drive.google.com/file/d/${videoState.driveId}/preview`
    : null
  const youtubeEmbedUrl = isYoutube
    ? `https://www.youtube-nocookie.com/embed/${videoState.ytId}?rel=0&modestbranding=1`
    : null
  const videoSrc = (!isDrive && !isYoutube) ? (videoState.url || DEFAULT_FALLBACK_VIDEO) : null

  return (
    <section className="relative w-full h-[100dvh] min-h-[100dvh] flex flex-col items-center justify-center z-20 overflow-hidden bg-black select-none">
      <div
        className="relative w-full h-full overflow-hidden cursor-pointer"
        onClick={(!isDrive && !isYoutube) ? handleVideoTap : undefined}
      >
        {isYoutube ? (
          <iframe
            src={youtubeEmbedUrl}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video undangan YouTube"
          />
        ) : isDrive ? (
          <iframe
            src={driveEmbedUrl}
            className="w-full h-full border-0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Video undangan"
          />
        ) : (
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            preload="metadata"
            onError={handleVideoError}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => {
              setIsPlaying(false)
              setShowControls(true)
              clearTimeout(hideControlsTimer.current)
            }}
            className="w-full h-full object-cover"
          />
        )}

        {!isDrive && !isYoutube && (
          <>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/55 via-transparent to-black/20" />

            <AnimatePresence>
              {(showControls || !isPlaying) && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleVideoTap()
                  }}
                  aria-label={isPlaying ? 'Jeda video' : 'Putar video'}
                  className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-black/35 backdrop-blur-sm border-2 border-white/70 text-white flex items-center justify-center shadow-[0_6px_24px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-transform cursor-pointer z-10"
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-10 h-10 fill-current translate-x-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </motion.button>
              )}
            </AnimatePresence>

            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute bottom-0 inset-x-0 px-4 pt-6 pb-4 z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 ${
                showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-white/90 tracking-wider">
                  {formatTime(currentTime)}
                </span>
                <div className="relative flex-1 flex items-center h-5">
                  <div className="absolute inset-x-0 h-1 rounded-full bg-white/30 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#C89736] to-[#E3BD70] transition-all duration-75"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    aria-label="Timeline video"
                    className="relative z-10 w-full h-5 opacity-0 cursor-pointer"
                  />
                </div>
                <span className="text-[11px] font-mono text-white/70 tracking-wider">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
