import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  AccountDeletion,
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
  POLICY: {
    INFO: 'policy',
    DELETION: 'delete',
  },
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
      <Route path={MY_PAGE_PATH.POLICY.INFO} element={<PolicyCheck />} />
      <Route
        path={`${MY_PAGE_PATH.POLICY.INFO}/${MY_PAGE_PATH.POLICY.DELETION}`}
        element={<AccountDeletion />}
      />
      <Route path={MY_PAGE_PATH.YEAR} element={<YearManagement />} />
      <Route path={MY_PAGE_PATH.MEMBERS} element={<MemberManagement />} />
      <Route path={MY_PAGE_PATH.REGISTRATION} element={<RegistrationManagement />} />
    </Routes>
  );
};

export default MyPageRouter;
