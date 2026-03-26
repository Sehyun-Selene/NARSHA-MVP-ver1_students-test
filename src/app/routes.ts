import { createBrowserRouter } from 'react-router';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import SurveyGuidePage from './pages/SurveyGuidePage';
import SurveyPage from './pages/SurveyPage';
import ResultsPage from './pages/ResultsPage';
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/onboarding',
    Component: OnboardingPage,
  },
  {
    path: '/survey-guide',
    Component: SurveyGuidePage,
  },
  {
    path: '/survey',
    Component: SurveyPage,
  },
  {
    path: '/results',
    Component: ResultsPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);