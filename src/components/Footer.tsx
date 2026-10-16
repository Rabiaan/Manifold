import React from 'react';
import { ManifoldLogo } from './ManifoldLogo';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-white text-[#0D0D0D] border-t border-[#E5E5E5] transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[72px] py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-start pb-16 border-b border-[#E5E5E5]">
          {/* Left Column: Brand & Tagline */}
          <div className="space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FCD6E]"
            >
              <ManifoldLogo theme="light" size="md" variant="full" />
            </button>
            <p className="font-headline font-bold text-lg text-[#0D0D0D]">
              Imagination, in motion.
            </p>
            <p className="text-xs text-neutral-500 font-sans">
              &copy; Manifold. All rights reserved.
            </p>
          </div>

          {/* Center Column: Studio Disciplines */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-neutral-800">
              <button
                onClick={() => onNavigate('film')}
                className="hover:text-[#1FCD6E] transition-colors cursor-pointer"
              >
                Film
              </button>
              <span className="text-neutral-400">/</span>
              <button
                onClick={() => onNavigate('creative')}
                className="hover:text-[#1FCD6E] transition-colors cursor-pointer"
              >
                Creative
              </button>
              <span className="text-neutral-400">/</span>
              <button
                onClick={() => onNavigate('ai')}
                className="hover:text-[#1FCD6E] transition-colors cursor-pointer"
              >
                AI
              </button>
              <span className="text-neutral-400">/</span>
              <button
                onClick={() => onNavigate('craft')}
                className="hover:text-[#1FCD6E] transition-colors cursor-pointer"
              >
                Craft
              </button>
              <span className="text-neutral-400">/</span>
              <button
                onClick={() => onNavigate('content')}
                className="hover:text-[#1FCD6E] transition-colors cursor-pointer"
              >
                Content
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigate('about')}
                className="text-sm font-medium text-neutral-800 hover:text-[#1FCD6E] transition-colors cursor-pointer"
              >
                About the studio
              </button>
            </div>
          </div>

          {/* Right Column: Inquiries & Social */}
          <div className="space-y-3 md:text-right">
            <div>
              <button
                onClick={() => onNavigate('contact')}
                className="font-headline font-bold text-sm tracking-wide text-[#0D0D0D] hover:text-[#1FCD6E] transition-colors cursor-pointer"
              >
                Start a project &rarr;
              </button>
            </div>
            <div>
              <a
                href="https://instagram.com/manifoldmotionpictures"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-neutral-600 hover:text-[#0D0D0D] transition-colors"
              >
                @manifoldmotionpictures
              </a>
            </div>
            <p className="text-xs text-neutral-500 font-sans pt-2">
              Film production. Creative thinking. New possibilities.
            </p>
          </div>
        </div>

        {/* Quiet baseline footnote */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            Created by{' '}
            <a
              href="https://frame-gen.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D0D0D] hover:text-[#1FCD6E] font-semibold underline underline-offset-2 transition-colors"
            >
              FrameGen
            </a>
          </div>
          <div>
            <a
              href="https://frame-gen.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#1FCD6E] transition-colors"
            >
              frame-gen.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
