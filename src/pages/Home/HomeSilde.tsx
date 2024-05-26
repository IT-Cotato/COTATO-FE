import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Mousewheel, Pagination } from 'swiper/modules';
import styled from 'styled-components';
import HomeFirstSection from './FirstSection/HomeFirstSection';
import HomeSecondSection from './SecondSection/HomeSecondSection';
import HomeThirdSection from './ThirdSection/HomeThirdSection';
import HomeBackgroundSvgComponent from './HomeBackgroundSvgComponent';
import Footer from '@components/NewFooter';

//
//
//

const SWIPER_SPEED = 700;
const SWIPER_SLIDES_PER_VIEW = 1;

//
//
//

const HomeSlide = () => {
  const mouseWheelOption = {
    forceToAxis: true,
    sensitivity: 1,
    releaseOnEdges: true,
  };

  return (
    <>
      <StyledSwiper
        direction="vertical"
        speed={SWIPER_SPEED}
        slidesPerView={SWIPER_SLIDES_PER_VIEW}
        modules={[Mousewheel, Pagination]}
        mousewheel={mouseWheelOption}
        autoHeight={true}
      >
        <HomeBackgroundSvgComponent />
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
        <SwiperSlide />
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
