import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const StudioCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse/trackpad, not touch)
    if (!window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    // Use GSAP quickTo for 120fps fluid cursor tracking
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3' });
    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2' });
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2' });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);

      // Check hovered element for custom cursor triggers
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const studyCard = target.closest('[data-cursor="study"]');
      const reelTrigger = target.closest('[data-cursor="play"]');
      const interactiveBtn = target.closest('button, a, [role="button"]');

      if (studyCard) {
        setCursorText('VIEW');
        setIsHovered(true);
        gsap.to(cursor, {
          scale: 1.8,
          backgroundColor: '#1FCD6E',
          borderColor: '#1FCD6E',
          duration: 0.2,
        });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
      } else if (reelTrigger) {
        setCursorText('PLAY');
        setIsHovered(true);
        gsap.to(cursor, {
          scale: 1.8,
          backgroundColor: '#1FCD6E',
          borderColor: '#1FCD6E',
          duration: 0.2,
        });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
      } else if (interactiveBtn) {
        setCursorText('');
        setIsHovered(true);
        gsap.to(cursor, {
          scale: 1.3,
          backgroundColor: 'transparent',
          borderColor: '#1FCD6E',
          duration: 0.2,
        });
        gsap.to(dot, { opacity: 0.7, scale: 0.6, duration: 0.2 });
      } else {
        setCursorText('');
        setIsHovered(false);
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.4)',
          duration: 0.2,
        });
        gsap.to(dot, { opacity: 1, scale: 1, duration: 0.2 });
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <>
      {/* Outer Follower Ring */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 flex items-center justify-center transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovered ? 'mix-blend-normal' : 'mix-blend-difference'}`}
        style={{
          width: 38,
          height: 38,
        }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] font-bold text-[#0D0D0D] tracking-wider uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center Precision Dot */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1FCD6E] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: 6,
          height: 6,
        }}
      />
    </>
  );
};
