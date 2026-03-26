// ============================================================
// Learning style survey question data (Bilingual)
// - Uses `surveyQuestions.ts` as the single source of truth for
//   both Korean and English statements.
// - Exports `PARTS` in the structure expected by `src/app/utils/scoring.js`.
// ============================================================

import { surveyQuestions } from "./surveyQuestions";

export const SCALE = [
  { value: 0, label: "전혀 그렇지 않다" },
  { value: 1, label: "거의 그렇지 않다" },
  { value: 2, label: "가끔 그렇다" },
  { value: 3, label: "자주 그렇다" },
  { value: 4, label: "항상 그렇다" },
];

const makeQuestion = (q) => ({
  id: q.id,
  text: q.questionKo, // Korean (primary)
  textEn: q.questionEn, // English (shown below)
});

const by = (part, direction) =>
  surveyQuestions
    .filter((q) => q.part === part && q.direction === direction)
    .map(makeQuestion);

export const PARTS = [
  {
    id: "part1",
    title: "나는 감각을 어떻게 사용하는가",
    description: "학습할 때 어떤 감각을 주로 활용하는지 알아봅니다.",
    groups: [
      {
        id: "part1_visual",
        axis: "sensory",
        type: "visual",
        questions: by(1, "visual"),
      },
      {
        id: "part1_auditory",
        axis: "sensory",
        type: "auditory",
        questions: by(1, "auditory"),
      },
    ],
  },

  {
    id: "part3",
    title: "나는 가능성을 어떻게 다루는가",
    description: "새로운 것을 탐색하는 방식과 정보 처리 성향을 알아봅니다.",
    groups: [
      {
        id: "part3_exploratory",
        axis: "style",
        direction: "exploratory",
        questions: by(3, "exploration"),
      },
      {
        id: "part3_structured",
        axis: "style",
        direction: "structured",
        questions: by(3, "structured"),
      },
    ],
  },

  {
    id: "part4",
    title: "나는 과제를 어떻게 접근하는가",
    description: "학습 계획과 마감, 규칙에 대한 태도를 알아봅니다.",
    groups: [
      {
        id: "part4_structured",
        axis: "style",
        // scoring.js expects "structured" vs "exploratory"
        direction: "structured",
        questions: by(4, "structured"),
      },
      {
        id: "part4_exploratory",
        axis: "style",
        direction: "exploratory",
        questions: by(4, "exploration"),
      },
    ],
  },

  {
    id: "part5",
    title: "나는 정보를 어떻게 받아들이는가",
    description: "정보를 전체적으로 파악하는지, 세부적으로 처리하는지 알아봅니다.",
    groups: [
      {
        id: "part5_exploratory",
        axis: "style",
        direction: "exploratory",
        questions: by(5, "exploration"),
      },
      {
        id: "part5_structured",
        axis: "style",
        direction: "structured",
        questions: by(5, "structured"),
      },
    ],
  },

  {
    id: "part7",
    title: "나는 내용을 어떻게 기억하는가",
    description: "새로운 정보를 기억에 저장하는 방식을 알아봅니다.",
    groups: [
      {
        id: "part7_structured",
        axis: "style",
        direction: "structured",
        questions: by(7, "structured"),
      },
      {
        id: "part7_exploratory",
        axis: "style",
        direction: "exploratory",
        questions: by(7, "exploration"),
      },
    ],
  },

  {
    id: "part8",
    title: "나는 언어 규칙을 어떻게 다루는가",
    description: "문법과 규칙을 습득하는 방식을 알아봅니다.",
    groups: [
      {
        id: "part8_structured",
        axis: "style",
        direction: "structured",
        questions: by(8, "structured"),
      },
      {
        id: "part8_exploratory",
        axis: "style",
        direction: "exploratory",
        questions: by(8, "exploration"),
      },
    ],
  },
];

