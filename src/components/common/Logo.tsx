import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
  layout?: 'horizontal' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'auto',
  showSubtitle = true,
  layout = 'horizontal',
  size = 'md',
}) => {
  const isLight = variant === 'light';

  // Sizing definitions
  const sizes = {
    sm: {
      emblem: 'w-7 h-7',
      title: 'text-lg tracking-[0.08em]',
      tagline: 'text-[8px] tracking-[0.14em]',
      line: 'w-3',
      gap: 'gap-2',
    },
    md: {
      emblem: 'w-9 h-9',
      title: 'text-2xl tracking-[0.09em]',
      tagline: 'text-[9px] tracking-[0.16em]',
      line: 'w-4',
      gap: 'gap-3',
    },
    lg: {
      emblem: 'w-12 h-12',
      title: 'text-3xl tracking-[0.1em]',
      tagline: 'text-[11px] tracking-[0.18em]',
      line: 'w-6',
      gap: 'gap-3.5',
    },
    xl: {
      emblem: 'w-20 h-20',
      title: 'text-4xl sm:text-5xl tracking-[0.12em]',
      tagline: 'text-xs sm:text-sm tracking-[0.2em]',
      line: 'w-8',
      gap: 'gap-4',
    },
  }[size];

  const greenPrimary = isLight ? '#FAF8F5' : '#0F382A';
  const leafGreen = isLight ? '#81C784' : '#3E7744';
  const goldAccent = '#C59B3F';

  return (
    <div
      className={`inline-flex ${
        layout === 'stacked'
          ? 'flex-col items-center text-center'
          : 'items-center'
      } ${sizes.gap} select-none ${className}`}
    >
      {/* Precision Vector Emblem matching the official brand logo */}
      <div className={`${sizes.emblem} flex-shrink-0 relative transition-transform duration-300 hover:scale-105`}>
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Golden Sun / Bindu at top */}
          <circle cx="60" cy="18" r="8" fill={goldAccent} />

          {/* Left Wing of the "V" */}
          <path
            d="M20 22 C26 22 34 26 38 34 L53 84 C50 82 46 76 43 70 L30 38 C28 32 23 26 16 25 Z"
            fill={greenPrimary}
          />
          {/* Right Wing of the "V" */}
          <path
            d="M100 22 C94 22 86 26 82 34 L67 84 C70 82 74 76 77 70 L90 38 C92 32 97 26 104 25 Z"
            fill={greenPrimary}
          />

          {/* Mortar / Bowl Base */}
          <path
            d="M48 84 C48 84 46 98 60 102 C74 98 72 84 72 84 Z"
            fill={greenPrimary}
          />
          {/* Mortar Pedestal foot */}
          <path
            d="M55 101 H65 V105 H55 Z"
            fill={greenPrimary}
          />

          {/* Golden rim on mortar */}
          <path
            d="M46 83 C52 87 68 87 74 83 C74 84.5 73 87 71 88 C65 91 55 91 49 88 C47 87 46 84.5 46 83 Z"
            fill={goldAccent}
          />

          {/* Central Stem */}
          <path
            d="M60 84 Q58 56 60 40"
            stroke={goldAccent}
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Sprouting Upper Left Leaf */}
          <path
            d="M60 46 C50 36 38 40 40 54 C45 62 55 58 60 48 Z"
            fill={leafGreen}
          />
          {/* Leaf vein */}
          <path
            d="M60 48 Q49 46 41 53"
            stroke={isLight ? '#A5D6A7' : '#2D5A34'}
            strokeWidth="1.2"
          />

          {/* Sprouting Upper Right Leaf */}
          <path
            d="M60 46 C70 36 82 40 80 54 C75 62 65 58 60 48 Z"
            fill={leafGreen}
          />
          {/* Leaf vein */}
          <path
            d="M60 48 Q71 46 79 53"
            stroke={isLight ? '#A5D6A7' : '#2D5A34'}
            strokeWidth="1.2"
          />

          {/* Lower Small Sprout Leaves */}
          <path
            d="M59 74 C54 70 48 72 50 78 C54 81 58 78 59 75 Z"
            fill={leafGreen}
          />
          <path
            d="M61 74 C66 70 72 72 70 78 C66 81 62 78 61 75 Z"
            fill={leafGreen}
          />
        </svg>
      </div>

      {/* Brand Typography & Tagline */}
      <div className={`flex flex-col ${layout === 'stacked' ? 'items-center mt-1' : 'justify-center'} leading-none`}>
        {/* VAIDHYAM Wordmark with leafy "A" */}
        <div className="flex items-center">
          <span
            className={`font-serif font-extrabold ${sizes.title} ${
              isLight ? 'text-white' : 'text-[#0F382A]'
            } tracking-[0.1em]`}
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            V
            {/* Custom stylized A with leaf accent */}
            <span className="relative inline-block">
              A
              <span
                className="absolute left-[1px] bottom-[2px] w-1.5 h-2 rounded-full transform -rotate-45"
                style={{
                  backgroundColor: leafGreen,
                  clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
                }}
              />
            </span>
            IDHYAM
          </span>
        </div>

        {/* Tagline: — Ancient Wisdom. Personal Healing. — */}
        {showSubtitle && (
          <div
            className={`flex items-center gap-1.5 mt-1 ${
              layout === 'stacked' ? 'justify-center' : ''
            }`}
          >
            <span
              className={`h-[1px] ${sizes.line} inline-block`}
              style={{ backgroundColor: goldAccent }}
            />
            <span
              className={`font-serif italic font-medium ${sizes.tagline} ${
                isLight ? 'text-[#FAF8F5]/85' : 'text-[#0F382A]/90'
              } whitespace-nowrap`}
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Ancient Wisdom. Personal Healing.
            </span>
            <span
              className={`h-[1px] ${sizes.line} inline-block`}
              style={{ backgroundColor: goldAccent }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
