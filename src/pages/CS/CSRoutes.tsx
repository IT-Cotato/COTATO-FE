import React from 'react';
import { RouteObject, Outlet } from 'react-router-dom';
import CSRedirect from './CSRedirect';
import CSGuard from './CSGuard';

//
//
//

const AsyncCSHome = React.lazy(() => import('./CSHome'));
const AsyncCSManage = React.lazy(() => import('./manage/CSManage'));
const AsyncCSStart = React.lazy(() => import('./CSStart'));
const AsyncCSUpload = React.lazy(() => import('./admin/upload/CSAdminUpload'));
const AsyncCSQuiz = React.lazy(() => import('./solving/CSQuiz'));
const AsyncCSSlide = React.lazy(() => import('./CSSlide'));

//
//
//

const CSLayout = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CSGuard>
        <Outlet />
      </CSGuard>
    </React.Suspense>
  );
};

const CSRoutes: RouteObject[] = [
  {
    element: <CSLayout />,
    children: [
      {
        path: 'introduce',
        element: <AsyncCSSlide />,
      },
      {
        path: ':generationId',
        element: <AsyncCSHome />,
      },
      {
        path: 'manage/*',
        element: <AsyncCSManage />,
      },
      {
        path: 'start/generation/:generationId/education/:educationId',
        element: <AsyncCSStart />,
      },
      {
        path: 'upload/generation/:generationId/education/:educationId',
        element: <AsyncCSUpload />,
      },
      {
        path: 'solving/:educationId',
        element: <AsyncCSQuiz />,
      },
      {
        path: '',
        element: <CSRedirect />,
      },
    ],
  },
];

export default CSRoutes;
