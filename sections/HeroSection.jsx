import { motion } from 'framer-motion';

export default function HeroSection({ brideName = "Fifi", groomName = "Danu", guestName = "Tamu Undangan", eventDate = "24.08.2024" }) {
  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: [0.33, 1, 0.68, 1] }
  };

  const floatAnimation = {
    animate: { 
      y: [0, -15, 0],
      rotate: [0, 5, 0]
    },
    transition: { 
      duration: 6, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-jawa-parchment">
      {/* Background Image Canvas */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Javanese landscape" 
          className="w-full h-full object-cover opacity-90 scale-105" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7ZHcTX5ay5dtZl127JHsF-GPA62vBNi4ySIsQmUWI4SwoaY8f39T8QuhhLHZquWmBhz7TcGjZE_s_NfUwjjUp5_GAUN6bHyZsIuAU9Fn2yNRVoNrJsOJfIh2yeXCuJxBDhf6jNGuIjz5u9ELYuimJUn5RfbtZ6lXo6AGvcfvyz3qHF8eMW0LAlZbgnSas8TngPsx1eKZTe3tz5C1oYhfIUZ3JJDVr5XEnV1N0EcxDnfJL-ly50LXPY1_2tMS1cVxYNWcJ_TqC4hQ"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(252,249,239,0.2)_100%)]"></div>
      </div>

      {/* Floating Botanical Elements */}
      <motion.div 
        {...floatAnimation}
        className="absolute top-10 left-10 z-10 w-12 h-12 opacity-80 pointer-events-none"
      >
        <span className="material-symbols-outlined text-jawa-clay text-4xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
          local_florist
        </span>
      </motion.div>

      <motion.div 
        animate={{ 
          y: [0, -10, 0],
          x: [0, 5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/4 right-0 z-10 w-10 h-10 opacity-70 pointer-events-none rotate-45"
      >
        <span className="material-symbols-outlined text-jawa-clay-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          flutter_dash
        </span>
      </motion.div>

      <motion.div 
        animate={{ 
          y: [0, 10, 0],
          x: [0, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-1/3 left-12 z-10 w-10 h-10 opacity-60 pointer-events-none -rotate-12"
      >
        <span className="material-symbols-outlined text-jawa-clay-container text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          flutter_dash
        </span>
      </motion.div>

      {/* Main Name Section */}
      <main className="relative z-20 flex flex-col items-center px-6 text-center mt-auto mb-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative group"
        >
          {/* Ornate Gold Frame Background */}
          <div className="absolute -inset-4 bg-jawa-parchment-low opacity-90 rounded-xl blur-sm"></div>
          <div className="relative bg-jawa-parchment-container p-10 md:p-16 rounded-xl shadow-xl border border-jawa-parchment-variant/30 overflow-hidden">
            {/* Ornamental Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-5 pointer-events-none" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDStp8HsTjprS5nh44fT8ceHHitY4pSQDKE8LPXtV2C6l2gSbo7k2Mh3jJZMD1P3UiY2L6ZxXCYhR-cHRvThoNPIeuRgcG4jfVjCtf-ppfrVM9LOTCzWYPKrK0uNgOzno94Q2NHq2EMQwY9Qw_q15dsc04dq8rbVP0xym9RtGHX7okAdJ9TeClhuPYQP9GtJEi66DJedDwtpb7JKjQ-WgcC67Ceuz1cNecZsN6Di2oFx18FZ9Qevcd7PzmmpiTbmZVOgebJ48u91KM')" }}
            ></div>
            
            <motion.span 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="block font-headline text-jawa-charcoal-variant uppercase tracking-widest text-xs mb-4"
            >
              The Wedding of
            </motion.span>
            
            <motion.h2 
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="font-script text-jawa-clay text-6xl md:text-8xl leading-none py-2 drop-shadow-sm"
            >
              {brideName} & {groomName}
            </motion.h2>
            
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.6 }}
              className="mt-6 flex items-center justify-center space-x-4"
            >
              <div className="h-px w-8 bg-jawa-parchment-variant"></div>
              <span className="font-headline italic text-jawa-charcoal text-lg">{eventDate}</span>
              <div className="h-px w-8 bg-jawa-parchment-variant"></div>
            </motion.div>
          </div>

          {/* Jasmine decoration overlapping frame */}
          <motion.div 
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-0 z-30"
          >
            <span className="material-symbols-outlined text-jawa-clay text-5xl drop-shadow-md">
              local_florist
            </span>
          </motion.div>
        </motion.div>
      </main>

      {/* Recipient & Action Section */}
      <section className="relative z-20 w-full px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full max-w-sm p-6 rounded-2xl flex flex-col items-center text-center mb-8 shadow-2xl bg-white/15 backdrop-blur-xl border border-white/20"
        >
          <p className="font-noto text-jawa-charcoal-variant text-sm italic mb-2">Kepada Yth Bapak/Ibu/Saudara/i</p>
          <h3 className="font-headline text-jawa-charcoal text-xl font-bold tracking-tight mb-6">{guestName}</h3>
          <button className="bg-jawa-clay text-white px-10 py-4 rounded-lg font-headline tracking-widest text-sm hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-jawa-clay/20 uppercase">
            OPEN INVITATION
          </button>
        </motion.div>

        {/* Decorative Butterflies near button */}
        <motion.div 
          animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-2 right-0 opacity-40"
        >
          <span className="material-symbols-outlined text-jawa-clay text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            flutter_dash
          </span>
        </motion.div>
      </section>

      {/* Bottom Watercolor Scrim */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-jawa-parchment via-jawa-parchment/40 to-transparent pointer-events-none z-10"></div>
    </section>
  );
}
