import {
  LearningStyle,
  OnboardingData,
  Recommendation,
  LearningResource,
  SensoryType,
  ApproachType,
} from '../types';
import { getCurriculum } from './scoring.js';

type ScoringResource = {
  id: string;
  name: string;
  sensory: string[];
  style: string;
  levels: string[];
  url: string;
  description: string;
};

function mapToLearningResource(r: ScoringResource): LearningResource {
  const sensory: SensoryType =
    r.sensory.length >= 2 ? 'mixed' : r.sensory[0] === 'auditory' ? 'auditory' : 'visual';
  const approach: ApproachType = r.style === 'exploratory' ? 'exploration' : 'structured';
  return {
    id: r.id,
    name: r.name,
    nameKo: r.name,
    sensory,
    approach,
    suitableLevels: r.levels as LearningResource['suitableLevels'],
    description: r.description,
    descriptionKo: r.description,
  };
}

export function getRecommendations(
  learningStyle: LearningStyle,
  onboarding: OnboardingData
): Recommendation[] {
  const level =
    onboarding.level === 'advanced' ? 'intermediate' : onboarding.level;
  const items = getCurriculum(learningStyle.type, level) as {
    resource?: ScoringResource;
    reason: string;
  }[];

  return items
    .filter((item) => item.resource)
    .map((item, index) => ({
      resource: mapToLearningResource(item.resource!),
      reason: item.reason,
      rank: index + 1,
    }));
}
