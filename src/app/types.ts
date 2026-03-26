import { z } from 'zod';

// Onboarding schema
export const onboardingSchema = z.object({
  level: z.enum(['beginner', 'elementary', 'intermediate', 'advanced']),
  purpose: z.enum(['topik', 'conversation', 'business', 'culture']),
  weeklyHours: z.enum(['1-3', '4-6', '7-10', '10+']),
});

export type OnboardingData = z.infer<typeof onboardingSchema>;

// Survey response schema
export const surveyResponseSchema = z.object({
  questionId: z.string(),
  score: z.number().min(0).max(4),
});

export type SurveyResponse = z.infer<typeof surveyResponseSchema>;

// Learning style result
export type SensoryType = 'visual' | 'auditory' | 'mixed';
export type ApproachType = 'exploration' | 'structured';

export interface LearningStyle {
  type: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  sensory: SensoryType;
  approach: ApproachType;
  description: string;
}

// Learning resource
export interface LearningResource {
  id: string;
  name: string;
  nameKo: string;
  sensory: SensoryType;
  approach: ApproachType;
  suitableLevels: ('beginner' | 'elementary' | 'intermediate' | 'advanced')[];
  description: string;
  descriptionKo: string;
}

// Recommendation result
export interface Recommendation {
  resource: LearningResource;
  reason: string;
  rank: number;
}

export interface AssessmentResult {
  learningStyle: LearningStyle;
  recommendations: Recommendation[];
  onboarding: OnboardingData;
}
