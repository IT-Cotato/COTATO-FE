import React from 'react';
import styled, { useTheme } from 'styled-components';
import { HEADER_HEIGHT } from '@theme/constants/constants';
import AttendanceListCard from './AttendanceListCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import fetchUserData from '@utils/fetchUserData';
import fetcherWithParams from '@utils/fetcherWithParams';
import { CotatoSessionListResponse } from 'cotato-openapi-clients';
import { ReactComponent as GoalPotato } from '@assets/potato_goal.svg';
import { useParams, useSearchParams } from 'react-router-dom';
import AttendanceListGridCard from './AttendanceListGridCard';

//
//
//

const AttendanceList = () => {
  const { generationId } = useParams();

  const { data: sessionList } = useSWR<CotatoSessionListResponse[]>(
    '/v1/api/session',
    (url: string) => fetcherWithParams(url, { generationId: generationId }),
  );
  const { data: userData } = fetchUserData();

  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = React.useState(searchParams.get('view') || 'list');
  const theme = useTheme();

  /**
   *
   */
  const renderListCards = () => {
    if (!sessionList) return null;

    if (view === 'grid') {
      return null;
    }

    return (
      <StyledSwiper
        slidesPerView="auto"
        spaceBetween={20}
        centeredSlides={true}
        initialSlide={sessionList?.length - 1}
      >
        {sessionList?.map((session, index) => (
          <StyledSwiperSlide key={index}>
            <AttendanceListCard index={index} />
          </StyledSwiperSlide>
        ))}
        <span slot="wrapper-end">
          <GoalPotatoWrapper>
            <EllipseWrapper>
              <Ellipse $background={theme.colors.primary50} />
              <Ellipse $background={theme.colors.primary70} />
              <Ellipse $background={theme.colors.primary90} />
            </EllipseWrapper>
            <GoalPotato />
          </GoalPotatoWrapper>
        </span>
      </StyledSwiper>
    );
  };

  const renderGridCards = () => {
    if (!sessionList) return null;

    if (view !== 'grid') {
      return null;
    }

    return (
      <GridViewWrapper>
        <GridHeaderWrapper>
          <h3>출석 체크</h3>
        </GridHeaderWrapper>
        <DescriptionWrapper>아이콘들</DescriptionWrapper>
        <GridContainer>
          {sessionList?.map((session, index) => (
            <AttendanceListGridCard key={index} index={index} />
          ))}
        </GridContainer>
      </GridViewWrapper>
    );
  };

  return (
    <Wrapper>
      {renderListCards()}
      {renderGridCards()}
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - ${HEADER_HEIGHT});
`;

const StyledSwiper = styled(Swiper)``;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: auto;
  cursor: pointer;
`;

const GoalPotatoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const EllipseWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin: 2rem;
`;

const Ellipse = styled.span<{ $background: string }>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: ${({ $background }) => $background};
`;

const GridViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  width: 100%;
  padding: 2rem 10rem;
`;

const GridHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem;

  > h3 {
    margin: 0;
    color: ${({ theme }) => theme.colors.common.black};
    font-family: Ycomputer;
    font-size: 1.75rem;
    font-weight: 400;
  }
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  padding: 1rem 0;
`;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 2rem 1.5rem;
  place-items: center;
  padding: 2rem 0;
`;

export default AttendanceList;
