import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SessionHome from '@pages/Session/_SessionHome';
import SessionLayout from '@pages/Session/_SessionLayout';

//
//
//

const Session = () => {
  return (
    <SessionLayout>
      <Routes>
        <Route path="/" element={<SessionHome />} />
      </Routes>
    </SessionLayout>
  );
};

export default Session;
