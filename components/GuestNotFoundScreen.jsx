import React from 'react';

export default function GuestNotFoundScreen({ onOpenAsGeneral }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#faf8f5] px-6 py-12 text-[#4d3a30] font-sans antialiased">
      <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 shadow-[0_10px_35px_rgba(77,58,48,0.08)] border border-[#ede5dd] flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-250">
        
        {/* Soft Badge / Illustration Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-[#f6eee7] flex items-center justify-center text-[#6b492b]">
            <svg
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            404
          </span>
        </div>

        {/* Title */}
        <h1 className="text-xl min-[400px]:text-2xl font-bold text-[#4d3a30] tracking-tight leading-snug">
          Nama Anda Tidak Terdaftar
        </h1>

        {/* Description */}
        <p className="mt-3 text-xs min-[400px]:text-sm text-[#7a6456] leading-relaxed max-w-[320px]">
          Mohon maaf, nama Anda belum tercatat di dalam daftar undangan resmi kami. Terima kasih atas doa restu dan perhatian yang tulus.
        </p>

        {/* Action Button */}
        <div className="mt-8 w-full flex flex-col gap-3">
          <button
            type="button"
            onClick={onOpenAsGeneral}
            className="w-full py-3.5 px-6 rounded-xl bg-[#6b492b] hover:bg-[#543820] active:scale-[0.98] text-white text-xs min-[400px]:text-sm font-semibold tracking-wide transition-all shadow-md cursor-pointer"
          >
            Buka sebagai Tamu Umum
          </button>
        </div>

        <p className="mt-6 text-[11px] text-[#a59182]">
          Jika ini sebuah kekeliruan, silakan hubungi langsung kedua mempelai.
        </p>
      </div>
    </div>
  );
}
