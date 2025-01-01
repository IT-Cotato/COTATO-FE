import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyPageRouter from './MyPageRouter';
import useUser from '@/hooks/useUser';
import Footer from '@components/Footer';
import styled from 'styled-components';

//
//
//

const MyPage = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  //로그인 되어있지 않다면 홈으로 리다이렉트
  if (!user) {
    navigate('/');
  }

  return (
    <FlexBox>
      <MyPageRouter />
      <Footer />
    </FlexBox>
  );
};

export default MyPage;

//
//
//

export const FlexBox = styled.div`
  display: flex;
  min-height: calc(100vh - 4.5rem); //이게맞나?
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;
