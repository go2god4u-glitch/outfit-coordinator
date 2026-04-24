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
  {
    name: "🌊 남자 여름 릴렉스 캐주얼", description: "가볍고 편안한 티셔츠와 베이직 하의로 여름을 시원하게 즐기는 기본 캐주얼 룩입니다.",
    gender: 'male', mode: 'two-piece', seasons: ['summer'],
    top: ["white", "gray", "navy", "beige", "black"], topTypes: ['t-shirt'], topPatterns: ['solid'],
    bottom: ["denim", "beige", "khaki", "white", "gray"],
    outerwear: ["none"]
  },
  {
    name: "🏄 남자 여름 서프 캐주얼", description: "라이트한 색상과 데님의 조합으로 자유롭고 시원한 여름 서퍼 감성의 룩입니다.",
    gender: 'male', mode: 'two-piece', seasons: ['summer'],
    top: ["white", "light-blue", "beige", "olive"], topTypes: ['t-shirt', 'shirt'], topPatterns: ['solid', 'stripe'],
    bottom: ["light-denim", "denim", "beige", "khaki", "white"],
    outerwear: ["none"]
  },
  {
    name: "🧣 남자 겨울 니트 레이어링", description: "두툼한 니트와 코트의 레이어링으로 겨울의 볼륨감과 따뜻한 무드를 동시에 살렸습니다.",
    gender: 'male', mode: 'two-piece', seasons: ['winter'],
    top: ["gray", "beige", "navy", "white", "brown"], topTypes: ['knit'], topPatterns: ['solid'],
    bottom: ["black", "gray", "dark-denim", "navy", "beige"],
    outerwear: ["navy", "gray", "black", "brown", "beige"]
  },
  {
    name: "🧥 남자 베이지 코트 클래식", description: "베이지 코트와 깔끔한 이너의 조합으로 세련되고 품격 있는 겨울 신사 룩을 완성합니다.",
    gender: 'male', mode: 'two-piece', seasons: ['winter'],
    top: ["white", "navy", "brown", "beige", "gray"], topTypes: ['knit', 'shirt'], topPatterns: ['solid'],
    bottom: ["gray", "beige", "dark-denim", "black", "navy"],
    outerwear: ["beige"]
  },
  {
    name: "🖤 남자 다크 겨울 레이어링", description: "블랙과 다크 컬러의 조합으로 카리스마 있고 강렬한 겨울 룩을 완성합니다.",
    gender: 'male', mode: 'two-piece', seasons: ['winter'],
    top: ["black", "white", "gray"], topTypes: ['knit', 't-shirt'], topPatterns: ['solid'],
    bottom: ["black", "dark-denim", "black-denim", "gray"],
    outerwear: ["black", "black-leather", "navy", "gray"]
  },
  {
    name: "🍂 남자 브라운 어스 톤 겨울", description: "브라운 계열의 어스 톤으로 따뜻하고 빈티지한 겨울 감성을 완성합니다.",
    gender: 'male', mode: 'two-piece', seasons: ['winter'],
    top: ["beige", "white", "brown", "khaki"], topTypes: ['knit', 'shirt'], topPatterns: ['solid', 'check'],
    bottom: ["beige", "brown", "dark-denim", "khaki"],
    outerwear: ["brown", "brown-leather", "khaki", "olive"]
  },
  {
    name: "🌿 남자 카키 아우터 밀리터리", description: "카키 자켓과 어스톤 컬러의 조합으로 강인하고 실용적인 밀리터리 감성의 룩입니다.",
    gender: 'male', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["white", "black", "beige", "olive"], topTypes: ['t-shirt', 'shirt'], topPatterns: ['solid'],
    bottom: ["black", "denim", "beige", "khaki", "olive"],
    outerwear: ["khaki", "olive"]
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
  {
    name: "🧤 여자 겨울 코지 니트 룩", description: "부드러운 니트와 따뜻한 아우터로 포근하면서도 여성스러운 겨울 코지 룩입니다.",
    gender: 'female', mode: 'two-piece', seasons: ['winter'],
    top: ["white", "beige", "pink", "gray", "navy"], topTypes: ['knit'], topPatterns: ['solid'],
    bottom: ["black", "beige", "dark-denim", "navy", "gray"],
    outerwear: ["beige", "gray", "brown", "black", "navy"]
  },
  {
    name: "🖤 여자 블랙 레더 시크", description: "블랙 레더 자켓과 페미닌한 이너의 대비로 시크하고 강렬한 여성 룩입니다.",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "gray", "beige"], topTypes: ['t-shirt', 'knit', 'shirt'], topPatterns: ['solid'],
    bottom: ["black", "dark-denim", "denim", "gray"],
    outerwear: ["black-leather"]
  },
  {
    name: "🔴 여자 레드 포인트 캐주얼", description: "레드 상의로 포인트를 준 활기차고 개성 있는 여성 캐주얼 룩입니다.",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["red"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid'],
    bottom: ["black", "white", "navy", "denim", "gray"],
    outerwear: ["black", "none", "white", "navy"]
  },
  {
    name: "🌿 여자 그린 포인트 캐주얼", description: "그린 상의로 개성을 살린 내추럴하고 세련된 여성 포인트 룩입니다.",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["green"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid'],
    bottom: ["black", "white", "beige", "denim", "khaki"],
    outerwear: ["black", "none", "beige", "khaki"]
  },
  {
    name: "🌸 여자 로맨틱 봄 레이어링", description: "밝고 화사한 톤의 레이어링으로 봄의 설레임을 담은 로맨틱한 여성 룩입니다.",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["pink", "yellow", "white", "beige"], topTypes: ['shirt', 'knit', 't-shirt'], topPatterns: ['solid', 'gingham'],
    bottom: ["white", "beige", "denim", "light-denim"],
    outerwear: ["beige", "pink", "white", "none"]
  },
  {
    name: "💙 여자 블루 데님 시크", description: "블루 계열 상의와 데님의 자연스러운 매치로 시원하고 캐주얼한 여성 룩입니다.",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["blue", "light-blue", "navy"], topTypes: ['t-shirt', 'shirt'], topPatterns: ['solid', 'stripe'],
    bottom: ["white", "beige", ...denimColors, "gray"],
    outerwear: ["none", "white", "beige", "navy", "light-blue"]
  },
  {
    name: "🌻 여자 옐로우 포인트 룩", description: "옐로우 상의로 생기 넘치는 포인트를 준 밝고 활기찬 여성 룩입니다.",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["yellow"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid'],
    bottom: ["white", "black", "navy", "denim", "beige"],
    outerwear: ["none", "white", "beige", "black"]
  },
  {
    name: "🩷 여자 핑크 자켓 걸리시", description: "핑크 자켓으로 여성스러움과 트렌디함을 동시에 살린 사랑스러운 걸리시 룩입니다.",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["white", "beige", "pink", "gray"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid'],
    bottom: ["white", "beige", "denim", "gray", "black"],
    outerwear: ["pink"]
  },
  {
    name: "❄️ 여자 겨울 화이트 룩", description: "겨울의 눈처럼 순백의 톤온톤으로 우아하고 청초한 분위기를 연출하는 여성 겨울 룩입니다.",
    gender: 'female', mode: 'two-piece', seasons: ['winter'],
    top: ["white", "beige", "gray"], topTypes: ['knit', 'shirt'], topPatterns: ['solid'],
    bottom: ["white", "beige", "gray", "black"],
    outerwear: ["white", "beige", "gray"]
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
  {
    name: "🌺 비비드 컬러 원피스", description: "선명한 컬러 원피스로 자신감 있고 생동감 넘치는 페미닌 룩을 완성합니다.",
    gender: 'female', mode: 'one-piece', seasons: ['spring-fall', 'summer'],
    dress: ["red", "green", "yellow", "pink", "blue", "light-blue"],
    outerwear: ["black", "white", "none", "beige"]
  },
  {
    name: "🌙 이브닝 무드 원피스", description: "우아한 어두운 원피스와 시크한 아우터의 조합으로 격조 있는 이브닝 무드를 연출합니다.",
    gender: 'female', mode: 'one-piece', seasons: ['spring-fall', 'winter'],
    dress: ["black", "navy", "red", "gray"],
    outerwear: ["black", "black-leather", "gray", "navy", "brown-leather"]
  },
  {
    name: "🎀 파스텔 원피스 데이리 룩", description: "부드러운 파스텔 톤 원피스로 사랑스럽고 화사한 데일리 여성 룩을 완성합니다.",
    gender: 'female', mode: 'one-piece', seasons: ['spring-fall', 'summer'],
    dress: ["beige", "pink", "white", "gray"],
    outerwear: ["beige", "white", "pink", "none"]
  },
  {
    name: "🧥 원피스 & 데님 자켓", description: "원피스에 데님 자켓을 걸친 캐주얼하면서도 여성스러운 조합의 인기 데일리 룩입니다.",
    gender: 'female', mode: 'one-piece', seasons: ['spring-fall', 'summer'],
    dress: ["white", "beige", "navy", "black", "blue"],
    outerwear: [...denimColors]
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
    outerwear: ["black", "gray", "navy", "blue", "light-blue", "beige", "white", "none", "black-leather", "brown-leather"]
  },
  {
    name: "🎨 하의 포인트 매치",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: ["white", "black", "gray"],
    bottom: bottomColors,
    outerwear: ["black", "gray", "navy", "blue", "light-blue", "none", "black-leather"]
  },
  {
    name: "🎨 원피스 매치",
    gender: 'female', mode: 'one-piece', seasons: ['spring-fall', 'summer', 'winter'],
    dress: availableColors,
    outerwear: ["black", "gray", "beige", "navy", "white", "none"]
  },

  // --- Colored outerwear statement rules ---
  {
    name: "🔴 레드 자켓 포인트 룩", description: "레드 자켓 하나로 전체 코디의 분위기를 바꾸는 강렬한 스테이트먼트 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["white", "black", "gray", "navy"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid'],
    bottom: ["black", "white", "gray", "navy", "denim"],
    outerwear: ["red"]
  },
  {
    name: "🌿 그린 자켓 어스 톤", description: "그린 자켓과 뉴트럴 컬러의 조합으로 자연스럽고 트렌디한 어스 톤 룩을 완성합니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["white", "black", "beige", "gray", "brown"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid'],
    bottom: ["black", "beige", "denim", "khaki", "white"],
    outerwear: ["green"]
  },
  {
    name: "🌻 옐로우 자켓 바이브 룩", description: "옐로우 자켓으로 포인트를 준 밝고 경쾌한 트렌디 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "black", "gray", "navy"], topTypes: ['t-shirt', 'shirt'], topPatterns: ['solid'],
    bottom: ["black", "white", "navy", "denim", "gray"],
    outerwear: ["yellow"]
  },
  {
    name: "🩶 그레이 자켓 미니멀 룩", description: "그레이 자켓의 차분하고 세련된 무드로 도시적이고 완성도 높은 미니멀 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "gray", "navy", "beige"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid', 'stripe'],
    bottom: ["gray", "black", "white", "navy", "dark-denim", "denim"],
    outerwear: ["gray"]
  },
  {
    name: "🌿 카키 자켓 밀리터리 룩", description: "카키 자켓과 뉴트럴 컬러의 조합으로 실용적이면서도 스타일리시한 밀리터리 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["white", "black", "beige", "olive", "brown"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid', 'check'],
    bottom: ["black", "denim", "beige", "khaki", "olive"],
    outerwear: ["khaki"]
  },
  {
    name: "🍃 올리브 자켓 내추럴 룩", description: "올리브 자켓과 어스 톤 컬러의 자연스러운 매치로 빈티지하고 캐주얼한 룩을 완성합니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "beige", "brown", "khaki"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid', 'check'],
    bottom: ["black", "denim", "khaki", "beige", "olive"],
    outerwear: ["olive"]
  },
  {
    name: "🤍 화이트 자켓 클린 룩", description: "화이트 자켓의 깔끔하고 경쾌한 무드로 어떤 계절에도 빛나는 클린핏 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "navy", "black", "blue", "beige"], topTypes: ['t-shirt', 'shirt'], topPatterns: ['solid', 'stripe'],
    bottom: ["white", "navy", "black", "denim", "beige", "gray"],
    outerwear: ["white"]
  },
  {
    name: "🎿 스포티 클린 룩", description: "편안하고 기능적인 스포티 무드로 데일리 캐주얼을 세련되게 완성하는 클린 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: ["white", "black", "gray", "navy"], topTypes: ['t-shirt'], topPatterns: ['solid'],
    bottom: ["black", "white", "gray", "navy"],
    outerwear: ["white", "gray", "navy", "black", "none"]
  },
  {
    name: "🌻 그린 상의 내추럴 캐주얼", description: "그린 상의와 뉴트럴 컬러의 자연스러운 매치로 개성 있고 신선한 캐주얼 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["green"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid'],
    bottom: ["black", "white", "beige", "khaki", "denim", "olive"],
    outerwear: ["none", "black", "white", "khaki", "olive"]
  },
  {
    name: "🌻 옐로우 상의 포인트 룩", description: "옐로우 상의로 생기 넘치는 포인트를 준 밝고 활기찬 유니섹스 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["yellow"], topTypes: ['t-shirt', 'shirt'], topPatterns: ['solid'],
    bottom: ["black", "white", "navy", "denim", "gray", "beige"],
    outerwear: ["none", "white", "black", "navy"]
  },
  {
    name: "🔴 레드 상의 포인트 룩", description: "레드 상의로 강렬하고 자신감 있는 포인트를 준 개성 넘치는 스트릿 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["red"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid'],
    bottom: ["black", "white", "navy", "denim", "gray"],
    outerwear: ["none", "black", "navy", "white"]
  },
  {
    name: "🏙️ 시티 블루 룩", description: "블루 계열을 중심으로 도시적이고 세련된 무드의 캐주얼 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["blue", "light-blue", "navy"], topTypes: ['t-shirt', 'shirt'], topPatterns: ['solid', 'stripe'],
    bottom: ["white", "beige", "gray", "navy", ...denimColors],
    outerwear: ["none", "white", "beige", "navy", "light-blue", "blue"]
  },
  {
    name: "🤎 카멜 & 브라운 계열 레이어링", description: "따뜻한 카멜과 브라운 계열로 완성하는 세련되고 고급스러운 어스 톤 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "beige", "brown", "gray"], topTypes: ['knit', 'shirt', 't-shirt'], topPatterns: ['solid'],
    bottom: ["beige", "brown", "gray", "black", "dark-denim"],
    outerwear: ["brown", "beige", "brown-leather"]
  },
  {
    name: "⚡ 블랙 레더 스트릿 룩", description: "블랙 레더 자켓의 강렬한 에너지로 완성하는 파워풀한 스트릿 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "gray"], topTypes: ['t-shirt', 'knit'], topPatterns: ['solid', 'stripe'],
    bottom: ["black", "dark-denim", "black-denim", "gray", "denim"],
    outerwear: ["black-leather"]
  },
  {
    name: "💎 그레이 온 그레이 모노톤", description: "다양한 명도의 그레이를 레이어링한 세련되고 모던한 모노톤 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["gray", "white", "black"], topTypes: ['knit', 't-shirt', 'shirt'], topPatterns: ['solid'],
    bottom: ["gray", "black", "white"],
    outerwear: ["gray", "black", "white"]
  },
  {
    name: "🌺 봄 파스텔 캐주얼", description: "파스텔 톤의 부드럽고 화사한 조합으로 봄의 설레임을 담은 상큼한 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["pink", "yellow", "light-blue", "beige", "white"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid'],
    bottom: ["white", "beige", "light-denim", "denim", "gray"],
    outerwear: ["none", "white", "beige", "pink", "light-blue"]
  },
  {
    name: "🌑 다크 모노크롬 겨울", description: "짙은 다크 계열의 모노크롬으로 겨울의 시크함과 강렬함을 극대화한 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['winter'],
    top: ["black", "gray", "navy"], topTypes: ['knit', 't-shirt', 'shirt'], topPatterns: ['solid'],
    bottom: ["black", "dark-denim", "black-denim", "gray", "navy"],
    outerwear: ["black", "navy", "gray", "black-leather"]
  },
  {
    name: "🎓 아이비 클래식 룩", description: "아이비리그 감성의 단정하고 지적인 무드로 완성하는 아카데믹 클래식 룩입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "blue", "light-blue", "beige"], topTypes: ['shirt', 'knit'], topPatterns: ['solid', 'stripe', 'check'],
    bottom: ["beige", "navy", "gray", "brown", "khaki"],
    outerwear: ["navy", "beige", "gray", "brown"]
  },

  // --- Light-blue outerwear ---
  {
    name: "🩵 연한블루 재킷 청량 룩", description: "연한블루 재킷 특유의 청량감이 봄·가을에 딱 맞는 감성적인 코디입니다.",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "navy", "gray", "beige"], topTypes: ["t-shirt", "shirt"], topPatterns: ["solid", "stripe"],
    bottom: ["white", "beige", "gray", "navy", ...denimColors],
    outerwear: ["light-blue"]
  },
  {
    name: "🩵 연한블루 재킷 페미닌", description: "파스텔톤 재킷으로 부드럽고 감각적인 여성스러운 무드를 완성합니다.",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "beige", "pink"], topTypes: ["t-shirt", "shirt", "knit"], topPatterns: ["solid"],
    bottom: ["white", "beige", ...denimColors],
    outerwear: ["light-blue"]
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
    name: "연한블루 셔츠 스마트 캐주얼",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["light-blue", "blue"], topTypes: ["shirt"], topPatterns: ["solid"],
    bottom: ["beige", "navy", "gray", "white", ...denimColors],
    outerwear: ["navy", "beige", "gray", "none", "light-blue", ...denimColors]
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
