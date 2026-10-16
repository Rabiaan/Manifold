import React, { useRef } from 'react';
import gsap from 'gsap';
import { VisualStudy } from '../types';
import { Maximize2 } from 'lucide-react';

interface VisualStudyCardProps {
  study: VisualStudy;
  onOpenLightbox: (study: VisualStudy) => void;
}

export const VisualStudyCard: React.FC<VisualStudyCardProps> = ({
  study,
  onOpenLightbox,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !window.matchMedia('(pointer: fine)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, {
      rotationY: x * 6,
      rotationX: -y * 6,
      transformPerspective: 1000,
      ease: 'power1.out',
      duration: 0.35,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: 'power2.out',
      duration: 0.5,
    });
  };

  return (
    <div
      ref={cardRef}
      data-cursor="study"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenLightbox(study)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenLightbox(study);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View ${study.title}`}
      className="group flex flex-col text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FCD6E] rounded-lg transition-transform duration-300 will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md bg-[#171717] border border-[#2B2B2B]">
        <img
          src={study.image}
          alt={study.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D0D0D]/80 backdrop-blur-sm border border-[#1FCD6E]/40 text-xs font-mono text-white shadow-lg">
            <Maximize2 size={13} className="text-[#1FCD6E]" />
            <span>Expand study</span>
          </div>
        </div>

        <div className="absolute top-3 left-3 bg-[#0D0D0D]/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono text-neutral-300 border border-[#2B2B2B]">
          {study.category}
        </div>
      </div>

      <div className="pt-3.5 space-y-1">
        <h3 className="font-headline font-bold text-base sm:text-lg text-white group-hover:text-[#1FCD6E] transition-colors">
          {study.title}
        </h3>
        <p className="font-mono text-[11px] text-neutral-500 tracking-wider uppercase">
          {study.subtitle}
        </p>
      </div>
    </div>
  );
};
