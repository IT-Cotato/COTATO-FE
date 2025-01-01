import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MY_PAGE_PATH } from '../MyPageRouter';

//
//
//

const MyPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      Mypage
      <button onClick={() => navigate(MY_PAGE_PATH.POLICY)}>policy</button>
      <button onClick={() => navigate(MY_PAGE_PATH.YEAR)}>year</button>
      <button onClick={() => navigate(MY_PAGE_PATH.MEMBERS)}>members</button>
      <button onClick={() => navigate(MY_PAGE_PATH.REGISTRATION)}>registration</button>
    </div>
  );
};

export default MyPage;
