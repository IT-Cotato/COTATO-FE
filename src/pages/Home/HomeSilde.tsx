import React from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Mousewheel, Pagination } from 'swiper/modules';
import styled from 'styled-components';

import HomeFirstSection from './FirstSection/HomeFirstSection';
import HomeNewThirdSection from './ThirdSection/HomeNewThirdSection';
import HomeNewSecondSection from './SecondSection/HomeNewSecondSection';

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
  const swiperRef = React.useRef<SwiperClass | null>();

  return (
    <>
      <StyledSwiper
        direction="vertical"
        speed={SWIPER_SPEED}
        slidesPerView={SWIPER_SLIDES_PER_VIEW}
        modules={[Mousewheel, Pagination]}
        mousewheel={MOUSE_WHEEL_OPTION}
        autoHeight={true}
        onSwiper={(swiper: SwiperClass) => {
          swiperRef.current = swiper;
        }}
      >
        {/* First Section */}
        <StyledSwiperSlide>
          <HomeFirstSection />
        </StyledSwiperSlide>
        {/* Second Section */}
        <StyledSwiperSlide>
          <HomeNewSecondSection />
        </StyledSwiperSlide>
        {/* Third Section */}
        <StyledSwiperSlide>
          <HomeNewThirdSection />
        </StyledSwiperSlide>
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
