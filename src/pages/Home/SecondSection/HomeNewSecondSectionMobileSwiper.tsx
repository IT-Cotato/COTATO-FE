import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeSecondSectionCard from './HomeSecondSectionCard';
import { CARD_INFOS, DARK_ASSETS, ICON_ASSETS, LIGHT_ASSETS } from './HomeNewSecondSection';
import { ThemeContext } from '@theme/context/CotatoThemeProvider';
import styled from 'styled-components';
import { Pagination } from 'swiper/modules';

//
//
//

const HomeNewSecondSectionMobileSwiper = () => {
  const { DefaultTheme } = React.useContext(ThemeContext);

  //
  //
  //

  return (
    <StyledSwiper
      loop={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <StyledSwiperSlide key={`home-section-two-mobile-slide-${index}`}>
          <HomeSecondSectionCard
            imgSrc={DefaultTheme === 'light' ? LIGHT_ASSETS[index] : DARK_ASSETS[index]}
            title={CARD_INFOS[index].title}
            description={CARD_INFOS[index].description}
            icon={ICON_ASSETS[index]}
          />
        </StyledSwiperSlide>
      ))}
    </StyledSwiper>
  );
};

export default HomeNewSecondSectionMobileSwiper;

//
//
//

const StyledSwiper = styled(Swiper)`
  width: 100%;

  div {
    &.swiper-button-prev,
    &.swiper-button-next {
      color: ${({ theme }) => theme.colors.primary100};
    }

    &.swiper-pagination {
      bottom: 0;
      margin-top: 2rem;
    }
  }
  span {
    &.swiper-pagination-bullet {
      background-color: ${({ theme }) => theme.colors.gray80_2};
    }

    &.swiper-pagination-bullet-active {
      background-color: ${({ theme }) => theme.colors.primary100};
    }
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 100%;
  padding: 1rem 0 2rem;
  display: flex;
  justify-content: center;
`;
