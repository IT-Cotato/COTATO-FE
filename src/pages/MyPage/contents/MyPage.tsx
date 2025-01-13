import React from 'react';
import styled from 'styled-components';
import { InfoSection, ProfileCard } from '../components/Mypage';
import { media } from '@theme/media';

//
//
//

const MyPage = () => {
  return (
    <>
      <div>Mypage Header</div>
      <ContentContainer>
        <ProfileCard />
        <InfoSection />
      </ContentContainer>
    </>
  );
};

//
//
//

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

export default MyPage;
