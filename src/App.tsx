import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from '@components/Header';
import Home from '@pages/Home/Home';
import Login from '@pages/Login/Login';
import SessionHome from '@pages/Session/SessionHome';
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

function App() {
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
          <Route path="/projects" element={<ReadyState />} />
          <Route path="/about" element={<ReadyState />} />
          <Route path="/products" element={<ReadyState />} />
          <Route path="/cs/*" element={<CSPage />} />
          <Route path="/session" element={<SessionHome />} />
          <Route path="/faq" element={<ReadyState />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/findid" element={<FindID />} />
          <Route path="/findpw" element={<FindPWProcess />} />
          <Route path="/joinus" element={<SignUp />} />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {window.location.pathname !== '/' && <Footer />}
      </CotatoThemeProvider>
    </div>
  );
}

export default App;
