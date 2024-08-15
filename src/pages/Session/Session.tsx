import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SessionHome from '@pages/Session/SessionHome';
import SessionLayout from '@pages/Session/SessionLayout';

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
