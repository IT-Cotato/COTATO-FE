import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MY_PAGE_PATH } from '../MyPageRouter';
import useUser from '@/hooks/useUser';
import ProfileCard from '../components/ProfileCard';

//
//
//

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>Mypage Header</div>
      <div>
        <ProfileCard />
        <div>
          <div>Acount Info Section</div>
          <div>Cotato Management Section</div>
        </div>
      </div>
      <div>
        <button onClick={() => navigate(MY_PAGE_PATH.POLICY)}>policy</button>
        <button onClick={() => navigate(MY_PAGE_PATH.YEAR)}>year</button>
        <button onClick={() => navigate(MY_PAGE_PATH.MEMBERS)}>members</button>
        <button onClick={() => navigate(MY_PAGE_PATH.REGISTRATION)}>registration</button>
      </div>
    </>
  );
};

export default MyPage;
