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
  const id = product.id;

  return (
    <div
      className={`relative select-none flex items-center justify-center overflow-hidden transition-all duration-700 ${className}`}
      style={{
        perspective: isHero ? '1400px' : '900px'
      }}
    >
      {/* High-Fashion Studio Atmospheric Aura */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accent}28 0%, rgba(11,13,12,0.85) 60%, rgba(11,13,12,1) 100%)`,
          opacity: isHero || isHovered || isSpotlight ? 1 : 0.45
        }}
      />

      {/* Cybernetic Studio Rim Halo */}
      <div
        className="absolute w-[80%] h-[70%] rounded-[100%] pointer-events-none transition-transform duration-700 blur-[60px]"
        style={{
          background: `conic-gradient(from 180deg at 50% 50%, ${accent}30 0deg, #FFFFFF15 120deg, ${accent}40 240deg, transparent 360deg)`,
          transform: isHovered ? 'scale(1.1) rotate(15deg)' : 'scale(1) rotate(0deg)'
        }}
      />

      {/* Speed lines & Subtle technical grid for cinematic feel */}
      {(isHero || isSpotlight) && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`hero-grid-${id}`} width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#FFFFFF" strokeWidth="0.4" strokeOpacity="0.12" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#hero-grid-${id})`} />
          <line x1="15%" y1="70%" x2="55%" y2="70%" stroke={accent} strokeWidth="1.5" strokeDasharray="8 10" strokeOpacity="0.6" />
          <line x1="60%" y1="28%" x2="95%" y2="28%" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.4" />
        </svg>
      )}

      {/* Master 3D / SVG Vector Presentation */}
      <div
        className={`relative z-10 w-full flex items-center justify-center transition-all duration-700 ease-out ${
          isHovered ? 'scale-105 -translate-y-2' : ''
        } ${isHero ? 'hover:scale-[1.03]' : ''}`}
      >
        {/* =========================================================================
            VIEW 1: LATERAL PROFILE (Góc Nghiêng Ngoài - Thời Thượng & Điêu Khắc)
            ========================================================================= */}
        {angle === 'lateral' && (
          <svg
            viewBox="0 0 680 400"
            className="w-full h-auto drop-shadow-[0_30px_45px_rgba(0,0,0,0.92)] max-w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Ultra-luxury metallic upper body gradient */}
              <linearGradient id={`upper-lux-${id}`} x1="0%" y1="0%" x2="100%" y2="90%">
                <stop offset="0%" stopColor="#252A26" />
                <stop offset="30%" stopColor="#121513" />
                <stop offset="70%" stopColor="#1B201D" />
                <stop offset="100%" stopColor="#0B0D0C" />
              </linearGradient>

              {/* Sculpted High-Stack Midsole Gradient */}
              <linearGradient id={`midsole-sculpt-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5F5F0" />
                <stop offset="35%" stopColor="#E2E2D8" />
                <stop offset="75%" stopColor="#BCBCAE" />
                <stop offset="100%" stopColor="#8A8A7E" />
              </linearGradient>

              {/* Accent Glow Rib */}
              <linearGradient id={`accent-rib-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={accent} stopOpacity="1" />
                <stop offset="60%" stopColor={accent} stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
              </linearGradient>

              {/* Holographic Carbon Plate Gradient */}
              <linearGradient id={`carbon-plate-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#151715" />
                <stop offset="50%" stopColor={accent} stopOpacity="0.7" />
                <stop offset="100%" stopColor="#2C312D" />
              </linearGradient>

              {/* Woven Technical Carbon Fiber Mesh Pattern */}
              <pattern id={`carbon-weave-${id}`} width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="#0E100F" />
                <path d="M 0,4 L 8,4 M 4,0 L 4,8" stroke="#252926" strokeWidth="1" />
                <circle cx="4" cy="4" r="1.2" fill={accent} opacity="0.3" />
              </pattern>

              {/* Ripstop Breathable Micro-perforation */}
              <pattern id={`ripstop-grid-${id}`} width="12" height="12" patternUnits="userSpaceOnUse">
                <rect width="12" height="12" fill="none" stroke="#FFFFFF" strokeWidth="0.4" strokeOpacity="0.08" />
                <circle cx="6" cy="6" r="0.8" fill="#FFFFFF" opacity="0.12" />
              </pattern>
            </defs>

            {/* Dynamic Ground Horizon Shadow */}
            <ellipse
              cx="330"
              cy="345"
              rx="260"
              ry="24"
              fill="#000000"
              opacity="0.85"
              style={{ filter: 'blur(12px)' }}
            />
            <ellipse
              cx="340"
              cy="342"
              rx="180"
              ry="12"
              fill={accent}
              opacity="0.35"
              style={{ filter: 'blur(8px)' }}
            />

            {/* ================= HEEL ANATOMY & EXTENDED SPOILER ================= */}
            {/* Aerodynamic Flared Heel Fin / Spoiler (Balenciaga / Alphafly style) */}
            <path
              d={
                category === 'running'
                  ? 'M 60,240 C 35,230 20,245 15,260 C 35,275 65,275 90,270 Z'
                  : 'M 75,245 C 50,240 40,250 35,262 C 55,272 80,272 100,268 Z'
              }
              fill="#181B19"
              stroke={accent}
              strokeWidth="1.5"
            />

            {/* Sculpted Heel Ankle Sock Collar (High-Fashion Fit) */}
            <path
              d="M 125,180 C 135,115 205,85 275,100 C 285,110 255,170 215,182 Z"
              fill="#141715"
              stroke="#323833"
              strokeWidth="2"
            />
            {/* Inner Collar Ribbing */}
            <path
              d="M 140,165 C 160,110 230,95 265,115"
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeDasharray="3 4"
            />

            {/* Tongue Pull Tab with Inscription */}
            <path
              d="M 230,92 L 255,85 L 262,105 L 238,110 Z"
              fill={accent}
            />

            {/* ================= OUTSOLE (TIẾP ĐỊA THỜI THƯỢNG) ================= */}
            {/* Sculptured Multi-pod Outsole */}
            <path
              d="M 50,265 C 95,255 190,285 330,285 C 475,285 560,255 615,265 C 620,305 540,332 420,332 C 260,332 120,325 35,288 C 30,275 38,268 50,265 Z"
              fill="#111312"
              stroke="#2B302C"
              strokeWidth="2"
            />

            {/* Raw Natural Gum Layer / Neon High-Grip Edge */}
            <path
              d="M 70,285 C 140,320 270,328 420,328 C 530,328 595,305 610,275"
              fill="none"
              stroke={category === 'badminton' ? '#C28945' : accent}
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* ================= HIGH-STACK MIDSOLE WITH HOLLOW BRIDGE ================= */}
            {/* Decoupled Chunky Midsole Upper Tier */}
            <path
              d="M 55,245 C 110,238 205,270 345,270 C 475,270 550,245 605,255 C 610,295 535,318 420,318 C 265,318 125,312 45,272 Z"
              fill={`url(#midsole-sculpt-${id})`}
            />

            {/* Midsole Sculptural Grooves & Geometric Chiseled Cuts */}
            <path
              d="M 120,295 L 180,265 L 230,298 L 290,268 L 360,300 L 440,268 L 520,298"
              fill="none"
              stroke="#0B0D0C"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* HOLLOW SUSPENSION TUNNEL (Lỗ hổng đệm khí phong cách thời thượng) */}
            <ellipse
              cx="220"
              cy="288"
              rx="24"
              ry="14"
              fill="#0B0D0C"
              stroke={accent}
              strokeWidth="2.5"
            />
            <ellipse
              cx="310"
              cy="288"
              rx="26"
              ry="14"
              fill="#0B0D0C"
              stroke={accent}
              strokeWidth="2.5"
            />
            <ellipse
              cx="410"
              cy="282"
              rx="22"
              ry="13"
              fill="#0B0D0C"
              stroke="#FFFFFF"
              strokeWidth="2"
            />

            {/* Internal Glowing Nitrogen Bubble Capsule inside Tunnels */}
            <circle cx="220" cy="288" r="8" fill={accent} opacity="0.9" style={{ filter: 'blur(2px)' }} />
            <circle cx="310" cy="288" r="9" fill={accent} opacity="0.9" style={{ filter: 'blur(2px)' }} />
            <circle cx="410" cy="282" r="7" fill="#FFFFFF" opacity="0.9" style={{ filter: 'blur(2px)' }} />

            {/* ================= SỢI CARBON TIÊN TIẾN (PROPULSION CARBON BLADE) ================= */}
            <path
              d="M 170,280 C 270,295 380,295 490,270 L 485,278 C 375,305 265,305 165,288 Z"
              fill={`url(#carbon-plate-grad-${id})`}
              stroke={accent}
              strokeWidth="1.8"
            />

            {/* ================= UPPER SILHOUETTE (THÂN GIÀY HI-TECH) ================= */}
            {/* Main Upper Body */}
            <path
              d={
                category === 'running'
                  ? 'M 80,240 C 115,160 185,105 315,100 C 405,95 480,130 535,178 C 570,208 600,240 610,256 C 575,272 470,285 330,285 C 195,285 100,268 80,240 Z'
                  : 'M 90,235 C 120,155 195,110 310,110 C 395,110 465,140 520,185 C 560,215 588,245 600,258 C 565,274 465,284 330,284 C 205,284 110,268 90,235 Z'
              }
              fill={`url(#upper-lux-${id})`}
              stroke="#3D443F"
              strokeWidth="1.8"
            />

            {/* Translucent Breathable Ripstop Overlay */}
            <path
              d="M 140,230 C 180,150 250,120 350,120 C 430,120 490,150 530,195 C 500,245 400,265 300,265 C 200,265 150,248 140,230 Z"
              fill={`url(#ripstop-grid-${id})`}
            />

            {/* Architectural TPU Cyber-Cage (Lồng trợ lực phong cách Balenciaga/Salomon) */}
            <path
              d="M 240,265 L 280,175 L 325,170 L 360,265 L 340,265 L 310,185 L 290,188 L 260,265 Z"
              fill={`url(#accent-rib-${id})`}
              opacity="0.9"
            />
            <path
              d="M 360,265 L 395,180 L 440,175 L 475,265 L 455,265 L 430,192 L 410,195 L 380,265 Z"
              fill="#1F2420"
              stroke={accent}
              strokeWidth="1.2"
            />

            {/* Dynamic Kinetic Racing Speed-Swoosh Stripe */}
            <path
              d="M 130,225 C 220,175 365,170 520,225"
              fill="none"
              stroke={accent}
              strokeWidth="4.5"
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 6px ${accent}80)` }}
            />
            <path
              d="M 175,242 C 255,195 385,190 490,242"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              opacity="0.65"
            />

            {/* Asymmetrical High-Fashion Speed Lacing Matrix */}
            <g stroke="#F5F5F0" strokeWidth="2.8" strokeLinecap="round" opacity="0.95">
              <line x1="285" y1="140" x2="325" y2="132" stroke={accent} />
              <line x1="305" y1="158" x2="348" y2="150" />
              <line x1="325" y1="176" x2="372" y2="168" stroke={accent} />
              <line x1="345" y1="194" x2="396" y2="186" />
              <line x1="365" y1="212" x2="420" y2="204" />
            </g>

            {/* Brutalist Faceted Toe Shield (Bọc Mũi Chống Va Đập) */}
            <path
              d="M 525,185 C 560,215 595,244 608,258 C 585,268 545,268 518,260 C 495,225 500,205 525,185 Z"
              fill="#181C19"
              stroke={accent}
              strokeWidth="1.5"
            />

            {/* Heel Counter Chrome Stabilizer Shield */}
            <path
              d="M 80,240 C 72,210 95,185 125,185 C 118,215 110,245 80,240 Z"
              fill={accent}
              opacity="0.95"
            />
            <circle cx="102" cy="205" r="4" fill="#0B0D0C" />

            {/* Editorial Technical Micro-Typography */}
            <text
              x="220"
              y="235"
              fill="#F5F5F0"
              fontSize="11"
              fontWeight="900"
              letterSpacing="2.5"
              opacity="0.85"
              fontFamily="'Archivo', sans-serif"
            >
              ANNASHOP® // {category.toUpperCase()}
            </text>

            <text
              x="385"
              y="256"
              fill={accent}
              fontSize="9"
              fontWeight="800"
              letterSpacing="1.5"
              fontFamily="'Space Grotesk', monospace"
            >
              CHASSIS: {product.specs.drop.toUpperCase()} · LAB EDITION 2026
            </text>
          </svg>
        )}

        {/* =========================================================================
            VIEW 2: SOLE TRACTION MAP (Mặt Đế Công Nghệ Đa Hướng)
            ========================================================================= */}
        {angle === 'sole' && (
          <svg
            viewBox="0 0 680 400"
            className="w-full h-auto drop-shadow-[0_30px_45px_rgba(0,0,0,0.92)] max-w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ground shadow */}
            <ellipse cx="340" cy="340" rx="220" ry="20" fill="#000000" opacity="0.8" style={{ filter: 'blur(10px)' }} />

            {/* Outer Sole Silhouette */}
            <path
              d="M 120,200 C 120,110 200,90 340,90 C 480,90 560,110 560,200 C 560,290 480,310 340,310 C 200,310 120,290 120,200 Z"
              fill="#121513"
              stroke="#2B302C"
              strokeWidth="3"
            />

            {/* Forefoot Grip Zones */}
            <g fill="none" stroke={accent} strokeWidth="2.5">
              <circle cx="440" cy="200" r="60" strokeDasharray="8 6" />
              <circle cx="440" cy="200" r="40" strokeDasharray="6 4" />
              <circle cx="440" cy="200" r="20" />
            </g>

            {/* Midfoot Exposed Carbon Fiber Plate */}
            <rect
              x="280"
              y="140"
              width="90"
              height="120"
              rx="12"
              fill="#1A1E1B"
              stroke={accent}
              strokeWidth="2"
            />
            <path
              d="M 285,150 L 365,250 M 285,180 L 365,220 M 285,220 L 365,180 M 285,250 L 365,150"
              stroke="#2E3530"
              strokeWidth="2"
            />
            <text
              x="325"
              y="205"
              fill={accent}
              fontSize="10"
              fontWeight="900"
              textAnchor="middle"
              fontFamily="'Space Grotesk', monospace"
            >
              CARBON SHANK
            </text>

            {/* Heel High-Traction Pods */}
            <g fill="#1D221F" stroke="#3A423C" strokeWidth="2">
              <rect x="150" y="140" width="100" height="40" rx="6" />
              <rect x="150" y="220" width="100" height="40" rx="6" />
            </g>
            <path
              d="M 160,160 L 240,160 M 160,240 L 240,240"
              stroke={accent}
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Brand Logo Stamp */}
            <text
              x="440"
              y="205"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="900"
              letterSpacing="2"
              textAnchor="middle"
              fontFamily="'Archivo', sans-serif"
            >
              HEXA-TRACTION
            </text>
          </svg>
        )}

        {/* =========================================================================
            VIEW 3: TOP-DOWN AERODYNAMIC VIEW (Góc Nhìn Từ Trên)
            ========================================================================= */}
        {angle === 'top' && (
          <svg
            viewBox="0 0 680 400"
            className="w-full h-auto drop-shadow-[0_30px_45px_rgba(0,0,0,0.92)] max-w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ground shadow */}
            <ellipse cx="340" cy="340" rx="220" ry="20" fill="#000000" opacity="0.8" style={{ filter: 'blur(10px)' }} />

            {/* Top Silhouette of the Shoe */}
            <path
              d="M 120,200 C 130,120 220,110 340,110 C 460,110 550,135 570,200 C 550,265 460,290 340,290 C 220,290 130,280 120,200 Z"
              fill="#131614"
              stroke="#343B36"
              strokeWidth="2.5"
            />

            {/* Ankle Collar Opening */}
            <ellipse
              cx="220"
              cy="200"
              rx="45"
              ry="32"
              fill="#0B0D0C"
              stroke={accent}
              strokeWidth="2.5"
            />
            {/* Insole Branding */}
            <text
              x="220"
              y="204"
              fill="#F5F5F0"
              fontSize="10"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="2"
              fontFamily="'Archivo', sans-serif"
            >
              ANNASHOP®
            </text>

            {/* Speed Lacing Ribs Top View */}
            <g stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
              <line x1="285" y1="180" x2="310" y2="220" />
              <line x1="315" y1="175" x2="340" y2="225" />
              <line x1="345" y1="170" x2="370" y2="230" />
              <line x1="375" y1="175" x2="400" y2="225" />
              <line x1="405" y1="180" x2="430" y2="220" />
            </g>

            {/* Toe Box Aerodynamic Mesh Grid */}
            <path
              d="M 450,150 C 490,165 525,180 540,200 C 525,220 490,235 450,250 Z"
              fill="#181D1A"
              stroke={accent}
              strokeWidth="1.5"
            />
            <line x1="450" y1="200" x2="535" y2="200" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        )}

        {/* Cinematic Floating Micro-Labels for Hero & Spotlight */}
        {(isHero || isSpotlight) && angle === 'lateral' && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Tech Point 1: Carbon / Outsole */}
            <div className="absolute bottom-[16%] left-[10%] hidden sm:flex items-center gap-2.5 text-xs font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8FF2F] shadow-[0_0_12px_#C8FF2F] animate-pulse" />
              <div className="bg-[#0B0D0C]/90 backdrop-blur-md border border-[#252824] px-3 py-1.5 text-[#F5F5F0] shadow-lg">
                <span className="text-[#C8FF2F] font-bold">01/</span> {product.techHighlights[0] || 'Carbon Plate 2026'}
              </div>
            </div>

            {/* Tech Point 2: Cushioning */}
            <div className="absolute top-[26%] right-[6%] hidden sm:flex items-center gap-2.5 text-xs font-mono">
              <div className="bg-[#0B0D0C]/90 backdrop-blur-md border border-[#252824] px-3 py-1.5 text-[#F5F5F0] shadow-lg">
                <span className="text-[#C8FF2F] font-bold">02/</span> {product.techHighlights[1] || 'Nitro-Foam Dual Cavity'}
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8FF2F] shadow-[0_0_12px_#C8FF2F] animate-pulse" />
            </div>

            {/* Tech Point 3: Upper */}
            <div className="absolute top-[16%] left-[24%] hidden md:flex items-center gap-2.5 text-xs font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#FFF]" />
              <div className="bg-[#0B0D0C]/90 backdrop-blur-md border border-[#252824] px-3 py-1.5 text-[#F5F5F0] shadow-lg">
                <span className="text-white font-bold">03/</span> {product.techHighlights[2] || 'Aero-Weave Ripstop'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
