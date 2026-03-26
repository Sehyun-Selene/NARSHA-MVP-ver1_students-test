import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PARTS, SCALE } from '../data/questions.js';
import { SurveyResponse } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type FlatQuestion = {
  id: string;
  text: string;
  textEn?: string;
  partId: string;
  partTitle: string;
};

export default function SurveyPage() {
  const navigate = useNavigate();
  const flatQuestions = useMemo<FlatQuestion[]>(
    () =>
      PARTS.flatMap((part) =>
        part.groups.flatMap((group) =>
          group.questions.map((q) => ({
            id: q.id,
            text: q.text,
            textEn: q.textEn,
            partId: part.id,
            partTitle: part.title,
          }))
        )
      ),
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const onboarding = sessionStorage.getItem('onboarding');
    if (!onboarding) {
      navigate('/onboarding');
    }
  }, [navigate]);

  const currentQuestion = flatQuestions[currentIndex];
  const progress = ((currentIndex + 1) / flatQuestions.length) * 100;
  const currentResponse = currentQuestion ? responses.get(currentQuestion.id) : undefined;

  const handleResponse = (score: number) => {
    if (!currentQuestion) return;
    const newResponses = new Map(responses);
    newResponses.set(currentQuestion.id, score);
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (!currentQuestion) return;
    if (currentIndex < flatQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const responsesArray: SurveyResponse[] = Array.from(responses.entries()).map(
        ([questionId, score]) => ({ questionId, score })
      );
      sessionStorage.setItem('responses', JSON.stringify(responsesArray));
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const canProceed = currentResponse !== undefined;
  const scaleEnMap: Record<number, string> = {
    0: 'Never',
    1: 'Rarely',
    2: 'Sometimes',
    3: 'Often',
    4: 'Always',
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">{currentQuestion.partTitle}</span>
            <span className="text-sm font-semibold text-gray-600">
              {currentIndex + 1} / {flatQuestions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-2">문항 / Item</p>
            <p className="text-xl font-semibold text-gray-900">{currentQuestion.text}</p>
            {currentQuestion.textEn && (
              <p className="text-gray-700 mt-2">{currentQuestion.textEn}</p>
            )}
          </div>

          <div className="space-y-3">
            {SCALE.map((option) => (
              <label
                key={option.value}
                className={`block border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  currentResponse === option.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="response"
                  value={option.value}
                  checked={currentResponse === option.value}
                  onChange={() => handleResponse(option.value)}
                  className="sr-only"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {option.label} ({scaleEnMap[option.value]})
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                    {currentResponse === option.value && (
                      <div className="w-4 h-4 rounded-full bg-blue-600" />
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            이전 / Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentIndex === flatQuestions.length - 1 ? '결과 보기 / View Results' : '다음 / Next'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
