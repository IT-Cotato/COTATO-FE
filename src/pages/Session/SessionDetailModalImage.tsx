import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CotatoSessionListImageInfoResponse } from 'cotato-openapi-clients';
import { Skeleton } from '@mui/material';
import { media } from '@theme/media';

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
  const [imageLoading, setImageLoading] = useState(true);

  /**
   *
   */
  useEffect(() => {
    setImageLoading(true);
  }, imageList);

  return (
    <StyledSwiper
      slidesPerView={1}
      modules={[Navigation, Pagination]}
      navigation={true}
      pagination={{
        clickable: false,
      }}
    >
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
  background: ${({ theme }) => theme.colors.const.black};
  width: ${IMAGE_WIDTH};
  height: 100%;

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

  .swiper-pagination {
    display: none;
  }

  ${media.laptop`
    width: calc(${IMAGE_WIDTH} - 5rem);
  `}

  ${media.tablet`
    width: 100%;
    height: auto;

    .swiper-button-prev, 
    .swiper-button-next {
      display: none;
    }

    .swiper-pagination {
      display: block;

      .swiper-pagination-bullet {
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 0.2rem;
        background: ${({ theme }: { theme: any }) => theme.colors.gray30};
        opacity: 1;
      }

      .swiper-pagination-bullet-active {
        background: ${({ theme }: { theme: any }) => theme.colors.primary100_1};
      }
    }
  `}
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
`;

const SlideImage = styled.img<{ $display: string }>`
  display: ${({ $display }) => $display};
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
`;

export default SessionDetailModalImage;
