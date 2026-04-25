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

const SKIN = '#f0d0b0';
const SKIN_SHADE = '#d4a87f';
const HAIR = '#2a1810';
const HAIR_HL = '#5a3520';

const Avatar: React.FC<AvatarProps> = ({ gender, mode, colors }) => {
  const getFill = (color: string) => {
    if (color === 'auto') return 'rgba(128,128,128,0.1)';
    if (color === 'none') return 'transparent';
    return getColorHex(color);
  };

  const getOutline = (color: string) => {
    if (color === 'auto') return 'rgba(128,128,128,0.45)';
    if (color === 'none') return 'transparent';
    if (['black', 'black-leather', 'black-denim'].includes(color)) return 'rgba(255,255,255,0.2)';
    return 'rgba(0,0,0,0.18)';
  };

  const asDash = (color: string) => (color === 'auto' ? '5 3' : 'none');

  const getPatternFill = () => {
    const p = colors.topPattern;
    if (!p || p === 'solid' || p === 'auto') return null;
    return `url(#pat-${p})`;
  };

  const renderShirtCollar = () => {
    if (colors.topType !== 'shirt') return null;
    return (
      <path d="M 92 72 L 100 96 L 108 72"
        fill="rgba(255,255,255,0.85)" stroke="rgba(0,0,0,0.22)" strokeWidth="1" strokeLinejoin="round" />
    );
  };

  // ── Male: V-shape torso ──────────────────────────────────────────────
  const renderMale = () => {
    const tf = getFill(colors.top), ts = getOutline(colors.top), td = asDash(colors.top);
    const bf = getFill(colors.bottom), bs = getOutline(colors.bottom), bd = asDash(colors.bottom);
    const pf = getPatternFill();

    const torso = 'M 60 96 C 50 108 50 138 56 162 C 60 184 64 208 70 232 L 130 232 C 136 208 140 184 144 162 C 150 138 150 108 140 96 Z';
    const armL = 'M 60 96 C 48 130 42 160 44 184 L 60 184 C 62 160 66 130 74 100 Z';
    const armR = 'M 140 96 C 152 130 158 160 156 184 L 140 184 C 138 160 134 130 126 100 Z';

    return (
      <g>
        <path d={torso} fill={tf} stroke={ts} strokeWidth="2" strokeDasharray={td} strokeLinejoin="round" />
        {pf && <path d={torso} fill={pf} />}
        <path d={armL} fill={tf} stroke={ts} strokeWidth="1.5" strokeDasharray={td} strokeLinejoin="round" />
        <path d={armR} fill={tf} stroke={ts} strokeWidth="1.5" strokeDasharray={td} strokeLinejoin="round" />
        {pf && <><path d={armL} fill={pf} /><path d={armR} fill={pf} /></>}
        <circle cx="52" cy="190" r="7" fill={SKIN} stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
        <circle cx="148" cy="190" r="7" fill={SKIN} stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
        {renderShirtCollar()}
        {/* Pants - tapered */}
        <path d="M 72 228 L 100 228 L 102 384 L 76 384 Z" fill={bf} stroke={bs} strokeWidth="2" strokeDasharray={bd} strokeLinejoin="round" />
        <path d="M 100 228 L 128 228 L 124 384 L 98 384 Z" fill={bf} stroke={bs} strokeWidth="2" strokeDasharray={bd} strokeLinejoin="round" />
        <line x1="100" y1="232" x2="100" y2="290" stroke="rgba(0,0,0,0.15)" strokeWidth="1.2" />
        {/* Sneakers */}
        <ellipse cx="89" cy="389" rx="18" ry="6" fill="#222" />
        <ellipse cx="111" cy="389" rx="18" ry="6" fill="#222" />
        <ellipse cx="89" cy="385" rx="16" ry="4" fill="#3a3a3a" />
        <ellipse cx="111" cy="385" rx="16" ry="4" fill="#3a3a3a" />
        <line x1="76" y1="392" x2="102" y2="392" stroke="white" strokeWidth="1.2" opacity="0.6" />
        <line x1="98" y1="392" x2="124" y2="392" stroke="white" strokeWidth="1.2" opacity="0.6" />
      </g>
    );
  };

  // ── Female two-piece: hourglass ──────────────────────────────────────
  const renderFemaleTwoPiece = () => {
    const tf = getFill(colors.top), ts = getOutline(colors.top), td = asDash(colors.top);
    const bf = getFill(colors.bottom), bs = getOutline(colors.bottom), bd = asDash(colors.bottom);
    const pf = getPatternFill();

    const torso = 'M 68 96 C 56 108 54 132 64 152 C 72 168 70 188 76 208 L 124 208 C 130 188 128 168 136 152 C 146 132 144 108 132 96 Z';
    const armL = 'M 68 96 C 56 128 50 158 52 180 L 66 180 C 68 158 72 128 78 100 Z';
    const armR = 'M 132 96 C 144 128 150 158 148 180 L 134 180 C 132 158 128 128 122 100 Z';

    return (
      <g>
        <path d={torso} fill={tf} stroke={ts} strokeWidth="2" strokeDasharray={td} strokeLinejoin="round" />
        {pf && <path d={torso} fill={pf} />}
        <path d={armL} fill={tf} stroke={ts} strokeWidth="1.5" strokeDasharray={td} strokeLinejoin="round" />
        <path d={armR} fill={tf} stroke={ts} strokeWidth="1.5" strokeDasharray={td} strokeLinejoin="round" />
        {pf && <><path d={armL} fill={pf} /><path d={armR} fill={pf} /></>}
        <circle cx="59" cy="186" r="6" fill={SKIN} stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
        <circle cx="141" cy="186" r="6" fill={SKIN} stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
        {renderShirtCollar()}
        {/* A-line skirt */}
        <path d="M 76 204 L 124 204 L 148 320 L 52 320 Z" fill={bf} stroke={bs} strokeWidth="2" strokeDasharray={bd} strokeLinejoin="round" />
        {/* Tapered legs */}
        <path d="M 78 318 L 94 318 L 91 374 L 81 374 Z" fill={SKIN} stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
        <path d="M 106 318 L 122 318 L 119 374 L 109 374 Z" fill={SKIN} stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
        {/* Pumps with pointed toe + heel */}
        <path d="M 76 372 L 100 372 L 96 384 L 78 386 Z" fill="#1a1a1a" />
        <path d="M 100 372 L 124 372 L 122 386 L 104 384 Z" fill="#1a1a1a" />
        <ellipse cx="86" cy="386" rx="11" ry="3" fill="#0a0a0a" />
        <ellipse cx="114" cy="386" rx="11" ry="3" fill="#0a0a0a" />
        <rect x="80" y="384" width="4" height="8" fill="#0a0a0a" />
        <rect x="116" y="384" width="4" height="8" fill="#0a0a0a" />
      </g>
    );
  };

  // ── Female one-piece dress ───────────────────────────────────────────
  const renderFemaleOnePiece = () => {
    const df = getFill(colors.dress), ds = getOutline(colors.dress), dd = asDash(colors.dress);

    return (
      <g>
        {/* Fitted bodice + flared skirt in one piece */}
        <path d="M 68 96 C 56 108 54 132 64 152 C 72 168 70 184 70 196 L 50 320 L 150 320 L 130 196 C 130 184 128 168 136 152 C 146 132 144 108 132 96 Z"
          fill={df} stroke={ds} strokeWidth="2" strokeDasharray={dd} strokeLinejoin="round" />
        <path d="M 68 96 C 56 128 50 158 52 180 L 66 180 C 68 158 72 128 78 100 Z" fill={df} stroke={ds} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M 132 96 C 144 128 150 158 148 180 L 134 180 C 132 158 128 128 122 100 Z" fill={df} stroke={ds} strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="59" cy="186" r="6" fill={SKIN} stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
        <circle cx="141" cy="186" r="6" fill={SKIN} stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
        {/* Waist seam */}
        <path d="M 67 168 Q 100 178 133 168" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        {/* Legs */}
        <path d="M 78 318 L 94 318 L 91 374 L 81 374 Z" fill={SKIN} stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
        <path d="M 106 318 L 122 318 L 119 374 L 109 374 Z" fill={SKIN} stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
        {/* Pumps */}
        <path d="M 76 372 L 100 372 L 96 384 L 78 386 Z" fill="#1a1a1a" />
        <path d="M 100 372 L 124 372 L 122 386 L 104 384 Z" fill="#1a1a1a" />
        <ellipse cx="86" cy="386" rx="11" ry="3" fill="#0a0a0a" />
        <ellipse cx="114" cy="386" rx="11" ry="3" fill="#0a0a0a" />
        <rect x="80" y="384" width="4" height="8" fill="#0a0a0a" />
        <rect x="116" y="384" width="4" height="8" fill="#0a0a0a" />
      </g>
    );
  };

  // ── Outerwear (open jacket) ──────────────────────────────────────────
  const renderOuterwear = () => {
    if (colors.outerwear === 'none') return null;
    const isAuto = colors.outerwear === 'auto';
    const leather = colors.outerwear.includes('-leather');
    const base = isAuto ? 'auto' : colors.outerwear.replace('-leather', '');
    const fill = getFill(base);
    const stroke = getOutline(isAuto ? 'auto' : colors.outerwear);
    const dashArr = asDash(isAuto ? 'auto' : 'solid');

    const isFem = gender === 'female';
    const vY = 116;
    const hemY = isFem ? 214 : 236;
    const sL = isFem ? 64 : 60;
    const sR = isFem ? 136 : 140;
    const gL = 92, gR = 108;
    const gLB = 86, gRB = 114;

    const leftPanel = isFem
      ? `M ${sL} 96 C 54 110 52 132 62 152 C 70 168 68 188 ${gLB - 2} ${hemY} L ${gLB} ${hemY} L ${gL} 96 Z`
      : `M ${sL} 96 C 50 108 50 140 56 164 C 60 188 64 212 ${gLB - 4} ${hemY} L ${gLB} ${hemY} L ${gL} 96 Z`;
    const rightPanel = isFem
      ? `M ${sR} 96 C 146 110 148 132 138 152 C 130 168 132 188 ${gRB + 2} ${hemY} L ${gRB} ${hemY} L ${gR} 96 Z`
      : `M ${sR} 96 C 150 108 150 140 144 164 C 140 188 136 212 ${gRB + 4} ${hemY} L ${gRB} ${hemY} L ${gR} 96 Z`;

    const armLPath = isFem
      ? `M ${sL} 96 C 54 128 48 158 50 180 L 64 180 C 66 158 70 128 76 100 Z`
      : `M ${sL} 96 C 46 130 40 160 42 184 L 58 184 C 60 160 64 130 72 100 Z`;
    const armRPath = isFem
      ? `M ${sR} 96 C 146 128 152 158 150 180 L 136 180 C 134 158 130 128 124 100 Z`
      : `M ${sR} 96 C 154 130 160 160 158 184 L 142 184 C 140 160 136 130 128 100 Z`;

    const detailStroke = leather ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)';
    const cuffY = isFem ? 174 : 178;
    const buttons = [vY + 14, vY + 34, vY + 54].filter(by => by < hemY - 14);

    return (
      <g>
        <path d={armLPath} fill={fill} stroke={stroke} strokeWidth="2" strokeDasharray={dashArr} strokeLinejoin="round" />
        <path d={armRPath} fill={fill} stroke={stroke} strokeWidth="2" strokeDasharray={dashArr} strokeLinejoin="round" />
        <path d={leftPanel} fill={fill} stroke={stroke} strokeWidth="2" strokeDasharray={dashArr} strokeLinejoin="round" />
        <path d={rightPanel} fill={fill} stroke={stroke} strokeWidth="2" strokeDasharray={dashArr} strokeLinejoin="round" />

        {/* Lapels */}
        <path d={`M ${gL} 96 L ${gL - 16} ${vY} L 100 ${vY} Z`} fill={fill} stroke={detailStroke} strokeWidth="1.3" strokeLinejoin="round" />
        <path d={`M ${gL} 96 L ${gL - 13} ${vY} L 100 ${vY} Z`} fill="rgba(255,255,255,0.1)" stroke="none" />
        <path d={`M ${gR} 96 L ${gR + 16} ${vY} L 100 ${vY} Z`} fill={fill} stroke={detailStroke} strokeWidth="1.3" strokeLinejoin="round" />
        <path d={`M ${gR} 96 L ${gR + 13} ${vY} L 100 ${vY} Z`} fill="rgba(255,255,255,0.1)" stroke="none" />

        <line x1={gL} y1="96" x2={gLB} y2={hemY} stroke={detailStroke} strokeWidth="1.2" />
        <line x1={gR} y1="96" x2={gRB} y2={hemY} stroke={detailStroke} strokeWidth="1.2" />

        {buttons.map((by, i) => (
          <circle key={i} cx={gRB - 4} cy={by} r="2.5" fill={detailStroke} />
        ))}

        <line x1={isFem ? 50 : 42} y1={cuffY} x2={isFem ? 64 : 58} y2={cuffY} stroke={detailStroke} strokeWidth="2.5" strokeLinecap="round" />
        <line x1={isFem ? 136 : 142} y1={cuffY} x2={isFem ? 150 : 158} y2={cuffY} stroke={detailStroke} strokeWidth="2.5" strokeLinecap="round" />

        {leather && (
          <g fill="rgba(255,255,255,0.12)" stroke="none">
            <path d={isFem ? `M ${sL + 2} 100 L ${sL + 8} 100 L 60 150 L 54 150 Z` : `M ${sL + 2} 100 L ${sL + 8} 100 L 56 160 L 48 160 Z`} />
            <path d={isFem ? `M ${sR - 2} 100 L ${sR - 8} 100 L 140 150 L 146 150 Z` : `M ${sR - 2} 100 L ${sR - 8} 100 L 144 160 L 152 160 Z`} />
          </g>
        )}
      </g>
    );
  };

  return (
    <svg viewBox="0 0 200 410" style={{ width: '100%', height: '100%', maxHeight: '350px' }}>
      <defs>
        <pattern id="pat-stripe" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">
          <rect width="3" height="8" fill="rgba(0,0,0,0.25)" />
        </pattern>
        <pattern id="pat-check" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="7" height="14" fill="rgba(0,0,0,0.12)" />
          <rect width="14" height="7" fill="rgba(0,0,0,0.12)" />
        </pattern>
        <pattern id="pat-gingham" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="6" height="12" fill="rgba(255,255,255,0.35)" />
          <rect width="12" height="6" fill="rgba(255,255,255,0.35)" />
          <rect width="6" height="6" fill="rgba(255,255,255,0.55)" />
        </pattern>
        <radialGradient id="faceShade" cx="50%" cy="45%" r="60%">
          <stop offset="55%" stopColor={SKIN} />
          <stop offset="100%" stopColor={SKIN_SHADE} />
        </radialGradient>
      </defs>

      {/* Female: long flowing back hair behind everything */}
      {gender === 'female' && (
        <g fill={HAIR}>
          <path d="M 72 32 C 58 70 52 130 58 200 L 76 200 C 74 130 78 70 84 38 Z" />
          <path d="M 128 32 C 142 70 148 130 142 200 L 124 200 C 126 130 122 70 116 38 Z" />
        </g>
      )}

      {/* Body */}
      {gender === 'male' && renderMale()}
      {gender === 'female' && mode === 'two-piece' && renderFemaleTwoPiece()}
      {gender === 'female' && mode === 'one-piece' && renderFemaleOnePiece()}

      {/* Outerwear */}
      {renderOuterwear()}

      {/* Neck with subtle shading */}
      <path d="M 94 72 L 94 94 Q 100 98 106 94 L 106 72 Z" fill={SKIN} />
      <path d="M 94 86 Q 100 92 106 86 L 106 94 Q 100 98 94 94 Z" fill={SKIN_SHADE} opacity="0.55" />

      {/* Head */}
      <ellipse cx="100" cy="44" rx="21" ry="25" fill="url(#faceShade)" />

      {/* Hair */}
      {gender === 'male' ? (
        <>
          <path d="M 79 38 Q 78 14 100 12 Q 122 14 121 38 Q 118 30 110 28 Q 100 22 90 28 Q 82 32 79 38 Z" fill={HAIR} />
          <path d="M 96 18 Q 104 16 112 22 Q 108 26 102 25 Q 98 23 96 18 Z" fill={HAIR_HL} opacity="0.5" />
        </>
      ) : (
        <>
          {/* Top crown + side bangs */}
          <path d="M 78 38 Q 76 12 100 11 Q 124 12 122 38 Q 122 46 118 50 Q 112 32 100 30 Q 88 32 82 50 Q 78 46 78 38 Z" fill={HAIR} />
          {/* Side hair down to jaw */}
          <path d="M 78 38 Q 74 52 76 64 Q 80 56 82 46 Z" fill={HAIR} />
          <path d="M 122 38 Q 126 52 124 64 Q 120 56 118 46 Z" fill={HAIR} />
          {/* Highlight */}
          <path d="M 92 18 Q 100 14 110 18 Q 108 22 100 21 Q 94 22 92 18 Z" fill={HAIR_HL} opacity="0.5" />
        </>
      )}

      {/* Eyebrows */}
      <path d="M 85 38 Q 91 35 96 37" fill="none" stroke={HAIR} strokeWidth="2" strokeLinecap="round" />
      <path d="M 104 37 Q 109 35 115 38" fill="none" stroke={HAIR} strokeWidth="2" strokeLinecap="round" />

      {/* Eyes */}
      <ellipse cx="91" cy="46" rx="5" ry="5.5" fill="white" />
      <ellipse cx="109" cy="46" rx="5" ry="5.5" fill="white" />
      <ellipse cx="91" cy="47" rx="3.5" ry="4.5" fill="#3a2010" />
      <ellipse cx="109" cy="47" rx="3.5" ry="4.5" fill="#3a2010" />
      <circle cx="92" cy="45" r="1.5" fill="white" />
      <circle cx="110" cy="45" r="1.5" fill="white" />
      <circle cx="89.5" cy="49" r="0.7" fill="rgba(255,255,255,0.6)" />
      <circle cx="107.5" cy="49" r="0.7" fill="rgba(255,255,255,0.6)" />

      {/* Upper lash line */}
      <path d="M 86 42 Q 91 39 96 42" fill="none" stroke="#1a0a00" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 104 42 Q 109 39 114 42" fill="none" stroke="#1a0a00" strokeWidth="1.6" strokeLinecap="round" />
      {gender === 'female' && (
        <>
          <path d="M 86 42 L 84 40" stroke="#1a0a00" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 114 42 L 116 40" stroke="#1a0a00" strokeWidth="1.2" strokeLinecap="round" />
        </>
      )}

      {/* Nose */}
      <path d="M 99 54 Q 100 57 101 54" fill="none" stroke="rgba(140,80,60,0.45)" strokeWidth="1.3" strokeLinecap="round" />

      {/* Blush */}
      <ellipse cx="84" cy="55" rx="5.5" ry="3" fill="rgba(255,140,140,0.28)" />
      <ellipse cx="116" cy="55" rx="5.5" ry="3" fill="rgba(255,140,140,0.28)" />

      {/* Mouth */}
      {gender === 'female' ? (
        <>
          <path d="M 95 62 Q 100 67 105 62 Q 100 64 95 62 Z" fill="rgba(200,75,90,0.9)" />
          <path d="M 95 62 Q 100 60 105 62" fill="none" stroke="rgba(180,70,80,0.55)" strokeWidth="0.8" />
        </>
      ) : (
        <path d="M 94 63 Q 100 67 106 63" fill="none" stroke="rgba(170,80,70,0.85)" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
};

export default Avatar;
