import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function SurveyGuidePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const onboarding = sessionStorage.getItem('onboarding');
    if (!onboarding) {
      navigate('/onboarding');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">검사 안내 / Test Guidelines</h1>
          <p className="text-gray-600 mb-8">
            아래 내용을 읽고 준비가 되면 다음 페이지에서 검사를 시작하세요.
            <br />
            Please read the instructions below, then start the test on the next page.
          </p>

          <ol className="list-decimal pl-6 space-y-4 text-gray-800 leading-relaxed">
            <li>
              이 검사는 학습에 대한 전반적인 접근 방식과 선호 스타일을 확인하기 위한 것입니다.
              <br />
              This test is to check out your general approach to learning and overall style preferences
            </li>
            <li>
              본인의 성향을 가장 잘 나타내는 응답을 선택하세요.
              <br />
              Circle the response that represents your approach
            </li>
            <li>
              문항을 읽을 때, 학습할 때 평소에 어떻게 하는지를 떠올리며 응답하세요.
              <br />
              When you read the statements, try to think about what you generally do when learning
            </li>
            <li>
              각 문항에 너무 오래 고민하지 말고, 처음 드는 느낌에 따라 답한 뒤 다음 문항으로 넘어가세요.
              <br />
              Do not spend too much time on any item - indicate your immediate feeling and move on to
              the next item
            </li>
            <li>
              각 문항에서 본인에게 해당하는 응답을 선택하세요:
              <br />
              For each item, circle your response:
              <div className="mt-2 font-semibold">
                0 = 전혀 아니다 (Never) / 1 = 거의 아니다 (Rarely) / 2 = 가끔 그렇다 (Sometimes) /
                3 = 자주 그렇다 (Often) / 4 = 항상 그렇다 (Always)
              </div>
            </li>
          </ol>

          <div className="flex gap-4 mt-10">
            <button
              type="button"
              onClick={() => navigate('/onboarding')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              기본정보로 돌아가기 / Back to Basic Info
            </button>
            <button
              type="button"
              onClick={() => navigate('/survey')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              검사 시작하기 / Start Test
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
