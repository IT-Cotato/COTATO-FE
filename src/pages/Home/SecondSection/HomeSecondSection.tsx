import React from 'react';
import styled, { useTheme } from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReactComponent as SectionTwoTitle } from '@assets/home_section2_title.svg';
import it from '@assets/IT.svg';
import cs from '@assets/CS.svg';
import networking from '@assets/Networking.svg';
import hackerthon from '@assets/Hackertone.svg';
import devtalk from '@assets/Devtalk.svg';
import demoday from '@assets/Demoday.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css/effect-cards';
import { media } from '@theme/media';
import styles from './style.module.css';

//
//
//

const HomeSecondSection = () => {
  const theme = useTheme();

  return (
    <Wrapper>
      <Title>
        <SectionTwoTitle fill={theme.colors.gray80_2} className={styles['section_two_title']} />
        <p>코테이토의 활동을 소개할게요!</p>
      </Title>
      <StyledSwiper
        className="mySwiper"
        effect="cards"
        modules={[EffectCards]}
        grabCursor={true}
        cardsEffect={{
          rotate: true,
          slideShadows: true,
          perSlideOffset: 24,
          perSlideRotate: 6,
        }}
      >
        <StyledSwiperSlide>
          <img src={it} alt="IT이슈" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <img src={cs} alt="CS교육" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <img src={networking} alt="네트워킹" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <img src={hackerthon} alt="해커톤" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <img src={devtalk} alt="데브토크" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <img src={demoday} alt="데모데이" />
        </StyledSwiperSlide>
      </StyledSwiper>
    </Wrapper>
  );
};

export default HomeSecondSection;

//
//
//

const Wrapper = styled.section`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  .slick-slider {
    height: 400px;
    margin-left: 200px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
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
`;

const StyledSwiper = styled(Swiper)`
  height: 465px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.tablet`
    height: 400px;
  `}
  ${media.landscape`
    width: 250px;
    height: 333px;
  `}
  ${media.mobile`
    width: 180px;
    height: 240px;
  `}
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  img {
    border-radius: 4px;
    width: 300px;
  }
  ${media.tablet`
    width: 300px;
    img{
      width: 300px;
    }
  `}
  ${media.landscape`
    width: 250px;
    img{
      width: 250px;
    }
  `}
  ${media.mobile`
    width: 180px;
    img{
      width: 180px;
    }
  `}
`;
