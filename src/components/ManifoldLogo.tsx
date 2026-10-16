import React from 'react';
import navLogoOnDark from '../assets/brand/manifold-marketing-media-logo.webp';
import logoOnLight from '../assets/brand/manifold-original-logo.webp';

interface ManifoldLogoProps {
  className?: string;
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const ManifoldLogo: React.FC<ManifoldLogoProps> = ({
  className = '',
  theme = 'dark',
  size = 'md',
}) => {
  const logoHeight = size === 'sm' ? 30 : size === 'lg' ? 52 : 40;
  const isDark = theme === 'dark';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={isDark ? navLogoOnDark : logoOnLight}
        alt="Manifold — Marketing & Media"
        style={{ height: logoHeight }}
        className={`w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
          isDark ? 'mix-blend-lighten' : ''
        }`}
      />
    </div>
  );
};
