import React, { Suspense } from 'react';
import AttendanceRedirect from './AttendanceRedirect';
import { Route, Routes } from 'react-router-dom';

//
//
//

const AsyncAttendanceAttend = React.lazy(() => import('./Attend/AttendanceAttend'));
const AsyncAttendanceList = React.lazy(() => import('./List/AttendanceList'));
const AsyncAttendanceReport = React.lazy(() => import('./Report/AttendanceReport'));
const AsyncAttendanceResult = React.lazy(() => import('./Attend/AttendanceAttendResult'));

//
//
//

const AttendanceRoutes = () => {
  //
  //
  //

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/list/generation/:generationId" element={<AsyncAttendanceList />} />
        <Route
          path="/attend/generation/:generationId/session/:sessionId/*"
          element={<AsyncAttendanceAttend />}
        />
        <Route
          path="/attend/generation/:generationId/session/:sessionId/:attendanceType/:status"
          element={<AsyncAttendanceResult />}
        />
        <Route path="/report/generation/:generationId" element={<AsyncAttendanceReport />} />
        <Route path="/report/generation/:generationId/all" element={<AsyncAttendanceAttend />} />
        <Route path="/" element={<AttendanceRedirect />} />
      </Routes>
    </Suspense>
  );
};

export default AttendanceRoutes;
