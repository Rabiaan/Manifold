import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CtaBannerProps {
  kicker?: string;
  headline: string;
  description: string;
  buttonText?: string;
  onAction: () => void;
  className?: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  kicker = 'LET US CREATE SOMETHING',
  headline,
  description,
  buttonText = 'Start a project',
  onAction,
  className = '',
}) => {
  const bannerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = bannerRef.current;
    const btn = buttonRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

              tl.fromTo(
                el.querySelector('.gsap-cta-headline'),
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.9 }
              );

              tl.fromTo(
                el.querySelector('.gsap-cta-desc'),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.6'
              );

              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(el);

      // Magnetic effect on the button
      if (btn && window.matchMedia('(pointer: fine)').matches) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: x * 0.22,
            y: y * 0.22,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)',
          });
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          btn.removeEventListener('mousemove', handleMouseMove);
          btn.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      className={`w-full bg-[#1FCD6E] text-[#0D0D0D] py-20 lg:py-24 ${className}`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[72px]">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#0D0D0D]/80 mb-6">
          {kicker}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="gsap-cta-headline font-headline font-extrabold text-3xl sm:text-4xl lg:text-6xl tracking-tight leading-[1.05] text-[#0D0D0D]">
              {headline}
            </h2>
          </div>

          <div className="gsap-cta-desc lg:col-span-5 flex flex-col items-start gap-6 lg:pl-6">
            <p className="text-base sm:text-lg text-[#0D0D0D]/90 font-sans leading-relaxed">
              {description}
            </p>

            <button
              ref={buttonRef}
              onClick={onAction}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#0D0D0D] text-white hover:bg-[#1a1a1a] font-headline font-bold text-xs capitalize tracking-wider rounded-md transition-shadow duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black shadow-lg hover:shadow-xl"
            >
              <span>{buttonText}</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
