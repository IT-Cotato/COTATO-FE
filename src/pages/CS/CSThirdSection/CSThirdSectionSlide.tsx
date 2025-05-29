import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import CSPPTImages from '@assets/cs_ppt';
import { Box } from '@mui/material';
import 'swiper/css';
import CSThirdSectionSlideButton from './CSThirdSectionSlideButton';
import { Swiper as SwiperClass } from 'swiper/types';

//
//
//

const CSThirdSectionSlide = () => {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperClass | null>(null);

  /**
   *
   */
  const handleSlideButtonClick = (direction: 'left' | 'right') => {
    if (swiperInstance) {
      if (direction === 'left') {
        swiperInstance.slidePrev();
      } else if (direction === 'right') {
        swiperInstance.slideNext();
      }
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', padding: '0 2rem', marginTop: '4rem' }}>
      <CSThirdSectionSlideButton direction="left" onClick={() => handleSlideButtonClick('left')} />
      <StyledSwiper slidesPerView="auto" spaceBetween="16rem" onSwiper={setSwiperInstance}>
        {CSPPTImages.map((image, index) => (
          <StyledSwiperSlide key={index}>
            <Box
              component="img"
              src={image}
              alt={`CS PPT ${index + 1}`}
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
      <CSThirdSectionSlideButton
        direction="right"
        onClick={() => handleSlideButtonClick('right')}
      />
    </Box>
  );
};

//
//
//

const StyledSwiper = styled(Swiper)`
  width: 100%;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 12rem !important;
  cursor: pointer;
`;

export default CSThirdSectionSlide;
