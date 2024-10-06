import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '@components/Header';
import Home from '@pages/Home/Home';
import Login from '@pages/Login/Login';
import Session from '@pages/Session/Session';
import SignUp from '@pages/JoinUs/SignUp';
import MyPage from '@pages/MyPage/MyPage';
import { GlobalStyle } from '@theme/GlobalStyle';
import FindID from '@pages/Login/FindID';
import FindPWProcess from '@pages/Login/FindPWProcess';
import ReadyState from '@components/ReadyState';
import NotFound from '@components/NotFound';

import CotatoThemeProvider from '@theme/context/CotatoThemeProvider';
import GlobalBackgroundSvgComponent from '@components/GlobalBackgroundSvgComponent';
import { FAQ } from '@pages/FAQ';
import { CotatoGlobalFab } from '@components/CotatoGlobalFab';
import Projects from '@pages/Projects/Projects';
import AttendanceRoutes from '@pages/Attendance/Attendance.routes';
import { AttendanceFab } from '@components/attendance/attendance-fab';
import AgreementConfirmDialog from '@components/AgreementConfirmDialog';
import CSRoutes from '@pages/CS/CSRoutes';
import { About } from '@pages/About';

function App() {
  const location = useLocation();

  const isInHome = location.pathname === '/';
  const isAttendance = location.pathname.includes('/attendance');
  //
  //
  //
  React.useEffect(() => {
    if (isInHome) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isInHome]);

  console.log(
    'api',
    process.env.REACT_APP_BASE_URL,
    'qa',
    process.env.REACT_APP_QA_BASE_URL,
    process.env.REACT_APP_SOCKET_URL,
  );

  //
  //
  //

  return (
    <div className="App">
      <CotatoThemeProvider>
        <GlobalStyle />
        <Header />
        <AgreementConfirmDialog />
        <GlobalBackgroundSvgComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/attendance/*" element={<AttendanceRoutes />} />
          <Route path="/cs/*" element={<CSRoutes />} />
          <Route path="/session/*" element={<Session />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/findid" element={<FindID />} />
          <Route path="/findpw" element={<FindPWProcess />} />
          <Route path="/joinus" element={<SignUp />} />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/products" element={<ReadyState />} />
          <Route path="/projects" element={<ReadyState />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {isAttendance ? <AttendanceFab /> : <CotatoGlobalFab />}
      </CotatoThemeProvider>
    </div>
  );
}

export default App;
