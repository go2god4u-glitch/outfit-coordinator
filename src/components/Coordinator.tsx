import React, { useState, useEffect, useRef } from 'react';
import type { Gender, OutfitMode, Season, SavedOutfit, TopType, TopPattern, WornEntry } from '../types';
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
  description?: string;
}

type NoticeType = 'none' | 'fallback' | 'clash';

const COLOR_NAMES: Record<string, string> = {
  black: '블랙', white: '화이트', gray: '그레이', navy: '네이비',
  beige: '베이지', blue: '블루', 'light-blue': '연한블루', red: '레드',
  green: '그린', brown: '브라운', yellow: '옐로우', pink: '핑크',
  khaki: '카키', olive: '올리브',
  'light-denim': '연청 데님', denim: '중청 데님',
  'dark-denim': '진청 데님', 'black-denim': '흑청 데님',
  'black-leather': '검정 가죽', 'brown-leather': '갈색 가죽',
};

const SEASON_LABELS: Record<string, string> = {
  'spring-fall': '🌿 봄/가을', summer: '☀️ 여름', winter: '❄️ 겨울',
};

const Coordinator: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<Gender>('male');
  const [outfitMode, setOutfitMode] = useState<OutfitMode>('two-piece');
  const [selectedSeason, setSelectedSeason] = useState<Season>('spring-fall');
  const [scoreThreshold, setScoreThreshold] = useState<number>(() => {
    const saved = localStorage.getItem('coordi_scoreThreshold');
    const parsed = saved ? Number(saved) : NaN;
    return Number.isFinite(parsed) ? Math.min(99, Math.max(80, parsed)) : 85;
  });

  useEffect(() => {
    localStorage.setItem('coordi_scoreThreshold', String(scoreThreshold));
  }, [scoreThreshold]);

  const [outfit, setOutfit] = useState<OutfitState>({
    outerwear: 'auto', top: 'auto', topType: 'auto', topPattern: 'solid',
    bottom: 'auto', dress: 'auto',
  });

  const [useTopType, setUseTopType] = useState(false);
  const [useTopPattern, setUseTopPattern] = useState(false);

  const [recommended, setRecommended] = useState<OutfitState | null>(null);
  const [ruleName, setRuleName] = useState<string>('');
  const [ruleDescription, setRuleDescription] = useState<string>('');
  const [recommendationList, setRecommendationList] = useState<RecommendationItem[]>([]);
  const [selectedRecIndex, setSelectedRecIndex] = useState<number>(0);
  const [noticeType, setNoticeType] = useState<NoticeType>('none');
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [wornHistory, setWornHistory] = useState<WornEntry[]>([]);
  const [todayMode, setTodayMode] = useState<boolean>(() => localStorage.getItem('coordi_todayMode') === '1');
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    localStorage.setItem('coordi_todayMode', todayMode ? '1' : '0');
  }, [todayMode]);

  const showToast = (msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  const isDenim = (color: string) => denimColors.includes(color);

  const denimToneRank = (color: string) => {
    const ranks: Record<string, number> = {
      'light-denim': 1, denim: 2, 'dark-denim': 3, 'black-denim': 4,
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

  const getDisplayColorName = (color: string) => COLOR_NAMES[color] ?? color;

  // Color harmony bonus based on color theory
  const getColorHarmonyBonus = (colorList: string[]): number => {
    const c = colorList.filter(x => x !== 'auto' && x !== 'none');
    if (c.length < 2) return 0;
    let bonus = 0;

    const has = (x: string) => c.includes(x);
    const hasDenim = c.some(isDenim);
    const neutrals = ['black', 'white', 'gray'];
    const warmNeutrals = ['beige', 'brown', 'khaki', 'olive'];
    const allNeutral = c.every(x => neutrals.includes(x) || isDenim(x));
    const allSafe = c.every(x => [...neutrals, ...warmNeutrals].includes(x) || isDenim(x));

    if (allNeutral) bonus += 8;
    else if (allSafe) bonus += 5;

    // Classic pairings
    if (has('navy') && has('beige')) bonus += 7;
    if (has('navy') && has('white')) bonus += 5;
    if (has('black') && has('beige')) bonus += 5;
    if (has('gray') && has('navy')) bonus += 4;
    if (has('brown') && has('beige')) bonus += 6;
    if (has('brown') && has('khaki')) bonus += 5;
    if (has('olive') && has('brown')) bonus += 4;
    if (hasDenim && (has('white') || has('beige') || has('khaki') || has('olive'))) bonus += 5;
    if (hasDenim && has('navy')) bonus += 4;

    return bonus;
  };

  const createFallbackRecommendations = (): RecommendationItem[] => {
    const isSummer = selectedSeason === 'summer';
    const isWinter = selectedSeason === 'winter';
    const fallbackTops = outfit.top === 'auto'
      ? isSummer ? ['white', 'beige', 'blue', 'light-denim', 'gray']
        : isWinter ? ['black', 'gray', 'navy', 'beige', 'brown', 'dark-denim']
          : ['white', 'black', 'gray', 'beige', 'light-denim']
      : [outfit.top];
    const fallbackTopTypes = outfit.topType === 'auto'
      ? (isSummer ? ['t-shirt', 'shirt'] : isWinter ? ['knit', 'shirt'] : ['t-shirt', 'shirt', 'knit']) as TopType[]
      : [outfit.topType];
    const fallbackTopPatterns = outfit.topPattern === 'auto'
      ? ['solid', 'stripe'] as TopPattern[] : [outfit.topPattern];
    const fallbackBottoms = outfit.bottom === 'auto'
      ? isSummer ? ['white', 'beige', 'khaki', 'gray', 'light-denim', 'denim']
        : isWinter ? ['black', 'gray', 'navy', 'brown', 'dark-denim', 'black-denim']
          : ['black', 'beige', 'khaki', 'olive', 'gray', 'navy', 'denim']
      : [outfit.bottom];
    const fallbackOuterwears = isSummer ? ['none'] : outfit.outerwear === 'auto'
      ? (isWinter ? ['black', 'navy', 'gray', 'brown', 'black-leather', 'brown-leather']
        : ['none', 'black', 'navy', 'beige', 'denim', 'khaki'])
      : [outfit.outerwear];
    const fallbackDresses = outfit.dress === 'auto'
      ? (isSummer ? ['white', 'blue', 'yellow', 'beige']
        : isWinter ? ['black', 'navy', 'gray', 'beige'] : ['black', 'navy', 'beige', 'white'])
      : [outfit.dress];

    const combos: RecommendationItem[] = [];

    for (const top of outfitMode === 'two-piece' ? fallbackTops : ['auto']) {
      for (const topType of outfitMode === 'two-piece' ? fallbackTopTypes : ['auto'] as TopType[]) {
        for (const topPattern of outfitMode === 'two-piece' ? fallbackTopPatterns : ['auto'] as TopPattern[]) {
          for (const bottom of outfitMode === 'two-piece' ? fallbackBottoms : ['auto']) {
            for (const dress of outfitMode === 'one-piece' ? fallbackDresses : ['auto']) {
              for (const outerwear of fallbackOuterwears) {
                const combo: OutfitState = { outerwear, top, topType, topPattern, bottom, dress };
                let score = 70;
                const colorList = [outerwear, top, bottom, dress].filter(c => c !== 'auto' && c !== 'none');
                if (colorList.includes('white') && (colorList.includes('khaki') || colorList.includes('beige'))) score += 8;
                if (colorList.includes('black') && colorList.includes('gray')) score += 5;
                if (colorList.includes('navy') && colorList.includes('white')) score += 5;
                if (colorList.some(isDenim) && (colorList.includes('khaki') || colorList.includes('beige') || colorList.includes('white'))) score += 9;
                if (isDenim(top) && (bottom === 'khaki' || bottom === 'beige')) score += 10;
                if (isDenim(outerwear) && isDenim(bottom)) score += 7;
                score += getColorHarmonyBonus(colorList);
                combos.push({ outfit: combo, ruleName: '기본 컬러 조합', score: Math.min(score, 88) });
              }
            }
          }
        }
      }
    }

    combos.sort((a, b) => b.score - a.score);

    const visibleFallbackCombos = combos.filter(item => toDisplayScore(item.score) >= scoreThreshold);
    if (visibleFallbackCombos.length > 0) {
      return visibleFallbackCombos;
    }

    const bestFallbackScore = toDisplayScore(combos[0]?.score ?? 0);
    return combos.filter(item => toDisplayScore(item.score) === bestFallbackScore);
  };

  const hasStrongColorClash = () => {
    const colors = [outfit.outerwear, outfit.top, outfit.bottom, outfit.dress]
      .filter(color => color !== 'auto' && color !== 'none');
    const saturatedColors = colors.filter(color =>
      ['red', 'green', 'yellow', 'pink', 'blue'].includes(color));
    if (saturatedColors.length >= 3) return true;
    if (colors.includes('red') && colors.includes('green') && !colors.includes('white') && !colors.includes('black')) return true;
    if (colors.includes('yellow') && colors.includes('pink') && colors.includes('green')) return true;
    if (outfit.topPattern !== 'solid' && outfit.topPattern !== 'auto' &&
      colors.filter(color => !['white', 'black', 'gray', 'navy'].includes(color) && !isDenim(color)).length >= 3) return true;
    return false;
  };

  useEffect(() => {
    const saved = localStorage.getItem('styleSync_lookbook');
    if (saved) setSavedOutfits(JSON.parse(saved));
    const worn = localStorage.getItem('coordi_wornHistory');
    if (worn) {
      try { setWornHistory(JSON.parse(worn)); } catch { /* ignore */ }
    }
  }, []);

  const makeOutfitKey = (gender: Gender, mode: OutfitMode, c: OutfitState | RecommendationItem['outfit']) => {
    return [
      gender, mode,
      c.outerwear ?? 'auto',
      c.top ?? 'auto',
      c.topType ?? 'auto',
      c.topPattern ?? 'auto',
      c.bottom ?? 'auto',
      c.dress ?? 'auto',
    ].join('|');
  };

  const getDaysSinceWorn = (key: string): number | null => {
    const entries = wornHistory.filter(e => e.key === key);
    if (entries.length === 0) return null;
    const latest = Math.max(...entries.map(e => e.wornAt));
    return Math.floor((Date.now() - latest) / (1000 * 60 * 60 * 24));
  };

  const getWornPenalty = (days: number | null): number => {
    if (days === null) return 0;
    if (days <= 7) return 20;
    if (days <= 21) return 10;
    if (days <= 45) return 3;
    return 0;
  };

  const isWornToday = (key: string): boolean => {
    const today = new Date().toDateString();
    return wornHistory.some(e => e.key === key && new Date(e.wornAt).toDateString() === today);
  };

  const toggleWornToday = () => {
    if (!recommended) return;
    const key = makeOutfitKey(selectedGender, outfitMode, recommended);
    const today = new Date().toDateString();
    const alreadyToday = wornHistory.some(e => e.key === key && new Date(e.wornAt).toDateString() === today);

    let updated: WornEntry[];
    if (alreadyToday) {
      updated = wornHistory.filter(e => !(e.key === key && new Date(e.wornAt).toDateString() === today));
      showToast('오늘 입음 기록을 취소했어요');
    } else {
      const entry: WornEntry = {
        id: Date.now().toString(),
        key,
        wornAt: Date.now(),
        gender: selectedGender,
        mode: outfitMode,
        season: selectedSeason,
        name: ruleName,
        colors: { ...recommended },
      };
      updated = [entry, ...wornHistory].slice(0, 200);
      showToast('오늘 입은 옷으로 기록됐어요 👕');
    }
    setWornHistory(updated);
    localStorage.setItem('coordi_wornHistory', JSON.stringify(updated));
  };

  const deleteWornEntry = (id: string) => {
    const updated = wornHistory.filter(e => e.id !== id);
    setWornHistory(updated);
    localStorage.setItem('coordi_wornHistory', JSON.stringify(updated));
  };

  const isFavorited = (): boolean => {
    if (!recommended) return false;
    const key = makeOutfitKey(selectedGender, outfitMode, recommended);
    return savedOutfits.some(o => makeOutfitKey(o.gender, o.mode, o.colors) === key);
  };

  const toggleFavorite = () => {
    if (!recommended) return;
    const key = makeOutfitKey(selectedGender, outfitMode, recommended);
    const existing = savedOutfits.find(o => makeOutfitKey(o.gender, o.mode, o.colors) === key);
    let updated: SavedOutfit[];
    if (existing) {
      updated = savedOutfits.filter(o => o.id !== existing.id);
      showToast('마음에 든 코디에서 제거했어요');
    } else {
      const newOutfit: SavedOutfit = {
        id: Date.now().toString(),
        name: ruleName,
        gender: selectedGender,
        mode: outfitMode,
        season: selectedSeason,
        colors: { ...recommended },
        createdAt: Date.now(),
      };
      updated = [newOutfit, ...savedOutfits];
      showToast('마음에 든 코디에 저장했어요 🔖');
    }
    setSavedOutfits(updated);
    localStorage.setItem('styleSync_lookbook', JSON.stringify(updated));
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
    setRuleDescription('');
    setNoticeType('none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenderChange = (g: Gender) => {
    setSelectedGender(g);
    if (g === 'male') setOutfitMode('two-piece');
    setRecommended(null); setRecommendationList([]); setNoticeType('none');
  };

  const handleModeChange = (m: OutfitMode) => {
    setOutfitMode(m);
    setRecommended(null); setRecommendationList([]); setNoticeType('none');
  };

  const handleSeasonChange = (s: Season) => {
    setSelectedSeason(s);
    if (s === 'summer') setOutfit(prev => ({ ...prev, outerwear: 'none' }));
    setRecommended(null); setRecommendationList([]); setNoticeType('none');
  };

  const handleScoreThresholdChange = (value: string) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return;
    setScoreThreshold(Math.min(99, Math.max(80, parsed)));
  };

  const handleSelect = (category: keyof OutfitState, value: string) => {
    setOutfit(prev => ({ ...prev, [category]: value as any }));
    setRecommended(null); setRecommendationList([]); setNoticeType('none');
  };

  const handleRecommend = () => {
    const isSummer = selectedSeason === 'summer';
    const strongClash = hasStrongColorClash();
    const selectedColors = outfitMode === 'two-piece'
      ? [outfit.outerwear, outfit.top, outfit.bottom]
      : [outfit.outerwear, outfit.dress];

    if (selectedColors.every(color => color === 'auto' || color === 'none')) {
      setRecommended(null);
      setRecommendationList([]);
      setSelectedRecIndex(0);
      setRuleName('');
      setRuleDescription('');
      setNoticeType('none');
      showToast('상의, 하의, 원피스, 자켓 중 하나 이상 색상을 골라주세요.');
      return;
    }

    const filteredDatabase = colorHarmonyDatabase.filter(rule => {
      const genderMatch = rule.gender === selectedGender || rule.gender === 'unisex';
      const modeMatch = rule.mode === outfitMode;
      const seasonMatch = rule.seasons.includes(selectedSeason);
      return genderMatch && modeMatch && seasonMatch;
    });

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
      setRuleDescription('');
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
      if (useTopType) addPoints(combo.topType, rule.topTypes);
      if (useTopPattern) addPoints(combo.topPattern, rule.topPatterns);
      addPoints(combo.bottom, rule.bottom);
      addPoints(combo.outerwear, rule.outerwear);
      addPoints(combo.dress, rule.dress);

      const colorList = [combo.top, combo.bottom, combo.outerwear, combo.dress].filter(c => c !== 'none' && c !== 'auto');

      // Season bonuses
      if (selectedSeason === 'summer') {
        if (combo.outerwear === 'none') score += 8;
        if (useTopType && ['t-shirt', 'shirt'].includes(combo.topType)) score += 5;
        if (['white', 'beige', 'blue', 'light-denim'].includes(combo.top)) score += 4;
        if (['white', 'beige', 'khaki', 'gray', 'light-denim', 'denim'].includes(combo.bottom)) score += 4;
        if (useTopType && combo.topType === 'knit') score -= 8;
        if (['black', 'brown', 'black-leather', 'brown-leather'].includes(combo.outerwear)) score -= 8;
        if (colorList.every(c => ['white', 'beige', 'blue', 'gray'].includes(c) || isDenim(c))) score += 6;
      }

      if (selectedSeason === 'spring-fall') {
        if (useTopType && ['shirt', 'knit'].includes(combo.topType)) score += 4;
        if (['beige', 'navy', 'khaki', 'olive', 'denim', 'light-denim'].includes(combo.outerwear)) score += 6;
        if (['beige', 'khaki', 'olive', 'denim', 'light-denim', 'gray'].includes(combo.bottom)) score += 4;
        if (combo.outerwear === 'none') score += 2;
      }

      if (selectedSeason === 'winter') {
        if (useTopType && combo.topType === 'knit') score += 9;
        if (['black', 'navy', 'gray', 'brown', 'black-leather', 'brown-leather'].includes(combo.outerwear)) score += 8;
        if (['black', 'gray', 'navy', 'brown', 'dark-denim', 'black-denim'].includes(combo.bottom)) score += 6;
        if (combo.outerwear === 'none') score -= 12;
        if (['white', 'yellow', 'light-denim'].includes(combo.bottom)) score -= 4;
      }

      // Pattern synergies (only active when type/pattern considered)
      if (useTopPattern && combo.outerwear === 'navy' && combo.topPattern === 'stripe') score += 10;
      if (useTopType && useTopPattern && combo.topType === 'shirt' && combo.topPattern === 'stripe' && ['navy', 'white', 'beige', 'gray'].includes(combo.bottom)) score += 7;
      if (useTopType && useTopPattern && combo.topType === 'shirt' && combo.topPattern === 'stripe' && ['navy', 'beige', 'gray', 'none'].includes(combo.outerwear)) score += 5;
      if (useTopPattern && isDenim(combo.bottom) && combo.topPattern === 'check') score += 5;
      if (useTopType && useTopPattern && combo.topType === 'shirt' && combo.topPattern === 'check' && (isDenim(combo.bottom) || ['khaki', 'olive', 'beige', 'black'].includes(combo.bottom))) score += 8;
      if (useTopType && useTopPattern && combo.topType === 'shirt' && combo.topPattern === 'check' && ['brown', 'khaki', 'olive', 'navy', 'none'].includes(combo.outerwear)) score += 5;
      if (useTopType && useTopPattern && combo.topType === 'shirt' && combo.topPattern === 'gingham' && ['beige', 'white', 'navy', 'khaki'].includes(combo.bottom)) score += 8;
      if (useTopType && useTopPattern && combo.topType === 'shirt' && combo.topPattern === 'gingham' && ['navy', 'beige', 'white', 'none'].includes(combo.outerwear)) score += 5;
      if (useTopType && combo.topType === 'shirt' && (combo.outerwear === 'khaki' || combo.outerwear === 'olive')) score += 5;
      if (useTopType && combo.topType === 'knit' && ['beige', 'brown', 'gray', 'navy'].includes(combo.outerwear)) score += 4;
      if (combo.outerwear === 'black-leather' && isDenim(combo.bottom)) score += 5;
      if (combo.outerwear === 'brown-leather' && isDenim(combo.bottom)) score += 5;

      // Denim tone combos
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
      if (combo.top === 'black-denim' && ['black', 'gray', 'white'].includes(combo.bottom)) score += 6;
      if (useTopPattern && combo.topPattern !== 'solid' && combo.outerwear !== 'none' && combo.outerwear !== 'black' &&
        combo.outerwear !== 'navy' && !isDenim(combo.outerwear) && !combo.outerwear.includes('-leather')) {
        score -= 5;
      }

      // Color harmony bonus
      score += getColorHarmonyBonus(colorList);

      return score;
    };

    const allCombos = new Set<string>();
    const comboList: RecommendationItem[] = [];

    for (const rule of validRules) {
      const tops = outfitMode === 'two-piece'
        ? (outfit.top === 'auto' ? (rule.top || ['black']) : [outfit.top]) : ['auto'];
      const topTypes = outfitMode === 'two-piece'
        ? (!useTopType
            ? (['t-shirt'] as TopType[])  // 체크 안 하면 색상만 — 기본 타입 고정
            : outfit.topType === 'auto' ? (rule.topTypes || ['t-shirt', 'shirt', 'knit']) : [outfit.topType])
        : ['auto'] as TopType[];
      const topPatterns = outfitMode === 'two-piece'
        ? (!useTopPattern
            ? (['solid'] as TopPattern[])  // 체크 안 하면 색상만 — 기본 패턴 고정
            : outfit.topPattern === 'auto' ? (rule.topPatterns || ['solid', 'stripe', 'check', 'gingham']) : [outfit.topPattern])
        : ['auto'] as TopPattern[];
      const bottoms = outfitMode === 'two-piece'
        ? (outfit.bottom === 'auto' ? (rule.bottom || ['black']) : [outfit.bottom]) : ['auto'];
      const dresses = outfitMode === 'one-piece'
        ? (outfit.dress === 'auto' ? (rule.dress || ['black']) : [outfit.dress]) : ['auto'];

      let ruleOuterwears = rule.outerwear || ['none'];
      if (!isSummer && outfit.outerwear === 'auto') {
        ruleOuterwears = ruleOuterwears.filter((o: string) => o !== 'none');
        if (ruleOuterwears.length === 0) continue;
      }
      const outerwears = isSummer ? ['none'] : (outfit.outerwear === 'auto' ? ruleOuterwears : [outfit.outerwear]);

      for (const t of tops) {
        for (const tt of topTypes as TopType[]) {
          for (const tp of topPatterns as TopPattern[]) {
            for (const b of bottoms) {
              for (const dr of dresses) {
                for (const o of outerwears) {
                  const combo: OutfitState = { outerwear: o, top: t, topType: tt, topPattern: tp, bottom: b, dress: dr };
                  const key = JSON.stringify(combo);
                  if (!allCombos.has(key)) {
                    allCombos.add(key);
                    comboList.push({
                      outfit: combo,
                      ruleName: rule.name,
                      score: calculateScore(combo, rule),
                      description: rule.description,
                    });
                  }
                }
              }
            }
          }
        }
      }
    }

    // Apply "worn recently" penalty so previously worn outfits are pushed down
    comboList.forEach(item => {
      const days = getDaysSinceWorn(makeOutfitKey(selectedGender, outfitMode, item.outfit));
      const penalty = getWornPenalty(days);
      if (penalty > 0) item.score -= penalty;
    });

    // "오늘 뭐 입지" mode: hide combos worn within the last 14 days entirely
    let workingCombos = comboList;
    if (todayMode) {
      workingCombos = comboList.filter(item => {
        const days = getDaysSinceWorn(makeOutfitKey(selectedGender, outfitMode, item.outfit));
        return days === null || days > 14;
      });
      if (workingCombos.length === 0) workingCombos = comboList; // graceful fallback
    }

    workingCombos.sort((a, b) => {
      const displayDiff = toDisplayScore(b.score) - toDisplayScore(a.score);
      if (displayDiff !== 0) return displayDiff;
      if (b.score !== a.score) return b.score - a.score;
      return a.ruleName.localeCompare(b.ruleName);
    });

    const visibleCombos = workingCombos.filter(item => toDisplayScore(item.score) >= scoreThreshold);
    const bestVisibleScore = toDisplayScore(workingCombos[0]?.score ?? 0);
    const finalCombos = visibleCombos.length > 0
      ? visibleCombos
      : workingCombos.filter(item => toDisplayScore(item.score) === bestVisibleScore);

    if (finalCombos.length === 0) {
      const fallbackCombos = createFallbackRecommendations();
      setNoticeType(strongClash ? 'clash' : 'fallback');
      setRecommendationList(fallbackCombos);
      setSelectedRecIndex(0);
      setRecommended(fallbackCombos[0]?.outfit ?? null);
      setRuleName(fallbackCombos[0]?.ruleName ?? '');
      setRuleDescription('');
      return;
    }

    setRecommendationList(finalCombos);
    setSelectedRecIndex(0);
    setRecommended(finalCombos[0].outfit);
    setRuleName(finalCombos[0].ruleName);
    setRuleDescription(finalCombos[0].description ?? '');
  };

  const selectRecommendation = (index: number) => {
    setSelectedRecIndex(index);
    setRecommended(recommendationList[index].outfit);
    setRuleName(recommendationList[index].ruleName);
    setRuleDescription(recommendationList[index].description ?? '');
  };

  const getColorsForCategory = (category: keyof OutfitState): string[] => {
    const validColors = new Set<string>();
    colorHarmonyDatabase.forEach(rule => {
      const genderMatch = rule.gender === selectedGender || rule.gender === 'unisex';
      const modeMatch = !rule.mode || rule.mode === outfitMode;
      if (!genderMatch || !modeMatch) return;
      const ruleColors = rule[category as keyof typeof rule];
      if (Array.isArray(ruleColors)) ruleColors.forEach(c => validColors.add(c as string));
    });
    if (category === 'bottom' || category === 'dress') validColors.delete('pink');
    if (category === 'bottom') validColors.delete('red');
    const allOrdered = [...availableColors, 'black-leather', 'brown-leather'];
    return allOrdered.filter(c => validColors.has(c));
  };

  const renderColorChips = (title: string, category: keyof OutfitState) => {
    const value = outfit[category];
    const isOuterwear = category === 'outerwear';
    const isSummer = selectedSeason === 'summer';
    if (isOuterwear && isSummer) return null;
    const colorsToRender = getColorsForCategory(category);
    const accentColor = selectedGender === 'female' ? '#ec4899' : 'var(--primary)';

    return (
      <div className="flex-col gap-2 mb-4" style={{ width: '100%' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: '2px' }}>
          <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>{title}</label>
          {value !== 'auto' && value !== 'none' && (
            <span style={{ fontSize: '0.75rem', color: accentColor, fontWeight: 700, background: 'var(--glass-bg)', padding: '2px 10px', borderRadius: '999px', border: '1px solid var(--glass-border)' }}>
              {getDisplayColorName(value)}
            </span>
          )}
        </div>
        <div className="color-picker-scroll">
          {/* Auto chip */}
          <div className={`color-chip ${value === 'auto' ? 'selected' : ''}`} onClick={() => handleSelect(category, 'auto')}>
            <div className="color-circle" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
            <span className="color-label">Auto</span>
          </div>

          {isOuterwear && (
            <div className={`color-chip ${value === 'none' ? 'selected' : ''}`} onClick={() => handleSelect(category, 'none')}>
              <div className="color-circle" style={{ background: 'var(--glass-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)' }}>
                <span style={{ color: '#ef4444', fontSize: '1.1rem', fontWeight: 700, lineHeight: 1 }}>✕</span>
              </div>
              <span className="color-label">없음</span>
            </div>
          )}

          {colorsToRender.map(c => (
            <div key={c} className={`color-chip ${value === c ? 'selected' : ''}`} onClick={() => handleSelect(category, c)}>
              <div className="color-circle" style={{
                background: getColorHex(c),
                border: ['black', 'black-leather', 'black-denim'].includes(c) ? '1px solid rgba(255,255,255,0.2)' : '2px solid transparent',
              }} />
              <span className="color-label">{getDisplayColorName(c)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderResultItem = (category: string, color: string, sub?: string) => {
    if (color === 'auto' || color === 'none') return null;
    const accentColor = selectedGender === 'female' ? '#ec4899' : 'var(--primary)';
    return (
      <div className="flex items-center gap-4" style={{ background: 'var(--panel-item-bg)', padding: '12px 14px', borderRadius: '12px' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0,
          background: getColorHex(color),
          border: ['black', 'black-leather', 'black-denim'].includes(color) ? '1px solid rgba(255,255,255,0.2)' : 'none',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.72rem', color: accentColor, textTransform: 'uppercase', fontWeight: 700, marginBottom: '3px', letterSpacing: '0.05em' }}>
            {category}
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{getDisplayColorName(color)}</div>
          {sub && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>{sub}</div>}
        </div>
      </div>
    );
  };

  const renderRecommendationColorSummary = (item: RecommendationItem) => {
    const parts: Array<{ label: string; color: string }> = [];

    if (outfit.outerwear === 'auto' && item.outfit.outerwear !== 'auto' && item.outfit.outerwear !== 'none') {
      parts.push({
        label: '자켓',
        color: item.outfit.outerwear,
      });
    }

    if (outfitMode === 'two-piece') {
      if (outfit.top === 'auto' && item.outfit.top !== 'auto') {
        parts.push({
          label: '상의',
          color: item.outfit.top,
        });
      }
      if (outfit.bottom === 'auto' && item.outfit.bottom !== 'auto') {
        parts.push({
          label: '하의',
          color: item.outfit.bottom,
        });
      }
    } else if (outfit.dress === 'auto' && item.outfit.dress !== 'auto') {
      parts.push({
        label: '원피스',
        color: item.outfit.dress,
      });
    }

    if (parts.length === 0) return null;

    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={`${part.label}-${part.color}`}>
            {index > 0 && <span style={{ fontWeight: 400 }}> · </span>}
            <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>
              {part.label} {getDisplayColorName(part.color)}
            </span>
          </React.Fragment>
        ))}
      </>
    );
  };

  const renderSelectedRecommendationPanel = () => {
    if (!recommended || recommendationList.length === 0) return null;

    return (
      <div className="glass-panel animate-fade-in" style={{ padding: '22px 18px', border: `2px solid ${accentColor}`, gridColumn: '1 / -1' }}>
        <div className="flex justify-between items-start mb-4">
          <div style={{ flex: 1, minWidth: 0, marginRight: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                fontSize: '0.72rem', fontWeight: 700, color: getScoreLabelColor(toDisplayScore(recommendationList[selectedRecIndex].score)),
                background: 'var(--panel-item-bg)', padding: '3px 10px', borderRadius: '999px', border: '1px solid var(--glass-border)', whiteSpace: 'nowrap',
              }}>
                {toDisplayScore(recommendationList[selectedRecIndex].score)}점 · {getScoreLabel(toDisplayScore(recommendationList[selectedRecIndex].score))}
              </span>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, background: accentColor, padding: '4px 12px', borderRadius: '10px', display: 'inline-block', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {ruleName}
            </div>
          </div>
          {(() => {
            const wornToday = recommended ? isWornToday(makeOutfitKey(selectedGender, outfitMode, recommended)) : false;
            const fav = isFavorited();
            return (
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                <button
                  className="btn"
                  title={wornToday ? '오늘 입음 기록 취소' : '입었어요 - 날짜 기록 + 다음 추천에서 가중치 낮춤'}
                  aria-pressed={wornToday}
                  style={{
                    background: wornToday ? accentColor : 'var(--glass-bg)',
                    color: wornToday ? 'white' : accentColor,
                    padding: '8px 12px',
                    border: `1px solid ${accentColor}`,
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    transition: 'all 0.18s ease',
                  }}
                  onClick={toggleWornToday}
                >
                  {wornToday ? '✓ 입었음' : '👕 입었어요'}
                </button>
                <button
                  className="btn"
                  title={fav ? '마음에 든 코디에서 제거' : '마음에 든 코디로 저장'}
                  aria-pressed={fav}
                  style={{
                    background: fav ? accentColor : 'var(--glass-bg)',
                    color: fav ? 'white' : accentColor,
                    padding: '8px 12px',
                    border: `1px solid ${accentColor}`,
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    transition: 'all 0.18s ease',
                  }}
                  onClick={toggleFavorite}
                >
                  {fav ? '🔖 저장됨' : '🔖'}
                </button>
              </div>
            );
          })()}
        </div>
        {(() => {
          const days = getDaysSinceWorn(makeOutfitKey(selectedGender, outfitMode, recommended));
          if (days === null) return null;
          const label = days === 0 ? '오늘 입었어요' : `${days}일 전에 입었어요`;
          return (
            <div style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              background: 'var(--panel-item-bg)',
              padding: '8px 12px',
              borderRadius: '10px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span>🔁</span> <span>{label}</span>
            </div>
          );
        })()}

        {ruleDescription && (
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '14px', padding: '10px 14px', background: 'var(--glass-bg)', borderRadius: '10px', borderLeft: `3px solid ${accentColor}` }}>
            {ruleDescription}
          </p>
        )}

        <div className="flex-col gap-2">
          {renderResultItem('Jacket', recommended.outerwear)}
          {outfitMode === 'two-piece' && renderResultItem('Top', recommended.top,
            (useTopType || useTopPattern)
              ? getTopSubLabel(useTopType ? recommended.topType : 'auto', useTopPattern ? recommended.topPattern : 'auto') || undefined
              : undefined
          )}
          {outfitMode === 'two-piece' && renderResultItem('Bottom', recommended.bottom)}
          {outfitMode === 'one-piece' && renderResultItem('Dress', recommended.dress)}
          <div style={{ background: 'var(--panel-item-bg)', padding: '12px 14px', borderRadius: '12px', lineHeight: 1.6 }}>
            <div style={{ fontSize: '0.72rem', color: accentColor, textTransform: 'uppercase', fontWeight: 700, marginBottom: '5px', letterSpacing: '0.05em' }}>Shoes</div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>{getShoeRecommendation(recommended)}</div>
          </div>
        </div>
      </div>
    );
  };

  const getTopSubLabel = (topType: string, topPattern: string) => {
    const tMap: Record<string, string> = { 't-shirt': '티셔츠', shirt: '셔츠', knit: '니트', auto: '' };
    const pMap: Record<string, string> = { solid: '무지', stripe: '스트라이프', check: '체크', gingham: '깅엄', auto: '' };
    return [tMap[topType] ?? topType, pMap[topPattern] ?? topPattern].filter(Boolean).join(' · ');
  };

  const getShoeRecommendation = (currentOutfit: OutfitState) => {
    const colors = [currentOutfit.outerwear, currentOutfit.top, currentOutfit.bottom, currentOutfit.dress]
      .filter(color => color !== 'auto' && color !== 'none');

    const rec: string[] = [];

    // Color-based recommendations
    if (colors.includes('black') || colors.includes('black-leather') || colors.includes('black-denim')) {
      rec.push('블랙 스니커즈', '화이트 스니커즈', '블랙 로퍼');
    } else if (colors.includes('brown') || colors.includes('brown-leather') || colors.includes('khaki') || colors.includes('olive')) {
      rec.push('브라운 부츠', '탄 로퍼', '베이지 스니커즈');
    } else if (colors.includes('navy') || colors.includes('blue') || colors.some(isDenim)) {
      rec.push('화이트 스니커즈', '블랙 스니커즈', '캔버스화');
    } else if (colors.includes('beige') || colors.includes('white')) {
      rec.push('베이지 뮬', '화이트 스니커즈', '누드 플랫');
    } else {
      rec.push('화이트 스니커즈', '블랙 스니커즈');
    }

    // Season-based adjustments
    if (selectedSeason === 'summer') {
      rec.push('샌들', '슬립온');
    } else if (selectedSeason === 'winter') {
      rec.push('앵클 부츠', '첼시 부츠');
    } else {
      rec.push('로퍼', '슬립온');
    }

    return `👟 ${rec.slice(0, 3).join(' · ')}`;
  };

  const accentColor = selectedGender === 'female' ? '#ec4899' : 'var(--primary)';
  const selectedRecommendationRowEnd = recommendationList.length > 0
    ? Math.min(recommendationList.length - 1, Math.floor(selectedRecIndex / 3) * 3 + 2)
    : -1;

  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ padding: '0 0 24px', position: 'relative' }}>

      {/* Toast */}
      <div className={`toast ${toast ? 'visible' : ''}`}>{toast}</div>

      {/* Gender & Season toggles */}
      <div className="flex-col gap-2">
        <div className="toggle-group">
          <button
            className={`toggle-btn ${selectedGender === 'male' ? 'active' : ''}`}
            style={{ '--toggle-active-bg': 'var(--primary)' } as React.CSSProperties}
            onClick={() => handleGenderChange('male')}
          >남자</button>
          <button
            className={`toggle-btn ${selectedGender === 'female' ? 'active' : ''}`}
            style={{ '--toggle-active-bg': '#ec4899' } as React.CSSProperties}
            onClick={() => handleGenderChange('female')}
          >여자</button>
        </div>

        <div className="toggle-group">
          {(['spring-fall', 'summer', 'winter'] as Season[]).map(s => (
            <button
              key={s}
              className={`toggle-btn ${selectedSeason === s ? 'active' : ''}`}
              style={{
                '--toggle-active-bg': s === 'spring-fall' ? '#f59e0b' : s === 'summer' ? '#3b82f6' : '#64748b',
              } as React.CSSProperties}
              onClick={() => handleSeasonChange(s)}
            >
              {SEASON_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* One-piece / Two-piece toggle for female */}
      {selectedGender === 'female' && (
        <div className="flex gap-2 justify-center animate-fade-in">
          <button
            className={`btn ${outfitMode === 'two-piece' ? '' : 'btn-secondary'}`}
            style={{ padding: '8px 20px', fontSize: '0.875rem', background: outfitMode === 'two-piece' ? '#ec4899' : '' }}
            onClick={() => handleModeChange('two-piece')}
          >상하의</button>
          <button
            className={`btn ${outfitMode === 'one-piece' ? '' : 'btn-secondary'}`}
            style={{ padding: '8px 20px', fontSize: '0.875rem', background: outfitMode === 'one-piece' ? '#ec4899' : '' }}
            onClick={() => handleModeChange('one-piece')}
          >원피스</button>
        </div>
      )}

      {/* Color picker panel */}
      <div className="glass-panel" style={{ padding: '20px 14px' }}>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px', paddingLeft: '2px' }}>
          {selectedSeason === 'summer'
            ? '여름에는 아우터 없이 시원한 조합을 추천합니다.'
            : '원하는 색상을 고르면 계절에 맞는 조합을 추천합니다.'}&nbsp;
          선택하지 않은 항목은 <strong style={{ color: accentColor }}>Auto</strong>로 채워집니다.
        </p>

        <div className="flex-col gap-2">
          {renderColorChips('Jacket (아우터)', 'outerwear')}

          {outfitMode === 'two-piece' && (
            <div style={{ background: 'var(--glass-bg)', padding: '12px', borderRadius: '14px', border: '1px solid var(--glass-border)' }}>
              {renderColorChips('Top (상의 색상)', 'top')}
              <div className="flex gap-2 mt-2">
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: '6px' }}>
                    <input
                      type="checkbox"
                      checked={useTopType}
                      onChange={e => setUseTopType(e.target.checked)}
                      style={{ accentColor: accentColor, width: '14px', height: '14px', cursor: 'pointer', flexShrink: 0 }}
                    />
                    <label
                      onClick={() => setUseTopType(v => !v)}
                      style={{ fontSize: '0.75rem', color: useTopType ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: useTopType ? 700 : 500, cursor: 'pointer' }}
                    >종류</label>
                  </div>
                  <select
                    value={outfit.topType}
                    onChange={e => handleSelect('topType', e.target.value)}
                    disabled={!useTopType}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--glass-border)', fontSize: '0.875rem', opacity: useTopType ? 1 : 0.45, cursor: useTopType ? 'pointer' : 'not-allowed' }}
                  >
                    <option value="auto">Auto</option>
                    <option value="t-shirt">티셔츠</option>
                    <option value="shirt">셔츠</option>
                    <option value="knit">니트</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: '6px' }}>
                    <input
                      type="checkbox"
                      checked={useTopPattern}
                      onChange={e => setUseTopPattern(e.target.checked)}
                      style={{ accentColor: accentColor, width: '14px', height: '14px', cursor: 'pointer', flexShrink: 0 }}
                    />
                    <label
                      onClick={() => setUseTopPattern(v => !v)}
                      style={{ fontSize: '0.75rem', color: useTopPattern ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: useTopPattern ? 700 : 500, cursor: 'pointer' }}
                    >패턴</label>
                  </div>
                  <select
                    value={outfit.topPattern}
                    onChange={e => handleSelect('topPattern', e.target.value)}
                    disabled={!useTopPattern}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--glass-border)', fontSize: '0.875rem', opacity: useTopPattern ? 1 : 0.45, cursor: useTopPattern ? 'pointer' : 'not-allowed' }}
                  >
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

        <div style={{ marginTop: '20px' }}>
          <div style={{
            marginBottom: '12px',
            padding: '14px 16px',
            borderRadius: '14px',
            border: '1px solid var(--glass-border)',
            background: 'var(--glass-bg)',
          }}>
            <div className="flex items-center justify-between gap-2" style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                점수 커트라인
              </span>
              <span style={{
                fontSize: '0.95rem',
                color: accentColor,
                fontWeight: 800,
                padding: '4px 10px',
                background: 'var(--glass-bg-strong)',
                borderRadius: '999px',
                minWidth: '54px',
                textAlign: 'center',
              }}>
                {scoreThreshold}점
              </span>
            </div>

            {/* Stepper + slider for mobile-friendly input */}
            <div className="flex items-center gap-3" style={{ marginBottom: '10px' }}>
              <button
                type="button"
                onClick={() => handleScoreThresholdChange(String(scoreThreshold - 1))}
                disabled={scoreThreshold <= 80}
                aria-label="1점 낮추기"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border-strong)',
                  background: 'var(--glass-bg-strong)',
                  color: 'var(--text-main)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  cursor: scoreThreshold <= 80 ? 'not-allowed' : 'pointer',
                  opacity: scoreThreshold <= 80 ? 0.4 : 1,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                −
              </button>
              <input
                type="range"
                min={80}
                max={99}
                step={1}
                value={scoreThreshold}
                onChange={e => handleScoreThresholdChange(e.target.value)}
                aria-label="점수 커트라인 슬라이더"
                style={{
                  flex: 1,
                  height: '8px',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${((scoreThreshold - 80) / 19) * 100}%, var(--glass-bg-strong) ${((scoreThreshold - 80) / 19) * 100}%, var(--glass-bg-strong) 100%)`,
                  borderRadius: '999px',
                  outline: 'none',
                }}
                className="score-slider"
              />
              <button
                type="button"
                onClick={() => handleScoreThresholdChange(String(scoreThreshold + 1))}
                disabled={scoreThreshold >= 99}
                aria-label="1점 올리기"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border-strong)',
                  background: 'var(--glass-bg-strong)',
                  color: 'var(--text-main)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  cursor: scoreThreshold >= 99 ? 'not-allowed' : 'pointer',
                  opacity: scoreThreshold >= 99 ? 0.4 : 1,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                +
              </button>
            </div>

            {/* Quick presets */}
            <div className="flex gap-2" style={{ marginTop: '6px' }}>
              {[80, 85, 90, 95].map(v => (
                <button
                  key={v}
                  type="button"
                  onClick={() => handleScoreThresholdChange(String(v))}
                  style={{
                    flex: 1,
                    padding: '8px 4px',
                    borderRadius: '10px',
                    border: scoreThreshold === v ? `1.5px solid ${accentColor}` : '1px solid var(--glass-border)',
                    background: scoreThreshold === v ? 'var(--gradient-soft)' : 'transparent',
                    color: scoreThreshold === v ? 'var(--text-main)' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                  }}
                >
                  {v}점
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setTodayMode(v => !v)}
            style={{
              width: '100%',
              marginTop: '10px',
              padding: '12px 14px',
              borderRadius: '12px',
              border: todayMode ? `1.5px solid ${accentColor}` : '1px solid var(--glass-border)',
              background: todayMode ? 'var(--gradient-soft)' : 'var(--glass-bg)',
              color: 'var(--text-main)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              transition: 'all 0.18s ease',
            }}
            aria-pressed={todayMode}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1rem' }}>🆕</span>
              <span>오늘 뭐 입지? 모드</span>
            </span>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '999px',
              background: todayMode ? accentColor : 'var(--panel-item-bg)',
              color: todayMode ? 'white' : 'var(--text-muted)',
              border: todayMode ? 'none' : '1px solid var(--glass-border)',
            }}>
              {todayMode ? 'ON' : 'OFF'}
            </span>
          </button>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px', paddingLeft: '4px', lineHeight: 1.5 }}>
            {todayMode
              ? '최근 14일 안에 입은 조합은 숨겨요.'
              : '켜면 최근 14일 안에 입은 조합을 숨겨서 새로운 조합을 추천해요.'}
          </p>

          <button
            className="btn"
            style={{ width: '100%', padding: '16px', fontSize: '1.1rem', background: accentColor, borderRadius: '14px', marginTop: '10px' }}
            onClick={handleRecommend}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            코디 추천 받기
          </button>
        </div>
      </div>

      {/* Clash / Fallback notice */}
      {noticeType !== 'none' && (
        <div className="glass-panel animate-fade-in" style={{
          padding: '18px 20px',
          border: `2px solid ${noticeType === 'clash' ? 'var(--danger)' : 'var(--primary)'}`,
          background: noticeType === 'clash' ? 'rgba(239,68,68,0.08)' : 'rgba(37,99,235,0.07)',
        }}>
          <h3 style={{ color: noticeType === 'clash' ? 'var(--danger)' : 'var(--primary)', fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>
            {noticeType === 'clash' ? '⚠️ 강한 색상 충돌이 있습니다' : 'ℹ️ DB 규칙에 정확히 일치하는 조합이 없습니다'}
          </h3>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
            {noticeType === 'clash'
              ? '선택한 색상들이 서로 강하게 튀어 실착에서 부담스러울 수 있습니다. 가능한 대안을 보여드립니다.'
              : '일반 컬러 조합 기준으로 가능한 추천을 보여드립니다.'}
            <br />더 정확한 추천은 일부 항목을 <strong style={{ color: 'var(--primary)' }}>Auto</strong>로 바꿔보세요.
          </p>
        </div>
      )}

      {/* Multiple recommendations gallery */}
      {recommendationList.length > 1 && (
        <div className="glass-panel animate-fade-in" style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>
            다른 추천 코디 <span style={{ color: accentColor }}>({recommendationList.length})</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {recommendationList.map((rec, index) => (
              <React.Fragment key={index}>
                <div
                  style={{
                    border: selectedRecIndex === index ? `2px solid ${accentColor}` : '1px solid var(--glass-border)',
                    borderRadius: '12px', padding: '8px',
                    background: selectedRecIndex === index ? `rgba(139,92,246,0.08)` : 'var(--glass-bg)',
                    cursor: 'pointer', position: 'relative',
                    transition: 'border-color 0.15s, background 0.15s',
                  }}
                  onClick={() => selectRecommendation(index)}
                >
                  <div style={{
                    position: 'absolute', top: 4, right: 4, background: 'var(--panel-item-bg)',
                    padding: '2px 6px', borderRadius: '8px', fontSize: '0.6rem', fontWeight: 700,
                    color: getScoreLabelColor(toDisplayScore(rec.score)), border: '1px solid var(--glass-border)',
                    whiteSpace: 'nowrap',
                  }}>
                    {toDisplayScore(rec.score)}점
                  </div>
                  {(() => {
                    const d = getDaysSinceWorn(makeOutfitKey(selectedGender, outfitMode, rec.outfit));
                    if (d === null) return null;
                    return (
                      <div style={{
                        position: 'absolute', top: 4, left: 4, background: 'rgba(245,158,11,0.18)',
                        padding: '2px 6px', borderRadius: '8px', fontSize: '0.58rem', fontWeight: 700,
                        color: '#f59e0b', border: '1px solid rgba(245,158,11,0.4)', whiteSpace: 'nowrap',
                      }}>
                        🔁 {d === 0 ? '오늘' : `${d}일 전`}
                      </div>
                    );
                  })()}
                  <div style={{ width: '100%', height: '96px' }}>
                    <Avatar gender={selectedGender} mode={outfitMode} colors={rec.outfit} />
                  </div>
                  <div style={{
                    marginTop: '8px',
                    fontSize: '0.72rem',
                    lineHeight: 1.45,
                    color: 'var(--text-muted)',
                    textAlign: 'center',
                    wordBreak: 'keep-all',
                  }}>
                    {renderRecommendationColorSummary(rec)}
                  </div>
                </div>
                {selectedRecommendationRowEnd === index && renderSelectedRecommendationPanel()}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* 최근 입은 옷 - Worn history */}
      {wornHistory.length > 0 && (
        <div style={{ marginTop: '4px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, paddingLeft: '4px', marginBottom: '14px' }}>
            👕 최근 입은 옷
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '8px' }}>{wornHistory.length}회</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {wornHistory.slice(0, 8).map(entry => {
              const days = Math.floor((Date.now() - entry.wornAt) / (1000 * 60 * 60 * 24));
              const dayLabel = days === 0 ? '오늘' : `${days}일 전`;
              return (
                <div key={entry.id} className="glass-panel" style={{ padding: '14px', position: 'relative' }}>
                  <button
                    type="button"
                    aria-label="기록 삭제"
                    title="기록 삭제"
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '32px',
                      height: '32px',
                      background: 'var(--glass-bg-strong)',
                      border: '1px solid var(--glass-border-strong)',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      lineHeight: 1,
                      padding: 0,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                    }}
                    onClick={(e) => { e.stopPropagation(); deleteWornEntry(entry.id); }}
                  >✕</button>
                  <div style={{ height: '130px', marginBottom: '8px' }}>
                    <Avatar gender={entry.gender} mode={entry.mode} colors={entry.colors} />
                  </div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, textAlign: 'center', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {entry.name || '직접 코디'}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.65rem', color: '#f59e0b', background: 'rgba(245,158,11,0.12)', padding: '2px 8px', borderRadius: '999px', border: '1px solid rgba(245,158,11,0.3)', fontWeight: 700 }}>
                      🔁 {dayLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lookbook Gallery */}
      {savedOutfits.length > 0 && (
        <div style={{ marginTop: '4px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, paddingLeft: '4px', marginBottom: '14px' }}>
            🔖 마음에 든 코디
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '8px' }}>{savedOutfits.length}개</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {savedOutfits.map(saved => (
              <div key={saved.id} className="glass-panel" style={{ padding: '14px', position: 'relative' }}>
                <button
                  type="button"
                  aria-label="삭제"
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '32px',
                    height: '32px',
                    background: 'var(--glass-bg-strong)',
                    border: '1px solid var(--glass-border-strong)',
                    color: 'var(--text-main)',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    lineHeight: 1,
                    padding: 0,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                  onClick={(e) => { e.stopPropagation(); deleteFromLookbook(saved.id); }}
                >✕</button>
                <div style={{ height: '150px', marginBottom: '10px', cursor: 'pointer' }} onClick={() => loadFromLookbook(saved)}>
                  <Avatar gender={saved.gender} mode={saved.mode} colors={saved.colors} />
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, textAlign: 'center', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {saved.name}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', background: 'var(--glass-bg)', padding: '2px 8px', borderRadius: '999px', border: '1px solid var(--glass-border)' }}>
                    {SEASON_LABELS[saved.season]}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', background: 'var(--glass-bg)', padding: '2px 8px', borderRadius: '999px', border: '1px solid var(--glass-border)' }}>
                    {saved.gender === 'male' ? '남' : '여'}
                  </span>
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
