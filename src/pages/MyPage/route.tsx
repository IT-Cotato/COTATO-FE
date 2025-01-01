import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MyPage from '@pages/MyPage/MyPage';

const MyPageRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MyPage />} />
    </Routes>
  );
};

export default MyPageRouter;
