import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import emblemOnDark from '../assets/brand/manifold-embossed-emblem-2000.webp';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDuration?: number; // duration in ms, default ~2400
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDuration = 2400,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [currentDiscipline, setCurrentDiscipline] = useState<string>('01 // FILM');
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    const disciplines = [
      '01 // FILM PRODUCTION',
      '02 // CREATIVE DIRECTION',
      '03 // SYNTHETIC AI & HYBRID',
      '04 // CRAFT & EDITORIAL',
      '05 // CONTENT & STILLS',
    ];

    let discIndex = 0;
    const disciplineInterval = setInterval(() => {
      discIndex = (discIndex + 1) % disciplines.length;
      setCurrentDiscipline(disciplines[discIndex]);
    }, 420);

    const ctx = gsap.context(() => {
      const counterObj = { val: 0 };
      const masterTl = gsap.timeline({
        onComplete: () => {
          clearInterval(disciplineInterval);
          setIsFinished(true);
          if (onComplete) {
            onComplete();
          }
        },
      });

      // 1. Initial State Setup
      gsap.set('.loader-slat', { yPercent: 0 });
      gsap.set('.loader-facet', { transformOrigin: 'center center', scale: 0.8, opacity: 0 });
      gsap.set('.loader-content', { opacity: 0, y: 15 });

      // 2. Entrance Animation
      masterTl
        .to('.loader-content', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
        })
        .to(
          '.loader-facet',
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            stagger: 0.09,
            ease: 'back.out(1.4)',
          },
          '-=0.4'
        );

      // 3. Counter & Progress Bar Tween
      masterTl.to(
        counterObj,
        {
          val: 100,
          duration: (minDuration - 600) / 1000,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterRef.current) {
              const currentVal = Math.floor(counterObj.val);
              counterRef.current.textContent = currentVal < 10 ? `0${currentVal}` : `${currentVal}`;
            }
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${counterObj.val}%`;
            }
          },
        },
        '-=0.4'
      );

      // 4. Subtle scale pulse on the logo when hitting 100%
      masterTl.to(
        '.loader-emblem-wrap',
        {
          scale: 1.05,
          duration: 0.25,
          ease: 'power1.out',
        },
        '+=0.05'
      );

      // 5. Fade out center content before curtain wipe
      masterTl.to(
        '.loader-content-wrap',
        {
          opacity: 0,
          y: -20,
          duration: 0.45,
          ease: 'power3.in',
        },
        '+=0.05'
      );

      // 6. Signature Awwwards Slats / Curtain Upward Wipe
      masterTl.to(
        '.loader-slat',
        {
          yPercent: -100,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power4.inOut',
        },
        '-=0.15'
      );

      // 7. Hide whole container
      masterTl.to(containerRef.current, {
        display: 'none',
        duration: 0.01,
      });
    }, containerRef);

    return () => {
      clearInterval(disciplineInterval);
      ctx.revert();
    };
  }, [minDuration, onComplete]);

  // Fast forward handler if user clicks skip or ESC
  const handleSkip = () => {
    if (isFinished || !containerRef.current) return;
    gsap.killTweensOf(containerRef.current);
    gsap.to('.loader-content-wrap', {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
    });
    gsap.to('.loader-slat', {
      yPercent: -100,
      duration: 0.5,
      stagger: 0.04,
      ease: 'power4.inOut',
      onComplete: () => {
        setIsFinished(true);
        if (onComplete) onComplete();
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
      },
    });
  };

  // Allow ESC to fast-forward, matching the Skip control label
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden select-none"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* 5 Vertical Architectural Curtain Slats (The Awwwards Shutter Wipe) */}
      <div className="absolute inset-0 grid grid-cols-5 pointer-events-none z-0">
        <div className="loader-slat h-full bg-[#0D0D0D] border-r border-[#1FCD6E]/10" />
        <div className="loader-slat h-full bg-[#0D0D0D] border-r border-[#1FCD6E]/10" />
        <div className="loader-slat h-full bg-[#0D0D0D] border-r border-[#1FCD6E]/10" />
        <div className="loader-slat h-full bg-[#0D0D0D] border-r border-[#1FCD6E]/10" />
        <div className="loader-slat h-full bg-[#0D0D0D]" />
      </div>

      {/* Camera Viewfinder Optics / Corner Crosshairs */}
      <div className="loader-content-wrap absolute inset-0 pointer-events-none z-10 p-6 sm:p-10 flex flex-col justify-between">
        {/* Top Viewfinder Crossbars */}
        <div className="flex items-center justify-between font-mono text-[11px] text-neutral-500 tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1FCD6E] animate-pulse" />
            <span className="text-white font-bold">MANIFOLD</span>
            <span className="text-neutral-600">/</span>
            <span>CINEMATIC MOTION</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-neutral-400">
            <span>2.39:1 ANAMORPHIC</span>
            <span className="text-neutral-700">|</span>
            <span>24.000 FPS</span>
            <span className="text-neutral-700">|</span>
            <span className="text-[#1FCD6E] font-medium">SHUTTER 180°</span>
          </div>

          <div>
            <button
              onClick={handleSkip}
              className="text-neutral-400 hover:text-[#1FCD6E] transition-colors uppercase tracking-widest text-[10px] px-2.5 py-1 border border-neutral-800 hover:border-[#1FCD6E]/40 rounded cursor-pointer pointer-events-auto"
            >
              Skip [ESC] &rarr;
            </button>
          </div>
        </div>

        {/* Viewfinder Corner Framing Lines */}
        <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-[#1FCD6E]/30 pointer-events-none" />
        <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-[#1FCD6E]/30 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-[#1FCD6E]/30 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-[#1FCD6E]/30 pointer-events-none" />
      </div>

      {/* Main Center Content (Logo, Wordmark, Dynamic Disciplines) */}
      <div className="loader-content-wrap relative z-20 flex-1 flex flex-col items-center justify-center px-6">
        <div className="loader-emblem-wrap flex flex-col items-center text-center space-y-6">
          {/* Manifold brand emblem */}
          <div className="loader-facet relative">
            <img
              src={emblemOnDark}
              alt="Manifold emblem"
              width={72}
              height={72}
              className="w-16 h-16 sm:w-[72px] sm:h-[72px] object-contain drop-shadow-[0_0_25px_rgba(31,205,110,0.35)]"
            />
          </div>

          {/* Typography: Wordmark & Tagline */}
          <div className="space-y-2">
            <h1 className="loader-content font-['Syne'] font-extrabold text-3xl sm:text-4xl text-white tracking-[-0.04em] lowercase">
              manifold
            </h1>
            <p className="loader-content font-mono text-[11px] sm:text-xs text-neutral-400 tracking-[0.25em] uppercase">
              Imagination, in motion.
            </p>
          </div>

          {/* Live Discipline Stepper */}
          <div className="loader-content pt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FCD6E]" />
            <span className="font-mono text-xs text-[#1FCD6E] tracking-widest font-semibold transition-all">
              {currentDiscipline}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Metrics, Editorial Details & Cinema Loading Meter */}
      <div className="loader-content-wrap relative z-20 p-6 sm:p-10 max-w-[1440px] w-full mx-auto">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
            <span className="text-white font-bold">CALIBRATING FRAME</span>
            <span className="text-neutral-700">·</span>
            <span>SYSTEM READY</span>
          </div>

          {/* Huge Monospace Counter */}
          <div className="flex items-baseline gap-1">
            <span
              ref={counterRef}
              className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white tabular-nums leading-none"
            >
              00
            </span>
            <span className="text-[#1FCD6E] font-bold text-lg sm:text-2xl font-sans">
              %
            </span>
          </div>
        </div>

        {/* 1px Precision Progress Bar with Emerald Glow */}
        <div className="relative w-full h-[2px] bg-neutral-800 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute left-0 top-0 bottom-0 bg-[#1FCD6E] shadow-[0_0_12px_#1FCD6E] transition-all duration-75"
            style={{ width: '0%' }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          <span>&copy; 2026 MANIFOLD MOTION PICTURES</span>
          <span className="hidden sm:inline">ALL RIGHTS RESERVED // FRAMEGEN SYSTEM</span>
          <span>EST. 2026</span>
        </div>
      </div>
    </div>
  );
};
