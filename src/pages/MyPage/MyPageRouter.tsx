import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  MemberManagement,
  MyPage,
  PolicyCheck,
  RegistrationManagement,
  YearManagement,
} from './contents';

//
//
//

export const MY_PAGE_PATH = {
  MYPAGE: '',
  POLICY: 'policy',
  YEAR: 'year',
  MEMBERS: 'members',
  REGISTRATION: 'registration',
} as const;

//
//
//

const MyPageRouter = () => {
  return (
    <Routes>
      <Route path={MY_PAGE_PATH.MYPAGE} element={<MyPage />} />
      <Route path={MY_PAGE_PATH.POLICY} element={<PolicyCheck />} />
      <Route path={MY_PAGE_PATH.YEAR} element={<YearManagement />} />
      <Route path={MY_PAGE_PATH.MEMBERS} element={<MemberManagement />} />
      <Route path={MY_PAGE_PATH.REGISTRATION} element={<RegistrationManagement />} />
    </Routes>
  );
};

export default MyPageRouter;
