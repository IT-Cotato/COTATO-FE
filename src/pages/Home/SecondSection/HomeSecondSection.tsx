import React from 'react';
import styled, { useTheme } from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReactComponent as SectionTwoTitle } from '@assets/home_section2_title.svg';
import it from '@assets/home_it_card.svg';
import cs from '@assets/home_cs_card.svg';
import networking from '@assets/home_networking_card.svg';
import hackerthon from '@assets/home_hackerthon_card.svg';
import devtalk from '@assets/home_devtalk_card.svg';
import demoday from '@assets/home_demoday_card.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css/effect-cards';
import { media } from '@theme/media';

//
//
//

const HomeSecondSection = () => {
  const theme = useTheme();

  return (
    <Wrapper>
      <Title>
        <SectionTwoTitle fill={theme.colors.gray80_2} />
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
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.tablet`
    width: 300px;
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
    width: 350px;
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
