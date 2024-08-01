import React, { useState } from 'react';
import { styled } from 'styled-components';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import SessionCard, { IMAGE_WIDTH } from '@pages/Session/_SessionCard';
import { v4 as uuid } from 'uuid';
import { CotatoGenerationInfoResponse, CotatoSessionListResponse } from 'cotato-openapi-clients';
import GenerationDropBox from '@components/_GenerationDropBox';
import { DropBoxColorEnum } from '@/enums/DropBoxColor';
import { useMediaQuery } from '@mui/material';
import { device } from '@theme/media';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

//
//
//

const SessionHome = () => {
  const [selectedGeneration, setSelectedGeneration] = useState<CotatoGenerationInfoResponse>();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const { data: sessions } = useSWR(
    `/v1/api/session?generationId=${selectedGeneration?.generationId}`,
    fetcher,
  );

  const isTabletOrSmaller = useMediaQuery(`(max-width:${device.tablet})`);

  const handleGenerationChange = (generation: CotatoGenerationInfoResponse) => {
    setSelectedGeneration(generation);
  };

  /**
   *
   */
  const handleSlideChange = (swiper: any) => {
    setActiveSlideIndex(swiper.activeIndex);
  };

  /**
   *
   */
  const renderSessionCards = () => {
    if (isTabletOrSmaller) {
      return null;
    }

    return (
      <SessionCardGridWrapper>
        {sessions
          ? sessions?.map((session: CotatoSessionListResponse) => (
              <SessionCard key={uuid()} session={session} />
            ))
          : new Array(12).fill(null).map(() => <SessionCard key={uuid()} />)}
      </SessionCardGridWrapper>
    );
  };

  /**
   *
   */
  const renderMobileSessoinCards = () => {
    if (!isTabletOrSmaller) {
      return null;
    }

    const slideList = sessions ?? new Array(6).fill(undefined);

    return (
      <StyledSwiper
        slidesPerView="auto"
        spaceBetween="5%"
        centeredSlides={true}
        onSlideChange={handleSlideChange}
        pagination={{
          clickable: false,
        }}
        scrollbar={{
          hide: false,
          draggable: true,
        }}
        modules={[Pagination, Scrollbar]}
      >
        {slideList.map((session: CotatoSessionListResponse | undefined, index: number) => (
          <StyledSwiperSlide key={uuid()}>
            <SessionCard session={session} isActive={activeSlideIndex === index} />
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
    );
  };

  return (
    <Wrapper>
      <GenerationDropBox
        color={DropBoxColorEnum.BLUE}
        handleGenerationChange={handleGenerationChange}
        width={isTabletOrSmaller ? '7.2rem' : '8rem'}
        height={isTabletOrSmaller ? '2.8rem' : '3.2rem'}
      />
      {renderSessionCards()}
      {renderMobileSessoinCards()}
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
`;

const SessionCardGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${IMAGE_WIDTH}, 1fr));
  gap: 4rem 2rem;
  place-items: center;
  width: 100%;
  padding: 3rem 0 1.6rem;
`;

const StyledSwiper = styled(Swiper)`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 2rem 0 5.4rem;

  > .swiper-pagination {
    bottom: 3.4rem;

    > .swiper-pagination-bullet {
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 0.2rem;
      background: ${({ theme }) => theme.colors.gray30};
      opacity: 1;
    }

    > .swiper-pagination-bullet-active {
      background: ${({ theme }) => theme.colors.primary100_1};
    }
  }

  > .swiper-scrollbar {
    display: flex;
    align-items: center;
    left: auto;
    width: 12rem;
    background: ${({ theme }) => theme.colors.gray30};

    > .swiper-scrollbar-drag {
      width: 2rem !important;
      height: 0.8rem;
      border-radius: 2rem;
      background: ${({ theme }) => theme.colors.primary100_1};
    }
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: auto !important;
`;

export default SessionHome;
