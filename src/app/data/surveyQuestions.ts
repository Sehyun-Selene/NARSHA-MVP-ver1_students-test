// Based on Cohen, Oxford & Chi Learning Style Survey
// Parts 1, 3, 4, 5, 7, 8 (40 questions total)

export interface SurveyQuestion {
  id: string;
  part: number;
  questionEn: string;
  questionKo: string;
  direction: 'visual' | 'auditory' | 'exploration' | 'structured';
}

export const surveyQuestions: SurveyQuestion[] = [
  // Part 1: Visual vs Auditory (Sensory Axis)
  {
    id: 'p1q1',
    part: 1,
    questionEn: 'I remember something better if I write it down.',
    questionKo: '나는 무언가를 적어두면 더 잘 기억한다.',
    direction: 'visual',
  },
  {
    id: 'p1q2',
    part: 1,
    questionEn: 'I prefer to learn by listening to someone explain things.',
    questionKo: '나는 누군가가 설명해주는 것을 듣는 것을 선호한다.',
    direction: 'auditory',
  },
  {
    id: 'p1q3',
    part: 1,
    questionEn: 'I like to see pictures, diagrams, or charts when learning.',
    questionKo: '나는 배울 때 그림, 도표, 차트를 보는 것을 좋아한다.',
    direction: 'visual',
  },
  {
    id: 'p1q4',
    part: 1,
    questionEn: 'I learn better when I listen to lectures or audio.',
    questionKo: '나는 강의나 오디오를 들을 때 더 잘 배운다.',
    direction: 'auditory',
  },
  {
    id: 'p1q5',
    part: 1,
    questionEn: 'I remember better when I read instructions.',
    questionKo: '나는 지시사항을 읽을 때 더 잘 기억한다.',
    direction: 'visual',
  },
  {
    id: 'p1q6',
    part: 1,
    questionEn: 'I prefer listening to the news on the radio rather than reading it.',
    questionKo: '나는 신문을 읽는 것보다 라디오로 뉴스를 듣는 것을 선호한다.',
    direction: 'auditory',
  },
  {
    id: 'p1q7',
    part: 1,
    questionEn: 'I find it helpful to highlight or underline text when studying.',
    questionKo: '나는 공부할 때 텍스트에 하이라이트나 밑줄을 긋는 것이 도움이 된다.',
    direction: 'visual',
  },
  {
    id: 'p1q8',
    part: 1,
    questionEn: 'I enjoy discussing topics out loud to understand them better.',
    questionKo: '나는 주제를 소리 내어 토론하면 더 잘 이해할 수 있다.',
    direction: 'auditory',
  },

  // Part 3: Exploration vs Structured
  {
    id: 'p3q1',
    part: 3,
    questionEn: 'I like to experiment and try different approaches before finding what works.',
    questionKo: '나는 무엇이 효과가 있는지 찾기 전에 실험하고 다양한 방법을 시도하는 것을 좋아한다.',
    direction: 'exploration',
  },
  {
    id: 'p3q2',
    part: 3,
    questionEn: 'I prefer to follow a clear step-by-step process.',
    questionKo: '나는 명확한 단계별 과정을 따르는 것을 선호한다.',
    direction: 'structured',
  },
  {
    id: 'p3q3',
    part: 3,
    questionEn: 'I learn best by exploring and discovering things on my own.',
    questionKo: '나는 스스로 탐구하고 발견하면서 가장 잘 배운다.',
    direction: 'exploration',
  },
  {
    id: 'p3q4',
    part: 3,
    questionEn: 'I like having a detailed plan before starting to learn something new.',
    questionKo: '나는 새로운 것을 배우기 전에 상세한 계획을 세우는 것을 좋아한다.',
    direction: 'structured',
  },
  {
    id: 'p3q5',
    part: 3,
    questionEn: 'I enjoy learning in an unstructured, flexible way.',
    questionKo: '나는 비구조적이고 유연한 방식으로 배우는 것을 즐긴다.',
    direction: 'exploration',
  },
  {
    id: 'p3q6',
    part: 3,
    questionEn: 'I need clear guidelines and rules when learning.',
    questionKo: '나는 배울 때 명확한 가이드라인과 규칙이 필요하다.',
    direction: 'structured',
  },

  // Part 4: Structured vs Exploration
  {
    id: 'p4q1',
    part: 4,
    questionEn: 'I prefer organized, systematic learning materials.',
    questionKo: '나는 정리된, 체계적인 학습 자료를 선호한다.',
    direction: 'structured',
  },
  {
    id: 'p4q2',
    part: 4,
    questionEn: 'I like to jump around and explore topics that interest me.',
    questionKo: '나는 이리저리 옮겨 다니며 흥미로운 주제를 탐구하는 것을 좋아한다.',
    direction: 'exploration',
  },
  {
    id: 'p4q3',
    part: 4,
    questionEn: 'I want clear objectives and goals for each learning session.',
    questionKo: '나는 각 학습 세션마다 명확한 목표와 목적을 원한다.',
    direction: 'structured',
  },
  {
    id: 'p4q4',
    part: 4,
    questionEn: 'I learn better through trial and error.',
    questionKo: '나는 시행착오를 통해 더 잘 배운다.',
    direction: 'exploration',
  },
  {
    id: 'p4q5',
    part: 4,
    questionEn: 'I like to have my learning progress tracked and measured.',
    questionKo: '나는 학습 진행 상황이 추적되고 측정되는 것을 좋아한다.',
    direction: 'structured',
  },
  {
    id: 'p4q6',
    part: 4,
    questionEn: 'I prefer learning naturally without following a strict curriculum.',
    questionKo: '나는 엄격한 커리큘럼을 따르지 않고 자연스럽게 배우는 것을 선호한다.',
    direction: 'exploration',
  },

  // Part 5: Exploration vs Structured
  {
    id: 'p5q1',
    part: 5,
    questionEn: 'I like to learn through immersion and real-life contexts.',
    questionKo: '나는 몰입과 실제 상황을 통해 배우는 것을 좋아한다.',
    direction: 'exploration',
  },
  {
    id: 'p5q2',
    part: 5,
    questionEn: 'I prefer studying grammar rules and structures explicitly.',
    questionKo: '나는 문법 규칙과 구조를 명시적으로 공부하는 것을 선호한다.',
    direction: 'structured',
  },
  {
    id: 'p5q3',
    part: 5,
    questionEn: 'I enjoy picking up language naturally from exposure.',
    questionKo: '나는 노출을 통해 자연스럽게 언어를 습득하는 것을 즐긴다.',
    direction: 'exploration',
  },
  {
    id: 'p5q4',
    part: 5,
    questionEn: 'I want to understand the "why" behind every rule.',
    questionKo: '나는 모든 규칙 뒤에 있는 "왜"를 이해하고 싶다.',
    direction: 'structured',
  },
  {
    id: 'p5q5',
    part: 5,
    questionEn: 'I like learning vocabulary in context rather than from lists.',
    questionKo: '나는 목록보다는 문맥에서 어휘를 배우는 것을 좋아한다.',
    direction: 'exploration',
  },
  {
    id: 'p5q6',
    part: 5,
    questionEn: 'I prefer memorizing vocabulary lists and grammar tables.',
    questionKo: '나는 어휘 목록과 문법표를 암기하는 것을 선호한다.',
    direction: 'structured',
  },

  // Part 7: Structured vs Exploration
  {
    id: 'p7q1',
    part: 7,
    questionEn: 'I like to complete exercises and drills to practice.',
    questionKo: '나는 연습을 위해 연습문제와 드릴을 완료하는 것을 좋아한다.',
    direction: 'structured',
  },
  {
    id: 'p7q2',
    part: 7,
    questionEn: 'I prefer learning by watching shows or videos in the language.',
    questionKo: '나는 그 언어로 된 쇼나 비디오를 보면서 배우는 것을 선호한다.',
    direction: 'exploration',
  },
  {
    id: 'p7q3',
    part: 7,
    questionEn: 'I want feedback and corrections on my mistakes regularly.',
    questionKo: '나는 정기적으로 내 실수에 대한 피드백과 수정을 원한다.',
    direction: 'structured',
  },
  {
    id: 'p7q4',
    part: 7,
    questionEn: 'I learn better when I can use the language freely without worrying about mistakes.',
    questionKo: '나는 실수를 걱정하지 않고 자유롭게 언어를 사용할 때 더 잘 배운다.',
    direction: 'exploration',
  },
  {
    id: 'p7q5',
    part: 7,
    questionEn: 'I like to study with textbooks and structured materials.',
    questionKo: '나는 교과서와 구조화된 자료로 공부하는 것을 좋아한다.',
    direction: 'structured',
  },
  {
    id: 'p7q6',
    part: 7,
    questionEn: 'I prefer conversational practice over formal study.',
    questionKo: '나는 공식적인 공부보다 대화 연습을 선호한다.',
    direction: 'exploration',
  },

  // Part 8: Structured vs Exploration
  {
    id: 'p8q1',
    part: 8,
    questionEn: 'I like to review and revise what I\'ve learned systematically.',
    questionKo: '나는 배운 것을 체계적으로 복습하고 수정하는 것을 좋아한다.',
    direction: 'structured',
  },
  {
    id: 'p8q2',
    part: 8,
    questionEn: 'I learn well by encountering the same words/phrases in different contexts.',
    questionKo: '나는 같은 단어/구문을 다양한 문맥에서 마주치면서 잘 배운다.',
    direction: 'exploration',
  },
  {
    id: 'p8q3',
    part: 8,
    questionEn: 'I prefer using flashcards and spaced repetition systems.',
    questionKo: '나는 플래시카드와 간격 반복 시스템을 사용하는 것을 선호한다.',
    direction: 'structured',
  },
  {
    id: 'p8q4',
    part: 8,
    questionEn: 'I like to learn by reading stories or articles naturally.',
    questionKo: '나는 이야기나 기사를 자연스럽게 읽으면서 배우는 것을 좋아한다.',
    direction: 'exploration',
  },
  {
    id: 'p8q5',
    part: 8,
    questionEn: 'I want a clear curriculum that tells me what to learn next.',
    questionKo: '나는 다음에 무엇을 배울지 알려주는 명확한 커리큘럼을 원한다.',
    direction: 'structured',
  },
  {
    id: 'p8q6',
    part: 8,
    questionEn: 'I enjoy exploring the language through games and entertainment.',
    questionKo: '나는 게임과 엔터테인먼트를 통해 언어를 탐구하는 것을 즐긴다.',
    direction: 'exploration',
  },
  {
    id: 'p8q7',
    part: 8,
    questionEn: 'I like having quizzes and tests to check my progress.',
    questionKo: '나는 내 진행 상황을 확인하기 위해 퀴즈와 시험을 보는 것을 좋아한다.',
    direction: 'structured',
  },
  {
    id: 'p8q8',
    part: 8,
    questionEn: 'I prefer learning spontaneously as opportunities arise.',
    questionKo: '나는 기회가 생길 때 자발적으로 배우는 것을 선호한다.',
    direction: 'exploration',
  },
];
