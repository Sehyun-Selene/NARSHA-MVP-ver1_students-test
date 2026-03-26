import { useState } from 'react';
import { useNavigate } from 'react-router';
import { OnboardingData, onboardingSchema } from '../types';
import { ArrowRight } from 'lucide-react';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OnboardingData>({
    level: 'beginner',
    purpose: 'conversation',
    weeklyHours: '4-6',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = onboardingSchema.parse(formData);
      // Store in sessionStorage
      sessionStorage.setItem('onboarding', JSON.stringify(validated));
      navigate('/survey-guide');
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">학습 유형 검사 시작하기 / Start Learning Style Test</h1>
          <p className="text-gray-600 mb-8">먼저 몇 가지 기본 정보를 알려주세요. / Please share some basic information first.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Level Selection */}
            <div>
              <label className="block text-lg font-semibold mb-4">현재 한국어 수준 / Current Korean Level</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'beginner', label: '입문 (Beginner)', desc: '한글을 배우는 단계 / Learning Hangul' },
                  { value: 'elementary', label: '초급 (Elementary)', desc: '기초 회화 가능 / Basic conversation' },
                  { value: 'intermediate', label: '중급 (Intermediate)', desc: '일상 대화 가능 / Daily conversation' },
                  { value: 'advanced', label: '고급 (Advanced)', desc: '유창한 의사소통 / Fluent communication' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.level === option.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="level"
                      value={option.value}
                      checked={formData.level === option.value}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                      className="sr-only"
                    />
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* Purpose Selection */}
            <div>
              <label className="block text-lg font-semibold mb-4">학습 목적 / Learning Goal</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'topik', label: 'TOPIK 시험 (TOPIK)', desc: '한국어능력시험 준비 / TOPIK prep' },
                  { value: 'conversation', label: '일상회화 (Conversation)', desc: '자연스러운 대화 / Natural conversation' },
                  { value: 'business', label: '비즈니스 (Business)', desc: '업무용 한국어 / Korean for work' },
                  { value: 'culture', label: '문화 (Culture)', desc: 'K-pop, 드라마 이해 / K-pop & drama' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.purpose === option.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="purpose"
                      value={option.value}
                      checked={formData.purpose === option.value}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value as any })}
                      className="sr-only"
                    />
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* Weekly Hours Selection */}
            <div>
              <label className="block text-lg font-semibold mb-4">주당 가용 시간 / Weekly Study Time</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '1-3', label: '1-3 시간 (1-3 hrs)', desc: '주말 위주 / Mostly weekends' },
                  { value: '4-6', label: '4-6 시간 (4-6 hrs)', desc: '하루 30분-1시간 / 30-60 min daily' },
                  { value: '7-10', label: '7-10 시간 (7-10 hrs)', desc: '하루 1-2시간 / 1-2 hours daily' },
                  { value: '10+', label: '10시간 이상 (10+ hrs)', desc: '집중 학습 / Intensive study' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.weeklyHours === option.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="weeklyHours"
                      value={option.value}
                      checked={formData.weeklyHours === option.value}
                      onChange={(e) => setFormData({ ...formData, weeklyHours: e.target.value as any })}
                      className="sr-only"
                    />
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              다음: 검사 안내 보기 / Next: View Test Guidelines
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
