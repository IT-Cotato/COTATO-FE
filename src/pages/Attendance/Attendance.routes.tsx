import React, { Suspense } from 'react';
import AttendanceRedirect from './AttendanceRedirect';
import { Outlet, RouteObject } from 'react-router-dom';

//
//
//

const AsyncAttendanceAttend = React.lazy(() => import('./Attend/AttendanceAttend'));
const AsyncAttendanceList = React.lazy(() => import('./List/AttendanceList'));
const AsyncAttendanceReport = React.lazy(() => import('./Report/AttendanceReport'));
const AsyncAttendanceResult = React.lazy(() => import('./Attend/AttendanceAttendResult'));
const AsyncAttendanceReportAll = React.lazy(() => import('./Report/AttendanceReportAll'));

//
//
//

const AttendanceLayout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  );
};

// Route configuration
const AttendanceRoutes: RouteObject[] = [
  {
    element: <AttendanceLayout />,
    children: [
      {
        path: 'list/generation/:generationId',
        element: <AsyncAttendanceList />,
      },
      {
        path: 'attend/generation/:generationId/session/:sessionId/*',
        element: <AsyncAttendanceAttend />,
      },
      {
        path: 'attend/generation/:generationId/session/:sessionId/:attendanceType/:status',
        element: <AsyncAttendanceResult />,
      },
      {
        path: 'report/generation/:generationId/session/:sessionId/attendance/:attendanceId',
        element: <AsyncAttendanceReport />,
      },
      {
        path: 'report/generation/:generationId/all',
        element: <AsyncAttendanceReportAll />,
      },
      {
        path: '',
        element: <AttendanceRedirect />,
      },
    ],
  },
];

export default AttendanceRoutes;
