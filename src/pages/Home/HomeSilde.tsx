import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Mousewheel, Pagination } from 'swiper/modules';
import styled from 'styled-components';

import HomeFirstSection from './FirstSection/HomeFirstSection';
import HomeSecondSection from './SecondSection/HomeSecondSection';
import Footer from '@components/Footer';
import HomeNewThirdSection from './ThirdSection/HomeNewThirdSection';

//
//
//

const SWIPER_SPEED = 700;
const SWIPER_SLIDES_PER_VIEW = 1;
const MOUSE_WHEEL_OPTION = {
  forceToAxis: true,
  sensitivity: 1,
};

//
//
//

const HomeSlide = () => {
  return (
    <>
      <StyledSwiper
        direction="vertical"
        speed={SWIPER_SPEED}
        slidesPerView={SWIPER_SLIDES_PER_VIEW}
        modules={[Mousewheel, Pagination]}
        mousewheel={MOUSE_WHEEL_OPTION}
        autoHeight={true}
      >
        {/* First Section */}
        <StyledSwiperSlide>
          <HomeFirstSection />
        </StyledSwiperSlide>
        {/* Second Section */}
        <StyledSwiperSlide>
          <HomeSecondSection />
        </StyledSwiperSlide>
        {/* Third Section */}
        <StyledSwiperSlide>
          <HomeNewThirdSection />
        </StyledSwiperSlide>
        {/* Footer */}
        <FooterSwiperSlide>
          <h2
            style={{
              marginBottom: '8rem',
            }}
          >
            코테이토에 대해 더 많이 알고 싶다면?
          </h2>
          <p>Contact us ↓ ↓ ↓ ↓ ↓ ↓</p>
          <Footer />
        </FooterSwiperSlide>
      </StyledSwiper>
    </>
  );
};

export default HomeSlide;

//
//
//

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const FooterSwiperSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
