import React from 'react';
import { Product, SportCategory } from '../types/index.ts';

interface ShoeVisualProps {
  product: Product;
  view?: 'hero' | 'card' | 'gallery' | 'spotlight';
  angle?: 'lateral' | 'medial' | 'sole' | 'top';
  className?: string;
  isHovered?: boolean;
}

export const ShoeVisual: React.FC<ShoeVisualProps> = ({
  product,
  view = 'card',
  angle = 'lateral',
  className = '',
  isHovered = false
}) => {
  const isHero = view === 'hero';
  const isSpotlight = view === 'spotlight';
  const accent = product.accentColor || '#C8FF2F';
  const category = product.category;

  // Visual characteristics by sport
  const getShoePath = (cat: SportCategory) => {
    switch (cat) {
      case 'running':
        // High rocker, pointed aerodynamic heel, sleek curve
        return {
          upper: 'M 70,220 C 100,160 160,110 280,105 C 360,100 420,130 470,170 C 500,195 530,225 540,240 C 510,255 420,265 300,265 C 180,265 90,250 70,220 Z',
          sole: 'M 50,230 C 90,220 180,250 310,250 C 440,250 515,230 550,240 C 555,275 490,295 380,295 C 240,295 120,290 40,255 C 38,245 42,235 50,230 Z',
          carbonPlate: 'M 200,255 C 280,265 370,265 440,248 L 435,255 C 360,272 270,272 195,260 Z',
          cushionPockets: [
            { cx: 120, cy: 265, r: 8 },
            { cx: 160, cy: 270, r: 10 },
            { cx: 210, cy: 275, r: 11 },
            { cx: 270, cy: 275, r: 11 },
            { cx: 330, cy: 272, r: 10 },
            { cx: 390, cy: 265, r: 9 }
          ]
        };
      case 'tennis':
        // Solid reinforced mid-height, heavy lateral stabilizer
        return {
          upper: 'M 80,215 C 100,150 170,115 270,115 C 350,115 410,140 460,180 C 495,205 520,230 535,245 C 500,260 410,265 300,265 C 190,265 100,250 80,215 Z',
          sole: 'M 60,225 C 100,220 190,245 320,245 C 430,245 500,230 545,245 C 550,280 480,295 370,295 C 230,295 110,290 50,255 C 48,242 52,230 60,225 Z',
          carbonPlate: 'M 220,250 C 290,258 360,258 420,245 L 418,252 C 355,264 285,264 216,255 Z',
          cushionPockets: [
            { cx: 140, cy: 268, r: 9 },
            { cx: 195, cy: 272, r: 11 },
            { cx: 260, cy: 273, r: 12 },
            { cx: 325, cy: 270, r: 11 },
            { cx: 385, cy: 263, r: 9 }
          ]
        };
      case 'badminton':
      default:
        // Agile low-cut, rounded heel for quick pivot, gum outsole
        return {
          upper: 'M 75,215 C 95,155 160,120 260,118 C 340,115 400,140 450,175 C 485,200 515,225 530,240 C 495,255 410,262 295,262 C 185,262 95,248 75,215 Z',
          sole: 'M 55,225 C 90,218 180,245 310,245 C 420,245 490,230 540,240 C 545,272 480,288 370,288 C 240,288 120,282 48,250 C 46,238 50,228 55,225 Z',
          carbonPlate: 'M 210,248 C 275,255 345,255 410,242 L 406,248 C 340,260 270,260 205,253 Z',
          cushionPockets: [
            { cx: 130, cy: 260, r: 8 },
            { cx: 180, cy: 264, r: 10 },
            { cx: 240, cy: 265, r: 11 },
            { cx: 300, cy: 264, r: 10 },
            { cx: 360, cy: 258, r: 8 }
          ]
        };
    }
  };

  const pathData = getShoePath(category);

  return (
    <div
      className={`relative select-none flex items-center justify-center overflow-hidden transition-all duration-500 ${className}`}
      style={{
        perspective: isHero ? '1200px' : '800px'
      }}
    >
      {/* Background Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 50% 55%, ${accent}22 0%, rgba(11,13,12,0) 70%)`,
          opacity: isHero || isHovered || isSpotlight ? 0.9 : 0.4
        }}
      />

      {/* Speed lines & Subtle technical grid for cinematic feel */}
      {(isHero || isSpotlight) && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          {/* Subtle directional velocity lines */}
          <line x1="10%" y1="65%" x2="45%" y2="65%" stroke={accent} strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.4" />
          <line x1="55%" y1="35%" x2="90%" y2="35%" stroke={accent} strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.3" />
        </svg>
      )}

      {/* Master Vector Composition */}
      <div
        className={`relative z-10 w-full flex items-center justify-center transition-transform duration-700 ease-out ${
          isHovered ? 'scale-105 -translate-y-2' : ''
        } ${isHero ? 'hover:scale-[1.03]' : ''}`}
      >
        <svg
          viewBox="0 0 600 360"
          className="w-full h-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] max-w-full"
          style={{
            filter: isHero
              ? `drop-shadow(0 30px 45px rgba(0,0,0,0.9)) drop-shadow(0 0 20px ${accent}25)`
              : undefined
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Upper body gradient */}
            <linearGradient id={`upperGrad-${product.id}`} x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#1E221F" />
              <stop offset="45%" stopColor="#0F1210" />
              <stop offset="85%" stopColor="#252924" />
              <stop offset="100%" stopColor="#141815" />
            </linearGradient>

            {/* Accent Wing Gradient */}
            <linearGradient id={`accentGrad-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
              <stop offset="100%" stopColor={accent} stopOpacity="0.4" />
            </linearGradient>

            {/* Midsole Foam Gradient */}
            <linearGradient id={`midsoleGrad-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5F5F0" />
              <stop offset="60%" stopColor="#D8D8CF" />
              <stop offset="100%" stopColor="#A8A89F" />
            </linearGradient>

            {/* Carbon Fiber Pattern */}
            <pattern id={`carbon-${product.id}`} width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="#111311" />
              <path d="M 0,3 L 6,3 M 3,0 L 3,6" stroke="#2B302A" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Under-Shoe Dynamic Ground Shadow */}
          <ellipse
            cx="290"
            cy="310"
            rx="230"
            ry="22"
            fill="#000000"
            opacity="0.75"
            style={{ filter: 'blur(10px)' }}
          />
          <ellipse
            cx="310"
            cy="305"
            rx="160"
            ry="12"
            fill={accent}
            opacity="0.25"
            style={{ filter: 'blur(8px)' }}
          />

          {/* LAYER 1: Heel Collar & Inner Tongue Lining */}
          <path
            d="M 120,175 C 130,130 185,100 240,110 C 245,115 220,165 190,175 Z"
            fill="#121513"
            stroke="#2C332D"
            strokeWidth="1.5"
          />
          <path
            d="M 170,125 C 220,105 270,130 280,160 L 260,175 C 240,145 200,135 170,125 Z"
            fill="#2A302B"
          />

          {/* LAYER 2: Outsole (Bottom contact layer) */}
          <path
            d={pathData.sole}
            fill="#141715"
            stroke="#2E332D"
            strokeWidth="1.5"
          />
          {/* Outsole Grip Ridges / Gum layer */}
          <path
            d="M 70,250 C 130,285 240,290 370,290 C 470,290 535,270 545,250"
            fill="none"
            stroke={category === 'badminton' ? '#B87D38' : '#3B423A'}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* LAYER 3: Midsole Foam (High-rebound cushioning) */}
          <path
            d="M 55,225 C 95,220 185,246 315,246 C 435,246 505,228 543,238 C 547,265 480,285 375,285 C 235,285 115,280 48,248 Z"
            fill={`url(#midsoleGrad-${product.id})`}
          />

          {/* Nitrogen Air Pocket / Gel Insert Pods */}
          {pathData.cushionPockets.map((pod, idx) => (
            <circle
              key={idx}
              cx={pod.cx}
              cy={pod.cy}
              r={pod.r}
              fill="#0B0D0C"
              stroke={accent}
              strokeWidth="1.5"
              strokeOpacity="0.8"
            />
          ))}

          {/* LAYER 4: Exposed Carbon Fiber Propulsion Plate */}
          <path
            d={pathData.carbonPlate}
            fill={`url(#carbon-${product.id})`}
            stroke={accent}
            strokeWidth="1.2"
          />

          {/* LAYER 5: Shoe Upper Body */}
          <path
            d={pathData.upper}
            fill={`url(#upperGrad-${product.id})`}
            stroke="#3B423A"
            strokeWidth="1.5"
          />

          {/* Aerodynamic Speed Flow Lines / Engineered Welds */}
          <path
            d="M 120,210 C 190,165 310,160 440,210"
            fill="none"
            stroke={accent}
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M 160,225 C 220,185 320,180 410,225"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            opacity="0.4"
          />

          {/* Lateral Reinforcement Wing / Cage */}
          <path
            d="M 230,240 L 260,165 L 295,160 L 325,240 Z"
            fill={`url(#accentGrad-${product.id})`}
            opacity="0.85"
          />

          {/* Speed Lacing Matrix */}
          <g stroke="#F5F5F0" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
            <line x1="255" y1="140" x2="285" y2="135" />
            <line x1="270" y1="155" x2="305" y2="150" />
            <line x1="285" y1="170" x2="325" y2="165" />
            <line x1="300" y1="185" x2="345" y2="180" />
            <line x1="315" y1="200" x2="365" y2="195" />
          </g>

          {/* Reinforced Toe Drag Shield (Especially for Tennis/Badminton) */}
          <path
            d="M 470,175 C 500,200 530,228 540,242 C 520,250 490,250 465,245 C 445,215 450,195 470,175 Z"
            fill="#1E2320"
            stroke={accent}
            strokeWidth="1"
            opacity="0.9"
          />

          {/* Heel Clip Stabilizer (TPU counter) */}
          <path
            d="M 70,220 C 65,195 85,175 110,175 C 105,200 100,225 70,220 Z"
            fill={accent}
            opacity="0.95"
          />

          {/* Brand Signature Wordmark Micro-Inscription */}
          <text
            x="200"
            y="215"
            fill="#F5F5F0"
            fontSize="10"
            fontWeight="800"
            letterSpacing="2"
            opacity="0.75"
            fontFamily="'Archivo', sans-serif"
          >
            ANNASHOP // {category.toUpperCase()}
          </text>

          {/* Spec badge callout */}
          <text
            x="360"
            y="240"
            fill={accent}
            fontSize="8"
            fontWeight="700"
            letterSpacing="1"
            fontFamily="'Space Grotesk', monospace"
          >
            {product.specs.drop.toUpperCase()} · {product.specs.weight.toUpperCase()}
          </text>
        </svg>

        {/* Cinematic Floating Micro-Labels for Hero & Spotlight */}
        {(isHero || isSpotlight) && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Tech Point 1: Carbon / Outsole */}
            <div className="absolute bottom-[20%] left-[12%] hidden sm:flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#C8FF2F] shadow-[0_0_8px_#C8FF2F]" />
              <div className="bg-[#0B0D0C]/90 backdrop-blur-md border border-[#252824] px-2.5 py-1 text-[#F5F5F0]">
                <span className="text-[#C8FF2F] font-bold">01/</span> {product.techHighlights[0] || 'Carbon Plate'}
              </div>
            </div>

            {/* Tech Point 2: Cushioning */}
            <div className="absolute top-[28%] right-[8%] hidden sm:flex items-center gap-2 text-xs font-mono">
              <div className="bg-[#0B0D0C]/90 backdrop-blur-md border border-[#252824] px-2.5 py-1 text-[#F5F5F0]">
                <span className="text-[#C8FF2F] font-bold">02/</span> {product.techHighlights[1] || 'Nitro-Foam Pro'}
              </div>
              <span className="w-2 h-2 rounded-full bg-[#C8FF2F] shadow-[0_0_8px_#C8FF2F]" />
            </div>

            {/* Tech Point 3: Upper */}
            <div className="absolute top-[18%] left-[28%] hidden md:flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#FFF]" />
              <div className="bg-[#0B0D0C]/90 backdrop-blur-md border border-[#252824] px-2.5 py-1 text-[#F5F5F0]">
                <span className="text-white font-bold">03/</span> {product.techHighlights[2] || 'Aero-Weave'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
