import { Link } from 'react-router';
import { BookOpen, Target, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            한국어 교육 온라인 플랫폼
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            당신에게 맞는 학습 방법을 찾아드립니다.<br />
            학습 유형 검사를 통해 최적화된 커리큘럼을 추천받으세요.
          </p>
          <Link
            to="/onboarding"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            내 학습 유형 알아보기
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">맞춤형 추천</h3>
            <p className="text-gray-600">
              46개 문항의 학습 유형 검사를 통해 당신에게 가장 적합한 학습 자원을 추천해드립니다.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">목적별 학습</h3>
            <p className="text-gray-600">
              TOPIK 시험, 일상회화, 비즈니스, 문화 등 당신의 학습 목적에 맞는 커리큘럼을 제공합니다.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">효율적인 학습</h3>
            <p className="text-gray-600">
              산재된 학습 자원들을 정리하여 당신의 수준과 스타일에 맞는 최적의 학습 경로를 안내합니다.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8">어떻게 작동하나요?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold mb-2">기본 정보 입력</h4>
              <p className="text-sm text-gray-600">현재 수준과 학습 목적을 알려주세요</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold mb-2">학습 유형 검사</h4>
              <p className="text-sm text-gray-600">46개 문항으로 당신의 학습 스타일 파악</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold mb-2">결과 확인</h4>
              <p className="text-sm text-gray-600">6가지 유형 중 당신의 유형 발견</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h4 className="font-semibold mb-2">맞춤 추천</h4>
              <p className="text-sm text-gray-600">최적화된 커리큘럼 3순위 추천</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">회원가입 없이 바로 시작하세요</p>
          <Link
            to="/onboarding"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            시작하기
          </Link>
        </div>
      </div>
    </div>
  );
}
