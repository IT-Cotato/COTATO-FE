import React from 'react';
import styled from 'styled-components';
import { InfoSection, ProfileCard } from '../components/Mypage';
import { media } from '@theme/media';
import CotatoPanel from '@components/CotatoPanel';
import MyPageImage from '@/pages/MyPage/tempAsssets/Text/MyPage.svg';
import { Header } from './style';

//
//
//

const MyPage = () => {
  return (
    <>
      <Header>
        <CotatoPanel size={'default'} textImgSrc={MyPageImage} />
      </Header>
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
