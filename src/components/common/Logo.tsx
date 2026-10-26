import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'auto',
  showSubtitle = true,
  size = 'md',
}) => {
  const isLight = variant === 'light';

  const sizeClasses = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-2xl', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl', sub: 'text-xs' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Emblem SVG: Classical Kalash & Sacred Botanical Lotus / Herb Leaf */}
      <div
        className={`${sizeClasses.icon} relative flex-shrink-0 flex items-center justify-center rounded-xl ${
          isLight
            ? 'bg-white/10 ring-1 ring-white/20'
            : 'bg-[#12372A]/10 ring-1 ring-[#12372A]/20'
        } p-1.5 transition-transform duration-300 hover:scale-105`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Base Kumbha / Kalash outline */}
          <path
            d="M16 38C16 39.1 16.9 40 18 40H30C31.1 40 32 39.1 32 38V36H16V38Z"
            fill={isLight ? '#F4EFE6' : '#12372A'}
          />
          <path
            d="M13 28C13 33.52 17.48 38 23 38H25C30.52 38 35 33.52 35 28C35 24.5 33.2 21.4 30.5 19.6C30 19.2 29.8 18.5 30 18C30.4 16.8 30.6 15.4 30.2 14H17.8C17.4 15.4 17.6 16.8 18 18C18.2 18.5 18 19.2 17.5 19.6C14.8 21.4 13 24.5 13 28Z"
            fill={isLight ? '#4C956C' : '#143D27'}
          />
          {/* Central Sacred Lotus / Banyan Seed Leaf */}
          <path
            d="M24 6C24 6 18 15 18 22C18 25.31 20.69 28 24 28C27.31 28 30 25.31 30 22C30 15 24 6 24 6Z"
            fill={isLight ? '#FAF8F5' : '#2C6E49'}
          />
          {/* Central vein with warm coral vitality dot */}
          <path
            d="M24 10V26"
            stroke={isLight ? '#E06D53' : '#E06D53'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="24" cy="18" r="2.2" fill="#E06D53" />
          {/* Side medicinal sprigs */}
          <path
            d="M19 19C15 19 11 16 11 16C11 16 13 21 17 21"
            stroke={isLight ? '#FAF8F5' : '#4C956C'}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M29 19C33 19 37 16 37 16C37 16 35 21 31 21"
            stroke={isLight ? '#FAF8F5' : '#4C956C'}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-serif tracking-[0.14em] font-bold ${sizeClasses.text} ${
            isLight ? 'text-white' : 'text-[#0C281B]'
          }`}
        >
          VAIDYAM
        </span>
        {showSubtitle && (
          <span
            className={`font-sans tracking-[0.24em] font-semibold uppercase ${sizeClasses.sub} ${
              isLight ? 'text-[#D8F3DC]/80' : 'text-[#2C6E49]'
            }`}
          >
            Ayurvedic Healthcare
          </span>
        )}
      </div>
    </div>
  );
};
