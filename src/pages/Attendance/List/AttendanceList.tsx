import React from 'react';
import styled, { useTheme } from 'styled-components';
import { HEADER_HEIGHT } from '@theme/constants/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import fetcherWithParams from '@utils/fetcherWithParams';
import {
  CotatoMemberAttendanceRecordsResponse,
  CotatoMemberAttendResponse,
} from 'cotato-openapi-clients';
import { ReactComponent as GoalPotato } from '@assets/potato_goal.svg';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AttendanceGridCard, AttendanceListCard } from '@components/attendance/attedance-card';
import { media } from '@theme/media';
import { ReactComponent as AbsetIcon } from '@assets/attendance_absent_icon.svg';
import { ReactComponent as OfflineIcon } from '@assets/attendance_offline_icon.svg';
import { ReactComponent as OnlineIcon } from '@assets/attendance_online_icon.svg';
import { ReactComponent as LateIcon } from '@assets/attendance_late_icon.svg';
import { Divider } from '@mui/material';
import { AttendResponseAttendanceResultEnum, AttendResponseIsOpenedEnum } from '@/enums/attend';
import { useGeneration } from '@/hooks/useGeneration';
import {
  AttendanceListLayoutType,
  useAttendanceListLayoutStore,
} from '@/zustand-stores/useAttendanceListLayoutStore';

//
//
//

const AttendanceList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { generationId } = useParams();
  const { currentGeneration } = useGeneration();

  const { data: attendanceResponse } = useSWR<CotatoMemberAttendanceRecordsResponse>(
    '/v2/api/attendances/records/members',
    (url: string) => fetcherWithParams(url, { generationId: generationId }),
  );

  const [, setSearchParams] = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { listLayoutType: view } = useAttendanceListLayoutStore();

  /**
   *
   */
  const handleCardClick = (attendance: CotatoMemberAttendResponse) => {
    if (attendance.isOpened === AttendResponseIsOpenedEnum.Open) {
      navigate(`/attendance/attend/generation/${generationId}/session/${attendance.sessionId}`);
    }
  };

  /**
   *
   */
  const handleUrlChange = (viewType: AttendanceListLayoutType) => {
    setSearchParams({ viewType });
  };

  /**
   *
   */
  const renderListCards = () => {
    if (!attendanceResponse || !attendanceResponse.memberAttendResponses) {
      return null;
    }

    if (view === 'grid') {
      return null;
    }

    let cardBackgrooundColorListIndex = 0;
    const cardBackgroundColorList = [
      theme.colors.pastelTone.yellow[100],
      theme.colors.pastelTone.pink[100],
    ];

    const getCardBackgroundColor = (attendanceResult: AttendResponseAttendanceResultEnum) => {
      if (attendanceResult === 'ABSENT') {
        return theme.colors.pastelTone.blue[100];
      }

      const color = cardBackgroundColorList[cardBackgrooundColorListIndex];
      cardBackgrooundColorListIndex =
        (cardBackgrooundColorListIndex + 1) % cardBackgroundColorList.length;
      return color;
    };

    return (
      <StyledSwiper
        slidesPerView="auto"
        spaceBetween={28}
        centeredSlides={true}
        initialSlide={attendanceResponse.memberAttendResponses.length - 1}
      >
        {attendanceResponse.memberAttendResponses.map((attendance, index) => (
          <StyledSwiperSlide key={index}>
            <AttendanceListCard
              attendance={attendance}
              backgroundColor={getCardBackgroundColor(
                attendance.attendanceResult as AttendResponseAttendanceResultEnum,
              )}
              generationNumber={currentGeneration?.generationNumber || 0}
              onClick={handleCardClick}
            />
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
    if (!attendanceResponse || !attendanceResponse.memberAttendResponses) {
      return null;
    }

    if (view !== 'grid') {
      return null;
    }

    const descriptionList = [
      { icon: <OfflineIcon />, text: '대면' },
      { icon: <OnlineIcon />, text: '비대면' },
      { icon: <AbsetIcon />, text: '결석' },
      { icon: <LateIcon />, text: '지각' },
    ];

    return (
      <GridViewWrapper>
        <GridHeaderWrapper>
          <h3>출석 체크</h3>
        </GridHeaderWrapper>
        <DescriptionWrapper>
          {descriptionList.map((description, index) => (
            <>
              <Description key={index}>
                {description.icon}
                {description.text}
              </Description>
              {index !== descriptionList.length - 1 && <Divider orientation="vertical" flexItem />}
            </>
          ))}
        </DescriptionWrapper>
        <GridContainer>
          {attendanceResponse.memberAttendResponses.map((attendance, index) => (
            <AttendanceGridCard
              key={index}
              attendance={attendance}
              generationNumber={currentGeneration?.generationNumber || 0}
              onClick={handleCardClick}
            />
          ))}
        </GridContainer>
      </GridViewWrapper>
    );
  };

  //
  //
  //
  React.useEffect(() => {
    handleUrlChange(view);
  }, [view]);

  //
  //
  //
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

  ${media.mobile`
    min-height: 100vh;
  `}
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  padding: 2rem 0;
`;

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

  ${media.laptop`
    padding: 2rem 8rem;
  `}

  ${media.tablet`
    padding: 4rem 1rem;
  `}
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
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 0;

  ${media.tablet`
    gap: 0.5rem;
  `}
`;

const Description = styled.span`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: Ycomputer;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.common.black};

  ${media.tablet`
    gap: 0.25rem;
    font-size: 0.75rem;

    > svg {
      width: 1rem;
      height: 1rem;
    }
  `}
`;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10.5rem, 1fr));
  gap: 2rem;
  place-items: center;
  padding: 2rem 0;

  ${media.tablet`
    grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));  
    gap: 1rem;
  `}
`;

export default AttendanceList;
