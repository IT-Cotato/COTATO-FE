import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@theme/font.css';
import ReactModal from 'react-modal';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { feedbackIntegration } from './sentryFeedbackIntegtation';
import CSRoutes from '@pages/CS/CSRoutes';
import AttendanceRoutes from '@pages/Attendance/Attendance.routes';
import MyPageRouter from '@pages/MyPage/MyPageRouter';
import MyPage from '@pages/MyPage';
import Home from '@pages/Home';

//
// Test Cache
//

Sentry.init({
  dsn: `${process.env.REACT_APP_SENTRY_DSN}`,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration(),
    feedbackIntegration,
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    'localhost',
    /^https:\/\/qa\.beta\.cotato\.kr/,
    /^https:\/\/www\.cotato\.kr/,
  ],
  // Set profilesSampleRate to 1.0 to profile every transaction.
  // Since profilesSampleRate is relative to tracesSampleRate,
  // the final profiling rate can be computed as tracesSampleRate * profilesSampleRate
  // For example, a tracesSampleRate of 0.5 and profilesSampleRate of 0.5 would
  // results in 25% of transactions being profiled (0.5*0.5=0.25)
  profilesSampleRate: 1.0,
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

//
//
//

const AsyncNotFound = lazy(() => import('@components/NotFound'));
const AsyncLogin = lazy(() => import('@pages/Login/Login'));
const AsyncSignUp = lazy(() => import('@pages/JoinUs/SignUp'));
const AsyncProjects = lazy(() => import('@pages/Projects/Projects'));
const AsyncFindPassword = lazy(() => import('@pages/Login/FindPassword/FindPassword'));
const AsyncAbout = lazy(() => import('@pages/About/About'));
const AsyncSession = lazy(() => import('@pages/Session/Session'));
const AsyncFindId = lazy(() => import('@pages/Login/FindId/FindId'));
const AsyncFAQ = lazy(() => import('@pages/FAQ/FAQ'));
const AsyncReadyState = lazy(() => import('@components/ReadyState'));

ReactModal.setAppElement('#root');

const LoadingFallback = () => <div>Loading...</div>;

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/projects', element: withSuspense(AsyncProjects) },
      {
        path: '/attendance',
        children: AttendanceRoutes,
      },
      {
        path: '/mypage',
        element: withSuspense(MyPage),
        children: MyPageRouter,
      },
      { path: '/cs', children: CSRoutes },
      { path: '/about', element: withSuspense(AsyncAbout) },
      { path: '/session/*', element: withSuspense(AsyncSession) },
      { path: '/faq', element: withSuspense(AsyncFAQ) },
      { path: '/findid', element: withSuspense(AsyncFindId) },
      { path: '/findpw', element: withSuspense(AsyncFindPassword) },
      { path: '/joinus', element: withSuspense(AsyncSignUp) },
      { path: '/products', element: withSuspense(AsyncReadyState) },
      { path: '/signin', element: withSuspense(AsyncLogin) },
      { path: '/*', element: withSuspense(AsyncNotFound) },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router} fallbackElement={<LoadingFallback />} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
