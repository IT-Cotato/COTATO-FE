import React from 'react';
import styled from 'styled-components';
import { InfoSection, ProfileCard } from '../components/Mypage';
import { media } from '@theme/media';

//
//
//

const MyPage = () => {
  return (
    <MyPageWrapper>
      <div>Mypage Header</div>
      <ContentContainer>
        <ProfileCard />
        <InfoSection />
      </ContentContainer>
    </MyPageWrapper>
  );
};

export default MyPage;

const MyPageWrapper = styled.div`
  display: flex;
  padding: 4.75rem 6.5rem 0rem 6.5rem;
  flex-direction: column;
  align-items: center;
  gap: 5.375rem;
  width: 100%;
  ${media.tablet`
    padding: 2rem;
  `}
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.25rem;
  width: 100%;
  ${media.tablet`
    flex-direction: column;
  `}
`;
