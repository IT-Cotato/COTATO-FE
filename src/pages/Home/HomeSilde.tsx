import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Mousewheel, Pagination } from 'swiper/modules';
import styled from 'styled-components';

//
//
//

const SWIPER_SPEED = 700;
const SWIPER_SLIDES_PER_VIEW = 1;

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

//
//
//

const HomeSlide = () => {
  return (
    <StyledSwiper
      direction="vertical"
      speed={SWIPER_SPEED}
      slidesPerView={SWIPER_SLIDES_PER_VIEW}
      modules={[Mousewheel, Pagination]}
      mousewheel={true}
    >
      {/* Will be replaced with Section */}
      <StyledSwiperSlide>
        <div>Slide 1</div>
      </StyledSwiperSlide>
      <StyledSwiperSlide>
        <div>Slide 2</div>
      </StyledSwiperSlide>
      <StyledSwiperSlide>
        <div>Slide 3</div>
      </StyledSwiperSlide>
    </StyledSwiper>
  );
};

export default HomeSlide;
