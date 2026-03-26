import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { OnboardingData, SurveyResponse, AssessmentResult, LearningStyle } from '../types';
import { calculateLearnerType } from '../utils/scoring.js';
import { getRecommendations } from '../utils/recommendation';
import { Share2, CheckCircle2, Eye, Ear, Layers, Zap, BookOpen } from 'lucide-react';

export default function ResultsPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [feedback, setFeedback] = useState<'yes' | 'maybe' | 'no' | null>(null);

  useEffect(() => {
    const onboardingData = sessionStorage.getItem('onboarding');
    const responsesData = sessionStorage.getItem('responses');
    const isPreview = new URLSearchParams(window.location.search).get('preview') === '1';

    if (isPreview) {
      const onboarding: OnboardingData = {
        level: 'elementary',
        purpose: 'conversation',
        weeklyHours: '4-6',
      };
      const learningStyle: LearningStyle = {
        type: 'B',
        sensory: 'visual',
        approach: 'structured',
        description: '보면서 체계적으로 정리하며 쌓아가는 학습자 / A visual structured learner',
      };
      const recommendations = getRecommendations(learningStyle, onboarding);
      setResult({
        learningStyle,
        recommendations,
        onboarding,
      });
      return;
    }

    if (!onboardingData || !responsesData) {
      navigate('/onboarding');
      return;
    }

    const onboarding: OnboardingData = JSON.parse(onboardingData);
    const responses: SurveyResponse[] = JSON.parse(responsesData);

    const answers = Object.fromEntries(responses.map((r) => [r.questionId, r.score]));
    const scored = calculateLearnerType(answers);
    const learningStyle: LearningStyle = {
      type: scored.type,
      sensory: scored.sensory,
      approach: scored.style === 'exploratory' ? 'exploration' : 'structured',
      description: scored.description,
    };
    const recommendations = getRecommendations(learningStyle, onboarding);

    setResult({
      learningStyle,
      recommendations,
      onboarding,
    });
  }, [navigate]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('링크가 클립보드에 복사되었습니다! / Link copied to clipboard!');
  };

  const handleFeedback = (value: 'yes' | 'maybe' | 'no') => {
    setFeedback(value);
    // In a real app, you would send this to your backend
    console.log('User feedback:', value);
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">결과를 분석하고 있습니다... / Analyzing your results...</p>
        </div>
      </div>
    );
  }

  const { learningStyle, recommendations, onboarding } = result;

  const sensoryIcon = learningStyle.sensory === 'visual' ? Eye : learningStyle.sensory === 'auditory' ? Ear : Layers;
  const approachIcon = learningStyle.approach === 'structured' ? BookOpen : Zap;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Result Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <div className="inline-block bg-blue-600 text-white text-6xl font-bold rounded-full w-32 h-32 flex items-center justify-center mb-4">
              {learningStyle.type}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">당신의 학습 유형 / Your Learning Style</h1>
            <p className="text-xl text-gray-700">{learningStyle.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                {(() => {
                  const Icon = sensoryIcon;
                  return <Icon className="w-6 h-6 text-blue-600" />;
                })()}
                <h3 className="text-lg font-semibold">감각 선호 / Sensory Preference</h3>
              </div>
              <p className="text-gray-700">
                {learningStyle.sensory === 'visual' &&
                  '시각형 - 보면서 학습하는 것을 선호합니다 / Visual - You prefer learning by seeing'}
                {learningStyle.sensory === 'auditory' &&
                  '청각형 - 들으면서 학습하는 것을 선호합니다 / Auditory - You prefer learning by listening'}
                {learningStyle.sensory === 'mixed' &&
                  '복합형 - 시청각 자극을 모두 활용합니다 / Mixed - You use both visual and auditory input'}
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                {(() => {
                  const Icon = approachIcon;
                  return <Icon className="w-6 h-6 text-green-600" />;
                })()}
                <h3 className="text-lg font-semibold">학습 방식 / Learning Approach</h3>
              </div>
              <p className="text-gray-700">
                {learningStyle.approach === 'structured' &&
                  '구조형 - 체계적으로 정리하며 학습합니다 / Structured - You learn by organizing systematically'}
                {learningStyle.approach === 'exploration' &&
                  '탐색형 - 맥락 속에서 자연스럽게 흡수합니다 / Exploratory - You absorb naturally through context'}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              결과 공유하기 / Share Results
            </button>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">맞춤 학습 자원 추천 / Personalized Learning Resources</h2>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.resource.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                    {rec.rank}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {rec.resource.nameKo}
                      <span className="text-gray-500 text-base ml-2">({rec.resource.name})</span>
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                        {rec.resource.sensory === 'visual' && '시각형 / Visual'}
                        {rec.resource.sensory === 'auditory' && '청각형 / Auditory'}
                        {rec.resource.sensory === 'mixed' && '복합형 / Mixed'}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                        {rec.resource.approach === 'structured' && '구조형 / Structured'}
                        {rec.resource.approach === 'exploration' && '탐색형 / Exploratory'}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{rec.resource.descriptionKo}</p>
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-3 mt-3">
                      <p className="text-sm">
                        <span className="font-semibold text-amber-800">추천 이유 / Why this is recommended:</span>{' '}
                        <span className="text-amber-900">{rec.reason}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">피드백을 주세요 / Share Your Feedback</h2>
          <p className="text-gray-600 mb-6">
            이 커리큘럼대로 실제로 공부해볼 것 같나요?
            <br />
            Would you actually study with this curriculum?
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => handleFeedback('yes')}
              className={`p-4 rounded-lg border-2 transition-all ${
                feedback === 'yes'
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold">네, 따라할 것 같아요 / Yes, I would follow it</div>
            </button>
            <button
              onClick={() => handleFeedback('maybe')}
              className={`p-4 rounded-lg border-2 transition-all ${
                feedback === 'maybe'
                  ? 'border-yellow-600 bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CheckCircle2 className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="font-semibold">아마도요 / Maybe</div>
            </button>
            <button
              onClick={() => handleFeedback('no')}
              className={`p-4 rounded-lg border-2 transition-all ${
                feedback === 'no'
                  ? 'border-red-600 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CheckCircle2 className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="font-semibold">아니요 / No</div>
            </button>
          </div>
          {feedback && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-900 text-center">
                피드백 감사합니다! 더 나은 추천을 위해 활용하겠습니다.
                <br />
                Thank you for your feedback! We will use it to improve recommendations.
              </p>
            </div>
          )}
        </div>

        {/* Start Again */}
        <div className="text-center mt-8">
          <button
            onClick={() => {
              sessionStorage.clear();
              navigate('/');
            }}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            처음부터 다시 시작하기 / Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
