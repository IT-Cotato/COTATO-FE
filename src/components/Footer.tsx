import React, { SVGProps } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Insta } from '@/assets/footer_insta.svg';
import { ReactComponent as Youtube } from '@/assets/footer_youtube.svg';
import { ReactComponent as Github } from '@/assets/footer_github.svg';
import { ReactComponent as Cafe } from '@/assets/footer_cafe.svg';
import { device, media } from '@theme/media';
import { THEME_CHANGE_TRANSITION } from '@theme/constants/constants';
import { useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';

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

const Footer = () => {
  //
  const location = useLocation();
  const isInHome = location.pathname === '/';
  const isInCsIntroduce = location.pathname === '/cs/introduce';

  const isTablet = useMediaQuery(`(max-width: ${device.tablet})`);
  const isLandScape = useMediaQuery(`(max-width: ${device.landscape})`);
  const isMobile = useMediaQuery(`(max-width: ${device.mobile})`);

  const renderSns = () => (
    <SnsWrapper>
      {LOGO_LIST.map((logo) => {
        const LogoComponent = LOGO_COMPONENTS[logo];
        return (
          <SnsBackground key={logo} onClick={() => open(URL_LIST[logo])}>
            <LogoComponent
              width={isMobile ? '2rem' : isLandScape ? '2.25rem' : isTablet ? '3rem' : '4rem'}
            />
          </SnsBackground>
        );
      })}
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

  return isInHome || isInCsIntroduce ? null : (
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
  width: 100%;
  padding: 5rem 6.25rem 1.5rem 6.25rem;
  gap: 1rem;
  transition: ${THEME_CHANGE_TRANSITION};
  ${media.laptop`
    padding: 3rem 3.125rem 1.5rem 3.125rem;
  `}
  ${media.tablet`
    padding: 3rem 1.5rem 1.5rem 1.25rem;
    
  `}
  ${media.mobile`
    padding:  3rem 1.25rem 1.5rem 1.25rem;
    
  `}
`;

const SnsWrapper = styled.div`
  display: flex;
  gap: 2.5rem;

  ${media.tablet`
    gap: 2rem;
  `}
  ${media.mobile`
    gap: 1.25rem;
  `}
`;

const SnsBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.common.white};
  filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.25));
  cursor: pointer;

  ${media.tablet`
    width: 4rem;
    height: 4rem;
  `}

  ${media.landscape`
    width: 3.5rem;
    height: 3.5rem;
  `}

  ${media.mobile`
    width: 3rem;
    height: 3rem;
  `}
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

  ${media.tablet`
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
