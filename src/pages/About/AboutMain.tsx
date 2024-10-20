import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as HeaderTag } from '@assets/header_tag.svg';
import { ReactComponent as SpeachBubble } from '@assets/about_us_speach_bubble.svg';
import { ReactComponent as LaptopCotato } from '@assets/character_laptop_laugh.svg';
import { ReactComponent as CotaoLogo } from '@assets/cotato_logo.svg';
import { media } from '@theme/media';
import { useBreakpoints } from '@/hooks/useBreakpoints';

//
//
//

const AboutMain = () => {
  const { isLandScapeOrSmaller } = useBreakpoints();

  return (
    <Wrapper>
      <Title>
        <HeaderTag />
        <h1>About Us</h1>
      </Title>
      <MainContent>
        <DescriptionBox>
          <SpeachBubble />
          <span>{`"연합 IT 동아리 성장하는 감자들이 모인 곳"`}</span>
        </DescriptionBox>
        <StyledLogo />
        <StyledCharacter />
      </MainContent>
      <Description>
        {isLandScapeOrSmaller ? (
          <>
            <p>2022년부터 시작된 코테이토는</p>
            <p>성실하게 참여해준 코테이토 감자들 덕분에</p>
            <p>연합 IT 동아리 명맥을 유지하고 있습니다!</p>
          </>
        ) : (
          <>
            <p>2022년도부터 시작된 코테이토는 성실하게 참여해준</p>
            <p>코테이토 감자들 덕분에 연합 IT 동아리 명맥을 유지하고 있습니다!</p>
          </>
        )}
      </Description>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  padding: 4rem 0;
`;

const Title = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 12rem;
  padding-top: 0.875rem;

  > svg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
    width: 12rem;
  }

  > h1 {
    color: ${({ theme }) => theme.colors.gray100};
    font-family: Ycomputer;
    font-size: 2rem;
    font-weight: 400;
    margin: 0;
  }

  ${media.tablet`
    width: 10rem;
    padding-top: 1.25rem;

    > svg {
      width: 10rem;
    }

    > h1 {
      font-size: 1.5rem;
    }
  `}
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DescriptionBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 30rem;
  height: 5.875rem;
  padding-top: 2.375rem;

  > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 0;
  }

  > span {
    color: ${({ theme }) => theme.colors.gray90};
    font-family: Ycomputer;
    font-size: 1.5rem;
    font-weight: 400;
    z-index: 1;
  }

  ${media.tablet`
    width: 20rem;
    padding-top: 2.875rem;

    > span {
      font-size: 1rem;
    }
  `}
`;

const StyledLogo = styled(CotaoLogo)`
  ${media.tablet`
    width: 18rem;
  `}
`;

const StyledCharacter = styled(LaptopCotato)`
  margin-top: -2rem;
  z-index: -1;

  ${media.tablet`
    width: 8rem;
    margin-top: -3.5rem;
  `}
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;

  > p {
    color: ${({ theme }) => theme.colors.common.black};
    font-family: Ycomputer;
    font-size: 2rem;
    font-weight: 400;
    margin: 0.5rem 0;
  }

  ${media.laptop`
    > p {
      font-size: 1.75rem;
    }
  `}

  ${media.tablet`
    > p {
      font-size: 1.25rem;
      margin: 0.125rem 0;
    }
  `}

  ${media.mobile`
    > p {
      font-size: 1.125rem;
    }
  `}
`;

export default AboutMain;
