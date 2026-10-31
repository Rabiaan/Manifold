import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { ASSETS } from '../data/content';

const showreelVideo = new URL('../../HTML Version/assets/img/manifold main.mp4', import.meta.url).href;

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Manifold Studio Showreel"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[#111] border border-[#2B2B2B] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0D0D0D] border-b border-[#2B2B2B]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1FCD6E]" />
            <span className="font-headline font-bold text-sm tracking-wide text-white uppercase">
              Manifold / Selected Showreel
            </span>
            <span className="hidden sm:inline font-mono text-xs text-neutral-400">
              4K DCI &middot; 2.39:1 Anamorphic
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close showreel player"
            className="p-2 rounded-lg bg-[#222] hover:bg-[#333] text-neutral-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FCD6E] cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Showreel video */}
        <div className="relative aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center">
          <video
            autoPlay
            controls
            playsInline
            preload="metadata"
            poster={ASSETS.cinemaLens}
            aria-label="Manifold Studio showreel"
            className="h-full w-full object-contain"
          >
            <source src={showreelVideo} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};
