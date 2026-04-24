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

const SKIN = '#e8c9a8';
const HAIR = '#3a2618';

const Avatar: React.FC<AvatarProps> = ({ gender, mode, colors }) => {
  const getFill = (color: string) => {
    if (color === 'auto') return 'rgba(128,128,128,0.1)';
    if (color === 'none') return 'transparent';
    return getColorHex(color);
  };

  // Subtle outline visible in both light/dark themes
  const getOutline = (color: string) => {
    if (color === 'auto') return 'rgba(128,128,128,0.45)';
    if (color === 'none') return 'transparent';
    if (['black', 'black-leather', 'black-denim'].includes(color)) return 'rgba(255,255,255,0.2)';
    return 'rgba(0,0,0,0.15)';
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
      <path d="M 93 73 L 100 94 L 107 73"
        fill="rgba(255,255,255,0.8)" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
    );
  };

  // ── Male ──────────────────────────────────────────────────────────────────
  const renderMale = () => {
    const tf = getFill(colors.top), ts = getOutline(colors.top), td = asDash(colors.top);
    const bf = getFill(colors.bottom), bs = getOutline(colors.bottom), bd = asDash(colors.bottom);
    const pf = getPatternFill();

    const torso = 'M 62 94 C 52 100 50 138 54 162 L 78 162 L 75 230 L 125 230 L 122 162 L 146 162 C 150 138 148 100 138 94 Z';
    const armL = 'M 62 94 L 42 180 L 58 180 L 72 98 Z';
    const armR = 'M 138 94 L 158 180 L 142 180 L 128 98 Z';

    return (
      <g>
        <path d={torso} fill={tf} stroke={ts} strokeWidth="2" strokeDasharray={td} />
        {pf && <path d={torso} fill={pf} />}
        <path d={armL} fill={tf} stroke={ts} strokeWidth="1.5" strokeDasharray={td} />
        <path d={armR} fill={tf} stroke={ts} strokeWidth="1.5" strokeDasharray={td} />
        {pf && <><path d={armL} fill={pf} /><path d={armR} fill={pf} /></>}
        {renderShirtCollar()}
        {/* Left leg */}
        <path d="M 75 226 L 98 226 L 102 382 L 68 382 Z" fill={bf} stroke={bs} strokeWidth="2" strokeDasharray={bd} />
        {/* Right leg */}
        <path d="M 102 226 L 125 226 L 132 382 L 98 382 Z" fill={bf} stroke={bs} strokeWidth="2" strokeDasharray={bd} />
        <line x1="100" y1="230" x2="100" y2="282" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" />
        {/* Shoes */}
        <rect x="62" y="378" width="44" height="14" rx="6" fill="#282828" />
        <rect x="94" y="378" width="44" height="14" rx="6" fill="#282828" />
        <rect x="62" y="388" width="44" height="6" rx="3" fill="#181818" />
        <rect x="94" y="388" width="44" height="6" rx="3" fill="#181818" />
      </g>
    );
  };

  // ── Female two-piece ──────────────────────────────────────────────────────
  const renderFemaleTwoPiece = () => {
    const tf = getFill(colors.top), ts = getOutline(colors.top), td = asDash(colors.top);
    const bf = getFill(colors.bottom), bs = getOutline(colors.bottom), bd = asDash(colors.bottom);
    const pf = getPatternFill();

    const torso = 'M 67 94 C 58 100 57 130 61 150 L 79 150 L 78 207 L 122 207 L 121 150 L 139 150 C 143 130 142 100 133 94 Z';
    const armL = 'M 67 94 L 49 175 L 63 175 L 77 98 Z';
    const armR = 'M 133 94 L 151 175 L 137 175 L 123 98 Z';

    return (
      <g>
        <path d={torso} fill={tf} stroke={ts} strokeWidth="2" strokeDasharray={td} />
        {pf && <path d={torso} fill={pf} />}
        <path d={armL} fill={tf} stroke={ts} strokeWidth="1.5" strokeDasharray={td} />
        <path d={armR} fill={tf} stroke={ts} strokeWidth="1.5" strokeDasharray={td} />
        {pf && <><path d={armL} fill={pf} /><path d={armR} fill={pf} /></>}
        {renderShirtCollar()}
        {/* Skirt */}
        <path d="M 79 202 L 121 202 L 144 322 L 56 322 Z" fill={bf} stroke={bs} strokeWidth="2" strokeDasharray={bd} />
        {/* Legs (skin) */}
        <rect x="74" y="318" width="18" height="60" rx="5" fill={SKIN} />
        <rect x="108" y="318" width="18" height="60" rx="5" fill={SKIN} />
        {/* Heeled shoes */}
        <rect x="68" y="374" width="26" height="10" rx="4" fill="#282828" />
        <rect x="66" y="381" width="30" height="5" rx="2.5" fill="#181818" />
        <rect x="87" y="372" width="7" height="20" rx="2" fill="#181818" />
        <rect x="106" y="374" width="26" height="10" rx="4" fill="#282828" />
        <rect x="104" y="381" width="30" height="5" rx="2.5" fill="#181818" />
        <rect x="106" y="372" width="7" height="20" rx="2" fill="#181818" />
      </g>
    );
  };

  // ── Female one-piece (dress) ──────────────────────────────────────────────
  const renderFemaleOnePiece = () => {
    const df = getFill(colors.dress), ds = getOutline(colors.dress), dd = asDash(colors.dress);

    return (
      <g>
        <path d="M 67 94 C 58 100 57 130 61 150 L 50 322 L 150 322 L 139 150 C 143 130 142 100 133 94 Z"
          fill={df} stroke={ds} strokeWidth="2" strokeDasharray={dd} />
        <path d="M 67 94 L 49 175 L 63 175 L 77 98 Z" fill={df} stroke={ds} strokeWidth="1.5" />
        <path d="M 133 94 L 151 175 L 137 175 L 123 98 Z" fill={df} stroke={ds} strokeWidth="1.5" />
        {/* Waist seam hint */}
        <line x1="63" y1="168" x2="137" y2="168" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
        {/* Legs */}
        <rect x="74" y="318" width="18" height="60" rx="5" fill={SKIN} />
        <rect x="108" y="318" width="18" height="60" rx="5" fill={SKIN} />
        {/* Heeled shoes */}
        <rect x="68" y="374" width="26" height="10" rx="4" fill="#282828" />
        <rect x="66" y="381" width="30" height="5" rx="2.5" fill="#181818" />
        <rect x="87" y="372" width="7" height="20" rx="2" fill="#181818" />
        <rect x="106" y="374" width="26" height="10" rx="4" fill="#282828" />
        <rect x="104" y="381" width="30" height="5" rx="2.5" fill="#181818" />
        <rect x="106" y="372" width="7" height="20" rx="2" fill="#181818" />
      </g>
    );
  };

  // ── Outerwear jacket (open front, shirt visible underneath) ─────────────
  const renderOuterwear = () => {
    if (colors.outerwear === 'none') return null;
    const isAuto = colors.outerwear === 'auto';
    const leather = colors.outerwear.includes('-leather');
    const base = isAuto ? 'auto' : colors.outerwear.replace('-leather', '');
    const fill = getFill(base);
    const stroke = getOutline(isAuto ? 'auto' : colors.outerwear);
    const dashArr = asDash(isAuto ? 'auto' : 'solid');

    const isFem = gender === 'female';
    const vY = 116;  // lapel V point Y
    const hemY = isFem ? 212 : 234;
    const sL = isFem ? 63 : 58;
    const sR = isFem ? 137 : 142;
    const armInset = 14;
    // Gap: shirt visible between gL–gR at collar, gLB–gRB at hem
    const gL = 92; const gR = 108;
    const gLB = 88; const gRB = 112;

    // Left front panel (left outer edge + inner gap edge)
    const leftPanel = isFem
      ? `M ${sL} 94 C 53 100 52 130 56 150 L 73 150 L 72 ${hemY} L ${gLB} ${hemY} L ${gL} 94 Z`
      : `M ${sL} 94 C 48 100 46 138 50 162 L 73 162 L 70 ${hemY} L ${gLB} ${hemY} L ${gL} 94 Z`;

    // Right front panel
    const rightPanel = isFem
      ? `M ${sR} 94 C 147 100 148 130 144 150 L 127 150 L 128 ${hemY} L ${gRB} ${hemY} L ${gR} 94 Z`
      : `M ${sR} 94 C 152 100 154 138 150 162 L 127 162 L 130 ${hemY} L ${gRB} ${hemY} L ${gR} 94 Z`;

    const armLPath = isFem
      ? `M ${sL} 94 L 44 175 L 58 175 L ${sL + armInset} 98 Z`
      : `M ${sL} 94 L 38 180 L 54 180 L ${sL + armInset} 98 Z`;
    const armRPath = isFem
      ? `M ${sR} 94 L 156 175 L 142 175 L ${sR - armInset} 98 Z`
      : `M ${sR} 94 L 162 180 L 146 180 L ${sR - armInset} 98 Z`;

    const detailStroke = leather ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.22)';
    const cuffY = isFem ? 172 : 177;
    const buttons = [vY + 12, vY + 30, vY + 48].filter(by => by < hemY - 14);

    return (
      <g>
        {/* Sleeves */}
        <path d={armLPath} fill={fill} stroke={stroke} strokeWidth="2" strokeDasharray={dashArr} />
        <path d={armRPath} fill={fill} stroke={stroke} strokeWidth="2" strokeDasharray={dashArr} />

        {/* Left / Right front panels — gap in centre reveals shirt */}
        <path d={leftPanel}  fill={fill} stroke={stroke} strokeWidth="2" strokeDasharray={dashArr} />
        <path d={rightPanel} fill={fill} stroke={stroke} strokeWidth="2" strokeDasharray={dashArr} />

        {/* Left lapel (folds outward) */}
        <path d={`M ${gL} 94 L ${gL - 16} ${vY} L 100 ${vY} Z`}
          fill={fill} stroke={detailStroke} strokeWidth="1.3" />
        <path d={`M ${gL} 94 L ${gL - 13} ${vY} L 100 ${vY} Z`}
          fill="rgba(255,255,255,0.09)" stroke="none" />
        {/* Right lapel */}
        <path d={`M ${gR} 94 L ${gR + 16} ${vY} L 100 ${vY} Z`}
          fill={fill} stroke={detailStroke} strokeWidth="1.3" />
        <path d={`M ${gR} 94 L ${gR + 13} ${vY} L 100 ${vY} Z`}
          fill="rgba(255,255,255,0.09)" stroke="none" />

        {/* Inner panel edges (jacket opening seam) */}
        <line x1={gL} y1="94" x2={gLB} y2={hemY} stroke={detailStroke} strokeWidth="1.2" />
        <line x1={gR} y1="94" x2={gRB} y2={hemY} stroke={detailStroke} strokeWidth="1.2" />

        {/* Buttons on right-side panel */}
        {buttons.map((by, i) => (
          <circle key={i} cx={gRB - 4} cy={by} r="2.5" fill={detailStroke} />
        ))}

        {/* Shoulder seams */}
        <line x1={sL} y1="94" x2={sL + armInset} y2="98" stroke={detailStroke} strokeWidth="1.2" />
        <line x1={sR} y1="94" x2={sR - armInset} y2="98" stroke={detailStroke} strokeWidth="1.2" />

        {/* Sleeve cuffs */}
        <line x1={isFem ? 44 : 38} y1={cuffY} x2={isFem ? 58 : 54} y2={cuffY}
          stroke={detailStroke} strokeWidth="2.5" />
        <line x1={isFem ? 142 : 146} y1={cuffY} x2={isFem ? 156 : 162} y2={cuffY}
          stroke={detailStroke} strokeWidth="2.5" />

        {/* Hem accent */}
        <line x1={isFem ? 72 : 70} y1={hemY} x2={isFem ? 128 : 130} y2={hemY}
          stroke={detailStroke} strokeWidth="1.5" />

        {/* Leather highlight */}
        {leather && (
          <g fill="rgba(255,255,255,0.1)" stroke="none">
            <path d={isFem ? `M ${sL} 94 L ${sL + 8} 94 L 56 148 L 48 148 Z`
              : `M ${sL} 94 L ${sL + 8} 94 L 52 148 L 44 148 Z`} />
            <path d={isFem ? `M ${sR} 94 L ${sR - 8} 94 L 144 148 L 152 148 Z`
              : `M ${sR} 94 L ${sR - 8} 94 L 148 148 L 156 148 Z`} />
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
      </defs>

      {/* Render back → front */}

      {/* 1. Female side hair panels (behind head, flowing to shoulder) */}
      {gender === 'female' && (
        <g fill={HAIR}>
          <path d="M 79 34 C 71 52 67 82 69 112 L 77 110 C 76 84 78 58 81 40 Z" />
          <path d="M 121 34 C 129 52 133 82 131 112 L 123 110 C 122 84 122 58 119 40 Z" />
        </g>
      )}

      {/* 2. Body clothing */}
      {gender === 'male' && renderMale()}
      {gender === 'female' && mode === 'two-piece' && renderFemaleTwoPiece()}
      {gender === 'female' && mode === 'one-piece' && renderFemaleOnePiece()}

      {/* 3. Outerwear jacket */}
      {renderOuterwear()}

      {/* 4. Neck */}
      <rect x="93" y="72" width="14" height="24" rx="5" fill={SKIN} />

      {/* 5. Head */}
      <ellipse cx="100" cy="46" rx="23" ry="27" fill={SKIN} />

      {/* 6. Hair (over head ellipse) */}
      {gender === 'male' ? (
        <path d="M 80 35 Q 80 17 100 16 Q 120 17 120 35 Q 115 46 85 46 Z" fill={HAIR} />
      ) : (
        /* Female top hair — soft swooping cap */
        <path d="M 79 34 Q 82 15 100 14 Q 118 15 121 34 Q 115 47 85 47 Z" fill={HAIR} />
      )}

      {/* 7. Face features — cute cartoon style */}
      {/* Eyebrows */}
      <path d="M 86 39 Q 91 36 96 38" fill="none" stroke={HAIR} strokeWidth="2" strokeLinecap="round" />
      <path d="M 104 38 Q 109 36 114 39" fill="none" stroke={HAIR} strokeWidth="2" strokeLinecap="round" />
      {/* Eye whites */}
      <ellipse cx="91" cy="46" rx="5.5" ry="5" fill="white" />
      <ellipse cx="109" cy="46" rx="5.5" ry="5" fill="white" />
      {/* Pupils */}
      <ellipse cx="91.5" cy="46.5" rx="3.8" ry="4" fill="#1a0a00" />
      <ellipse cx="109.5" cy="46.5" rx="3.8" ry="4" fill="#1a0a00" />
      {/* Eye highlights */}
      <circle cx="89.8" cy="44" r="1.6" fill="white" />
      <circle cx="107.8" cy="44" r="1.6" fill="white" />
      <circle cx="92.5" cy="48.5" r="0.9" fill="rgba(255,255,255,0.55)" />
      <circle cx="110.5" cy="48.5" r="0.9" fill="rgba(255,255,255,0.55)" />
      {/* Top lash line */}
      <path d="M 86 42 Q 91 40 96 42" fill="none" stroke="#1a0a00" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 104 42 Q 109 40 114 42" fill="none" stroke="#1a0a00" strokeWidth="1.5" strokeLinecap="round" />
      {/* Nose — tiny upturned hint */}
      <path d="M 98 54 Q 100 57 102 54" fill="none" stroke="rgba(150,80,60,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="85" cy="54" rx="6" ry="3.5" fill="rgba(255,130,130,0.2)" />
      <ellipse cx="115" cy="54" rx="6" ry="3.5" fill="rgba(255,130,130,0.2)" />
      {/* Mouth — gentle smile */}
      <path d="M 93 62 Q 100 68 107 62" fill="none" stroke="rgba(180,80,65,0.85)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default Avatar;
