import React, { useState, useEffect } from 'react';
import type { Gender, OutfitMode, Season, SavedOutfit, TopType, TopPattern } from '../types';
import { colorHarmonyDatabase, availableColors, denimColors, getColorHex } from '../utils';
import Avatar from './Avatar';

interface OutfitState {
  outerwear: string | 'auto' | 'none';
  top: string | 'auto';
  topType: TopType;
  topPattern: TopPattern;
  bottom: string | 'auto';
  dress: string | 'auto';
}

interface RecommendationItem {
  outfit: OutfitState;
  ruleName: string;
  score: number;
}

type NoticeType = 'none' | 'fallback' | 'clash';

const Coordinator: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<Gender>('male');
  const [outfitMode, setOutfitMode] = useState<OutfitMode>('two-piece');
  const [selectedSeason, setSelectedSeason] = useState<Season>('spring-fall');

  const [outfit, setOutfit] = useState<OutfitState>({
    outerwear: 'auto',
    top: 'auto',
    topType: 'auto',
    topPattern: 'auto',
    bottom: 'auto',
    dress: 'auto'
  });

  const [recommended, setRecommended] = useState<OutfitState | null>(null);
  const [ruleName, setRuleName] = useState<string>('');
  const [recommendationList, setRecommendationList] = useState<RecommendationItem[]>([]);
  const [selectedRecIndex, setSelectedRecIndex] = useState<number>(0);
  const [noticeType, setNoticeType] = useState<NoticeType>('none');
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);

  const isDenim = (color: string) => denimColors.includes(color);

  const denimToneRank = (color: string) => {
    const ranks: Record<string, number> = {
      'light-denim': 1,
      denim: 2,
      'dark-denim': 3,
      'black-denim': 4
    };
    return ranks[color] ?? 0;
  };

  const toDisplayScore = (rawScore: number) => {
    if (rawScore <= 100) return rawScore;
    return Math.min(99, 90 + Math.floor((rawScore - 100) / 3));
  };

  const getScoreLabel = (score: number) => {
    if (score >= 95) return '베스트';
    if (score >= 90) return '추천';
    if (score >= 85) return '무난';
    return '참고용';
  };

  const getScoreLabelColor = (score: number) => {
    if (score >= 95) return '#f59e0b';
    if (score >= 90) return 'var(--success)';
    if (score >= 85) return 'var(--primary)';
    return 'var(--text-muted)';
  };

  const getDisplayColorName = (color: string) => {
    const names: Record<string, string> = {
      'light-denim': '연청 데님',
      denim: '중청 데님',
      'dark-denim': '진청 데님',
      'black-denim': '흑청 데님',
      'black-leather': '검정 가죽',
      'brown-leather': '갈색 가죽'
    };
    return names[color] ?? color;
  };

  const createFallbackRecommendations = (): RecommendationItem[] => {
    const isSummer = selectedSeason === 'summer';
    const isWinter = selectedSeason === 'winter';
    const fallbackTops = outfit.top === 'auto'
      ? isSummer
        ? ['white', 'beige', 'blue', 'light-denim', 'gray']
        : isWinter
          ? ['black', 'gray', 'navy', 'beige', 'brown', 'dark-denim']
          : ['white', 'black', 'gray', 'beige', 'light-denim']
      : [outfit.top];
    const fallbackTopTypes = outfit.topType === 'auto' ? (isSummer ? ['t-shirt', 'shirt'] : isWinter ? ['knit', 'shirt'] : ['t-shirt', 'shirt', 'knit']) as TopType[] : [outfit.topType];
    const fallbackTopPatterns = outfit.topPattern === 'auto' ? ['solid', 'stripe'] as TopPattern[] : [outfit.topPattern];
    const fallbackBottoms = outfit.bottom === 'auto'
      ? isSummer
        ? ['white', 'beige', 'khaki', 'gray', 'light-denim', 'denim']
        : isWinter
          ? ['black', 'gray', 'navy', 'brown', 'dark-denim', 'black-denim']
          : ['black', 'beige', 'khaki', 'olive', 'gray', 'navy', 'denim']
      : [outfit.bottom];
    const fallbackOuterwears = isSummer ? ['none'] : outfit.outerwear === 'auto' ? (isWinter ? ['black', 'navy', 'gray', 'brown', 'black-leather', 'brown-leather'] : ['none', 'black', 'navy', 'beige', 'denim', 'khaki']) : [outfit.outerwear];
    const fallbackDresses = outfit.dress === 'auto' ? (isSummer ? ['white', 'blue', 'yellow', 'beige'] : isWinter ? ['black', 'navy', 'gray', 'beige'] : ['black', 'navy', 'beige', 'white']) : [outfit.dress];

    const combos: RecommendationItem[] = [];

    for (const top of outfitMode === 'two-piece' ? fallbackTops : ['auto']) {
      for (const topType of outfitMode === 'two-piece' ? fallbackTopTypes : ['auto'] as TopType[]) {
        for (const topPattern of outfitMode === 'two-piece' ? fallbackTopPatterns : ['auto'] as TopPattern[]) {
          for (const bottom of outfitMode === 'two-piece' ? fallbackBottoms : ['auto']) {
            for (const dress of outfitMode === 'one-piece' ? fallbackDresses : ['auto']) {
              for (const outerwear of fallbackOuterwears) {
                const combo: OutfitState = { outerwear, top, topType, topPattern, bottom, dress };
                let score = 70;
                const colors = [outerwear, top, bottom, dress].filter(c => c !== 'auto' && c !== 'none');
                if (colors.includes('white') && (colors.includes('khaki') || colors.includes('beige'))) score += 8;
                if (colors.includes('black') && colors.includes('gray')) score += 5;
                if (colors.includes('navy') && colors.includes('white')) score += 5;
                if (colors.some(isDenim) && (colors.includes('khaki') || colors.includes('beige') || colors.includes('white'))) score += 9;
                if (isDenim(top) && (bottom === 'khaki' || bottom === 'beige')) score += 10;
                if (isDenim(outerwear) && isDenim(bottom)) score += 7;
                combos.push({ outfit: combo, ruleName: '기본 컬러 조합', score: Math.min(score, 88) });
              }
            }
          }
        }
      }
    }

    return combos
      .sort((a, b) => b.score - a.score)
      .slice(0, 24);
  };

  const hasStrongColorClash = () => {
    const colors = [outfit.outerwear, outfit.top, outfit.bottom, outfit.dress]
      .filter(color => color !== 'auto' && color !== 'none');
    const saturatedColors = colors.filter(color => ['red', 'green', 'yellow', 'pink', 'blue'].includes(color));

    if (saturatedColors.length >= 3) return true;
    if (colors.includes('red') && colors.includes('green') && !colors.includes('white') && !colors.includes('black')) return true;
    if (colors.includes('yellow') && colors.includes('pink') && colors.includes('green')) return true;
    if (outfit.topPattern !== 'solid' && outfit.topPattern !== 'auto' && colors.filter(color => !['white', 'black', 'gray', 'navy'].includes(color) && !isDenim(color)).length >= 3) return true;

    return false;
  };

  useEffect(() => {
    const saved = localStorage.getItem('styleSync_lookbook');
    if (saved) {
      setSavedOutfits(JSON.parse(saved));
    }
  }, []);

  const saveToLookbook = () => {
    if (!recommended) return;
    const newOutfit: SavedOutfit = {
      id: Date.now().toString(),
      name: ruleName,
      gender: selectedGender,
      mode: outfitMode,
      season: selectedSeason,
      colors: { ...recommended },
      createdAt: Date.now()
    };
    const updated = [newOutfit, ...savedOutfits];
    setSavedOutfits(updated);
    localStorage.setItem('styleSync_lookbook', JSON.stringify(updated));
    alert('룩북에 코디를 저장했습니다.');
  };

  const deleteFromLookbook = (id: string) => {
    const updated = savedOutfits.filter(o => o.id !== id);
    setSavedOutfits(updated);
    localStorage.setItem('styleSync_lookbook', JSON.stringify(updated));
  };

  const loadFromLookbook = (saved: SavedOutfit) => {
    setSelectedGender(saved.gender);
    setOutfitMode(saved.mode);
    setSelectedSeason(saved.season);
    setOutfit(saved.colors);
    setRecommended(saved.colors);
    setRuleName(saved.name);
    setNoticeType('none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenderChange = (g: Gender) => {
    setSelectedGender(g);
    if (g === 'male') setOutfitMode('two-piece');
    setRecommended(null);
    setRecommendationList([]);
    setNoticeType('none');
  };

  const handleModeChange = (m: OutfitMode) => {
    setOutfitMode(m);
    setRecommended(null);
    setRecommendationList([]);
    setNoticeType('none');
  };

  const handleSeasonChange = (s: Season) => {
    setSelectedSeason(s);
    if (s === 'summer') {
      setOutfit(prev => ({ ...prev, outerwear: 'none' }));
    }
    setRecommended(null);
    setRecommendationList([]);
    setNoticeType('none');
  };

  const handleSelect = (category: keyof OutfitState, value: string) => {
    setOutfit(prev => ({ ...prev, [category]: value as any }));
    setRecommended(null);
    setRecommendationList([]);
    setNoticeType('none');
  };

  const handleRecommend = () => {
    const isSummer = selectedSeason === 'summer';
    const strongClash = hasStrongColorClash();
    
    // Filter database for gender, mode, and season
    const filteredDatabase = colorHarmonyDatabase.filter(rule => {
      const genderMatch = rule.gender === selectedGender || rule.gender === 'unisex';
      const modeMatch = rule.mode === outfitMode;
      const seasonMatch = rule.seasons.includes(selectedSeason);
      return genderMatch && modeMatch && seasonMatch;
    });

    // Filter rules physically possible with the fixed items
    const validRules = filteredDatabase.filter(rule => {
      let possible = true;
      if (!isSummer && outfit.outerwear !== 'auto' && !rule.outerwear?.includes(outfit.outerwear)) possible = false;
      
      if (outfitMode === 'two-piece') {
        if (outfit.top !== 'auto' && !rule.top?.includes(outfit.top)) possible = false;
        if (outfit.bottom !== 'auto' && !rule.bottom?.includes(outfit.bottom)) possible = false;
      } else {
        if (outfit.dress !== 'auto' && !rule.dress?.includes(outfit.dress)) possible = false;
      }
      return possible;
    });

    if (validRules.length === 0) {
      const fallbackCombos = createFallbackRecommendations();
      setNoticeType(strongClash ? 'clash' : 'fallback');
      setRecommendationList(fallbackCombos);
      setSelectedRecIndex(0);
      setRecommended(fallbackCombos[0]?.outfit ?? null);
      setRuleName(fallbackCombos[0]?.ruleName ?? '');
      return;
    }

    setNoticeType(strongClash ? 'clash' : 'none');

    const calculateScore = (combo: OutfitState, rule: any) => {
      let score = 80;

      const addPoints = (item: string, allowed?: string[]) => {
        if (!allowed || item === 'none' || item === 'auto') return;
        const index = allowed.indexOf(item);
        if (index === 0) score += 5;
        else if (index === 1) score += 3;
        else if (index > 1) score += 1;
      };

      addPoints(combo.top, rule.top);
      addPoints(combo.topType, rule.topTypes);
      addPoints(combo.topPattern, rule.topPatterns);
      addPoints(combo.bottom, rule.bottom);
      addPoints(combo.outerwear, rule.outerwear);
      addPoints(combo.dress, rule.dress);

      const colors = [combo.top, combo.bottom, combo.outerwear, combo.dress].filter(c => c !== 'none' && c !== 'auto');
      if (colors.includes('navy') && colors.includes('beige')) score += 5;
      if (colors.includes('white') && colors.some(isDenim)) score += 5;
      if (colors.includes('black') && colors.includes('gray')) score += 4;
      if ((colors.includes('khaki') || colors.includes('olive')) && colors.some(isDenim)) score += 5;
      if (colors.includes('white') && colors.includes('black')) score += 3;
      if (colors.includes('beige') && colors.includes('brown')) score += 5;
      if (colors.includes('navy') && colors.includes('white')) score += 4;
      if (selectedSeason === 'summer' && colors.every(c => ['white', 'beige', 'blue', 'gray'].includes(c) || isDenim(c))) score += 6;

      if (selectedSeason === 'summer') {
        if (combo.outerwear === 'none') score += 8;
        if (['t-shirt', 'shirt'].includes(combo.topType)) score += 5;
        if (['white', 'beige', 'blue', 'light-denim'].includes(combo.top)) score += 4;
        if (['white', 'beige', 'khaki', 'gray', 'light-denim', 'denim'].includes(combo.bottom)) score += 4;
        if (combo.topType === 'knit') score -= 8;
        if (['black', 'brown', 'black-leather', 'brown-leather'].includes(combo.outerwear)) score -= 8;
      }

      if (selectedSeason === 'spring-fall') {
        if (['shirt', 'knit'].includes(combo.topType)) score += 4;
        if (['beige', 'navy', 'khaki', 'olive', 'denim', 'light-denim'].includes(combo.outerwear)) score += 6;
        if (['beige', 'khaki', 'olive', 'denim', 'light-denim', 'gray'].includes(combo.bottom)) score += 4;
        if (combo.outerwear === 'none') score += 2;
      }

      if (selectedSeason === 'winter') {
        if (combo.topType === 'knit') score += 9;
        if (['black', 'navy', 'gray', 'brown', 'black-leather', 'brown-leather'].includes(combo.outerwear)) score += 8;
        if (['black', 'gray', 'navy', 'brown', 'dark-denim', 'black-denim'].includes(combo.bottom)) score += 6;
        if (combo.outerwear === 'none') score -= 12;
        if (['white', 'yellow', 'light-denim'].includes(combo.bottom)) score -= 4;
      }

      // Pattern synergies
      if (combo.outerwear === 'navy' && combo.topPattern === 'stripe') score += 10;
      if (combo.topType === 'shirt' && combo.topPattern === 'stripe' && ['navy', 'white', 'beige', 'gray'].includes(combo.bottom)) score += 7;
      if (combo.topType === 'shirt' && combo.topPattern === 'stripe' && ['navy', 'beige', 'gray', 'none'].includes(combo.outerwear)) score += 5;
      if (isDenim(combo.bottom) && combo.topPattern === 'check') score += 5;
      if (combo.topType === 'shirt' && combo.topPattern === 'check' && (isDenim(combo.bottom) || ['khaki', 'olive', 'beige', 'black'].includes(combo.bottom))) score += 8;
      if (combo.topType === 'shirt' && combo.topPattern === 'check' && ['brown', 'khaki', 'olive', 'navy', 'none'].includes(combo.outerwear)) score += 5;
      if (combo.topType === 'shirt' && combo.topPattern === 'gingham' && ['beige', 'white', 'navy', 'khaki'].includes(combo.bottom)) score += 8;
      if (combo.topType === 'shirt' && combo.topPattern === 'gingham' && ['navy', 'beige', 'white', 'none'].includes(combo.outerwear)) score += 5;
      if (combo.topType === 'shirt' && (combo.outerwear === 'khaki' || combo.outerwear === 'olive')) score += 5;
      if (combo.topType === 'knit' && ['beige', 'brown', 'gray', 'navy'].includes(combo.outerwear)) score += 4;
      if (combo.outerwear === 'black-leather' && isDenim(combo.bottom)) score += 5;
      if (combo.outerwear === 'brown-leather' && isDenim(combo.bottom)) score += 5;
      if (isDenim(combo.outerwear) && isDenim(combo.bottom)) {
        const toneGap = Math.abs(denimToneRank(combo.outerwear) - denimToneRank(combo.bottom));
        if (toneGap === 0) score += ['white', 'black', 'gray'].includes(combo.top) ? 14 : 9;
        else if (toneGap === 1) score += 10;
        else score += 6;
      }
      if (isDenim(combo.top) && isDenim(combo.bottom)) {
        const toneGap = Math.abs(denimToneRank(combo.top) - denimToneRank(combo.bottom));
        score += toneGap === 0 ? 6 : 9;
      }
      if (combo.top === 'black-denim' && ['black', 'gray', 'white'].includes(combo.bottom)) {
        score += 6;
      }
      if (combo.topPattern !== 'solid' && combo.outerwear !== 'none' && combo.outerwear !== 'black' && combo.outerwear !== 'navy' && !isDenim(combo.outerwear) && !combo.outerwear.includes('-leather')) {
        score -= 5; // Penalty for complex pattern with complex outerwear color
      }

      return score;
    };

    let allCombos = new Set<string>();
    let comboList: RecommendationItem[] = [];

    for (const rule of validRules) {
      const tops = outfitMode === 'two-piece' ? (outfit.top === 'auto' ? (rule.top || ['black']) : [outfit.top]) : ['auto'];
      const topTypes = outfitMode === 'two-piece' ? (outfit.topType === 'auto' ? (rule.topTypes || ['t-shirt', 'shirt', 'knit']) : [outfit.topType]) : ['auto'];
      const topPatterns = outfitMode === 'two-piece' ? (outfit.topPattern === 'auto' ? (rule.topPatterns || ['solid', 'stripe', 'check', 'gingham']) : [outfit.topPattern]) : ['auto'];
      const bottoms = outfitMode === 'two-piece' ? (outfit.bottom === 'auto' ? (rule.bottom || ['black']) : [outfit.bottom]) : ['auto'];
      const dresses = outfitMode === 'one-piece' ? (outfit.dress === 'auto' ? (rule.dress || ['black']) : [outfit.dress]) : ['auto'];
      
      let ruleOuterwears = rule.outerwear || ['none'];
      if (!isSummer && outfit.outerwear === 'auto') {
        ruleOuterwears = ruleOuterwears.filter(o => o !== 'none');
        if (ruleOuterwears.length === 0) continue; 
      }
      const outerwears = isSummer ? ['none'] : (outfit.outerwear === 'auto' ? ruleOuterwears : [outfit.outerwear]);

      for (const t of tops) {
        for (const tt of topTypes as TopType[]) {
          for (const tp of topPatterns as TopPattern[]) {
            for (const b of bottoms) {
              for (const d of dresses) {
                for (const o of outerwears) {
                  const combo: OutfitState = { outerwear: o, top: t, topType: tt, topPattern: tp, bottom: b, dress: d };
                  const key = JSON.stringify(combo);
                  if (!allCombos.has(key)) {
                    allCombos.add(key);
                    comboList.push({ 
                      outfit: combo, 
                      ruleName: rule.name,
                      score: calculateScore(combo, rule)
                    });
                  }
                }
              }
            }
          }
        }
      }
    }

    // Sort by the score users see first, then raw score as a tie-breaker.
    comboList.sort((a, b) => {
      const displayDiff = toDisplayScore(b.score) - toDisplayScore(a.score);
      if (displayDiff !== 0) return displayDiff;
      if (b.score !== a.score) return b.score - a.score;
      return a.ruleName.localeCompare(b.ruleName);
    });

    const visibleCombos = comboList.filter(item => toDisplayScore(item.score) >= 85);
    const finalCombos = (visibleCombos.length > 0 ? visibleCombos : comboList).slice(0, 100); // Cap at 100 for performance

    if (finalCombos.length === 0) {
      const fallbackCombos = createFallbackRecommendations();
      setNoticeType(strongClash ? 'clash' : 'fallback');
      setRecommendationList(fallbackCombos);
      setSelectedRecIndex(0);
      setRecommended(fallbackCombos[0]?.outfit ?? null);
      setRuleName(fallbackCombos[0]?.ruleName ?? '');
      return;
    }

    setRecommendationList(finalCombos);
    setSelectedRecIndex(0);
    setRecommended(finalCombos[0].outfit);
    setRuleName(finalCombos[0].ruleName);
  };

  const selectRecommendation = (index: number) => {
    setSelectedRecIndex(index);
    setRecommended(recommendationList[index].outfit);
    setRuleName(recommendationList[index].ruleName);
  };

  const getColorsForCategory = (category: keyof OutfitState): string[] => {
    const validColors = new Set<string>();
    
    colorHarmonyDatabase.forEach(rule => {
      const genderMatch = rule.gender === selectedGender || rule.gender === 'unisex';
      const modeMatch = !rule.mode || rule.mode === outfitMode;
      if (!genderMatch || !modeMatch) return;

      const ruleColors = rule[category as keyof typeof rule];
      if (Array.isArray(ruleColors)) {
        ruleColors.forEach(c => validColors.add(c as string));
      }
    });

    // Pink is allowed for tops only. Pink/red bottoms are intentionally excluded.
    if (category !== 'top') {
      validColors.delete('pink');
    }
    if (category === 'bottom') {
      validColors.delete('red');
    }

    const allOrdered = [...availableColors, 'black-leather', 'brown-leather'];
    return allOrdered.filter(c => validColors.has(c));
  };

  const renderColorChips = (title: string, category: keyof OutfitState) => {
    const value = outfit[category];
    const isOuterwear = category === 'outerwear';
    const isSummer = selectedSeason === 'summer';
    
    // Disable outerwear in summer
    if (isOuterwear && isSummer) return null;

    const colorsToRender = getColorsForCategory(category);

    return (
      <div className="flex-col gap-2 mb-4" style={{ width: '100%' }}>
        <div className="flex justify-between items-center">
          <label className="text-muted" style={{ fontSize: '0.875rem' }}>{title}</label>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'capitalize' }}>
            {value === 'auto' ? 'Auto' : value === 'none' ? '없음' : getDisplayColorName(value)}
          </span>
        </div>
        <div className="color-picker-scroll">
          <div 
            className={`color-chip ${value === 'auto' ? 'selected' : ''}`}
            onClick={() => handleSelect(category, 'auto')}
          >
            <div className="color-circle" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
              <svg width="24" height="24" fill="white" viewBox="0 0 24 24" style={{ margin: '6px' }}><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
            </div>
            <span className="color-label">Auto</span>
          </div>

          {isOuterwear && (
            <div 
              className={`color-chip ${value === 'none' ? 'selected' : ''}`}
              onClick={() => handleSelect(category, 'none')}
            >
              <div className="color-circle" style={{ background: 'var(--glass-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#ef4444', fontSize: '1.2rem', fontWeight: 700 }}>X</span>
              </div>
              <span className="color-label">없음</span>
            </div>
          )}

          {colorsToRender.map(c => (
            <div 
              key={c} 
              className={`color-chip ${value === c ? 'selected' : ''}`}
              onClick={() => handleSelect(category, c)}
            >
              <div 
                className="color-circle" 
                style={{ 
                  background: getColorHex(c),
                  border: (c.toLowerCase() === 'black' || c.toLowerCase() === 'black-leather') ? '1px solid rgba(255,255,255,0.2)' : '2px solid transparent'
                }}
              />
              <span className="color-label">{getDisplayColorName(c)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderResultItem = (category: string, color: string) => {
    if (color === 'auto' || color === 'none') return null;
    return (
      <div className="flex items-center gap-4" style={{ background: 'var(--panel-item-bg)', padding: '12px', borderRadius: '12px' }}>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '8px', 
          background: getColorHex(color),
          border: (color.toLowerCase() === 'black' || color.toLowerCase() === 'black-leather') ? '1px solid rgba(255,255,255,0.2)' : 'none',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
        }}></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.75rem', color: selectedGender === 'female' ? '#ec4899' : 'var(--primary)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
            {category}
          </div>
          <div style={{ fontWeight: 500, fontSize: '1rem', textTransform: 'capitalize' }}>
            {getDisplayColorName(color)}
          </div>
        </div>
      </div>
    );
  };

  const getShoeRecommendation = (currentOutfit: OutfitState) => {
    const colors = [currentOutfit.outerwear, currentOutfit.top, currentOutfit.bottom, currentOutfit.dress]
      .filter(color => color !== 'auto' && color !== 'none');

    if (selectedSeason === 'summer') {
      return '신발 추천: 화이트 스니커즈, 베이지 샌들, 밝은 캔버스화가 잘 어울립니다.';
    }

    if (colors.includes('black') || colors.includes('black-leather')) {
      return '신발 추천: 블랙 로퍼, 블랙 첼시부츠, 미니멀한 블랙 스니커즈를 추천합니다.';
    }

    if (colors.includes('brown') || colors.includes('brown-leather') || colors.includes('beige')) {
      return '신발 추천: 브라운 로퍼, 베이지 스니커즈, 스웨이드 계열 신발이 자연스럽습니다.';
    }

    if (colors.some(isDenim) || colors.includes('navy') || colors.includes('blue')) {
      return '신발 추천: 화이트 스니커즈, 네이비 캔버스화, 브라운 캐주얼화를 추천합니다.';
    }

    return '신발 추천: 화이트 스니커즈, 블랙 로퍼, 베이지 캐주얼화처럼 무난한 색상이 좋습니다.';
  };

  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ padding: '0 0 24px' }}>
      
      {/* Top Controls: Gender & Season */}
      <div className="flex-col gap-2">
        <div className="flex gap-2" style={{ background: 'var(--glass-bg)', padding: '4px', borderRadius: '16px' }}>
          <button className={`btn ${selectedGender === 'male' ? '' : 'btn-secondary'}`} style={{ flex: 1, borderRadius: '12px', background: selectedGender === 'male' ? 'var(--primary)' : '' }} onClick={() => handleGenderChange('male')}>
            남자
          </button>
          <button className={`btn ${selectedGender === 'female' ? '' : 'btn-secondary'}`} style={{ flex: 1, borderRadius: '12px', background: selectedGender === 'female' ? '#ec4899' : '' }} onClick={() => handleGenderChange('female')}>
            여자
          </button>
        </div>

        <div className="flex gap-2" style={{ background: 'var(--glass-bg)', padding: '4px', borderRadius: '16px' }}>
          <button className={`btn ${selectedSeason === 'spring-fall' ? '' : 'btn-secondary'}`} style={{ flex: 1, borderRadius: '12px', background: selectedSeason === 'spring-fall' ? '#f59e0b' : '' }} onClick={() => handleSeasonChange('spring-fall')}>
            봄/가을
          </button>
          <button className={`btn ${selectedSeason === 'summer' ? '' : 'btn-secondary'}`} style={{ flex: 1, borderRadius: '12px', background: selectedSeason === 'summer' ? '#3b82f6' : '' }} onClick={() => handleSeasonChange('summer')}>
            여름
          </button>
          <button className={`btn ${selectedSeason === 'winter' ? '' : 'btn-secondary'}`} style={{ flex: 1, borderRadius: '12px', background: selectedSeason === 'winter' ? '#64748b' : '' }} onClick={() => handleSeasonChange('winter')}>
            겨울
          </button>
        </div>
      </div>

      {selectedGender === 'female' && (
        <div className="flex gap-2 justify-center animate-fade-in">
          <button className={`btn ${outfitMode === 'two-piece' ? '' : 'btn-secondary'}`} style={{ padding: '8px 16px', fontSize: '0.875rem', background: outfitMode === 'two-piece' ? '#ec4899' : '' }} onClick={() => handleModeChange('two-piece')}>
            상하의
          </button>
          <button className={`btn ${outfitMode === 'one-piece' ? '' : 'btn-secondary'}`} style={{ padding: '8px 16px', fontSize: '0.875rem', background: outfitMode === 'one-piece' ? '#ec4899' : '' }} onClick={() => handleModeChange('one-piece')}>
            원피스
          </button>
        </div>
      )}

      {/* Avatar Visualizer */}
      <div className="glass-panel animate-fade-in" style={{ padding: '10px', height: '350px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
        {selectedSeason === 'spring-fall' && <div style={{ position: 'absolute', top: 10, left: 10, fontSize: '1.5rem' }}>Spring</div>}
        {selectedSeason === 'summer' && <div style={{ position: 'absolute', top: 10, left: 10, fontSize: '1.5rem' }}>Summer</div>}
        {selectedSeason === 'winter' && <div style={{ position: 'absolute', top: 10, left: 10, fontSize: '1.5rem' }}>Winter</div>}
        <Avatar 
          gender={selectedGender} 
          mode={outfitMode} 
          colors={recommended ? recommended : outfit} 
        />
      </div>

      {/* Controller */}
      <div className="glass-panel" style={{ padding: '20px 12px' }}>
        <p className="text-muted mb-6 px-2" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
          {selectedSeason === 'summer' ? '여름에는 아우터 없이 시원한 조합을 추천합니다.' : '원하는 색상을 고르면 계절에 맞는 조합을 추천합니다.'}<br/>
          선택하지 않은 항목은 Auto 기준으로 채워집니다.
        </p>
        
        <div className="flex-col gap-2">
          {renderColorChips('Jacket (아우터)', 'outerwear')}
          
          {outfitMode === 'two-piece' && (
            <div className="flex-col gap-2 mb-4" style={{ width: '100%', background: 'var(--glass-bg)', padding: '12px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              {renderColorChips('Top Color (상의 색상)', 'top')}
              <div className="flex gap-2 mt-2">
                <div style={{ flex: 1 }}>
                  <label className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '4px', display: 'block' }}>종류</label>
                  <select 
                    value={outfit.topType} 
                    onChange={(e) => handleSelect('topType', e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}
                  >
                    <option value="auto">Auto</option>
                    <option value="t-shirt">티셔츠</option>
                    <option value="shirt">셔츠</option>
                    <option value="knit">니트</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '4px', display: 'block' }}>패턴</label>
                  <select 
                    value={outfit.topPattern} 
                    onChange={(e) => handleSelect('topPattern', e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}
                  >
                    <option value="auto">Auto</option>
                    <option value="solid">무지</option>
                    <option value="stripe">스트라이프</option>
                    <option value="check">체크</option>
                    <option value="gingham">깅엄</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {outfitMode === 'two-piece' && renderColorChips(selectedGender === 'male' ? 'Bottom (바지)' : 'Bottom (하의/치마)', 'bottom')}
          {outfitMode === 'one-piece' && renderColorChips('Dress (원피스)', 'dress')}
        </div>

        <div className="px-2 mt-4">
          <button className="btn" style={{ width: '100%', padding: '16px', fontSize: '1.125rem', background: selectedGender === 'female' ? '#ec4899' : 'var(--primary)' }} onClick={handleRecommend}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            코디 추천 받기
          </button>
        </div>
      </div>

      {noticeType !== 'none' && (
        <div className="glass-panel animate-fade-in" style={{ padding: '20px', border: `2px solid ${noticeType === 'clash' ? 'var(--danger)' : 'var(--primary)'}`, backgroundColor: noticeType === 'clash' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(37, 99, 235, 0.08)' }}>
          <h3 style={{ color: noticeType === 'clash' ? 'var(--danger)' : 'var(--primary)', fontSize: '1.125rem', fontWeight: 700, marginBottom: '8px' }}>
            {noticeType === 'clash' ? '강한 색상 충돌이 있습니다' : '정확히 일치하는 DB 규칙은 없습니다'}
          </h3>
          <p style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
            {noticeType === 'clash'
              ? '선택한 색상들이 서로 강하게 튀어서 실제 착장에서는 부담스러울 수 있습니다. 그래도 가능한 대안 조합을 함께 보여드립니다.'
              : 'DB에 정확히 같은 규칙은 없지만, 패션테러로 판단하지 않고 일반 컬러 조합 기준으로 가능한 추천을 보여줍니다.'}
            <br/><br/>
            더 정확한 추천을 원하면 일부 항목을 <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Auto</span>로 바꿔보세요.
          </p>
        </div>
      )}

      {/* Result Panel */}
      {recommended && recommendationList.length > 0 && (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px 20px', border: `2px solid ${selectedGender === 'female' ? '#ec4899' : 'var(--primary)'}` }}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '4px' }}>
                추천 코디 <span style={{ color: getScoreLabelColor(toDisplayScore(recommendationList[selectedRecIndex].score)) }}>
                  ({toDisplayScore(recommendationList[selectedRecIndex].score)}점 · {getScoreLabel(toDisplayScore(recommendationList[selectedRecIndex].score))})
                </span>
              </h3>
              <span style={{ fontSize: '0.875rem', background: selectedGender === 'female' ? '#ec4899' : 'var(--primary)', padding: '4px 12px', borderRadius: '12px', display: 'inline-block' }}>
                {ruleName}
              </span>
            </div>
            {/* Save to Lookbook Button */}
            <button className="btn" style={{ background: 'var(--glass-bg)', color: selectedGender === 'female' ? '#ec4899' : 'var(--primary)', padding: '8px 12px', border: '1px solid var(--glass-border)' }} onClick={saveToLookbook}>
              저장
            </button>
          </div>
          
          <div className="flex-col gap-3">
            {renderResultItem('Jacket', recommended.outerwear)}
            {outfitMode === 'two-piece' && renderResultItem(`Top (${recommended.topType}/${recommended.topPattern})`, recommended.top)}
            {outfitMode === 'two-piece' && renderResultItem('Bottom', recommended.bottom)}
            {outfitMode === 'one-piece' && renderResultItem('Dress', recommended.dress)}
            <div style={{ background: 'var(--panel-item-bg)', padding: '14px', borderRadius: '12px', border: '1px solid var(--glass-border)', lineHeight: 1.5 }}>
              <div style={{ fontSize: '0.75rem', color: selectedGender === 'female' ? '#ec4899' : 'var(--primary)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
                Shoes
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                {getShoeRecommendation(recommended)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Multiple Recommendations Gallery */}
      {recommendationList.length > 1 && (
        <div className="glass-panel animate-fade-in" style={{ padding: '16px' }}>
          <h3 className="mb-4" style={{ fontSize: '1rem', fontWeight: 600 }}>
            다른 추천 코디도 확인해보세요 ({recommendationList.length}개)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {recommendationList.map((rec, index) => (
              <div 
                key={index} 
                className="color-chip"
                style={{ 
                  width: '100%',
                  border: selectedRecIndex === index ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  padding: '8px',
                  background: selectedRecIndex === index ? 'rgba(139, 92, 246, 0.1)' : 'var(--glass-bg)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => selectRecommendation(index)}
              >
                <div style={{ position: 'absolute', top: 4, right: 4, background: 'var(--panel-item-bg)', padding: '2px 5px', borderRadius: '8px', fontSize: '0.58rem', fontWeight: 'bold', color: getScoreLabelColor(toDisplayScore(rec.score)), border: '1px solid var(--glass-border)', maxWidth: '88px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {toDisplayScore(rec.score)}점 · {getScoreLabel(toDisplayScore(rec.score))}
                </div>
                <div style={{ width: '100%', height: '100px' }}>
                  <Avatar gender={selectedGender} mode={outfitMode} colors={rec.outfit} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lookbook Gallery */}
      {savedOutfits.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-4" style={{ fontSize: '1.25rem', fontWeight: 700, paddingLeft: '8px' }}>Lookbook Gallery</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', paddingBottom: '16px' }}>
            {savedOutfits.map(saved => (
              <div key={saved.id} className="glass-panel" style={{ padding: '16px', position: 'relative' }}>
                <button 
                  style={{ position: 'absolute', top: '8px', right: '8px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}
                  onClick={() => deleteFromLookbook(saved.id)}
                >
                  &times;
                </button>
                <div 
                  style={{ height: '140px', marginBottom: '12px', cursor: 'pointer' }}
                  onClick={() => loadFromLookbook(saved)}
                >
                  <Avatar gender={saved.gender} mode={saved.mode} colors={saved.colors} />
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, textAlign: 'center', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{saved.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                  {saved.season === 'summer' ? 'Summer' : saved.season === 'winter' ? 'Winter' : 'Spring/Fall'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Coordinator;
