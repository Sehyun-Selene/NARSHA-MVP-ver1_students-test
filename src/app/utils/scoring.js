// ============================================================
// 채점 로직 + 커리큘럼 매핑 테이블
//
// 사용법:
//   const result = calculateLearnerType(answers);
//   const curriculum = getCurriculum(result.type, level, goal);
//
// answers 형태:
//   { [questionId]: number (0~4) }
//   예: { p1_v1: 3, p1_v2: 2, ... }
// ============================================================

import { PARTS } from "../data/questions.js";

// ──────────────────────────────────────────────────────────
// 1. 채점 로직
// ──────────────────────────────────────────────────────────

/**
 * 감각 축 계산
 * - visualScore, auditoryScore 합산
 * - 차이가 5점 이하이면 "mixed" (복합형)
 */
function calcSensoryAxis(answers) {
  const part1 = PARTS.find(p => p.id === "part1");
  let visualScore = 0;
  let auditoryScore = 0;

  for (const group of part1.groups) {
    for (const q of group.questions) {
      const val = answers[q.id] ?? 0;
      if (group.type === "visual")   visualScore   += val;
      if (group.type === "auditory") auditoryScore += val;
    }
  }

  const diff = Math.abs(visualScore - auditoryScore);
  let sensory;
  if (diff <= 5) {
    sensory = "mixed";
  } else {
    sensory = visualScore > auditoryScore ? "visual" : "auditory";
  }

  return { sensory, visualScore, auditoryScore };
}

/**
 * 방식 축 계산
 * - 각 파트의 (structured 방향 합) - (exploratory 방향 합) 을 누적
 * - 최종 합이 양수 → structured(구조형), 음수 → exploratory(탐색형)
 *
 * Part별 direction 매핑:
 *   Part3 A=exploratory / B=structured
 *   Part4 A=structured  / B=exploratory  ← 주의: A가 Closure(구조형)
 *   Part5 A=exploratory / B=structured
 *   Part7 A=structured  / B=exploratory  ← 주의: A가 Sharpener(구조형)
 *   Part8 A=structured  / B=exploratory  ← 주의: A가 Deductive(구조형)
 */
function calcStyleAxis(answers) {
  const styleParts = PARTS.filter(p => ["part3","part4","part5","part7","part8"].includes(p.id));
  let styleScore = 0; // 양수=구조형, 음수=탐색형

  for (const part of styleParts) {
    for (const group of part.groups) {
      for (const q of group.questions) {
        const val = answers[q.id] ?? 0;
        if (group.direction === "structured")   styleScore += val;
        if (group.direction === "exploratory")  styleScore -= val;
      }
    }
  }

  const style = styleScore >= 0 ? "structured" : "exploratory";
  return { style, styleScore };
}

/**
 * 최종 유형 계산
 * 반환값 예시:
 * {
 *   type: "B",                  // 유형 코드 A~F
 *   sensory: "visual",          // "visual" | "auditory" | "mixed"
 *   style: "structured",        // "structured" | "exploratory"
 *   label: "시각 + 구조형",
 *   description: "보면서 체계적으로 정리하며 쌓아가는 학습자",
 *   visualScore: 28,
 *   auditoryScore: 18,
 *   styleScore: 12,
 * }
 */
export function calculateLearnerType(answers) {
  const { sensory, visualScore, auditoryScore } = calcSensoryAxis(answers);
  const { style, styleScore }                   = calcStyleAxis(answers);

  const typeMap = {
    "visual-exploratory":   { type: "A", label: "시각 + 탐색형",    description: "보면서 맥락 속에 자연스럽게 흡수하는 학습자" },
    "visual-structured":    { type: "B", label: "시각 + 구조형",    description: "보면서 체계적으로 정리하며 쌓아가는 학습자" },
    "auditory-exploratory": { type: "C", label: "청각 + 탐색형",    description: "들으면서 자연스럽게 언어를 흡수하는 학습자" },
    "auditory-structured":  { type: "D", label: "청각 + 구조형",    description: "들으면서 규칙을 파악하고 체계화하는 학습자" },
    "mixed-exploratory":    { type: "E", label: "시각+청각 + 탐색형", description: "시청각 자극 모두 활용하며 맥락으로 흡수하는 학습자" },
    "mixed-structured":     { type: "F", label: "시각+청각 + 구조형", description: "시청각 자극 모두 활용하며 체계적으로 정리하는 학습자" },
  };

  const key = `${sensory}-${style}`;
  const typeInfo = typeMap[key];

  return {
    ...typeInfo,
    sensory,
    style,
    visualScore,
    auditoryScore,
    styleScore,
  };
}

// ──────────────────────────────────────────────────────────
// 2. 학습 자원 DB (7개 앱)
// ──────────────────────────────────────────────────────────

export const RESOURCES = [
  {
    id: "duolingo",
    name: "Duolingo",
    sensory: ["visual"],
    style: "exploratory",
    levels: ["beginner", "elementary"],
    url: "https://www.duolingo.com",
    description: "게임형 반복 학습. 규칙 설명 없이 맥락 노출 중심으로 자연스럽게 흡수.",
  },
  {
    id: "ttmik_podcast",
    name: "TTMIK (팟캐스트)",
    sensory: ["auditory"],
    style: "exploratory",
    levels: ["beginner", "elementary", "intermediate"],
    url: "https://talktomeinkorean.com",
    description: "대화형 자연 노출. 규칙 설명 없이 흐름 위주로 귀를 트이게 함.",
  },
  {
    id: "ttmik_book",
    name: "TTMIK (교재/웹)",
    sensory: ["visual"],
    style: "structured",
    levels: ["beginner", "elementary", "intermediate"],
    url: "https://talktomeinkorean.com",
    description: "문법 규칙을 명시적으로 설명하는 단계별 커리큘럼 구성.",
  },
  {
    id: "anki",
    name: "Anki",
    sensory: ["visual"],
    style: "structured",
    levels: ["beginner", "elementary", "intermediate", "advanced"],
    url: "https://apps.ankiweb.net",
    description: "플래시카드 기반 간격 반복(SRS). 어휘·문법을 체계적으로 암기.",
  },
  {
    id: "lingodeer",
    name: "LingoDeer",
    sensory: ["visual"],
    style: "structured",
    levels: ["beginner", "elementary", "intermediate"],
    url: "https://www.lingodeer.com",
    description: "문법 체계를 먼저 제시하는 단계별 구조적 커리큘럼.",
  },
  {
    id: "teuida",
    name: "Teuida",
    sensory: ["visual", "auditory"],
    style: "exploratory",
    levels: ["elementary", "intermediate"],
    url: "https://teuida.net",
    description: "드라마·영상 클립 기반 맥락 노출. 실제 대화 표현을 자연스럽게 흡수.",
  },
  {
    id: "king_sejong",
    name: "King Sejong Institute App",
    sensory: ["visual"],
    style: "structured",
    levels: ["beginner", "elementary", "intermediate"],
    url: "https://www.sejonghakdang.org",
    description: "정부 공인 교재 기반의 체계적인 단계별 학습 구조.",
  },
  {
    id: "memrise",
    name: "Memrise",
    sensory: ["visual", "auditory"],
    style: "exploratory",
    levels: ["beginner", "elementary"],
    url: "https://www.memrise.com",
    description: "원어민 영상 클립 + 게임형 반복. 구어 맥락을 자연스럽게 습득.",
  },
];

// ──────────────────────────────────────────────────────────
// 3. 커리큘럼 매핑 테이블
// ──────────────────────────────────────────────────────────
// 구조: CURRICULUM_MAP[type][level] = [{ resourceId, reason }]

const CURRICULUM_MAP = {
  // 유형 A: 시각 + 탐색형
  A: {
    beginner: [
      { resourceId: "duolingo",    reason: "게임형 시각 노출로 부담 없이 시작. 규칙 없이 맥락으로 흡수." },
      { resourceId: "ttmik_book",  reason: "기초 문법은 시각 교재로 가볍게 보완." },
      { resourceId: "memrise",     reason: "영상 클립으로 실제 표현 감각을 빠르게 쌓음." },
    ],
    elementary: [
      { resourceId: "teuida",      reason: "드라마 클립으로 실제 맥락 노출. 시각+탐색형에 최적." },
      { resourceId: "duolingo",    reason: "게임형 반복으로 어휘 유지." },
      { resourceId: "ttmik_book",  reason: "부족한 문법 포인트를 교재로 보완." },
    ],
    intermediate: [
      { resourceId: "teuida",      reason: "고급 드라마 맥락으로 자연스러운 어휘 확장." },
      { resourceId: "memrise",     reason: "구어 표현 반복 노출로 fluency 향상." },
      { resourceId: "ttmik_book",  reason: "중급 문법 틈새를 교재로 정리." },
    ],
  },

  // 유형 B: 시각 + 구조형
  B: {
    beginner: [
      { resourceId: "lingodeer",   reason: "문법 체계를 먼저 잡는 구조적 커리큘럼. 시각형에 최적." },
      { resourceId: "ttmik_book",  reason: "단계별 교재로 문법 심화." },
      { resourceId: "anki",        reason: "어휘를 체계적인 플래시카드로 고정." },
    ],
    elementary: [
      { resourceId: "ttmik_book",  reason: "초급 문법 체계화. 시각 교재로 정리하며 쌓기." },
      { resourceId: "anki",        reason: "SRS로 어휘 체계화." },
      { resourceId: "lingodeer",   reason: "부족한 문법 영역을 LingoDeer로 보완." },
    ],
    intermediate: [
      { resourceId: "anki",        reason: "중급 어휘·문법 체계적 암기. 구조형의 핵심 도구." },
      { resourceId: "ttmik_book",  reason: "중급 문법 심화 정리." },
      { resourceId: "king_sejong", reason: "TOPIK 대비용 체계적 보완." },
    ],
  },

  // 유형 C: 청각 + 탐색형
  C: {
    beginner: [
      { resourceId: "ttmik_podcast", reason: "귀로 자연 노출. 청각+탐색형의 최적 시작점." },
      { resourceId: "duolingo",      reason: "게임형으로 동기 유지." },
      { resourceId: "memrise",       reason: "원어민 영상으로 청각 맥락 보완." },
    ],
    elementary: [
      { resourceId: "ttmik_podcast", reason: "청각 노출 강화. 대화 흐름 감각 발달." },
      { resourceId: "teuida",        reason: "드라마 클립으로 청각+시각 실제 맥락 추가." },
      { resourceId: "memrise",       reason: "구어 표현을 게임형으로 반복." },
    ],
    intermediate: [
      { resourceId: "ttmik_podcast", reason: "중급 청각 자료로 고급 표현 노출." },
      { resourceId: "teuida",        reason: "드라마 맥락으로 자연스러운 언어 감각 확장." },
      { resourceId: "memrise",       reason: "구어 fluency 유지." },
    ],
  },

  // 유형 D: 청각 + 구조형
  D: {
    beginner: [
      { resourceId: "king_sejong",   reason: "체계적 발음·문형 학습. 구조형 청각 학습자에 적합." },
      { resourceId: "ttmik_podcast", reason: "귀 훈련 병행." },
      { resourceId: "anki",          reason: "어휘 체계적 암기." },
    ],
    elementary: [
      { resourceId: "ttmik_podcast", reason: "청각 체계 강화." },
      { resourceId: "king_sejong",   reason: "체계적 보완." },
      { resourceId: "anki",          reason: "어휘·문형 SRS로 고정." },
    ],
    intermediate: [
      { resourceId: "ttmik_podcast", reason: "청각 고급화." },
      { resourceId: "anki",          reason: "중급 어휘 체계화." },
      { resourceId: "king_sejong",   reason: "TOPIK 대비 구조적 보완." },
    ],
  },

  // 유형 E: 시각+청각 복합 + 탐색형
  E: {
    beginner: [
      { resourceId: "duolingo",      reason: "게임형 시각 노출로 시작." },
      { resourceId: "ttmik_podcast", reason: "청각 노출 병행." },
      { resourceId: "memrise",       reason: "시청각 원어민 클립으로 자연 흡수." },
    ],
    elementary: [
      { resourceId: "teuida",        reason: "시청각 드라마 맥락. 복합 탐색형에 최적." },
      { resourceId: "ttmik_podcast", reason: "청각 채널 강화." },
      { resourceId: "memrise",       reason: "구어 표현 노출 유지." },
    ],
    intermediate: [
      { resourceId: "teuida",        reason: "고급 시청각 맥락으로 fluency 목표." },
      { resourceId: "ttmik_podcast", reason: "청각 고급화." },
      { resourceId: "memrise",       reason: "구어 어휘 확장." },
    ],
  },

  // 유형 F: 시각+청각 복합 + 구조형
  F: {
    beginner: [
      { resourceId: "lingodeer",     reason: "문법 체계 먼저 시각으로 정리." },
      { resourceId: "king_sejong",   reason: "체계적 발음·문형 청각 훈련 병행." },
      { resourceId: "anki",          reason: "어휘 SRS 암기." },
    ],
    elementary: [
      { resourceId: "ttmik_book",    reason: "시각 교재로 문법 심화." },
      { resourceId: "king_sejong",   reason: "청각 채널 구조적 보완." },
      { resourceId: "anki",          reason: "어휘 체계화." },
    ],
    intermediate: [
      { resourceId: "anki",          reason: "중급 어휘·문법 총체계화." },
      { resourceId: "ttmik_book",    reason: "시각 문법 정리." },
      { resourceId: "king_sejong",   reason: "TOPIK 대비 구조적 마무리." },
    ],
  },
};

// ──────────────────────────────────────────────────────────
// 4. 커리큘럼 조회 함수
// ──────────────────────────────────────────────────────────

/**
 * 유형 + 수준으로 커리큘럼 조회
 *
 * @param {string} type    - "A" | "B" | "C" | "D" | "E" | "F"
 * @param {string} level   - "beginner" | "elementary" | "intermediate"
 * @returns {{ resource: object, reason: string }[]}  — 3개 항목
 *
 * 사용 예:
 *   const result = calculateLearnerType(answers);
 *   const curriculum = getCurriculum(result.type, "elementary");
 */
export function getCurriculum(type, level) {
  const entries = CURRICULUM_MAP[type]?.[level];
  if (!entries) return [];

  return entries.map(({ resourceId, reason }) => ({
    resource: RESOURCES.find(r => r.id === resourceId),
    reason,
  }));
}

// ──────────────────────────────────────────────────────────
// 5. 수준 상수 (온보딩 UI에서 사용)
// ──────────────────────────────────────────────────────────

export const LEVELS = [
  { value: "beginner",     label: "입문",  description: "한국어를 처음 시작하는 단계" },
  { value: "elementary",   label: "초급",  description: "기초 문법을 알고 간단한 대화 가능" },
  { value: "intermediate", label: "중급",  description: "일상 대화 가능, TOPIK 3~4급 수준" },
  { value: "advanced",     label: "고급",  description: "자유로운 의사소통 가능, TOPIK 5~6급" },
];

export const GOALS = [
  { value: "topik",    label: "TOPIK 시험 준비" },
  { value: "daily",    label: "일상 회화" },
  { value: "business", label: "비즈니스 한국어" },
  { value: "culture",  label: "K-pop / 드라마 / 문화" },
];

export const WEEKLY_HOURS = [
  { value: "1-2",  label: "주 1~2시간" },
  { value: "3-5",  label: "주 3~5시간" },
  { value: "6-10", label: "주 6~10시간" },
  { value: "10+",  label: "주 10시간 이상" },
];
