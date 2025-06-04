import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import CSPPTImages from '@assets/cs_ppt';
import { Box } from '@mui/material';
import CSThirdSectionSlideButton from './CSThirdSectionSlideButton';
import { Swiper as SwiperClass } from 'swiper/types';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { media } from '@theme/media';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';

//
//
//

interface CSThirdSecionSlideProps {
  onChangeSlide: (index: number) => void;
}

const DESKTOP_SLIDE_WIDTH = 192;
const MOBILE_SLIDE_WIDTH = 160;

//
//
//

const CSThirdSectionSlide = ({ onChangeSlide }: CSThirdSecionSlideProps) => {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);

  const { isLandScapeOrSmaller } = useBreakpoints();

  const handleSlideChange = (_swiper: SwiperClass) => {
    setIsBeginning(_swiper.isBeginning);
    setIsEnd(_swiper.isEnd);
  };
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
    <Box
      sx={{
        position: 'relative',
        width: {
          xs: MOBILE_SLIDE_WIDTH,
          landscape: '100%',
        },
        padding: {
          xs: 0,
          landscape: '0 3.375rem',
        },
        marginTop: {
          tablet: '4rem',
        },
      }}
    >
      <CSThirdSectionSlideButton
        isEnd={isBeginning}
        direction="left"
        onClick={() => handleSlideButtonClick('left')}
      />
      <StyledSwiper
        modules={[Mousewheel]}
        mousewheel
        width={isLandScapeOrSmaller ? MOBILE_SLIDE_WIDTH : DESKTOP_SLIDE_WIDTH}
        spaceBetween={DESKTOP_SLIDE_WIDTH / 8}
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
      >
        {CSPPTImages.map((image, index) => (
          <StyledSwiperSlide key={index} onClick={() => onChangeSlide(index)}>
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
        isEnd={isEnd}
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
  /* width: 12rem !important;
  cursor: pointer;

  ${media.tablet`
    width: 10rem !important;
  `} */
`;

export default CSThirdSectionSlide;
