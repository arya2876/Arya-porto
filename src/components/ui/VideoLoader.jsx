import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * VideoLoader Component
 * Fullscreen minimalist line-reveal video loading screen for Arya Winata's portfolio.
 */
const VideoLoader = ({ onFinish }) => {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const finishTriggeredRef = useRef(false);

  const handleFinish = useCallback(() => {
    if (finishTriggeredRef.current) return;
    finishTriggeredRef.current = true;
    if (onFinish) onFinish();
  }, [onFinish]);

  // Handle video playback events
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress(Math.min((current / total) * 100, 100));
    }
  };

  const handleVideoEnded = () => {
    // Hold final logo frame briefly so the user can appreciate the revealed AW logo
    setTimeout(() => {
      handleFinish();
    }, 400);
  };

  // Keyboard shortcut (Escape or Space to skip) & fallback timer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Fallback timer: ensure loader never blocks user indefinitely (max 8.5s)
    const fallbackTimer = setTimeout(() => {
      handleFinish();
    }, 8500);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(fallbackTimer);
    };
  }, [handleFinish]);

  // Attempt autoplay with promise catch for stubborn mobile browsers
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsReady(true);
        })
        .catch(() => {
          // Autoplay was prevented or stalled, still mark ready
          setIsReady(true);
        });
    }
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#000000] select-none overflow-hidden cursor-default"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Ambient background glow behind the logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-gradient-to-tr from-blue-600/15 via-cyan-400/10 to-purple-600/10 blur-[100px] animate-pulse" />
      </div>

      {/* Main Video Presentation */}
      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center justify-center">
        <video
          ref={videoRef}
          className={`w-full max-h-[65vh] object-contain transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'
            }`}
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          onError={handleFinish}
        >
          <source src="/images/logo-reveal-loader.mp4" type="video/mp4" />
          <source
            src="/images/Minimalist_logo_line_reveal_anim%E2%80%A6_20260917225901.mp4"
            type="video/mp4"
          />
        </video>

        {/* Minimalist Subtitle & Brand Tagline */}
        <motion.div
          className="mt-6 flex flex-col items-center text-center space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/70 font-mono font-medium">
            ARYA WINATA
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/30 font-light">
            Loading Experience
          </span>
        </motion.div>

        {/* Minimal Progress Bar */}
        <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full mt-5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-white shadow-[0_0_8px_rgba(56,189,248,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </div>

      {/* Skip Button in Bottom-Right Corner */}
      <motion.button
        type="button"
        onClick={handleFinish}
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-widest text-white/40 hover:text-white/90 bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-200 group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <span>SKIP</span>
        <span className="text-white/20 group-hover:text-white/60 text-[9px] border border-white/20 px-1 py-0.2 rounded">
          ESC
        </span>
      </motion.button>
    </motion.div>
  );
};

export default VideoLoader;
