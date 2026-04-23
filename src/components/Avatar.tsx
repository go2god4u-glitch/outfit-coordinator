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

const Avatar: React.FC<AvatarProps> = ({ gender, mode, colors }) => {
  
  const getFill = (color: string) => {
    if (color === 'auto') return 'rgba(255,255,255,0.05)';
    if (color === 'none') return 'transparent';
    return getColorHex(color);
  };

  const getStroke = (color: string) => {
    if (color === 'auto') return 'rgba(255,255,255,0.2)';
    if (color === 'none') return 'transparent';
    if (color.toLowerCase() === 'black') return 'rgba(255,255,255,0.2)';
    return 'transparent';
  };

  // Base paths
  const head = <circle cx="100" cy="50" r="22" fill="#cbd5e1" />;
  const neck = <rect x="92" y="65" width="16" height="25" fill="#cbd5e1" />;
  
  const renderOuterwear = () => {
    if (colors.outerwear === 'none') return null;
    const isAuto = colors.outerwear === 'auto';
    const isLeather = !isAuto && colors.outerwear.includes('-leather');
    const baseColor = isAuto ? 'auto' : colors.outerwear.replace('-leather', '');
    const fill = getFill(baseColor);
    const stroke = isLeather ? 'rgba(255,255,255,0.3)' : getStroke(baseColor);
    const dash = isAuto ? '4 2' : 'none';
    
    return (
      <g fill={fill} stroke={stroke} strokeWidth="2" strokeDasharray={dash}>
        {/* Left arm/side */}
        <path d="M 55 85 L 85 85 C 80 150 80 200 80 240 L 45 240 L 35 160 Z" />
        {/* Right arm/side */}
        <path d="M 145 85 L 115 85 C 120 150 120 200 120 240 L 155 240 L 165 160 Z" />
        
        {/* Leather Shine Highlight */}
        {isLeather && (
          <g fill="rgba(255,255,255,0.15)" stroke="none">
            <path d="M 65 90 L 75 90 L 60 160 L 50 160 Z" />
            <path d="M 140 90 L 130 90 L 145 160 L 155 160 Z" />
          </g>
        )}
      </g>
    );
  };

  const getTopPatternOverlay = () => {
    if (!colors.topPattern || colors.topPattern === 'solid' || colors.topPattern === 'auto' || colors.top === 'none') return undefined;
    return `url(#${colors.topPattern})`;
  };

  const renderShirtCollar = () => {
    if (colors.topType !== 'shirt' || colors.top === 'none' || colors.top === 'auto') return null;
    return (
      <path d="M 92 65 L 100 80 L 108 65 Z" fill="rgba(255,255,255,0.7)" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
    );
  };

  const renderMale = () => {
    const topPath = "M 60 85 L 140 85 L 155 150 L 135 150 L 130 220 L 70 220 L 65 150 L 45 150 Z";
    return (
      <g>
        {/* Top Base */}
        <path 
          d={topPath} 
          fill={getFill(colors.top)} 
          stroke={getStroke(colors.top)} 
          strokeWidth="2" 
          strokeDasharray={colors.top === 'auto' ? '4 2' : 'none'}
        />
        {/* Top Pattern */}
        {getTopPatternOverlay() && (
          <path d={topPath} fill={getTopPatternOverlay()} />
        )}
        {renderShirtCollar()}
      {/* Bottom (Pants) */}
      <path 
        d="M 70 215 L 130 215 L 135 355 L 105 355 L 100 240 L 95 355 L 65 355 Z" 
        fill={getFill(colors.bottom)} 
        stroke={getStroke(colors.bottom)} 
        strokeWidth="2"
        strokeDasharray={colors.bottom === 'auto' ? '4 2' : 'none'}
      />
    </g>
  );};

  const renderFemaleTwoPiece = () => {
    const topPath = "M 65 85 L 135 85 L 145 140 L 125 140 L 120 200 L 80 200 L 75 140 L 55 140 Z";
    return (
      <g>
        {/* Top Base */}
        <path 
          d={topPath} 
          fill={getFill(colors.top)} 
          stroke={getStroke(colors.top)} 
          strokeWidth="2" 
          strokeDasharray={colors.top === 'auto' ? '4 2' : 'none'}
        />
        {/* Top Pattern */}
        {getTopPatternOverlay() && (
          <path d={topPath} fill={getTopPatternOverlay()} />
        )}
        {renderShirtCollar()}
      {/* Bottom (Skirt) */}
      <path 
        d="M 80 195 L 120 195 L 135 290 L 65 290 Z" 
        fill={getFill(colors.bottom)} 
        stroke={getStroke(colors.bottom)} 
        strokeWidth="2"
        strokeDasharray={colors.bottom === 'auto' ? '4 2' : 'none'}
      />
      {/* Legs (skin) */}
      <path d="M 75 285 L 90 285 L 90 355 L 75 355 Z" fill="#cbd5e1" />
      <path d="M 110 285 L 125 285 L 125 355 L 110 355 Z" fill="#cbd5e1" />
    </g>
  );};

  const renderFemaleOnePiece = () => (
    <g>
      {/* Dress */}
      <path 
        d="M 65 85 L 135 85 L 145 140 L 125 140 L 140 290 L 60 290 L 75 140 L 55 140 Z" 
        fill={getFill(colors.dress)} 
        stroke={getStroke(colors.dress)} 
        strokeWidth="2" 
        strokeDasharray={colors.dress === 'auto' ? '4 2' : 'none'}
      />
      {/* Legs (skin) */}
      <path d="M 75 285 L 90 285 L 90 355 L 75 355 Z" fill="#cbd5e1" />
      <path d="M 110 285 L 125 285 L 125 355 L 110 355 Z" fill="#cbd5e1" />
    </g>
  );

  return (
    <svg viewBox="0 0 200 400" style={{ width: '100%', height: '100%', maxHeight: '350px' }}>
      <defs>
        <pattern id="stripe" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">
          <rect width="3" height="8" fill="rgba(0,0,0,0.3)" />
        </pattern>
        <pattern id="check" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="8" height="16" fill="rgba(0,0,0,0.15)" />
          <rect width="16" height="8" fill="rgba(0,0,0,0.15)" />
        </pattern>
        <pattern id="gingham" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="6" height="12" fill="rgba(255,255,255,0.4)" />
          <rect width="12" height="6" fill="rgba(255,255,255,0.4)" />
          <rect width="6" height="6" fill="rgba(255,255,255,0.6)" />
        </pattern>
      </defs>

      {neck}
      {head}
      
      {gender === 'male' && renderMale()}
      {gender === 'female' && mode === 'two-piece' && renderFemaleTwoPiece()}
      {gender === 'female' && mode === 'one-piece' && renderFemaleOnePiece()}
      
      {renderOuterwear()}
    </svg>
  );
};

export default Avatar;
