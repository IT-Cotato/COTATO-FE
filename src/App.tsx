import React from 'react';
import './App.css';
import { Routes, Route, useLocation, useMatch } from 'react-router-dom';
import Header from '@components/Header';
import Home from '@pages/Home/Home';
import Login from '@pages/Login/Login';
import Session from '@pages/Session/Session';
import SignUp from '@pages/JoinUs/SignUp';
import MyPage from '@pages/MyPage';
import { GlobalStyle } from '@theme/GlobalStyle';
import FindID from '@pages/Login/FindId/FindId';
import FindPassword from '@pages/Login/FindPassword/FindPassword';
import ReadyState from '@components/ReadyState';
import NotFound from '@components/NotFound';
import CotatoThemeProvider from '@theme/context/CotatoThemeProvider';
import { FAQ } from '@pages/FAQ';
import { CotatoGlobalFab } from '@components/CotatoGlobalFab';
import Projects from '@pages/Projects/Projects';
import AttendanceRoutes from '@pages/Attendance/Attendance.routes';
import { AttendanceFab } from '@components/attendance/attendance-fab';
import AgreementConfirmDialog from '@components/AgreementConfirmDialog';
import CSRoutes from '@pages/CS/CSRoutes';
import { About } from '@pages/About';
import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/dist/style.css';
import { ToastContainer } from 'react-toastify';
import Background from '@components/Background';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function App() {
  //
  const location = useLocation();
  const isInHome = location.pathname === '/';

  //
  const isInAttendanceList = useMatch('/attendance/list/generation/:generationId');

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

  //
  //
  //

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <CotatoThemeProvider>
          <GlobalStyle />
          <ToastContainer position="bottom-right" autoClose={3000} />
          <Background />

          <Header />
          <AgreementConfirmDialog />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/attendance/*" element={<AttendanceRoutes />} />
            <Route path="/cs/*" element={<CSRoutes />} />
            <Route path="/about" element={<About />} />
            <Route path="/session/*" element={<Session />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/findid" element={<FindID />} />
            <Route path="/findpw" element={<FindPassword />} />
            <Route path="/joinus" element={<SignUp />} />
            <Route path="/mypage/*" element={<MyPage />} />
            <Route path="/products" element={<ReadyState />} />
            <Route path="/projects" element={<ReadyState />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>

          {isInAttendanceList ? <AttendanceFab /> : <CotatoGlobalFab />}
        </CotatoThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
