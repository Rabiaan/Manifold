import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { COMMON_PROCESS_STEPS } from '../data/content';

interface ProcessSectionProps {
  headline?: string;
  className?: string;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  headline = 'From the first thought to the final frame.',
  className = '',
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

              tl.fromTo(
                el.querySelector('.gsap-process-header'),
                { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.8 }
              );

              tl.fromTo(
                el.querySelectorAll('.gsap-process-item'),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
                '-=0.4'
              );

              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      observer.observe(el);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`w-full bg-[#0D0D0D] text-white py-20 lg:py-28 border-t border-[#2B2B2B] ${className}`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[72px]">
        <div className="gsap-process-header space-y-3 mb-14 lg:mb-16">
          <p className="font-mono text-xs text-[#1FCD6E] tracking-widest uppercase">
            THE PROCESS
          </p>
          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl max-w-3xl leading-[1.1] tracking-tight">
            {headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 pt-4">
          {COMMON_PROCESS_STEPS.map((step, index) => (
            <div
              key={step.name}
              className="gsap-process-item group relative flex flex-col pt-6 border-t border-[#2B2B2B] hover:border-[#1FCD6E] transition-colors"
            >
              <div className="font-mono text-xs text-neutral-500 mb-4 group-hover:text-[#1FCD6E] transition-colors">
                0{index + 1}
              </div>

              <h3 className="font-headline font-bold text-xl text-white mb-2.5">
                {step.name}
              </h3>

              <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
