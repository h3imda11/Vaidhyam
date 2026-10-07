import React from 'react';

export interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
  layout?: 'stacked' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Native, responsive SVG Vector Emblem for VAIDHYAM
 * Designed according to exact brand specifications:
 * - Stylized letter "V" in deep botanical green (#0B3D2E)
 * - Two elegant upward-facing leaves in secondary natural green (#4F7F35)
 * - Thin golden organic stem (#C69A32) rising through the leaves
 * - Small solid golden circular sun/orb (#C69A32) above the leaves
 * - Rounded herbal bowl with metallic-gold rim and subtle emerging leaves at the bottom
 */
export const VaidhyamEmblemSvg: React.FC<{
  className?: string;
  isLight?: boolean;
}> = ({ className = 'w-12 h-12', isLight = false }) => {
  // Brand color tokens
  const deepGreen = isLight ? '#FAF8F0' : '#0B3D2E';
  const naturalGreen = isLight ? '#66BB6A' : '#4F7F35';
  const naturalGreenDark = isLight ? '#81C784' : '#385F24';
  const gold = '#C69A32';

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform duration-300`}
      aria-label="Vaidyam Ayurvedic Emblem"
    >
      {/* 1. SOLID GOLDEN CIRCULAR SUN / ORB ABOVE LEAVES */}
      <circle cx="100" cy="36" r="10.5" fill={gold} />

      {/* 2. STYLIZED LETTER "V" FORMED FROM TWO LARGE BOTANICAL-GREEN CURVED SHAPES */}
      {/* Left botanical curved arm of the "V" */}
      <path
        d="M 32 30 C 42 30 54 36 60 48 L 84 130 C 78 126 71 116 66 102 L 46 54 C 42 45 35 37 24 35 Z"
        fill={deepGreen}
      />
      {/* Right botanical curved arm of the "V" */}
      <path
        d="M 168 30 C 158 30 146 36 140 48 L 116 130 C 122 126 129 116 134 102 L 154 54 C 158 45 165 37 176 35 Z"
        fill={deepGreen}
      />

      {/* 3. ROUNDED HERBAL BOWL / POT AT BOTTOM IN DARK BOTANICAL GREEN */}
      <path
        d="M 82 136 C 82 136, 79 160, 100 166 C 121 160, 118 136, 118 136 Z"
        fill={deepGreen}
      />
      {/* Bowl base pedestal */}
      <path
        d="M 93 165 H 107 V 170 H 93 Z"
        fill={deepGreen}
      />

      {/* 4. THIN METALLIC-GOLD HORIZONTAL RIM ON HERBAL BOWL */}
      <path
        d="M 78 134 C 86 139, 114 139, 122 134 C 122 137, 119 140, 114 141 C 106 143, 94 143, 86 141 C 81 140, 78 137, 78 134 Z"
        fill={gold}
      />

      {/* 5. SMALL SUBTLE GREEN LEAVES EMERGING FROM THE BOWL */}
      <path
        d="M 88 126 C 80 121, 72 125, 75 133 C 81 136, 88 131, 88 126 Z"
        fill={naturalGreen}
      />
      <path
        d="M 112 126 C 120 121, 128 125, 125 133 C 119 136, 112 131, 112 126 Z"
        fill={naturalGreen}
      />

      {/* 6. THIN GOLDEN ORGANIC STEM RISING FROM BOTTOM CENTER */}
      <path
        d="M 100 135 Q 97 90, 100 66"
        stroke={gold}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 7. TWO ELEGANT UPWARD-FACING HEALING AYURVEDIC LEAVES INSIDE THE V */}
      {/* Left upward healing leaf */}
      <path
        d="M 100 74 C 84 54, 64 60, 68 82 C 76 96, 92 90, 100 74 Z"
        fill={naturalGreen}
      />
      {/* Left leaf delicate central vein */}
      <path
        d="M 100 76 Q 81 74, 69 82"
        stroke={naturalGreenDark}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Right upward healing leaf */}
      <path
        d="M 100 74 C 116 54, 136 60, 132 82 C 124 96, 108 90, 100 74 Z"
        fill={naturalGreen}
      />
      {/* Right leaf delicate central vein */}
      <path
        d="M 100 76 Q 119 74, 131 82"
        stroke={naturalGreenDark}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'auto',
  showSubtitle = true,
  layout = 'horizontal',
  size = 'md',
}) => {
  const isLight = variant === 'light';

  // Sizing tokens
  const sizes = {
    sm: {
      emblem: 'w-8 h-8',
      title: 'text-lg tracking-[0.16em]',
      tagline: 'text-[9px] tracking-[0.18em]',
      line: 'w-3.5',
      gap: 'gap-2.5',
    },
    md: {
      emblem: 'w-10 h-10',
      title: 'text-2xl sm:text-[26px] tracking-[0.18em]',
      tagline: 'text-[10px] sm:text-[11px] tracking-[0.2em]',
      line: 'w-5',
      gap: 'gap-3',
    },
    lg: {
      emblem: 'w-14 h-14',
      title: 'text-3xl sm:text-4xl tracking-[0.2em]',
      tagline: 'text-xs sm:text-[13px] tracking-[0.22em]',
      line: 'w-6 sm:w-8',
      gap: 'gap-3.5',
    },
    xl: {
      emblem: 'w-20 h-20 sm:w-24 sm:h-24',
      title: 'text-4xl sm:text-5xl lg:text-6xl tracking-[0.22em]',
      tagline: 'text-sm sm:text-base tracking-[0.25em]',
      line: 'w-8 sm:w-12',
      gap: 'gap-4',
    },
  }[size];

  const textDark = isLight ? '#FAF8F0' : '#123C31';
  const leafGreen = isLight ? '#66BB6A' : '#4F7F35';
  const gold = '#C69A32';

  return (
    <div
      className={`inline-flex ${
        layout === 'stacked'
          ? 'flex-col items-center text-center'
          : 'items-center'
      } ${sizes.gap} select-none ${className}`}
    >
      {/* Native Responsive Vector Emblem */}
      <VaidhyamEmblemSvg
        className={`${sizes.emblem} hover:scale-105 transition-transform`}
        isLight={isLight}
      />

      {/* Brand Typography & Tagline */}
      <div
        className={`flex flex-col ${
          layout === 'stacked' ? 'items-center text-center mt-1' : 'justify-center text-left'
        } leading-none`}
      >
        {/* WORDMARK: VAIDHYAM */}
        <div className="flex items-center">
          <span
            className={`font-serif font-black ${sizes.title} uppercase`}
            style={{
              color: textDark,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              letterSpacing: '0.18em',
              fontWeight: 800,
            }}
          >
            V
            {/* The first 'A' containing a subtle interior leaf detail */}
            <span className="relative inline-block">
              A
              <span
                className="absolute left-[1px] bottom-[3px] w-1.5 h-2 rounded-full transform -rotate-45 pointer-events-none"
                style={{
                  backgroundColor: leafGreen,
                  clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
                }}
              />
            </span>
            IDHYAM
          </span>
        </div>

        {/* TAGLINE: Ancient Wisdom. Personal Healing. */}
        {showSubtitle && (
          <div
            className={`flex items-center gap-2 mt-1.5 ${
              layout === 'stacked' ? 'justify-center' : ''
            }`}
          >
            {/* Left Gold Accent Line */}
            <span
              className={`h-[1px] ${sizes.line} inline-block`}
              style={{ backgroundColor: gold }}
            />

            {/* Tagline Text */}
            <span
              className={`font-serif font-semibold italic ${sizes.tagline} whitespace-nowrap`}
              style={{
                color: isLight ? '#FAF8F0' : '#123C31',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: '0.15em',
              }}
            >
              Ancient Wisdom. Personal Healing.
            </span>

            {/* Right Gold Accent Line */}
            <span
              className={`h-[1px] ${sizes.line} inline-block`}
              style={{ backgroundColor: gold }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
