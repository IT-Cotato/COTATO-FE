import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Insta } from '@/assets/footer_insta.svg';
import { ReactComponent as Youtube } from '@/assets/footer_youtube.svg';
import { ReactComponent as Github } from '@/assets/footer_github.svg';
import { ReactComponent as Cafe } from '@/assets/footer_cafe.svg';
import { media } from '@theme/media';
import { CotatoThemeType } from '@theme/theme';
import { THEME_CHANGE_TRANSITION } from '@theme/constants/constants';

//
//
//

const COTATO_INSTA_URL = 'https://www.instagram.com/cotato_official_?igsh=aDh2ZGZqazBpMmtp';
const COTATO_YOUTUBE_URL = 'https://www.youtube.com/@ITCotato';
const COTATO_GITHUB_URL = 'https://github.com/IT-Cotato';
const COTATO_CAFE_URL = 'https://cafe.naver.com/cotato';

//
//
//

const Footer = () => {
  const renderSns = () => (
    <SnsWrapper>
      <SnsBackground onClick={() => open(COTATO_INSTA_URL)}>
        <Insta />
      </SnsBackground>
      <SnsBackground onClick={() => open(COTATO_YOUTUBE_URL)}>
        <Youtube />
      </SnsBackground>
      <SnsBackground onClick={() => open(COTATO_GITHUB_URL)}>
        <Github />
      </SnsBackground>
      <SnsBackground onClick={() => open(COTATO_CAFE_URL)}>
        <Cafe />
      </SnsBackground>
    </SnsWrapper>
  );

  const renderDescription = () => (
    <DescriptionWrapper>
      <p>
        <MainText className="lg">Cotato</MainText>
        &nbsp; &nbsp;
        <MainText className="md">코테이토</MainText>
      </p>
      <SubTextContainer>
        <p>
          E-mail. <a href="mailto:itcotato@gmail.com">itcotato@gmail.com</a>
        </p>
        <p>© Cotato. 2024 All rights reserved. | 대학생 IT 연합 동아리 코테이토</p>
        <p>Cotato 2024 HomePage v1.0</p>
      </SubTextContainer>
    </DescriptionWrapper>
  );

  return (
    <FooterWrapper>
      {renderSns()}
      {renderDescription()}
    </FooterWrapper>
  );
};

export default Footer;

//
//
//

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: 6.25rem 6.25rem 3.125rem 6.25rem;
  gap: 6.25rem;
  background-color: ${({ theme }) => theme.colors.common.white};
  transition: ${THEME_CHANGE_TRANSITION};
  ${media.laptop`
    padding: 6.25rem 3.125rem 3.125rem 3.125rem;
  `}
  ${media.tablet`
    padding: 1.5rem 1.5rem 1.5rem 0;
    gap: 1.5rem;
  `}
  ${media.mobile`
    padding: 6.25rem 1.25rem 3.125rem 1.25rem;
    gap: 1rem;
  `}
`;

const SnsWrapper = styled.div`
  display: flex;
  gap: 2.5rem;

  ${media.tablet`
    gap: 2rem;
  `}
  ${media.mobile`
    gap: 0.5rem;
  `}
`;

const SnsBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.common.white};
  filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.25));
  cursor: pointer;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const MainText = styled.span`
  color: ${({ theme }) => theme.colors.gray80};

  &.md {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
  &.lg {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const SubTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.gray80};
    line-height: 180%;

    > a {
      color: ${({ theme }) => theme.colors.gray80};
    }
  }

  ${media.tablet`
    > p {
      font-size: ${({ theme }: { theme: CotatoThemeType }) => theme.fontSize.xs};
      margin: 0rem;
    }
  `}
`;
