import React from 'react';
import type { Gender, OutfitMode } from '../types';
import { getColorHex } from '../utils';

interface AvatarProps {
  gender: Gender;
  mode: OutfitMode;
  colors: {
    outerwear: string;
    top: string;
    topType?: string;
    topPattern?: string;
    bottom: string;
    dress: string;
  };
}

// Premium fashion illustration palette
const SKIN = '#e8c4a0';
const SKIN_SHADE = '#c89878';
const SKIN_LIGHT = '#f5dcc0';
const SKIN_DEEP = '#a87858';
const HAIR_DARK = '#1a0e08';
const HAIR_MID = '#3a2418';
const HAIR_HL = '#7a4a2a';

const Avatar: React.FC<AvatarProps> = ({ gender, mode, colors }) => {
  const getFill = (color: string) => {
    if (color === 'auto') return 'rgba(148,163,184,0.1)';
    if (color === 'none') return 'transparent';
    return getColorHex(color);
  };

  const getOutline = (color: string) => {
    if (color === 'auto') return 'rgba(148,163,184,0.45)';
    if (color === 'none') return 'transparent';
    if (['black', 'black-leather', 'black-denim'].includes(color)) return 'rgba(255,255,255,0.18)';
    return 'rgba(20,20,30,0.35)';
  };

  const asDash = (color: string) => (color === 'auto' ? '4 3' : 'none');

  const getPatternFill = () => {
    const p = colors.topPattern;
    if (!p || p === 'solid' || p === 'auto') return null;
    return `url(#pat-${p})`;
  };

  const renderShirtCollar = () => {
    if (colors.topType !== 'shirt') return null;
    return (
      <g>
        <path d="M 88 86 L 100 110 L 112 86 L 108 84 L 100 104 L 92 84 Z"
          fill="rgba(255,255,255,0.95)" stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" strokeLinejoin="round" />
      </g>
    );
  };

  // ── Male: tall slim runway model proportions ────────────────────────
  const renderMale = () => {
    const tf = getFill(colors.top), ts = getOutline(colors.top), td = asDash(colors.top);
    const bf = getFill(colors.bottom), bs = getOutline(colors.bottom), bd = asDash(colors.bottom);
    const pf = getPatternFill();
    const isDenim = colors.bottom.includes('denim');

    // Slim, tall silhouette - shoulders narrower, longer torso
    const torso = 'M 72 92 C 66 100 64 118 66 138 C 67 156 70 178 73 198 L 75 234 L 125 234 L 127 198 C 130 178 133 156 134 138 C 136 118 134 100 128 92 C 122 90 116 90 100 90 C 84 90 78 90 72 92 Z';

    // Slim arms - more elegant
    const armL = 'M 72 92 C 64 118 56 154 54 188 C 53 195 56 200 62 201 C 67 201 70 198 70 192 C 72 158 76 124 80 96 Z';
    const armR = 'M 128 92 C 136 118 144 154 146 188 C 147 195 144 200 138 201 C 133 201 130 198 130 192 C 128 158 124 124 120 96 Z';

    return (
      <g>
        {/* Torso */}
        <path d={torso} fill={tf} stroke={ts} strokeWidth="1.5" strokeDasharray={td} strokeLinejoin="round" />
        {pf && <path d={torso} fill={pf} />}
        {/* Body shadow - left side darker */}
        <path d="M 72 92 C 66 100 64 118 66 138 C 67 156 70 178 73 198 L 75 234 L 100 234 L 100 90 C 84 90 78 90 72 92 Z"
          fill="url(#bodyShadowL)" opacity="0.35" pointerEvents="none" />
        {/* Highlight - right side */}
        <path d="M 100 90 L 100 234 L 125 234 L 127 198 C 130 178 133 156 134 138 C 136 118 134 100 128 92 C 122 90 116 90 100 90 Z"
          fill="url(#bodyHighlightR)" opacity="0.25" pointerEvents="none" />
        {/* Subtle vertical seam */}
        <path d="M 100 96 L 100 230" stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />

        {/* Arms */}
        <path d={armL} fill={tf} stroke={ts} strokeWidth="1.3" strokeDasharray={td} strokeLinejoin="round" />
        <path d={armR} fill={tf} stroke={ts} strokeWidth="1.3" strokeDasharray={td} strokeLinejoin="round" />
        {pf && <><path d={armL} fill={pf} /><path d={armR} fill={pf} /></>}
        <path d={armL} fill="url(#armShadow)" opacity="0.4" pointerEvents="none" />
        <path d={armR} fill="url(#armShadow)" opacity="0.4" pointerEvents="none" />

        {/* Hands - graceful */}
        <ellipse cx="58" cy="206" rx="6" ry="9" fill={SKIN} stroke="rgba(0,0,0,0.18)" strokeWidth="0.7" />
        <ellipse cx="142" cy="206" rx="6" ry="9" fill={SKIN} stroke="rgba(0,0,0,0.18)" strokeWidth="0.7" />
        <ellipse cx="56" cy="203" rx="2.5" ry="3.5" fill={SKIN_LIGHT} opacity="0.6" />
        <ellipse cx="140" cy="203" rx="2.5" ry="3.5" fill={SKIN_LIGHT} opacity="0.6" />
        {/* Finger indication */}
        <path d="M 55 213 L 56 216 M 58 214 L 58 217 M 61 213 L 62 216" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" strokeLinecap="round" />
        <path d="M 145 213 L 144 216 M 142 214 L 142 217 M 139 213 L 138 216" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" strokeLinecap="round" />

        {renderShirtCollar()}

        {/* Slim tailored pants with break at ankle */}
        <path d="M 75 232 C 76 250 78 290 80 360 L 76 384 L 92 384 L 96 360 C 98 290 99 260 100 232 Z"
          fill={bf} stroke={bs} strokeWidth="1.5" strokeDasharray={bd} strokeLinejoin="round" />
        <path d="M 125 232 C 124 250 122 290 120 360 L 124 384 L 108 384 L 104 360 C 102 290 101 260 100 232 Z"
          fill={bf} stroke={bs} strokeWidth="1.5" strokeDasharray={bd} strokeLinejoin="round" />

        {/* Pant shadows for depth */}
        <path d="M 75 232 C 76 250 78 290 80 360 L 76 384 L 88 384 L 88 232 Z" fill="url(#pantShadowL)" opacity="0.4" pointerEvents="none" />
        <path d="M 125 232 C 124 250 122 290 120 360 L 124 384 L 112 384 L 112 232 Z" fill="url(#pantShadowR)" opacity="0.4" pointerEvents="none" />

        {/* Center crease */}
        <line x1="86" y1="240" x2="84" y2="380" stroke="rgba(0,0,0,0.12)" strokeWidth="0.7" />
        <line x1="114" y1="240" x2="116" y2="380" stroke="rgba(0,0,0,0.12)" strokeWidth="0.7" />

        {/* Belt */}
        <path d="M 73 230 L 127 230 L 128 236 L 72 236 Z" fill="rgba(20,20,20,0.55)" stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" />
        <rect x="97" y="231" width="6" height="4" fill="#d4a02a" stroke="#8a6818" strokeWidth="0.4" rx="0.5" />

        {/* Denim details */}
        {isDenim && (
          <>
            <path d="M 78 240 L 92 240 M 108 240 L 122 240" stroke="rgba(255,225,180,0.45)" strokeWidth="0.6" strokeDasharray="2 1.5" />
            <path d="M 78 244 Q 84 250 90 244" fill="none" stroke="rgba(255,225,180,0.35)" strokeWidth="0.5" />
            <path d="M 110 244 Q 116 250 122 244" fill="none" stroke="rgba(255,225,180,0.35)" strokeWidth="0.5" />
            <circle cx="80" cy="240" r="0.8" fill="rgba(220,180,120,0.7)" />
            <circle cx="120" cy="240" r="0.8" fill="rgba(220,180,120,0.7)" />
          </>
        )}

        {/* Premium sneakers */}
        <g>
          {/* Left shoe */}
          <path d="M 62 384 L 92 384 Q 96 388 96 392 L 96 396 Q 90 400 78 400 L 60 400 Q 56 398 56 394 Z"
            fill="#fafafa" stroke="rgba(0,0,0,0.35)" strokeWidth="0.7" strokeLinejoin="round" />
          <path d="M 62 384 L 92 384 Q 96 388 96 392 L 64 392 Q 58 390 56 386 Z" fill="#1a1a1a" />
          <path d="M 70 388 L 88 388" stroke="rgba(255,255,255,0.5)" strokeWidth="0.7" />
          <ellipse cx="76" cy="398" rx="16" ry="2" fill="rgba(0,0,0,0.4)" />
          {/* Lace detail */}
          <path d="M 72 386 L 82 386 M 72 388 L 82 388" stroke="white" strokeWidth="0.5" opacity="0.6" />

          {/* Right shoe */}
          <path d="M 108 384 L 138 384 Q 144 398 140 400 L 122 400 Q 110 400 104 396 L 104 392 Q 104 388 108 384 Z"
            fill="#fafafa" stroke="rgba(0,0,0,0.35)" strokeWidth="0.7" strokeLinejoin="round" />
          <path d="M 108 384 L 138 384 Q 142 388 144 386 L 144 392 L 104 392 L 104 388 Z" fill="#1a1a1a" />
          <path d="M 112 388 L 130 388" stroke="rgba(255,255,255,0.5)" strokeWidth="0.7" />
          <ellipse cx="124" cy="398" rx="16" ry="2" fill="rgba(0,0,0,0.4)" />
          <path d="M 118 386 L 128 386 M 118 388 L 128 388" stroke="white" strokeWidth="0.5" opacity="0.6" />
        </g>
      </g>
    );
  };

  // ── Female: elongated, elegant runway proportions ────────────────────
  const renderFemaleTwoPiece = () => {
    const tf = getFill(colors.top), ts = getOutline(colors.top), td = asDash(colors.top);
    const bf = getFill(colors.bottom), bs = getOutline(colors.bottom), bd = asDash(colors.bottom);
    const pf = getPatternFill();

    // Hourglass with defined waist
    const torso = 'M 76 92 C 68 100 62 116 64 134 C 66 148 70 160 76 172 C 80 182 78 196 82 210 L 118 210 C 122 196 120 182 124 172 C 130 160 134 148 136 134 C 138 116 132 100 124 92 C 118 90 110 90 100 90 C 90 90 82 90 76 92 Z';

    const armL = 'M 76 92 C 64 118 54 152 52 184 C 51 191 54 196 60 197 C 65 197 68 194 68 188 C 70 156 74 122 80 96 Z';
    const armR = 'M 124 92 C 136 118 146 152 148 184 C 149 191 146 196 140 197 C 135 197 132 194 132 188 C 130 156 126 122 120 96 Z';

    return (
      <g>
        {/* Top */}
        <path d={torso} fill={tf} stroke={ts} strokeWidth="1.5" strokeDasharray={td} strokeLinejoin="round" />
        {pf && <path d={torso} fill={pf} />}
        <path d={torso} fill="url(#bodyShadowL)" opacity="0.3" pointerEvents="none" />
        {/* Waist definition */}
        <path d="M 78 168 Q 100 178 122 168" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" fill="none" />
        <path d="M 78 172 Q 100 180 122 172" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" fill="none" />

        {/* Arms */}
        <path d={armL} fill={tf} stroke={ts} strokeWidth="1.3" strokeDasharray={td} strokeLinejoin="round" />
        <path d={armR} fill={tf} stroke={ts} strokeWidth="1.3" strokeDasharray={td} strokeLinejoin="round" />
        {pf && <><path d={armL} fill={pf} /><path d={armR} fill={pf} /></>}
        <path d={armL} fill="url(#armShadow)" opacity="0.4" pointerEvents="none" />
        <path d={armR} fill="url(#armShadow)" opacity="0.4" pointerEvents="none" />

        {/* Delicate hands */}
        <ellipse cx="56" cy="202" rx="5" ry="8" fill={SKIN} stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" />
        <ellipse cx="144" cy="202" rx="5" ry="8" fill={SKIN} stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" />
        <ellipse cx="55" cy="200" rx="2" ry="3" fill={SKIN_LIGHT} opacity="0.6" />
        <ellipse cx="143" cy="200" rx="2" ry="3" fill={SKIN_LIGHT} opacity="0.6" />

        {renderShirtCollar()}

        {/* Elegant flowy A-line skirt or pants */}
        <path d="M 82 208 Q 84 214 82 222 C 76 256 64 296 50 326 L 150 326 C 136 296 124 256 118 222 Q 116 214 118 208 Z"
          fill={bf} stroke={bs} strokeWidth="1.5" strokeDasharray={bd} strokeLinejoin="round" />
        <path d="M 82 208 Q 84 214 82 222 C 76 256 70 296 60 326 L 100 326 L 100 208 Z" fill="url(#skirtShadowL)" opacity="0.35" pointerEvents="none" />
        <path d="M 100 208 L 100 326 L 140 326 C 130 296 124 256 118 222 Q 116 214 118 208 Z" fill="url(#skirtHighlightR)" opacity="0.2" pointerEvents="none" />

        {/* Skirt fold lines */}
        <path d="M 100 215 L 100 322" stroke="rgba(0,0,0,0.1)" strokeWidth="0.7" />
        <path d="M 86 220 L 70 322" stroke="rgba(0,0,0,0.07)" strokeWidth="0.5" />
        <path d="M 114 220 L 130 322" stroke="rgba(0,0,0,0.07)" strokeWidth="0.5" />
        <path d="M 92 218 L 84 322" stroke="rgba(0,0,0,0.05)" strokeWidth="0.4" />
        <path d="M 108 218 L 116 322" stroke="rgba(0,0,0,0.05)" strokeWidth="0.4" />

        {/* Elongated graceful legs */}
        <path d="M 82 324 C 84 348 86 370 88 382 L 96 382 C 96 370 96 348 96 324 Z" fill={SKIN} stroke="rgba(0,0,0,0.18)" strokeWidth="0.7" />
        <path d="M 104 324 C 104 348 104 370 104 382 L 112 382 C 114 370 116 348 118 324 Z" fill={SKIN} stroke="rgba(0,0,0,0.18)" strokeWidth="0.7" />
        {/* Leg highlights */}
        <path d="M 86 328 L 88 376" stroke={SKIN_LIGHT} strokeWidth="2.5" opacity="0.55" strokeLinecap="round" />
        <path d="M 110 328 L 112 376" stroke={SKIN_LIGHT} strokeWidth="2.5" opacity="0.55" strokeLinecap="round" />
        {/* Ankle definition */}
        <path d="M 86 376 Q 90 378 92 376" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" fill="none" />
        <path d="M 108 376 Q 112 378 114 376" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" fill="none" />

        {/* Sophisticated stilettos */}
        <g>
          {/* Left */}
          <path d="M 80 380 Q 84 382 92 382 L 96 388 Q 92 392 84 392 Q 80 388 80 380 Z" fill="#0a0a0a" stroke="rgba(0,0,0,0.5)" strokeWidth="0.5" />
          <path d="M 82 382 Q 88 383 94 382" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" fill="none" />
          {/* Sharp heel */}
          <path d="M 91 390 L 93 402 L 90 402 Z" fill="#0a0a0a" />
          {/* Right */}
          <path d="M 108 382 Q 116 382 120 380 Q 120 388 116 392 Q 108 392 104 388 Z" fill="#0a0a0a" stroke="rgba(0,0,0,0.5)" strokeWidth="0.5" />
          <path d="M 106 382 Q 112 383 118 382" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" fill="none" />
          <path d="M 109 390 L 107 402 L 110 402 Z" fill="#0a0a0a" />
        </g>
      </g>
    );
  };

  // ── Female one-piece dress ───────────────────────────────────────────
  const renderFemaleOnePiece = () => {
    const df = getFill(colors.dress), ds = getOutline(colors.dress), dd = asDash(colors.dress);

    const dress = 'M 76 92 C 68 100 62 116 64 134 C 66 148 70 160 76 172 C 80 182 78 196 80 208 C 76 232 64 280 50 326 L 150 326 C 136 280 124 232 120 208 C 122 196 120 182 124 172 C 130 160 134 148 136 134 C 138 116 132 100 124 92 C 118 90 110 90 100 90 C 90 90 82 90 76 92 Z';

    return (
      <g>
        <path d={dress} fill={df} stroke={ds} strokeWidth="1.5" strokeDasharray={dd} strokeLinejoin="round" />
        <path d={dress} fill="url(#bodyShadowL)" opacity="0.3" pointerEvents="none" />

        {/* Sleeves */}
        <path d="M 76 92 C 64 118 54 152 52 184 C 51 191 54 196 60 197 C 65 197 68 194 68 188 C 70 156 74 122 80 96 Z" fill={df} stroke={ds} strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M 124 92 C 136 118 146 152 148 184 C 149 191 146 196 140 197 C 135 197 132 194 132 188 C 130 156 126 122 120 96 Z" fill={df} stroke={ds} strokeWidth="1.3" strokeLinejoin="round" />

        {/* Hands */}
        <ellipse cx="56" cy="202" rx="5" ry="8" fill={SKIN} stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" />
        <ellipse cx="144" cy="202" rx="5" ry="8" fill={SKIN} stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" />

        {/* Defined waist with belt suggestion */}
        <path d="M 76 168 Q 100 180 124 168" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1.4" />
        <path d="M 76 172 Q 100 182 124 172" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />

        {/* Dress flow */}
        <path d="M 100 210 L 100 322" stroke="rgba(0,0,0,0.09)" strokeWidth="0.7" />
        <path d="M 84 220 L 70 322" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
        <path d="M 116 220 L 130 322" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
        <path d="M 92 220 L 84 322" stroke="rgba(0,0,0,0.04)" strokeWidth="0.4" />
        <path d="M 108 220 L 116 322" stroke="rgba(0,0,0,0.04)" strokeWidth="0.4" />

        {/* Legs */}
        <path d="M 82 324 C 84 348 86 370 88 382 L 96 382 C 96 370 96 348 96 324 Z" fill={SKIN} stroke="rgba(0,0,0,0.18)" strokeWidth="0.7" />
        <path d="M 104 324 C 104 348 104 370 104 382 L 112 382 C 114 370 116 348 118 324 Z" fill={SKIN} stroke="rgba(0,0,0,0.18)" strokeWidth="0.7" />
        <path d="M 86 328 L 88 376" stroke={SKIN_LIGHT} strokeWidth="2.5" opacity="0.55" strokeLinecap="round" />
        <path d="M 110 328 L 112 376" stroke={SKIN_LIGHT} strokeWidth="2.5" opacity="0.55" strokeLinecap="round" />

        {/* Stilettos */}
        <g>
          <path d="M 80 380 Q 84 382 92 382 L 96 388 Q 92 392 84 392 Q 80 388 80 380 Z" fill="#0a0a0a" stroke="rgba(0,0,0,0.5)" strokeWidth="0.5" />
          <path d="M 91 390 L 93 402 L 90 402 Z" fill="#0a0a0a" />
          <path d="M 108 382 Q 116 382 120 380 Q 120 388 116 392 Q 108 392 104 388 Z" fill="#0a0a0a" stroke="rgba(0,0,0,0.5)" strokeWidth="0.5" />
          <path d="M 109 390 L 107 402 L 110 402 Z" fill="#0a0a0a" />
        </g>
      </g>
    );
  };

  // ── Premium tailored outerwear ───────────────────────────────────────
  const renderOuterwear = () => {
    if (colors.outerwear === 'none') return null;
    const isAuto = colors.outerwear === 'auto';
    const leather = colors.outerwear.includes('-leather');
    const base = isAuto ? 'auto' : colors.outerwear.replace('-leather', '');
    const fill = getFill(base);
    const stroke = getOutline(isAuto ? 'auto' : colors.outerwear);
    const dashArr = asDash(isAuto ? 'auto' : 'solid');

    const isFem = gender === 'female';
    const vY = 122;
    const hemY = isFem ? 224 : 246;
    const sL = isFem ? 70 : 68;
    const sR = isFem ? 130 : 132;
    const gL = 92, gR = 108;
    const gLB = 82, gRB = 118;

    const leftPanel = isFem
      ? `M ${sL} 90 C 60 102 56 122 60 142 C 64 158 70 174 ${gLB - 2} ${hemY} L ${gLB} ${hemY} L ${gL} 90 Z`
      : `M ${sL} 90 C 56 102 54 124 56 144 C 58 168 64 196 ${gLB - 4} ${hemY} L ${gLB} ${hemY} L ${gL} 90 Z`;
    const rightPanel = isFem
      ? `M ${sR} 90 C 140 102 144 122 140 142 C 136 158 130 174 ${gRB + 2} ${hemY} L ${gRB} ${hemY} L ${gR} 90 Z`
      : `M ${sR} 90 C 144 102 146 124 144 144 C 142 168 136 196 ${gRB + 4} ${hemY} L ${gRB} ${hemY} L ${gR} 90 Z`;

    const armLPath = isFem
      ? `M ${sL} 90 C 56 118 50 152 50 184 C 49 191 52 196 58 197 C 63 197 66 194 66 188 C 68 156 72 122 78 96 Z`
      : `M ${sL} 90 C 50 116 42 152 42 188 C 41 195 44 200 50 201 C 55 201 58 198 58 192 C 60 158 64 124 70 96 Z`;
    const armRPath = isFem
      ? `M ${sR} 90 C 144 118 150 152 150 184 C 151 191 148 196 142 197 C 137 197 134 194 134 188 C 132 156 128 122 122 96 Z`
      : `M ${sR} 90 C 150 116 158 152 158 188 C 159 195 156 200 150 201 C 145 201 142 198 142 192 C 140 158 136 124 130 96 Z`;

    const detailStroke = leather ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.32)';
    const cuffY = isFem ? 188 : 192;

    return (
      <g>
        {/* Sleeves */}
        <path d={armLPath} fill={fill} stroke={stroke} strokeWidth="1.5" strokeDasharray={dashArr} strokeLinejoin="round" />
        <path d={armRPath} fill={fill} stroke={stroke} strokeWidth="1.5" strokeDasharray={dashArr} strokeLinejoin="round" />
        <path d={armLPath} fill="url(#armShadow)" opacity="0.45" pointerEvents="none" />
        <path d={armRPath} fill="url(#armShadow)" opacity="0.45" pointerEvents="none" />

        {/* Panels */}
        <path d={leftPanel} fill={fill} stroke={stroke} strokeWidth="1.5" strokeDasharray={dashArr} strokeLinejoin="round" />
        <path d={rightPanel} fill={fill} stroke={stroke} strokeWidth="1.5" strokeDasharray={dashArr} strokeLinejoin="round" />
        <path d={leftPanel} fill="url(#jacketShadowL)" opacity="0.5" pointerEvents="none" />
        <path d={rightPanel} fill="url(#jacketHighlightR)" opacity="0.3" pointerEvents="none" />

        {/* Notched lapels - sharp tailored */}
        <path d={`M ${gL} 90 L ${gL - 18} ${vY - 8} L ${gL - 14} ${vY + 4} L 100 ${vY + 2} Z`}
          fill={fill} stroke={detailStroke} strokeWidth="1" strokeLinejoin="round" />
        <path d={`M ${gL} 90 L ${gL - 14} ${vY - 6} L 100 ${vY} Z`}
          fill="rgba(255,255,255,0.18)" pointerEvents="none" />
        <path d={`M ${gR} 90 L ${gR + 18} ${vY - 8} L ${gR + 14} ${vY + 4} L 100 ${vY + 2} Z`}
          fill={fill} stroke={detailStroke} strokeWidth="1" strokeLinejoin="round" />
        <path d={`M ${gR} 90 L ${gR + 14} ${vY - 6} L 100 ${vY} Z`}
          fill="rgba(255,255,255,0.18)" pointerEvents="none" />

        {/* Lapel notch detail */}
        <path d={`M ${gL - 14} ${vY + 4} L ${gL - 17} ${vY + 1}`} stroke={detailStroke} strokeWidth="0.7" />
        <path d={`M ${gR + 14} ${vY + 4} L ${gR + 17} ${vY + 1}`} stroke={detailStroke} strokeWidth="0.7" />

        {/* Front opening - subtle */}
        <line x1={gL} y1="90" x2={gLB} y2={hemY} stroke={detailStroke} strokeWidth="0.9" />
        <line x1={gR} y1="90" x2={gRB} y2={hemY} stroke={detailStroke} strokeWidth="0.9" />

        {/* Buttons - shiny premium */}
        {[vY + 18, vY + 42, vY + 66].filter(by => by < hemY - 20).map((by, i) => (
          <g key={i}>
            <circle cx={gRB - 5} cy={by} r="2.6" fill={leather ? '#1a1a1a' : 'rgba(40,30,20,0.85)'} stroke={detailStroke} strokeWidth="0.4" />
            <circle cx={gRB - 5.5} cy={by - 0.7} r="1" fill={leather ? 'rgba(255,255,255,0.6)' : 'rgba(255,220,150,0.7)'} />
            <circle cx={gRB - 4.5} cy={by + 0.5} r="0.4" fill="rgba(0,0,0,0.4)" />
          </g>
        ))}

        {/* Welt pockets */}
        <path d={`M ${isFem ? 62 : 58} ${hemY - 32} L ${isFem ? 80 : 78} ${hemY - 32}`}
          stroke={detailStroke} strokeWidth="1.1" />
        <path d={`M ${isFem ? 120 : 122} ${hemY - 32} L ${isFem ? 138 : 142} ${hemY - 32}`}
          stroke={detailStroke} strokeWidth="1.1" />

        {/* Tailored cuffs */}
        <rect x={isFem ? 48 : 40} y={cuffY - 2} width={isFem ? 18 : 22} height="5" rx="0.5"
          fill={fill} stroke={detailStroke} strokeWidth="0.8" />
        <line x1={isFem ? 50 : 42} y1={cuffY + 4} x2={isFem ? 64 : 60} y2={cuffY + 4} stroke={detailStroke} strokeWidth="0.6" />
        <rect x={isFem ? 134 : 138} y={cuffY - 2} width={isFem ? 18 : 22} height="5" rx="0.5"
          fill={fill} stroke={detailStroke} strokeWidth="0.8" />
        <line x1={isFem ? 136 : 140} y1={cuffY + 4} x2={isFem ? 150 : 158} y2={cuffY + 4} stroke={detailStroke} strokeWidth="0.6" />

        {/* Cuff buttons */}
        {[0, 1].map(i => (
          <React.Fragment key={i}>
            <circle cx={(isFem ? 51 : 44) + i * 4} cy={cuffY + 0.5} r="0.7" fill={detailStroke} />
            <circle cx={(isFem ? 139 : 144) + i * 4} cy={cuffY + 0.5} r="0.7" fill={detailStroke} />
          </React.Fragment>
        ))}

        {/* Leather sheen overlays */}
        {leather && (
          <g pointerEvents="none">
            <path d={isFem ? `M ${sL + 6} 110 L ${sL + 12} 110 L 64 165 L 58 165 Z` : `M ${sL + 6} 112 L ${sL + 14} 112 L 60 175 L 52 175 Z`}
              fill="rgba(255,255,255,0.22)" />
            <path d={isFem ? `M ${sR - 6} 110 L ${sR - 12} 110 L 136 165 L 142 165 Z` : `M ${sR - 6} 112 L ${sR - 14} 112 L 140 175 L 148 175 Z`}
              fill="rgba(255,255,255,0.22)" />
            <ellipse cx={isFem ? 76 : 74} cy="105" rx="8" ry="3" fill="rgba(255,255,255,0.3)" opacity="0.7" />
            <ellipse cx={isFem ? 124 : 126} cy="105" rx="8" ry="3" fill="rgba(255,255,255,0.3)" opacity="0.7" />
          </g>
        )}
      </g>
    );
  };

  return (
    <svg viewBox="0 0 200 420" style={{ width: '100%', height: '100%', maxHeight: '420px', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.18))' }}>
      <defs>
        {/* Patterns */}
        <pattern id="pat-stripe" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">
          <rect width="2" height="6" fill="rgba(0,0,0,0.3)" />
        </pattern>
        <pattern id="pat-check" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="6" height="12" fill="rgba(0,0,0,0.15)" />
          <rect width="12" height="6" fill="rgba(0,0,0,0.15)" />
        </pattern>
        <pattern id="pat-gingham" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="5" height="10" fill="rgba(255,255,255,0.4)" />
          <rect width="10" height="5" fill="rgba(255,255,255,0.4)" />
          <rect width="5" height="5" fill="rgba(255,255,255,0.6)" />
        </pattern>

        {/* Body shading gradients */}
        <linearGradient id="bodyShadowL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0.5)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        <linearGradient id="bodyHighlightR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
        </linearGradient>
        <linearGradient id="armShadow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
          <stop offset="50%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
        </linearGradient>
        <linearGradient id="pantShadowL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        <linearGradient id="pantShadowR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
        </linearGradient>
        <linearGradient id="skirtShadowL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        <linearGradient id="skirtHighlightR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
        </linearGradient>
        <linearGradient id="jacketShadowL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0.5)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        <linearGradient id="jacketHighlightR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
        </linearGradient>

        {/* Skin gradients */}
        <radialGradient id="faceShade" cx="40%" cy="38%" r="65%">
          <stop offset="0%" stopColor={SKIN_LIGHT} />
          <stop offset="50%" stopColor={SKIN} />
          <stop offset="100%" stopColor={SKIN_SHADE} />
        </radialGradient>
        <linearGradient id="neckShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SKIN} />
          <stop offset="100%" stopColor={SKIN_DEEP} />
        </linearGradient>

        {/* Hair gloss */}
        <linearGradient id="hairGlossM" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HAIR_HL} stopOpacity="0.6" />
          <stop offset="40%" stopColor={HAIR_MID} />
          <stop offset="100%" stopColor={HAIR_DARK} />
        </linearGradient>
        <linearGradient id="hairGlossF" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={HAIR_HL} stopOpacity="0.7" />
          <stop offset="30%" stopColor={HAIR_MID} />
          <stop offset="70%" stopColor={HAIR_DARK} />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>

        {/* Soft floor shadow */}
        <radialGradient id="floorShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* Lip gloss */}
        <linearGradient id="lipGloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,180,180,0.95)" />
          <stop offset="100%" stopColor="rgba(180,40,70,0.95)" />
        </linearGradient>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="100" cy="412" rx="60" ry="6" fill="url(#floorShadow)" />

      {/* Female: shoulder-length back hair (kept aligned with the lowered head) */}
      {gender === 'female' && (
        <g fill="url(#hairGlossF)" transform="translate(0, 16)">
          <path d="M 72 28 C 64 50 60 80 64 110 C 66 122 70 128 76 128 L 84 126 C 82 100 80 60 86 40 Z" />
          <path d="M 128 28 C 136 50 140 80 136 110 C 134 122 130 128 124 128 L 116 126 C 118 100 120 60 114 40 Z" />
          <path d="M 70 50 Q 66 90 70 122" stroke={HAIR_HL} strokeWidth="0.6" fill="none" opacity="0.4" />
          <path d="M 130 50 Q 134 90 130 122" stroke={HAIR_HL} strokeWidth="0.6" fill="none" opacity="0.4" />
        </g>
      )}

      {/* Body */}
      {gender === 'male' && renderMale()}
      {gender === 'female' && mode === 'two-piece' && renderFemaleTwoPiece()}
      {gender === 'female' && mode === 'one-piece' && renderFemaleOnePiece()}

      {/* Outerwear */}
      {renderOuterwear()}

      {/* Short neck (visible ~12px) — head sits lower so they don't visually detach */}
      <path d="M 91 80 L 91 100 Q 100 104 109 100 L 109 80 Z" fill="url(#neckShade)" />
      <path d="M 91 92 Q 100 100 109 92 L 109 100 Q 100 104 91 100 Z" fill={SKIN_DEEP} opacity="0.4" />
      <path d="M 87 96 Q 100 100 113 96" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" fill="none" />

      {/* Head + hair + face — moved down 16px so the neck reads short */}
      <g transform="translate(0, 16)">
        {/* Round head */}
        <circle cx="100" cy="44" r="24" fill="url(#faceShade)" />

        {/* Hair */}
        {gender === 'male' ? (
          <>
            <path d="M 78 40 Q 76 18 100 16 Q 124 18 122 40 Q 120 28 110 24 Q 100 20 90 24 Q 80 28 78 40 Z" fill="url(#hairGlossM)" />
            <ellipse cx="100" cy="22" rx="14" ry="2.5" fill={HAIR_HL} opacity="0.5" />
          </>
        ) : (
          <>
            <path d="M 76 42 Q 72 14 100 12 Q 128 14 124 42 Q 124 52 120 58 L 116 54 Q 110 26 100 26 Q 90 26 84 54 L 80 58 Q 76 52 76 42 Z" fill="url(#hairGlossF)" />
            <ellipse cx="100" cy="20" rx="16" ry="3" fill={HAIR_HL} opacity="0.5" />
          </>
        )}

        {/* Eyes */}
        <circle cx="91" cy="46" r="2" fill="#1a1208" />
        <circle cx="109" cy="46" r="2" fill="#1a1208" />
        <circle cx="91.6" cy="45.4" r="0.6" fill="white" />
        <circle cx="109.6" cy="45.4" r="0.6" fill="white" />

        {/* Blush */}
        <ellipse cx="84" cy="54" rx="4" ry="2.5" fill="rgba(255,150,150,0.35)" />
        <ellipse cx="116" cy="54" rx="4" ry="2.5" fill="rgba(255,150,150,0.35)" />

        {/* Smile */}
        <path d="M 96 56 Q 100 59 104 56" fill="none" stroke="rgba(160,80,80,0.85)" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export default Avatar;
