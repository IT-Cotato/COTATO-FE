import React, { SVGProps } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Insta } from '@/assets/footer_insta.svg';
import { ReactComponent as Youtube } from '@/assets/footer_youtube.svg';
import { ReactComponent as Github } from '@/assets/footer_github.svg';
import { ReactComponent as Cafe } from '@/assets/footer_cafe.svg';
import { media } from '@theme/media';
import { THEME_CHANGE_TRANSITION } from '@theme/constants/constants';

import { useBreakpoints } from '@/hooks/useBreakpoints';

import useCotatoTheme from '@/hooks/useCotatoTheme';

//
//
//

const COTATO_INSTA_URL = 'https://www.instagram.com/cotato_official_?igsh=aDh2ZGZqazBpMmtp';
const COTATO_YOUTUBE_URL = 'https://www.youtube.com/@ITCotato';
const COTATO_GITHUB_URL = 'https://github.com/IT-Cotato';
const COTATO_CAFE_URL = 'https://cafe.naver.com/cotato';

const LOGO_LIST = ['INSTA', 'YOUTUBE', 'GITHUB', 'CAFE'];

const LOGO_COMPONENTS: { [key: string]: React.FunctionComponent<SVGProps<SVGSVGElement>> } = {
  INSTA: Insta,
  YOUTUBE: Youtube,
  GITHUB: Github,
  CAFE: Cafe,
};

const URL_LIST: { [key: string]: string } = {
  INSTA: COTATO_INSTA_URL,
  YOUTUBE: COTATO_YOUTUBE_URL,
  GITHUB: COTATO_GITHUB_URL,
  CAFE: COTATO_CAFE_URL,
};

//
//
//

const HomeFooter = () => {
  const { isTabletOrSmaller } = useBreakpoints();
  const { theme } = useCotatoTheme();

  const renderSns = () => (
    <SnsWrapper>
      {LOGO_LIST.map((logo) => {
        const LogoComponent = LOGO_COMPONENTS[logo];
        return (
          <SnsBackground key={logo} onClick={() => open(URL_LIST[logo])} $theme={theme}>
            <LogoComponent width={isTabletOrSmaller ? '1.5rem' : '2rem'} />
          </SnsBackground>
        );
      })}
    </SnsWrapper>
  );

  const renderDescription = () => (
    <DescriptionWrapper>
      <p>
        <MainText className="sm">Cotato</MainText>
        &nbsp; &nbsp;
        <MainText className="sm">코테이토</MainText>
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

export default HomeFooter;

//
//
//

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0rem 6.25rem 2rem 6.25rem;
  gap: 1rem;
  transition: ${THEME_CHANGE_TRANSITION};

  ${media.laptop`
    padding: 0rem 1.5rem 2rem 1.25rem;
    
  `}
  ${media.mobile`
    padding: 0rem 1.25rem 2rem 1.25rem;
  `}
`;

const SnsWrapper = styled.div`
  display: flex;
  gap: 2.5rem;

  ${media.laptop`
    gap: 2rem;
  `}
  ${media.mobile`
    gap: 1.25rem;
  `}
`;

const SnsBackground = styled.div<{ $theme: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.common.white};
  filter: ${({ $theme }) =>
    $theme === 'light'
      ? 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.25))'
      : 'drop-shadow(0px 0px 15px rgba(255, 255, 255, 0.25))'};
  cursor: pointer;

  ${media.tablet`
    width: 2.5rem;
    height: 2.5rem;
  `}
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainText = styled.span`
  color: ${({ theme }) => theme.colors.gray80};

  &.sm {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
  &.xs {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const SubTextContainer = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  > p {
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.gray80};
    margin: 0;
    > a {
      color: ${({ theme }) => theme.colors.gray80};
    }
  }

  ${media.laptop`
    > p {
      font-size: 0.75rem;
      margin: 0rem;
    }
  `}

  ${media.mobile`
    > p {
      font-size: 0.5rem;
      margin: 0rem;
    }
  `}
`;
