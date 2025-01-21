import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyPageRouter from './MyPageRouter';
import useUser from '@/hooks/useUser';
import Footer from '@components/Footer';
import styled from 'styled-components';
import { media } from '@theme/media';

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
      <ContentWrapper>
        <MyPageRouter />
      </ContentWrapper>
      <div style={{ padding: '6.25rem' }}>
        <Footer />
      </div>
    </FlexBox>
  );
};

//
//
//

export const FlexBox = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 4.5rem);
  justify-content: space-between;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4.75rem 6.5rem 0rem 6.5rem;
  align-items: center;
  gap: 5.375rem;
  ${media.tablet`
    padding: 2rem;
  `}
`;

export default MyPage;
