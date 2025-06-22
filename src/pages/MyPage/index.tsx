import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useUser from '@/hooks/useUser';
import Footer from '@components/Footer';
import styled from 'styled-components';
import { media } from '@theme/media';

//
//
//

const MyPage = () => {
  const { user, isUserLoading } = useUser();
  const navigate = useNavigate();

  //
  //
  //
  useEffect(() => {
    if (!user && !isUserLoading) {
      navigate('/');
    }
  }, [user, isUserLoading, navigate]);

  return (
    <FlexBox>
      <ContentWrapper>
        <Outlet />
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
