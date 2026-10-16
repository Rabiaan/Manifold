import React, { useEffect, useRef } from 'react';
import { PageId } from '../types';
import { CRAFT_DATA } from '../data/content';
import { EditDesignStudy } from '../components/EditDesignStudy';
import { AspectRatioViewer } from '../components/AspectRatioViewer';
import { ProcessSection } from '../components/ProcessSection';
import { CtaBanner } from '../components/CtaBanner';
import { animateHeroEntrance, setupWhatWeDoAnimation, attachMagneticEffect } from '../utils/gsapAnimations';

interface CraftPageProps {
  onNavigate: (page: PageId, service?: string) => void;
}

export const CraftPage: React.FC<CraftPageProps> = ({ onNavigate }) => {
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
              {CRAFT_DATA.kicker}
            </p>

            <h1 className="gsap-hero-headline font-headline font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tight leading-[0.95] text-white">
              {CRAFT_DATA.heroHeadline}
            </h1>

            <p className="gsap-hero-description text-lg sm:text-2xl text-neutral-300 font-sans leading-relaxed max-w-2xl pt-2">
              {CRAFT_DATA.heroDescription}
            </p>

            <div className="gsap-hero-actions pt-4">
              <button
                ref={btnRef}
                onClick={() => onNavigate('contact', 'Craft')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1FCD6E] hover:bg-[#1bb863] text-[#0D0D0D] font-headline font-bold text-xs capitalize tracking-wider rounded-md transition-shadow duration-200 cursor-pointer shadow-lg hover:shadow-xl"
              >
                <span>{CRAFT_DATA.ctaButtonText}</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>

          <div className="gsap-hero-image w-full">
            <EditDesignStudy />
          </div>
        </div>
      </section>

      <section ref={whatWeDoRef} className="w-full bg-[#F2F1EB] text-[#0D0D0D] py-20 lg:py-28 transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[72px]">
          <div className="gsap-wwd-header space-y-3 mb-14">
            <p className="font-mono text-xs text-[#0D0D0D]/70 tracking-widest uppercase">
              {CRAFT_DATA.whatWeDo.kicker}
            </p>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-6xl text-[#0D0D0D] tracking-tight">
              {CRAFT_DATA.whatWeDo.headline}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-14 border-b border-[#0D0D0D]/10">
            {CRAFT_DATA.whatWeDo.items.map((item) => (
              <div
                key={item.title}
                onClick={() => onNavigate('contact', 'Craft')}
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
              {CRAFT_DATA.whatWeDo.subList}
            </p>
          </div>
        </div>
      </section>

      <AspectRatioViewer />

      <ProcessSection headline={CRAFT_DATA.processHeadline} />

      <CtaBanner
        kicker={CRAFT_DATA.cta.kicker}
        headline={CRAFT_DATA.cta.headline}
        description={CRAFT_DATA.cta.description}
        buttonText={CRAFT_DATA.cta.buttonText}
        onAction={() => onNavigate('contact', 'Craft')}
      />
    </div>
  );
};
