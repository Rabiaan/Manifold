import React, { useRef, useEffect } from 'react';
import { CONTACT_DATA } from '../data/content';
import { ContactForm } from '../components/ContactForm';
import { ServiceOption } from '../types';
import { animateHeroEntrance, attachMagneticEffect } from '../utils/gsapAnimations';

interface ContactPageProps {
  initialService?: ServiceOption;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialService }) => {
  const formRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const jumpBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const cleanupHero = animateHeroEntrance(heroRef.current);
    const cleanupBtn = attachMagneticEffect(jumpBtnRef.current);

    return () => {
      cleanupHero();
      cleanupBtn();
    };
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#0D0D0D] text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#2B2B2B]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[72px]">
          <div className="max-w-4xl space-y-6">
            <p className="gsap-hero-kicker font-mono text-xs sm:text-sm text-[#1FCD6E] tracking-widest uppercase">
              {CONTACT_DATA.kicker}
            </p>

            <h1 className="gsap-hero-headline font-headline font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tight leading-[0.95] text-white">
              {CONTACT_DATA.heroHeadline}
            </h1>

            <p className="gsap-hero-description text-lg sm:text-2xl text-neutral-300 font-sans leading-relaxed max-w-2xl pt-2">
              {CONTACT_DATA.heroDescription}
            </p>

            <div className="gsap-hero-actions pt-2">
              <button
                ref={jumpBtnRef}
                onClick={scrollToForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1FCD6E] hover:bg-[#1bb863] text-[#0D0D0D] font-headline font-bold text-xs capitalize tracking-wider rounded-md transition-shadow duration-200 cursor-pointer shadow-lg hover:shadow-xl"
              >
                <span>{CONTACT_DATA.jumpButtonText}</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Enquiry Form & Sidebar Section */}
      <section ref={formRef} className="w-full py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[72px]">
          <ContactForm initialService={initialService} />
        </div>
      </section>
    </div>
  );
};
