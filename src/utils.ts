import type { ColorRule } from './types';

// Available colors in the app
export const availableColors = [
  'black', 'white', 'gray', 'navy', 'beige', 
  'blue', 'light-blue', 'red', 'green', 'brown', 'yellow', 'pink', 'khaki', 'olive',
  'light-denim', 'denim', 'dark-denim', 'black-denim'
];

export const colorHarmonyList = availableColors;

export const denimColors = ['light-denim', 'denim', 'dark-denim', 'black-denim'];
export const bottomColors = availableColors.filter(color => color !== 'red' && color !== 'pink');

// Color harmony database
export const colorHarmonyDatabase: ColorRule[] = [
  // --- Male ---
  {
    name: "👔 클래식 비즈니스 캐주얼", description: "네이비와 그레이의 안정적인 매치로, 단정하면서도 신뢰감을 주는 비즈니스 정석 룩입니다.",
    gender: 'male', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "blue"], topTypes: ['shirt', 'knit'], topPatterns: ['solid', 'stripe', 'check'],
    bottom: ["gray", "beige"],
    outerwear: ["navy"]
  },
  {
    name: "👔 썸머 쿨비즈 룩",
    gender: 'male', mode: 'two-piece', seasons: ['summer'],
    top: ["white", "blue", "navy"], topTypes: ['shirt'], topPatterns: ['solid', 'stripe'],
    bottom: ["gray", "beige", "navy"],
    outerwear: ["none"]
  },
  {
    name: "⚫ 미니멀 모노톤", description: "블랙 앤 화이트의 대비가 돋보이는 실패 없는 미니멀 룩입니다.",
    gender: 'male', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: ["white", "black"], topTypes: ['t-shirt', 'knit'], topPatterns: ['solid'],
    bottom: ["black"],
    outerwear: ["black", "gray", "none"]
  },
  {
    name: "🧢 캐주얼 데님 룩",
    gender: 'male', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["white", "gray", "black"], topTypes: ['t-shirt'], topPatterns: ['solid', 'stripe'],
    bottom: ["black", "beige"],
    outerwear: [...denimColors, "blue"]
  },
  {
    name: "🏕️ 워크웨어 & 아메카지", description: "올리브/카키 톤과 데님을 매치하여 거칠면서도 빈티지한 아메카지 감성을 살렸습니다.",
    gender: 'male', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "beige"], topTypes: ['t-shirt', 'knit', 'shirt'], topPatterns: ['solid', 'check', 'gingham'],
    bottom: [...denimColors, "beige"],
    outerwear: ["khaki", "olive", "blue"]
  },
  {
    name: "🍂 브라운 톤온톤 캐주얼",
    gender: 'male', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black"], topTypes: ['knit', 'shirt'], topPatterns: ['solid', 'check'],
    bottom: ["beige"],
    outerwear: ["brown"]
  },
  {
    name: "⛵ 썸머 리조트 룩",
    gender: 'male', mode: 'two-piece', seasons: ['summer'],
    top: ["white", "navy"], topTypes: ['shirt', 't-shirt'], topPatterns: ['solid', 'stripe'],
    bottom: ["beige", ...denimColors],
    outerwear: ["none"]
  },

  // --- Female two-piece ---
  {
    name: "🧥 프렌치 시크 트렌치", description: "베이지 트렌치 코트와 데님의 조합으로, 무심한 듯 세련된 파리지앵 무드를 자아냅니다.",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["white", "navy"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid', 'stripe'],
    bottom: [...denimColors, "white"],
    outerwear: ["beige"]
  },
  {
    name: "🌸 화사한 파스텔 캐주얼",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white"], topTypes: ['t-shirt', 'shirt'], topPatterns: ['solid', 'gingham'],
    bottom: [...denimColors, "white", "gray"],
    outerwear: ["pink", "none"]
  },
  {
    name: "🇫🇷 프렌치 시크 네이비",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "gray"], topTypes: ['t-shirt', 'knit'], topPatterns: ['solid', 'stripe'],
    bottom: ["white", ...denimColors],
    outerwear: ["navy", "none"]
  },
  {
    name: "🕊️ 올화이트 페미닌",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white"], bottom: ["white"],
    outerwear: ["white", "beige", "gray", "none"]
  },
  {
    name: "🌲 윈터 어스톤 코디",
    gender: 'female', mode: 'two-piece', seasons: ['winter'],
    top: ["beige", "white", "black"], bottom: ["khaki", "olive", "beige", ...denimColors],
    outerwear: ["brown", "black", "khaki", "olive"]
  },

  // --- Female one-piece ---
  {
    name: "🧥 트렌치 & 원피스 조합",
    gender: 'female', mode: 'one-piece', seasons: ['spring-fall'],
    dress: ["black", "navy", "white"],
    outerwear: ["beige"]
  },
  {
    name: "🖤 시크 자켓 & 원피스",
    gender: 'female', mode: 'one-piece', seasons: ['spring-fall', 'winter'],
    dress: ["white", "gray", "beige"],
    outerwear: ["black", "navy"]
  },
  {
    name: "👗 썸머 바캉스 원피스",
    gender: 'female', mode: 'one-piece', seasons: ['summer'],
    dress: ["white", "pink", "yellow", "blue", "navy"],
    outerwear: ["none"]
  },

  // --- Unisex ---
  {
    name: "🖤 올블랙 시크", description: "시크함의 끝판왕, 머리부터 발끝까지 블랙으로 맞춘 카리스마 있는 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["black"], topTypes: ['t-shirt', 'knit', 'shirt'], topPatterns: ['solid'],
    bottom: ["black"],
    outerwear: ["black"]
  },
  {
    name: "🔲 모던 미니멀",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: ["white", "gray", "black"], topTypes: ['t-shirt', 'knit'], topPatterns: ['solid'],
    bottom: ["gray", "black", "white"],
    outerwear: ["black", "gray", "white", "none"]
  },
  {
    name: "👖 트렌디 청청 셋업", description: "데님과 데님을 매치한 과감하고 스타일리시한 청청 셋업 코디입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "gray", "navy"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid', 'stripe'],
    bottom: denimColors,
    outerwear: denimColors
  },
  {
    name: "👖 데님 셔츠 캐주얼",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: denimColors, topTypes: ['shirt'], topPatterns: ['solid'],
    bottom: ["white", "beige", "black", "gray", ...denimColors],
    outerwear: ["none", "beige", "navy", "black", "brown"]
  },
  {
    name: "🏕️ 라이트 데님 & 카키",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["light-denim", "denim"], topTypes: ['shirt'], topPatterns: ['solid'],
    bottom: ["khaki", "olive", "beige"],
    outerwear: ["none", "navy", "beige", "brown"]
  },
  {
    name: "🎨 상의 포인트 매치",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: availableColors,
    bottom: ["black", "white", "gray", ...denimColors, "beige"],
    outerwear: ["black", "gray", "navy", "blue", "beige", "white", "none", "black-leather", "brown-leather"]
  },
  {
    name: "🎨 하의 포인트 매치",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: ["white", "black", "gray"],
    bottom: bottomColors,
    outerwear: ["black", "gray", "navy", "blue", "none", "black-leather"]
  },
  {
    name: "🎨 원피스 매치",
    gender: 'female', mode: 'one-piece', seasons: ['spring-fall', 'summer', 'winter'],
    dress: availableColors,
    outerwear: ["black", "gray", "beige", "navy", "white", "none"]
  },

  // --- Pattern specific rules ---
  {
    name: "⛵ 마린 스트라이프 룩",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "navy"], topTypes: ["t-shirt", "knit"], topPatterns: ["stripe"],
    bottom: [...denimColors, "white", "navy"],
    outerwear: ["navy", "none"]
  },
  {
    name: "체크 셔츠 캐주얼",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["red", "navy", "blue", "green"], topTypes: ["shirt"], topPatterns: ["check"],
    bottom: [...denimColors, "beige", "black"],
    outerwear: ["none", "black", "navy"]
  },
  {
    name: "단정한 깅엄 셔츠 룩",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["blue", "black", "red"], topTypes: ["shirt"], topPatterns: ["gingham"],
    bottom: ["beige", "navy", ...denimColors],
    outerwear: ["navy", "beige", "none"]
  },
  {
    name: "👔 포멀 수트 정석",
    gender: 'male', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "blue"], topTypes: ["shirt"], topPatterns: ["solid"],
    bottom: ["black", "navy", "gray"],
    outerwear: ["black", "navy", "gray"]
  },
  {
    name: "🏍️ 시크 라이더 & 데님", description: "거친 블랙 레더와 데님의 환상적인 시너지! 와일드하고 쿨한 무드의 정석입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "gray"], topTypes: ["t-shirt", "knit"], topPatterns: ["solid", "stripe"],
    bottom: [...denimColors, "black"],
    outerwear: ["black-leather"]
  },
  {
    name: "🤎 빈티지 브라운 레더", description: "브라운 가죽 특유의 부드럽고 빈티지한 텍스처가 살아있는 감성 코디입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "beige"], topTypes: ["t-shirt", "knit", "shirt"], topPatterns: ["solid", "check"],
    bottom: [...denimColors, "beige", "black"],
    outerwear: ["brown-leather"]
  },
  {
    name: "🎀 소프트 블라우스 룩",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "beige", "pink"], topTypes: ["shirt", "knit"], topPatterns: ["solid"],
    bottom: ["black", "beige", "navy"],
    outerwear: ["black", "beige", "none"]
  },
  {
    name: "✨ 올드머니 클래식 베이지", description: "로고 없이도 고급스러운 무드를 자아내는 베이지 톤온톤 매치입니다. 여유롭고 우아한 실루엣이 돋보입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "beige", "brown"], topTypes: ["shirt", "knit", "t-shirt"], topPatterns: ["solid"],
    bottom: ["beige", "brown", "white"],
    outerwear: ["beige", "brown", "white"]
  },
  {
    name: "🏙️ 어반 그레이 레이어링",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "gray", "black"], topTypes: ["t-shirt", "knit", "shirt"], topPatterns: ["solid", "stripe"],
    bottom: ["gray", "black", ...denimColors],
    outerwear: ["gray", "black", "navy"]
  },
  {
    name: "📚 네이비 프레피 룩", description: "아이비리그 학생들처럼 단정하고 스마트한 인상을 주는 네이비 베이스의 프레피 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["white", "blue", "gray"], topTypes: ["shirt", "knit"], topPatterns: ["solid", "stripe"],
    bottom: ["beige", "white", ...denimColors],
    outerwear: ["navy", "beige"]
  },
  {
    name: "🏕️ 워크웨어 무드",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "beige", "gray"], topTypes: ["t-shirt", "shirt", "knit"], topPatterns: ["solid", "check"],
    bottom: [...denimColors, "black", "beige"],
    outerwear: ["olive", "khaki", "brown", "blue"]
  },
  {
    name: "🌬️ 라이트 썸머 미니멀",
    gender: 'unisex', mode: 'two-piece', seasons: ['summer'],
    top: ["white", "beige", "blue", "gray"], topTypes: ["t-shirt", "shirt"], topPatterns: ["solid", "stripe"],
    bottom: ["white", "beige", ...denimColors, "gray"],
    outerwear: ["none"]
  },
  {
    name: "🛹 블랙 & 데님 스트릿",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["black", "white", "gray"], topTypes: ["t-shirt", "knit"], topPatterns: ["solid", "stripe"],
    bottom: [...denimColors, "black"],
    outerwear: ["black", ...denimColors, "black-leather"]
  },
  {
    name: "🤍 화이트 데님 클린핏",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["navy", "blue", "black", "beige"], topTypes: ["shirt", "knit", "t-shirt"], topPatterns: ["solid", "stripe"],
    bottom: ["white"],
    outerwear: ["navy", "beige", ...denimColors, "none"]
  },
  {
    name: "🌸 페미닌 뉴트럴",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "beige", "blue", "yellow"], topTypes: ["shirt", "knit", "t-shirt"], topPatterns: ["solid", "gingham", "stripe"],
    bottom: ["white", "beige", ...denimColors],
    outerwear: ["beige", "white", "navy", "none"]
  },
  {
    name: "🖤 모던 모노크롬 원피스",
    gender: 'female', mode: 'one-piece', seasons: ['spring-fall', 'winter'],
    dress: ["black", "gray", "navy", "beige"],
    outerwear: ["black", "gray", "navy", "beige", "brown-leather"]
  },
  {
    name: "Fresh summer dress",
    gender: 'female', mode: 'one-piece', seasons: ['summer'],
    dress: ["white", "blue", "yellow", "beige", "pink"],
    outerwear: ["none"]
  },
  {
    name: "🤎 브라운 레더 캐주얼",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "beige", "gray"], topTypes: ["t-shirt", "knit", "shirt"], topPatterns: ["solid", "check"],
    bottom: [...denimColors, "black", "beige", "brown"],
    outerwear: ["brown-leather"]
  },
  {
    name: "👖 다크 인디고 정석",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "gray", "beige", "black"], topTypes: ["shirt", "knit"], topPatterns: ["solid", "stripe"],
    bottom: [...denimColors, "navy", "gray"],
    outerwear: [...denimColors, "navy", "gray", "black"]
  },
  {
    name: "뉴트럴 팬츠 코디",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: availableColors, topTypes: ["t-shirt", "shirt", "knit"], topPatterns: ["solid", "stripe", "check", "gingham"],
    bottom: ["black", "white", "gray", "navy", "beige", "brown"],
    outerwear: ["none", "black", "white", "gray", "navy", "blue", "beige", "brown", "black-leather", "brown-leather", ...denimColors]
  },
  {
    name: "데님 팬츠 베이스",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: availableColors, topTypes: ["t-shirt", "shirt", "knit"], topPatterns: ["solid", "stripe", "check", "gingham"],
    bottom: denimColors,
    outerwear: ["none", "black", "white", "gray", "navy", "blue", "beige", "brown", "khaki", "olive", "black-leather", "brown-leather", ...denimColors]
  },
  {
    name: "카키/올리브 팬츠 코디",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: ["white", "black", "gray", "beige", "brown", "navy", "blue", "green", ...denimColors],
    topTypes: ["t-shirt", "shirt", "knit"],
    topPatterns: ["solid", "stripe", "check", "gingham"],
    bottom: ["khaki", "olive"],
    outerwear: ["none", "black", "gray", "navy", "blue", "beige", "brown", "khaki", "olive", ...denimColors]
  },
  {
    name: "썸머 캐주얼 베이스",
    gender: 'unisex', mode: 'two-piece', seasons: ['summer'],
    top: availableColors, topTypes: ["t-shirt", "shirt"], topPatterns: ["solid", "stripe", "gingham"],
    bottom: ["white", "gray", "navy", "beige", "khaki", "olive", ...denimColors],
    outerwear: ["none"]
  },
  {
    name: "다크 팬츠 정석",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: availableColors, topTypes: ["t-shirt", "shirt", "knit"], topPatterns: ["solid", "stripe", "check"],
    bottom: ["black", "gray", "navy", "black-denim", "dark-denim"],
    outerwear: ["none", "black", "gray", "navy", "blue", "beige", "brown", "black-leather", "brown-leather"]
  },
  {
    name: "💕 핑크 포인트 룩",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["pink"], topTypes: ["t-shirt", "shirt", "knit"], topPatterns: ["solid", "stripe"],
    bottom: ["white", "beige", "gray", "black", "navy", ...denimColors],
    outerwear: ["none", "white", "beige", "gray", "navy", ...denimColors]
  },
  {
    name: "화이트 셔츠 에센셜",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: ["white"], topTypes: ["shirt"], topPatterns: ["solid"],
    bottom: ["beige", "navy", "gray", "black", "khaki", ...denimColors],
    outerwear: ["navy", "beige", "gray", "black", "brown", "none", "black-leather", "brown-leather"]
  },
  {
    name: "소라색 셔츠 스마트 캐주얼",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["light-blue", "blue"], topTypes: ["shirt"], topPatterns: ["solid"],
    bottom: ["beige", "navy", "gray", "white", ...denimColors],
    outerwear: ["navy", "beige", "gray", "none", ...denimColors]
  },
  {
    name: "블랙 셔츠 모던룩",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["black"], topTypes: ["shirt"], topPatterns: ["solid"],
    bottom: ["gray", "black", "beige", "navy", "dark-denim", "black-denim"],
    outerwear: ["gray", "black", "navy", "brown", "black-leather", "brown-leather"]
  },
  {
    name: "💕 핑크 셔츠 코디",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["pink"], topTypes: ["shirt"], topPatterns: ["solid"],
    bottom: ["white", "beige", "gray", "navy", ...denimColors],
    outerwear: ["none", "white", "beige", "gray", "navy"]
  },
  {
    name: "스트라이프 셔츠 클래식",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "light-blue", "navy"], topTypes: ["shirt"], topPatterns: ["stripe"],
    bottom: ["navy", "white", "beige", "gray", ...denimColors],
    outerwear: ["navy", "beige", "gray", "none"]
  },
  {
    name: "🏙️ 시티보이 오버핏 셔츠", description: "넉넉한 스트라이프 셔츠와 데님의 조합! 자유분방하고 트렌디한 시티보이 감성입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "light-blue", "blue", "gray"], topTypes: ["shirt"], topPatterns: ["stripe"],
    bottom: denimColors,
    outerwear: ["none", "navy", "blue", "beige", "gray", ...denimColors]
  },
  {
    name: "스트라이프 시티 뉴트럴",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "gray", "black"], topTypes: ["shirt"], topPatterns: ["stripe"],
    bottom: ["black", "gray", "navy", "beige", "black-denim", "dark-denim"],
    outerwear: ["black", "gray", "navy", "beige", "black-leather"]
  },
  {
    name: "체크 셔츠 데님 코디",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["red", "green", "light-blue", "blue", "navy", "brown"], topTypes: ["shirt"], topPatterns: ["check"],
    bottom: [...denimColors, "black", "beige", "khaki"],
    outerwear: ["none", "black", "navy", "brown", "khaki", "olive", "brown-leather"]
  },
  {
    name: "체크 셔츠 카키 코디",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["light-blue", "blue", "green", "brown", "red", "navy"], topTypes: ["shirt"], topPatterns: ["check"],
    bottom: ["khaki", "olive", "beige", "brown", ...denimColors],
    outerwear: ["none", "brown", "khaki", "olive", "navy", "beige"]
  },
  {
    name: "체크 셔츠 다크팬츠",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "gray", "black", "navy", "red", "green"], topTypes: ["shirt"], topPatterns: ["check"],
    bottom: ["black", "gray", "navy", "black-denim", "dark-denim"],
    outerwear: ["none", "black", "gray", "navy", "black-leather"]
  },
  {
    name: "깅엄 셔츠 클린 룩",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["light-blue", "blue", "black", "red", "green", "navy"], topTypes: ["shirt"], topPatterns: ["gingham"],
    bottom: ["beige", "white", "navy", "gray", ...denimColors],
    outerwear: ["none", "navy", "beige", "white", "gray"]
  },
  {
    name: "📚 깅엄 셔츠 프레피",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["light-blue", "blue", "navy", "green", "red"], topTypes: ["shirt"], topPatterns: ["gingham"],
    bottom: ["beige", "navy", "white", "khaki"],
    outerwear: ["navy", "beige", "brown", "none"]
  },
  {
    name: "데님 셔츠 톤온톤",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: denimColors, topTypes: ["shirt"], topPatterns: ["solid"],
    bottom: ["khaki", "beige", "white", "black", "gray", "navy", ...denimColors],
    outerwear: ["none", "beige", "navy", "black", "gray", "brown", "khaki", "olive"]
  },
  {
    name: "패턴 셔츠 캐주얼",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: availableColors, topTypes: ["shirt"], topPatterns: ["stripe", "check", "gingham"],
    bottom: ["black", "white", "gray", "navy", "beige", ...denimColors],
    outerwear: ["none", "black", "white", "gray", "navy", "beige"]
  }
];

export const getColorHex = (colorName: string) => {
  const map: Record<string, string> = {
    black: '#1a1a1a',
    white: '#f8fafc',
    gray: '#94a3b8',
    navy: '#1e3a8a',
    beige: '#f3e1ce',
    blue: '#3b82f6',
      'light-blue': '#93c5fd',
    red: '#ef4444',
    green: '#10b981',
    brown: '#78350f',
    yellow: '#eab308',
    pink: '#ec4899',
    khaki: '#867b54',
    'light-denim': '#86a9c8',
    denim: '#3b5998',
    'dark-denim': '#18345f',
    'black-denim': '#20242b',
    olive: '#4b5320',
    'black-leather': '#1f1f1f',
    'brown-leather': '#5c3a21'
  };
  return map[colorName.toLowerCase()] || '#cbd5e1';
};
