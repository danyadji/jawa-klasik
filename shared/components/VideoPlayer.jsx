import React, { useState } from 'react';

/**
 * Helper untuk mengambil YouTube Video ID dari berbagai format URL
 */
export function getYoutubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

/**
 * Universal Video & YouTube Player Component
 */
export default function VideoPlayer({ videoUrl, className = '', aspectRatio = 'aspect-video' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const youtubeId = getYoutubeId(videoUrl);

  if (!videoUrl && !youtubeId) return null;

  return (
    <div className={`relative w-full ${aspectRatio} bg-black rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {youtubeId ? (
        isPlaying ? (
          <iframe
            className="w-full h-full border-0"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title="YouTube Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div
            onClick={() => setIsPlaying(true)}
            className="relative w-full h-full group cursor-pointer"
          >
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
              alt="Video Thumbnail"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors flex items-center justify-center">
              <div className="w-[68px] h-[48px] bg-[#FF0000] rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#cc0000]">
                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="text-white text-xs font-semibold drop-shadow-md bg-black/50 px-2.5 py-1 rounded-md">
                Tonton di YouTube
              </span>
            </div>
          </div>
        )
      ) : (
        <video
          src={videoUrl}
          controls
          preload="metadata"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
