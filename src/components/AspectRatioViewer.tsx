import React, { useState } from 'react';
import { ASSETS } from '../data/content';

export const AspectRatioViewer: React.FC = () => {
  const [selectedRatio, setSelectedRatio] = useState<string>('16:9');

  const formats = [
    {
      ratio: '16:9',
      label: 'Film',
      aspectClass: 'aspect-[16/9]',
      description: 'Cinema, broadcast & desktop widescreen master',
      spec: '3840 x 2160 UHD',
    },
    {
      ratio: '4:5',
      label: 'Social',
      aspectClass: 'aspect-[4/5]',
      description: 'Optimized vertical feed framing for mobile screens',
      spec: '1080 x 1350 Feed',
    },
    {
      ratio: '9:16',
      label: 'Vertical',
      aspectClass: 'aspect-[9/16]',
      description: 'Full-bleed mobile story, reel & shorts engagement',
      spec: '1080 x 1920 Stories',
    },
    {
      ratio: '1:1',
      label: 'Square',
      aspectClass: 'aspect-[1/1]',
      description: 'Universal multi-channel cross-platform adaptation',
      spec: '1080 x 1080 Grid',
    },
  ];

  return (
    <section className="w-full bg-[#0D0D0D] text-white py-20 lg:py-28 border-t border-[#2B2B2B]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[72px]">
        <div className="space-y-3 mb-12">
          <p className="font-mono text-xs text-[#1FCD6E] tracking-widest uppercase">
            DELIVERY WITH PURPOSE
          </p>
          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Built for the way your work is seen.
          </h2>
          <p className="text-neutral-400 font-sans max-w-2xl text-base pt-1">
            Film, vertical, square and social adaptations, defined around your delivery plan.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-end">
          {formats.map((f) => {
            const isSelected = selectedRatio === f.ratio;
            return (
              <div
                key={f.ratio}
                onClick={() => setSelectedRatio(f.ratio)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedRatio(f.ratio);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
                className="group flex flex-col items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FCD6E] rounded-lg"
              >
                <div className="w-full h-52 sm:h-64 flex items-center justify-center p-2">
                  <div
                    className={`w-full max-h-full ${f.aspectClass} relative rounded border transition-all duration-300 overflow-hidden flex items-center justify-center ${
                      isSelected
                        ? 'border-[#1FCD6E] bg-[#141414] shadow-[0_0_15px_rgba(31,205,110,0.25)]'
                        : 'border-[#333] hover:border-neutral-400 bg-[#111]'
                    }`}
                  >
                    <img
                      src={ASSETS.cinemaLens}
                      alt={`${f.label} preview`}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        isSelected ? 'opacity-90' : 'opacity-40 group-hover:opacity-60'
                      }`}
                    />

                    <div className="absolute inset-2 border border-white/20 pointer-events-none" />

                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white">
                      {f.ratio}
                    </div>
                  </div>
                </div>

                <div className="text-center pt-3 space-y-1">
                  <p className={`font-mono text-xs font-bold tracking-wider transition-colors ${
                    isSelected ? 'text-[#1FCD6E]' : 'text-neutral-300 group-hover:text-white'
                  }`}>
                    {f.ratio} / {f.label}
                  </p>
                  <p className="text-[11px] text-neutral-500 font-sans">
                    {f.spec}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
