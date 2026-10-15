import React, { useEffect, useState } from 'react';

interface BrandIntroProps {
  onComplete: () => void;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check if user already saw intro in current session
    if (sessionStorage.getItem('annashop_intro_seen')) {
      onComplete();
      return;
    }

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem('annashop_intro_seen', 'true');
      onComplete();
      return;
    }

    const duration = 1100; // ~1.1s snappy cinematic entrance
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setIsFadingOut(true);
          setTimeout(() => {
            sessionStorage.setItem('annashop_intro_seen', 'true');
            onComplete();
          }, 350);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      sessionStorage.setItem('annashop_intro_seen', 'true');
      onComplete();
    }, 150);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0D0C] text-[#F5F5F0] transition-opacity duration-400 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient glow */}
      <div className="absolute w-96 h-96 rounded-full bg-[#C8FF2F]/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Eyebrow */}
        <span className="text-[11px] font-mono tracking-[0.3em] text-[#7B807B] uppercase mb-4">
          PERFORMANCE FOOTWEAR · 2026
        </span>

        {/* Wordmark */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display mb-2 text-white">
          ANNASHOP<span className="text-[#C8FF2F]">®</span>
        </h1>

        {/* Tagline */}
        <p className="text-xs tracking-wider text-[#A1A8A1] uppercase mb-8 font-mono">
          THE FUTURE OF MOTION
        </p>

        {/* Cinematic Progress Line */}
        <div className="w-48 h-[2px] bg-[#252824] overflow-hidden rounded-full mb-6">
          <div
            className="h-full bg-[#C8FF2F] transition-all duration-75 ease-out shadow-[0_0_8px_#C8FF2F]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Quick skip */}
        <button
          onClick={handleSkip}
          className="text-[11px] font-mono tracking-widest text-[#7B807B] hover:text-[#C8FF2F] transition-colors focus:outline-none"
        >
          [ NHẤN ĐỂ VÀO NGAY ]
        </button>
      </div>
    </div>
  );
};
