import React from 'react';
import { Route, Routes } from 'react-router-dom';
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

//
//
//

const CSRoutes = () => {
  //
  //
  //

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CSGuard>
        <Routes>
          <Route path="/:generationId" element={<AsyncCSHome />} />
          <Route path="/manage/*" element={<AsyncCSManage />} />
          <Route
            path="/start/generation/:generationId/education/:educationId"
            element={<AsyncCSStart />}
          />
          <Route
            path="/upload/generation/:generationId/education/:educationId"
            element={<AsyncCSUpload />}
          />
          <Route path="/solving/:educationId" element={<AsyncCSQuiz />} />
          <Route path="*" element={<CSRedirect />} />
        </Routes>
      </CSGuard>
    </React.Suspense>
  );
};

export default CSRoutes;
