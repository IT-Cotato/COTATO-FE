import React, { Suspense } from 'react';
import AttendanceRedirect from './AttendanceRedirect';
import { Route, Routes } from 'react-router-dom';

//
//
//

const AsyncAttendanceAttend = React.lazy(() => import('./Attend/AttendanceAttend'));
const AsyncAttendanceList = React.lazy(() => import('./List/AttendanceList'));
const AsyncAttendanceReport = React.lazy(() => import('./Report/AttendanceReport'));

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
        <Route path="/attend/*" element={<AsyncAttendanceAttend />} />
        <Route path="/report/:generationId" element={<AsyncAttendanceReport />} />
        <Route path="/" element={<AttendanceRedirect />} />
      </Routes>
    </Suspense>
  );
};

export default AttendanceRoutes;
