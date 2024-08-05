import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeSecondSectionCard from './HomeSecondSectionCard';
import cs from '@assets/CS.svg';
import { ReactComponent as CsIcon } from '@assets/cs_icon.svg';
import { ReactComponent as SectionTwoTitle } from '@assets/home_section2_title.svg';
import styled, { useTheme } from 'styled-components';
import { media } from '@theme/media';
import styles from './style.module.css';
import { CotatoThemeType } from '@theme/theme';
import { Autoplay, FreeMode } from 'swiper/modules';

//
//
//

const SWIPER_SPEED = 1200;

//
//
//

const HomeNewSecondSection = () => {
  const theme = useTheme();
  //
  //
  //
  return (
    <Wrapper>
      <Title>
        <SectionTwoTitle fill={theme.colors.gray80_2} className={styles['section_two_title']} />
        <p>코테이토의 활동을 소개할게요!</p>
      </Title>
      <StyledSwiper
        autoplay={{
          delay: 3000,
        }}
        freeMode={true}
        modules={[Autoplay, FreeMode]}
        speed={SWIPER_SPEED}
        slidesPerView="auto"
        spaceBetween={100}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <StyledSwiperSlide
            key={index}
            style={{
              marginTop: index % 2 === 0 ? '4rem !important' : '0rem',
              marginBottom: index % 2 !== 0 ? '4rem !important' : '0rem',
            }}
            margin={index % 2 === 0 ? '4rem 0 0 0' : '0 0 4rem 0'}
          >
            <HomeSecondSectionCard
              imgSrc={cs}
              title="IT 이슈"
              description="각 팀별로 최신 IT 이슈에 대해 조사하고 발표합니다."
              icon={<CsIcon />}
            />
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
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
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 200px;
    height: 40px;
  }
  p {
    margin-top: 20px;
    margin-bottom: 60px;
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray80_2};
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
`;

const StyledSwiperSlide = styled(SwiperSlide)<{ margin: string }>`
  width: 21rem;
  &:nth-child(odd) {
    margin-top: 4rem;
  }
  &:nth-child(even) {
    margin-bottom: 4rem;
  }
`;

export default HomeNewSecondSection;
