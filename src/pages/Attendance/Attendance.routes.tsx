import React from 'react';
import { Route, Routes } from 'react-router';

//
//
//

const AsyncAttendanceList = React.lazy(() => import('./Attend/AttendanceAttend'));
const AsyncAttendanceAttend = React.lazy(() => import('./List/AttendanceList'));
const AsyncAttendanceReport = React.lazy(() => import('./Report/AttendanceReport'));

//
//
//

const AttendanceRoutes = () => {
  return (
    <Routes>
      <Route path="/attendance/list" element={<AsyncAttendanceList />} />
      <Route path="/attendance/attend/*" element={<AsyncAttendanceAttend />} />
      <Route path="/attendance/report/:generationId" element={<AsyncAttendanceReport />} />
    </Routes>
  );
};

export default AttendanceRoutes;