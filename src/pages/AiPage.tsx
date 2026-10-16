import React, { useEffect, useRef } from 'react';
import { PageId, VisualStudy } from '../types';
import { AI_DATA } from '../data/content';
import { VisualStudyCard } from '../components/VisualStudyCard';
import { ProcessSection } from '../components/ProcessSection';
import { CtaBanner } from '../components/CtaBanner';
import { animateHeroEntrance, setupWhatWeDoAnimation, attachMagneticEffect } from '../utils/gsapAnimations';

interface AiPageProps {
  onNavigate: (page: PageId, service?: string) => void;
  onOpenLightbox: (study: VisualStudy) => void;
}

export const AiPage: React.FC<AiPageProps> = ({
  onNavigate,
  onOpenLightbox,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const whatWeDoRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const cleanupHero = animateHeroEntrance(heroRef.current);
    const cleanupWwd = setupWhatWeDoAnimation(whatWeDoRef.current);
    const cleanupBtn = attachMagneticEffect(btnRef.current);

    return () => {
      cleanupHero();
      cleanupWwd();
      cleanupBtn();
    };
  }, []);

  return (
    <div className="w-full bg-[#0D0D0D]">
      <section ref={heroRef} className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[72px]">
          <div className="max-w-4xl space-y-6 mb-12 lg:mb-16">
            <p className="gsap-hero-kicker font-mono text-xs sm:text-sm text-[#1FCD6E] tracking-widest uppercase">
              {AI_DATA.kicker}
            </p>

            <h1 className="gsap-hero-headline font-headline font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tight leading-[0.95] text-white">
              {AI_DATA.heroHeadline}
            </h1>

            <p className="gsap-hero-description text-lg sm:text-2xl text-neutral-300 font-sans leading-relaxed max-w-2xl pt-2">
              {AI_DATA.heroDescription}
            </p>

            <div className="gsap-hero-actions pt-4">
              <button
                ref={btnRef}
                onClick={() => onNavigate('contact', 'AI')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1FCD6E] hover:bg-[#1bb863] text-[#0D0D0D] font-headline font-bold text-xs capitalize tracking-wider rounded-md transition-shadow duration-200 cursor-pointer shadow-lg hover:shadow-xl"
              >
                <span>{AI_DATA.ctaButtonText}</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>

          <div className="gsap-hero-image relative w-full rounded-xl overflow-hidden border border-[#2B2B2B] bg-[#141414] group shadow-2xl">
            <div className="relative aspect-[16/9] w-full">
              <img
                src={AI_DATA.heroImage}
                alt="AI Production Studio Monolith Master"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />

              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 bg-[#0D0D0D]/85 backdrop-blur-sm px-3.5 py-1.5 rounded border border-[#2B2B2B]">
                <p className="font-mono text-[11px] sm:text-xs text-neutral-300 tracking-wider uppercase">
                  {AI_DATA.heroImageCaption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={whatWeDoRef} className="w-full bg-[#F2F1EB] text-[#0D0D0D] py-20 lg:py-28 transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[72px]">
          <div className="gsap-wwd-header space-y-3 mb-14">
            <p className="font-mono text-xs text-[#0D0D0D]/70 tracking-widest uppercase">
              {AI_DATA.whatWeDo.kicker}
            </p>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-6xl text-[#0D0D0D] tracking-tight">
              {AI_DATA.whatWeDo.headline}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-14 border-b border-[#0D0D0D]/10">
            {AI_DATA.whatWeDo.items.map((item) => (
              <div
                key={item.title}
                onClick={() => onNavigate('contact', 'AI')}
                className="gsap-wwd-item group flex flex-col justify-start p-0 bg-transparent cursor-pointer border-t border-neutral-300 pt-6"
              >
                <div>
                  <div className="flex items-center justify-between pb-3">
                    <h3 className="font-headline font-bold text-2xl lg:text-3xl text-[#0D0D0D] group-hover:text-[#1FCD6E] transition-colors">
                      {item.title}
                    </h3>
                    <span className="font-mono text-xl text-[#0D0D0D] group-hover:text-[#1FCD6E] group-hover:translate-x-1 transition-all">
                      &rarr;
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-700 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <p className="font-mono text-xs sm:text-sm text-neutral-600 tracking-wider">
              {AI_DATA.whatWeDo.subList}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#0D0D0D] text-white py-20 lg:py-28 border-t border-[#2B2B2B]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[72px]">
          <div className="space-y-3 mb-12">
            <p className="font-mono text-xs text-[#1FCD6E] tracking-widest uppercase">
              {AI_DATA.visualDirection.kicker}
            </p>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-6xl tracking-tight text-white">
              {AI_DATA.visualDirection.headline}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-2xl pt-1">
              {AI_DATA.visualDirection.note}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {AI_DATA.visualDirection.cards.map((card) => (
              <VisualStudyCard
                key={card.id}
                study={card}
                onOpenLightbox={onOpenLightbox}
              />
            ))}
          </div>
        </div>
      </section>

      <ProcessSection headline={AI_DATA.processHeadline} />

      <CtaBanner
        kicker={AI_DATA.cta.kicker}
        headline={AI_DATA.cta.headline}
        description={AI_DATA.cta.description}
        buttonText={AI_DATA.cta.buttonText}
        onAction={() => onNavigate('contact', 'AI')}
      />
    </div>
  );
};
