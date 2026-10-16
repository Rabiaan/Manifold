import React from 'react';
import emblemOnDark from '../assets/brand/manifold-embossed-emblem-2000.webp';
import logoOnLight from '../assets/brand/manifold-original-logo.webp';

interface ManifoldLogoProps {
  className?: string;
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'emblem';
}

export const ManifoldLogo: React.FC<ManifoldLogoProps> = ({
  className = '',
  theme = 'dark',
  size = 'md',
  variant = 'full',
}) => {
  const textColor = theme === 'dark' ? 'text-white' : 'text-[#0D0D0D]';
  const emblemSize = size === 'sm' ? 26 : size === 'lg' ? 44 : 34;
  const logoHeight = size === 'sm' ? 32 : size === 'lg' ? 52 : 40;
  const textSize = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-2xl';

  if (variant === 'emblem') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <img
          src={emblemOnDark}
          alt=""
          aria-hidden="true"
          width={emblemSize}
          height={emblemSize}
          className="shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
        />

        <span className="flex flex-col leading-none">
          <span
            className={`font-['Syne'] font-extrabold tracking-[-0.04em] lowercase ${textSize} ${textColor}`}
          >
            manifold
          </span>

          <span className="mt-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-neutral-400">
            marketing &amp; media
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoOnLight}
        alt="Manifold — Imagination, in motion."
        style={{ height: logoHeight }}
        className="w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
};
