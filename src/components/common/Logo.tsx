import React from 'react';

export interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
  layout?: 'stacked' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  useRealisticAsset?: boolean;
}

/**
 * Realistic Brand Asset Path for VAIDHYAM
 * High-resolution master brand logo on warm ivory #F8F6EF
 */
export const VAIDHYAM_BRAND_LOGO_IMAGE = '/src/assets/images/vaidhyam_brand_logo_1791379543112.jpg';

/**
 * Native, responsive SVG Vector Emblem for VAIDHYAM
 *
 * Designed according to exact brand specifications:
 * - Color Palette:
 *   - Deep Forest Green: #164A3A
 *   - Secondary Herbal Green: #6F963F
 *   - Muted Gold: #C7A45A
 *   - Warm Ivory: #F8F6EF
 *   - Dark Charcoal: #202522
 * - Symmetrical, elegant emblem centered around a large stylized capital letter "V"
 *   formed from two deep forest-green curved leaf-like shapes.
 * - Inside the V: subtle human-healing silhouette using two upward-curving hands/arms
 *   that also resemble young Ayurvedic leaves.
 * - Small muted-gold circular element above the central figure (life, consciousness, healing).
 * - Bottom: simplified Ayurvedic herbal bowl/mortar shape in deep forest green with a thin
 *   muted-gold curved rim.
 * - Slender gold-and-green herbal stem rising upward through the center dividing into small leaves.
 */
export const VaidhyamEmblemSvg: React.FC<{
  className?: string;
  isLight?: boolean;
}> = ({ className = 'w-12 h-12', isLight = false }) => {
  // Brand color tokens
  const deepForestGreen = isLight ? '#F8F6EF' : '#164A3A';
  const secondaryHerbalGreen = isLight ? '#8EC35C' : '#6F963F';
  const herbalStemGreen = isLight ? '#A5D676' : '#557B2F';
  const mutedGold = '#C7A45A';

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform duration-300`}
      aria-label="VAIDHYAM Ayurvedic Healthcare Emblem"
    >
      {/* 1. SMALL MUTED-GOLD CIRCULAR ELEMENT ABOVE CENTRAL FIGURE (Consciousness, Life, Healing) */}
      <circle cx="100" cy="32" r="9" fill={mutedGold} />

      {/* 2. SYMMETRICAL CAPITAL "V" FORMED FROM TWO DEEP FOREST-GREEN CURVED LEAF-LIKE SHAPES */}
      {/* Left Wing / Curved Leaf of the "V" */}
      <path
        d="M 28 26 C 38 26 50 32 58 46 L 86 128 C 80 124 72 114 66 98 L 44 48 C 39 37 32 30 20 28 Z"
        fill={deepForestGreen}
      />
      {/* Right Wing / Curved Leaf of the "V" */}
      <path
        d="M 172 26 C 162 26 150 32 142 46 L 114 128 C 120 124 128 114 134 98 L 156 48 C 161 37 168 30 180 28 Z"
        fill={deepForestGreen}
      />

      {/* 3. SIMPLIFIED AYURVEDIC HERBAL BOWL / MORTAR AT BOTTOM */}
      {/* Mortar Body in Deep Forest Green */}
      <path
        d="M 76 138 C 76 138, 73 166, 100 172 C 127 166, 124 138, 124 138 Z"
        fill={deepForestGreen}
      />
      {/* Mortar Pedestal Base */}
      <path
        d="M 91 171 H 109 V 176 H 91 Z"
        fill={deepForestGreen}
      />

      {/* 4. THIN MUTED-GOLD CURVED RIM ON HERBAL BOWL */}
      <path
        d="M 72 136 C 81 141, 119 141, 128 136 C 128 139.5, 124 142.5, 117 143.5 C 108 145, 92 145, 83 143.5 C 76 142.5, 72 139.5, 72 136 Z"
        fill={mutedGold}
      />

      {/* 5. SLENDER GOLD-AND-GREEN HERBAL STEM RISING UPWARD THROUGH THE CENTER */}
      {/* Center Gold Rising Stem */}
      <path
        d="M 100 137 L 100 68"
        stroke={mutedGold}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 6. SUBTLE HUMAN-HEALING SILHOUETTE: TWO UPWARD-CURVING HANDS / ARMS RESEMBLING YOUNG AYURVEDIC LEAVES */}
      {/* Left Upward Hand / Leaf */}
      <path
        d="M 100 76 C 82 52, 60 58, 64 82 C 72 98, 92 92, 100 76 Z"
        fill={secondaryHerbalGreen}
      />
      {/* Left Palm / Delicate Central Vein */}
      <path
        d="M 100 78 Q 78 74, 66 82"
        stroke={herbalStemGreen}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Right Upward Hand / Leaf */}
      <path
        d="M 100 76 C 118 52, 140 58, 136 82 C 128 98, 108 92, 100 76 Z"
        fill={secondaryHerbalGreen}
      />
      {/* Right Palm / Delicate Central Vein */}
      <path
        d="M 100 78 Q 122 74, 134 82"
        stroke={herbalStemGreen}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* 7. SLENDER STEM DIVIDING INTO SMALL UPPER LEAVES */}
      <path
        d="M 100 68 C 93 60, 89 54, 91 50 C 96 49, 100 55, 100 68 Z"
        fill={secondaryHerbalGreen}
      />
      <path
        d="M 100 68 C 107 60, 111 54, 109 50 C 104 49, 100 55, 100 68 Z"
        fill={secondaryHerbalGreen}
      />

      {/* Subtle small leaves emerging from the bowl base */}
      <path
        d="M 85 129 C 78 124, 72 128, 75 135 C 80 137, 85 133, 85 129 Z"
        fill={secondaryHerbalGreen}
      />
      <path
        d="M 115 129 C 122 124, 128 128, 125 135 C 120 137, 115 133, 115 129 Z"
        fill={secondaryHerbalGreen}
      />
    </svg>
  );
};

/**
 * Realistic Brand Identity Component
 * Renders the generated master brand graphic on solid warm ivory #F8F6EF
 */
export const VaidhyamRealisticLogo: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-56 h-56',
    xl: 'w-72 h-72',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center bg-[#F8F6EF] rounded-2xl p-2 overflow-hidden shadow-sm border border-[#164A3A]/10 ${className}`}
    >
      <img
        src={VAIDHYAM_BRAND_LOGO_IMAGE}
        alt="VAIDHYAM — Ancient Wisdom. Personal Healing."
        className={`${sizeMap} object-contain transition-transform duration-300 hover:scale-105`}
        loading="eager"
      />
    </div>
  );
};

/**
 * Main VAIDHYAM Brand Logo Component
 * Meets all exact branding requirements:
 * - Emblem: Symmetrical V with human-healing silhouette & leaves, gold sun orb, herbal bowl
 * - Wordmark: “VAIDHYAM” in uppercase luxury serif typography with generous letter spacing
 * - Tagline: “Ancient Wisdom. Personal Healing.” in clean modern sans-serif with thin gold horizontal lines
 * - Palette: #164A3A (Deep Forest Green), #6F963F (Herbal Green), #C7A45A (Muted Gold), #F8F6EF (Warm Ivory)
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'auto',
  showSubtitle = true,
  layout = 'horizontal',
  size = 'md',
  useRealisticAsset = false,
}) => {
  const isLight = variant === 'light';

  // If realistic asset mode is requested
  if (useRealisticAsset) {
    return <VaidhyamRealisticLogo size={size} className={className} />;
  }

  // Sizing tokens
  const sizes = {
    sm: {
      emblem: 'w-8 h-8',
      title: 'text-lg tracking-[0.18em]',
      tagline: 'text-[9px] tracking-[0.14em]',
      line: 'w-3',
      gap: 'gap-2.5',
    },
    md: {
      emblem: 'w-10 h-10',
      title: 'text-2xl sm:text-[26px] tracking-[0.2em]',
      tagline: 'text-[10px] sm:text-[11px] tracking-[0.15em]',
      line: 'w-5',
      gap: 'gap-3',
    },
    lg: {
      emblem: 'w-14 h-14',
      title: 'text-3xl sm:text-4xl tracking-[0.22em]',
      tagline: 'text-xs sm:text-[13px] tracking-[0.16em]',
      line: 'w-7 sm:w-9',
      gap: 'gap-3.5',
    },
    xl: {
      emblem: 'w-20 h-20 sm:w-24 sm:h-24',
      title: 'text-4xl sm:text-5xl lg:text-6xl tracking-[0.24em]',
      tagline: 'text-xs sm:text-sm tracking-[0.18em]',
      line: 'w-10 sm:w-14',
      gap: 'gap-4',
    },
  }[size];

  // Exact Brand Colors
  const deepForestGreen = isLight ? '#F8F6EF' : '#164A3A';
  const mutedGold = '#C7A45A';

  return (
    <div
      className={`inline-flex ${
        layout === 'stacked'
          ? 'flex-col items-center text-center'
          : 'items-center'
      } ${sizes.gap} select-none ${className}`}
    >
      {/* Symmetrical Emblem Symbol */}
      <VaidhyamEmblemSvg
        className={`${sizes.emblem} hover:scale-105 transition-transform flex-shrink-0`}
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
            className={`font-serif font-bold ${sizes.title} uppercase`}
            style={{
              color: deepForestGreen,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              letterSpacing: '0.2em',
              fontWeight: 700,
            }}
          >
            VAIDHYAM
          </span>
        </div>

        {/* TAGLINE: Ancient Wisdom. Personal Healing. */}
        {showSubtitle && (
          <div
            className={`flex items-center gap-2 mt-1.5 ${
              layout === 'stacked' ? 'justify-center' : ''
            }`}
          >
            {/* Left Thin Muted-Gold Accent Line */}
            <span
              className={`h-[1px] ${sizes.line} inline-block flex-shrink-0`}
              style={{ backgroundColor: mutedGold }}
            />

            {/* Tagline Text in Clean Modern Sans-Serif */}
            <span
              className={`font-sans font-medium uppercase ${sizes.tagline} whitespace-nowrap`}
              style={{
                color: deepForestGreen,
                fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
                letterSpacing: '0.14em',
              }}
            >
              Ancient Wisdom. Personal Healing.
            </span>

            {/* Right Thin Muted-Gold Accent Line */}
            <span
              className={`h-[1px] ${sizes.line} inline-block flex-shrink-0`}
              style={{ backgroundColor: mutedGold }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
