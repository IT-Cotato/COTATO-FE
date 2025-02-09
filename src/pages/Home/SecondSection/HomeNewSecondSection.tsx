/* eslint-disable react/jsx-key */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeSecondSectionCard from './HomeSecondSectionCard';

import itLight from '@assets/it_light.svg';
import itDark from '@assets/it_dark.svg';
import csLight from '@assets/cs_light.svg';
import csDark from '@assets/cs_dark.svg';
import networkLight from '@assets/network_light.svg';
import networkDark from '@assets/network_dark.svg';
import hackathonLight from '@assets/hackathon_light.svg';
import hackathonDark from '@assets/hackathon_dark.svg';
import devtalkLight from '@assets/devtalk_light.svg';
import devtalkDark from '@assets/devtalk_dark.svg';
import demodayLight from '@assets/demoday_light.svg';
import demodayDark from '@assets/demoday_dark.svg';

import styled from 'styled-components';
import { media } from '@theme/media';
import { CotatoLightTheme, CotatoThemeType } from '@theme/theme';
import { FreeMode } from 'swiper/modules';
import { ThemeContext } from '@theme/context/CotatoThemeProvider';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import HomeNewSecondSectionMobileSwiper from './HomeNewSecondSectionMobileSwiper';
import CotatoIcon from '@components/CotatoIcon';
import { Stack } from '@mui/material';

//
//
//

export const LIGHT_ASSETS = [
  itLight,
  csLight,
  networkLight,
  hackathonLight,
  devtalkLight,
  demodayLight,
];

export const DARK_ASSETS = [itDark, csDark, networkDark, hackathonDark, devtalkDark, demodayDark];

export const CARD_INFOS = [
  { title: 'IT 이슈', description: '각 팀별로 최신 IT 이슈에 대해 조사하고 발표합니다.' },
  {
    title: 'CS 교육',
    description: '개발자, 기획자, 디자이너에게 도움이 될 다양한 주제의 CS 지식을 배웁니다.',
  },
  {
    title: '네트워킹',
    description: '각 파트별로 네트워킹 시간을 가지며 관련 정보와 지식을 공유합니다.',
  },
  { title: '해커톤', description: '무박 2일 간 단기 프로젝트를 통해 IT 서비스를 제작합니다. ' },
  { title: '데브토크', description: '코테이토 출신 현업자 분을 초청해 강연을 진행합니다.' },
  {
    title: '데모데이',
    description: '주제별로 6개월 간 진행한 스터디와 프로젝트에서 각자 완성한 결과물을 발표합니다.',
  },
];

const StyledStack = styled(Stack)<{
  bgColor: [keyof (typeof CotatoLightTheme)['colors'], string?] | undefined;
}>`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, bgColor }) => {
    if (!bgColor) return 'transparent'; // bgColor가 없을 경우 투명색

    const [firstKey, secondKey] = bgColor;
    // 첫 번째 키가 존재하고, 두 번째 키가 있을 경우
    if (secondKey && typeof theme.colors[firstKey] === 'object') {
      return (
        theme.colors[firstKey][secondKey as keyof (typeof theme.colors)[typeof firstKey]] ||
        'transparent'
      );
    }
    // 첫 번째 키만 있을 경우
    return theme.colors[firstKey] || 'transparent';
  }};
  border-radius: 50%;
`;

export const ICON_ASSETS = [
  <StyledStack bgColor={['primary100_2']}>
    <CotatoIcon icon="globe" />
  </StyledStack>,
  <StyledStack bgColor={['secondary70']}>
    <CotatoIcon icon="pencil" />
  </StyledStack>,
  <StyledStack bgColor={['sub1', '60']}>
    <CotatoIcon icon="chart-network" />
  </StyledStack>,
  <StyledStack bgColor={['sub2', '60']}>
    <CotatoIcon icon="trophy" />
  </StyledStack>,
  <StyledStack bgColor={['sub3', '60']}>
    <CotatoIcon icon="comments" />
  </StyledStack>,
  <StyledStack bgColor={['sub1', '40']}>
    <CotatoIcon icon="seedlings" />
  </StyledStack>,
];

//
//
//

const HomeNewSecondSection = () => {
  const { isLandScapeOrSmaller } = useBreakpoints();

  const { DefaultTheme } = React.useContext(ThemeContext);

  /**
   *
   */
  const renderDesktopSwiper = () => {
    return (
      <StyledSwiper freeMode={true} slidesPerView="auto" spaceBetween={25} modules={[FreeMode]}>
        {Array.from({ length: 6 }).map((_, index) => (
          <StyledSwiperSlide key={`home-section-two-slide-${index}`}>
            <HomeSecondSectionCard
              imgSrc={DefaultTheme === 'light' ? LIGHT_ASSETS[index] : DARK_ASSETS[index]}
              title={CARD_INFOS[index].title}
              description={CARD_INFOS[index].description}
              icon={ICON_ASSETS[index]}
            />
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
    );
  };

  //
  //
  //

  return (
    <Wrapper>
      <Title>
        <h1>WHAT WE DO</h1>
        <p>코테이토의 활동을 소개할게요!</p>
      </Title>
      {isLandScapeOrSmaller ? <HomeNewSecondSectionMobileSwiper /> : renderDesktopSwiper()}
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.tablet`
    padding: 5rem 0;
    justify-content: flex-start;
  `}
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 200px;
    height: 40px;
  }
  h1 {
    font-size: 3rem;
    margin: 0;
    color: ${({ theme }) => theme.colors.gray80_2};
  }
  p {
    margin-top: 1rem;
    margin-bottom: 2rem;
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray80_2};
    font-family: 'Pretendard';
  }

  ${media.tablet`
    p {
      font-size: ${({ theme }: { theme: CotatoThemeType }) => theme.fontSize.md};
    }
  `}
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100vh;
  padding-left: 6rem;
  padding-right: 6rem;
  padding-top: 0.5rem;

  ${media.tablet`
    padding-left: 4rem;
    padding-right: 4rem;
  `}
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 21rem;
  &:nth-child(even) {
    margin-top: 4rem;
  }
  &:nth-child(odd) {
    margin-bottom: 4rem;
  }
`;

export default HomeNewSecondSection;
