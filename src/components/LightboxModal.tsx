import React, { useEffect } from 'react';
import { VisualStudy } from '../types';
import { X, ExternalLink } from 'lucide-react';

interface LightboxModalProps {
  study: VisualStudy | null;
  onClose: () => void;
  onDiscussStudy?: (category: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  study,
  onClose,
  onDiscussStudy,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (study) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={study.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[#141414] border border-[#2B2B2B] rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2B2B2B] bg-[#0D0D0D]">
          <div>
            <span className="font-mono text-xs uppercase text-[#1FCD6E]">
              {study.category} Study
            </span>
            <h2 className="font-headline font-bold text-lg sm:text-xl text-white">
              {study.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg bg-[#222] hover:bg-[#333] text-neutral-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FCD6E] cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative bg-black flex items-center justify-center overflow-hidden flex-1 min-h-[300px] max-h-[60vh]">
          <img
            src={study.image}
            alt={study.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-6 bg-[#0D0D0D] border-t border-[#2B2B2B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-mono text-xs text-neutral-400">
              {study.subtitle}
            </p>
            {study.details && (
              <p className="text-xs text-neutral-300 max-w-xl font-sans">
                {study.details}
              </p>
            )}
          </div>
          {onDiscussStudy && (
            <button
              onClick={() => {
                onClose();
                onDiscussStudy(study.category);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1FCD6E] text-[#0D0D0D] font-headline font-bold text-xs capitalize tracking-wider rounded-md hover:bg-[#1bb863] transition-colors cursor-pointer shrink-0"
            >
              <span>Discuss this visual style</span>
              <ExternalLink size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
