import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Mousewheel, Pagination } from 'swiper/modules';
import styled from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeFirstSection from './FirstSection/HomeFirstSection';
import HomeSecondSection from './SecondSection/HomeSecondSection';
import HomeThirdSection from './ThirdSection/HomeThirdSection';
import Footer from '@components/Footer';
import { device } from '@theme/media';

//
//
//

const SWIPER_SPEED = 700;
const SWIPER_SLIDES_PER_VIEW = 1;
const MOUSE_WHEEL_OPTION = {
  forceToAxis: true,
  sensitivity: 1,
  releaseOnEdges: true,
};

//
//
//

const HomeSlide = () => {
  const isTabletOrSmaller = useMediaQuery(`(max-width:${device.tablet})`);

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
          <HomeThirdSection />
        </StyledSwiperSlide>
        {!isTabletOrSmaller && <SwiperSlide />}
        {/* Footer */}
        <FooterSwiperSlide>
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const FooterSwiperSlide = styled(SwiperSlide)`
  height: 100vh;
  display: flex;
  align-items: flex-end;
`;
