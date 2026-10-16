import React, { useEffect, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { ASSETS } from '../data/content';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(14);

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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

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

        {/* Cinematic Video Container */}
        <div className="relative aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center">
          <img
            src={ASSETS.cinemaLens}
            alt="Showreel master frame"
            className={`w-full h-full object-cover transition-all duration-700 ${
              isPlaying ? 'scale-105 filter brightness-95' : 'scale-100 brightness-75'
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1FCD6E]/40 to-transparent pointer-events-none" />

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-10 w-20 h-20 rounded-full bg-[#0D0D0D]/70 border border-[#1FCD6E] text-white flex items-center justify-center backdrop-blur-md hover:scale-110 transition-transform cursor-pointer"
            aria-label={isPlaying ? 'Pause reel' : 'Play reel'}
          >
            {isPlaying ? (
              <Pause size={28} className="text-[#1FCD6E]" />
            ) : (
              <Play size={28} className="text-[#1FCD6E] ml-1" />
            )}
          </button>

          <div className="absolute bottom-4 left-6 z-10 font-mono text-xs text-white/90 bg-[#0D0D0D]/80 px-3 py-1 rounded border border-[#2B2B2B]">
            TC 00:01:{Math.floor((progress * 0.6)).toString().padStart(2, '0')}:18 / 00:02:15:00
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="px-6 py-4 bg-[#0D0D0D] border-t border-[#2B2B2B] flex flex-col gap-3">
          <div
            className="w-full h-2 bg-[#222] rounded-full overflow-hidden cursor-pointer relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = (e.clientX - rect.left) / rect.width;
              setProgress(clickPos * 100);
            }}
          >
            <div
              className="h-full bg-[#1FCD6E] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-neutral-300 hover:text-white transition-colors cursor-pointer text-xs font-mono flex items-center gap-1.5"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-neutral-300 hover:text-white transition-colors cursor-pointer text-xs font-mono flex items-center gap-1.5"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isMuted ? 'Unmute' : 'Muted'}</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-neutral-400">
                PRORES 4444 XQ MASTER
              </span>
              <button
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen?.();
                  } else {
                    document.exitFullscreen?.();
                  }
                }}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
                aria-label="Fullscreen"
              >
                <Maximize size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
