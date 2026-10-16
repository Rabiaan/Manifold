import React, { useState, useEffect, useRef } from 'react';
import { PageId, VisualStudy } from '../types';
import { HOME_DATA, ALL_VISUAL_STUDIES } from '../data/content';
import { VisualStudyCard } from '../components/VisualStudyCard';
import { ProcessSection } from '../components/ProcessSection';
import { CtaBanner } from '../components/CtaBanner';
import { Play } from 'lucide-react';
import { animateHeroEntrance, setupWhatWeDoAnimation, attachMagneticEffect } from '../utils/gsapAnimations';

interface HomePageProps {
  onNavigate: (page: PageId, service?: string) => void;
  onOpenLightbox: (study: VisualStudy) => void;
  onOpenShowreel: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenLightbox,
  onOpenShowreel,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('Featured');
  const heroRef = useRef<HTMLElement>(null);
  const whatWeDoRef = useRef<HTMLElement>(null);
  const startBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const cleanupHero = animateHeroEntrance(heroRef.current);
    const cleanupWwd = setupWhatWeDoAnimation(whatWeDoRef.current);
    const cleanupBtn = attachMagneticEffect(startBtnRef.current);

    return () => {
      cleanupHero();
      cleanupWwd();
      cleanupBtn();
    };
  }, []);

  const filteredStudies =
    activeFilter === 'Featured'
      ? HOME_DATA.visualDirection.cards
      : activeFilter === 'All'
      ? ALL_VISUAL_STUDIES
      : ALL_VISUAL_STUDIES.filter((s) => s.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="w-full bg-[#0D0D0D]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[72px]">
          <div className="max-w-4xl space-y-6 mb-12 lg:mb-16">
            <p className="gsap-hero-kicker font-mono text-xs sm:text-sm text-[#1FCD6E] tracking-widest uppercase">
              {HOME_DATA.kicker}
            </p>

            <h1 className="gsap-hero-headline font-headline font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tight leading-[0.95] text-white">
              {HOME_DATA.heroHeadline}
            </h1>

            <p className="gsap-hero-description text-lg sm:text-2xl text-neutral-300 font-sans leading-relaxed max-w-2xl pt-2">
              {HOME_DATA.heroDescription}
            </p>

            <div className="gsap-hero-actions flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                ref={startBtnRef}
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1FCD6E] hover:bg-[#1bb863] text-[#0D0D0D] font-headline font-bold text-xs capitalize tracking-wider rounded-md transition-shadow duration-200 cursor-pointer shadow-lg hover:shadow-xl"
              >
                <span>Start a project</span>
                <span aria-hidden="true">&rarr;</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('what-we-do');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-neutral-700 hover:border-neutral-400 text-white font-headline font-semibold text-xs capitalize tracking-wider rounded-md transition-colors cursor-pointer"
              >
                <span>Explore our services</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>

          {/* Hero Master Image Frame */}
          <div className="gsap-hero-image relative w-full rounded-xl overflow-hidden border border-[#2B2B2B] bg-[#141414] group shadow-2xl">
            <div className="relative aspect-[16/9] w-full">
              <img
                src={HOME_DATA.heroImage}
                alt="Cinema Lens Master"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <button
                  data-cursor="play"
                  onClick={onOpenShowreel}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0D0D0D]/80 border-2 border-[#1FCD6E] backdrop-blur-md text-white flex flex-col items-center justify-center gap-1 shadow-2xl hover:scale-110 transition-transform cursor-pointer"
                  aria-label="Play Manifold Showreel"
                >
                  <Play size={28} className="text-[#1FCD6E] ml-1" />
                  <span className="font-mono text-[9px] capitalize tracking-wider text-neutral-300">
                    Watch Reel
                  </span>
                </button>
              </div>

              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 bg-[#0D0D0D]/85 backdrop-blur-sm px-3.5 py-1.5 rounded border border-[#2B2B2B]">
                <p className="font-mono text-[11px] sm:text-xs text-neutral-300 tracking-wider uppercase">
                  {HOME_DATA.heroImageCaption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO Section (Light Paper Background #F2F1EB) */}
      <section ref={whatWeDoRef} id="what-we-do" className="w-full bg-[#F2F1EB] text-[#0D0D0D] py-20 lg:py-28 transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[72px]">
          <div className="gsap-wwd-header space-y-3 mb-14">
            <p className="font-mono text-xs text-[#0D0D0D]/70 tracking-widest uppercase">
              {HOME_DATA.whatWeDo.kicker}
            </p>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-6xl text-[#0D0D0D] tracking-tight">
              {HOME_DATA.whatWeDo.headline}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-14 border-b border-[#0D0D0D]/10">
            {HOME_DATA.whatWeDo.items.map((item) => (
              <div
                key={item.title}
                onClick={() => item.linkPage && onNavigate(item.linkPage, item.serviceId)}
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
              {HOME_DATA.whatWeDo.subList}
            </p>
          </div>
        </div>
      </section>

      {/* VISUAL DIRECTION / Selected Work Section */}
      <section id="work" className="w-full bg-[#0D0D0D] text-white py-20 lg:py-28 border-t border-[#2B2B2B]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[72px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <p className="font-mono text-xs text-[#1FCD6E] tracking-widest uppercase">
                {HOME_DATA.visualDirection.kicker}
              </p>
              <h2 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-6xl tracking-tight text-white">
                {HOME_DATA.visualDirection.headline}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-2xl pt-1">
                {HOME_DATA.visualDirection.note}
              </p>
            </div>

            {/* Interactive Functional Filter Controls (Page 2 & Section 1A) */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#171717] rounded-lg border border-[#2B2B2B] self-start md:self-end">
              {(['Featured', 'All', 'Film', 'Creative', 'AI', 'Content'] as const).map((category) => {
                const isActive = activeFilter === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-3 py-1.5 text-xs font-mono capitalize rounded-md transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#1FCD6E] text-[#0D0D0D] font-bold shadow-sm'
                        : 'text-neutral-400 hover:text-white hover:bg-[#222]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filtered Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredStudies.map((card) => (
              <VisualStudyCard
                key={card.id}
                study={card}
                onOpenLightbox={onOpenLightbox}
              />
            ))}
          </div>
        </div>
      </section>

      {/* THE PROCESS Section */}
      <ProcessSection headline={HOME_DATA.processHeadline} />

      {/* CTA BANNER */}
      <CtaBanner
        kicker={HOME_DATA.cta.kicker}
        headline={HOME_DATA.cta.headline}
        description={HOME_DATA.cta.description}
        buttonText={HOME_DATA.cta.buttonText}
        onAction={() => onNavigate('contact')}
      />
    </div>
  );
};
