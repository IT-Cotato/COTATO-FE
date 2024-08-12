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
import Footer from '@components/Footer';
import FindID from '@pages/Login/FindID';
import FindPWProcess from '@pages/Login/FindPWProcess';
import ReadyState from '@components/ReadyState';
import NotFound from '@components/NotFound';
import CSPage from '@pages/CS/CSPage';

import CotatoThemeProvider from '@theme/context/CotatoThemeProvider';
import GlobalBackgroundSvgComponent from '@components/GlobalBackgroundSvgComponent';
import { FAQ } from '@pages/FAQ';
import { CotatoGlobalFab } from '@components/CotatoGlobalFab';
import AttendanceRoutes from '@pages/Attendance/Attendance.routes';

function App() {
  const location = useLocation();
  const isInHome = location.pathname === '/';

  //
  //
  //

  return (
    <div className="App">
      <CotatoThemeProvider>
        <GlobalStyle />
        <Header />
        <GlobalBackgroundSvgComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/about" element={<ReadyState />} />
          <Route path="/attendance/*" element={<AttendanceRoutes />} />
          <Route path="/cs/*" element={<CSPage />} />
          <Route path="/session/*" element={<Session />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/findid" element={<FindID />} />
          <Route path="/findpw" element={<FindPWProcess />} />
          <Route path="/joinus" element={<SignUp />} />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/products" element={<ReadyState />} />
          <Route path="/projects" element={<ReadyState />} />
          <Route path="/signin" element={<Login />} />
        </Routes>
        {isInHome ? null : <Footer />}
        <CotatoGlobalFab />
      </CotatoThemeProvider>
    </div>
  );
}

export default App;
