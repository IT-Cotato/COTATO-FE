import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { CotatoSessionListImageInfoResponse } from 'cotato-openapi-clients';
import { Skeleton } from '@mui/material';

//
//
//

interface SessionDetailModalImageProps {
  imageList?: CotatoSessionListImageInfoResponse[];
}

//
//
//

const IMAGE_WIDTH = '28rem';

//
//
//

const SessionDetailModalImage = ({ imageList }: SessionDetailModalImageProps) => {
  const [imageLoading, setImageLoading] = useState(imageList ? true : false);

  return (
    <StyledSwiper slidesPerView={1} modules={[Navigation]} navigation={true}>
      {imageList?.map((image, index) => (
        <StyledSwiperSlide key={index}>
          {imageLoading && (
            <Skeleton
              variant="rectangular"
              sx={{ width: IMAGE_WIDTH, height: 'auto', aspectRatio: 4 / 3 }}
            />
          )}
          <SlideImage
            src={image.imageUrl}
            onLoad={() => setImageLoading(false)}
            $display={imageLoading ? 'none' : 'block'}
          />
        </StyledSwiperSlide>
      ))}
    </StyledSwiper>
  );
};

//
//
//

const StyledSwiper = styled(Swiper)`
  background: ${({ theme }) => theme.colors.common.black_const};
  width: ${IMAGE_WIDTH};

  .swiper-button-disabled {
    opacity: 0;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) => theme.colors.gray60};

    &::after {
      font-size: 1.25rem;
    }
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideImage = styled.img<{ $display: string }>`
  display: ${({ $display }) => $display};
  width: 100%;
`;

export default SessionDetailModalImage;
