import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyPageRouter from './route';
import useUser from '@/hooks/useUser';

const MyPage = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  //로그인 되어있지 않다면 홈으로 리다이렉트
  if (user) {
    navigate('/');
  }

  return <MyPageRouter />;
};

export default MyPage;
