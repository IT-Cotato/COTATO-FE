import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import useSWR from 'swr';
import SessionCard, { IMAGE_WIDTH } from '@pages/Session/SessionCard';
import fetcherWithParams from '@utils/fetcherWithParams';
import { SessionListImageInfo, SessionUploadInfo } from '@/typing/session';
import api from '@/api/api';
import SessionUploadModal from '@pages/Session/SessionUploadModal';
import { CotatoGenerationInfoResponse, CotatoSessionListResponse } from 'cotato-openapi-clients';
import CotatoDropBox from '@components/CotatoDropBox';
import { useMediaQuery } from '@mui/material';
import { device } from '@theme/media';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar } from 'swiper/modules';
import fetchUserData from '@utils/fetchUserData';
import { ReactComponent as AddCircleIcon } from '@assets/add_circle_dotted.svg';
import SessionDetailModal from '@pages/Session/SessionDetailModal';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGeneration } from '@/hooks/useGeneration';

//
//
//

const SessionHome = () => {
  const { currentGeneration, generations } = useGeneration();
  const [selectedGeneration, setSelectedGeneration] = useState<CotatoGenerationInfoResponse>();

  const { data: sessionList, mutate: mutateSessionList } = useSWR<CotatoSessionListResponse[]>(
    '/v1/api/session',
    (url: string) => fetcherWithParams(url, { generationId: selectedGeneration?.generationId }),
  );
  const { data: userData } = fetchUserData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateSession, setUpdateSession] = useState<CotatoSessionListResponse | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<CotatoSessionListResponse | null>(null);

  const isTabletOrSmaller = useMediaQuery(`(max-width:${device.tablet})`);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  /**
   *
   */
  const getDateString = (date?: Date) => {
    if (!date) {
      return '';
    }

    const dateISO = new Date(date);
    dateISO.setHours(dateISO.getHours() + 9);
    return dateISO.toISOString().substring(0, 19);
  };

  /**
   *
   */
  const handleGenerationChange = (generation: CotatoGenerationInfoResponse) => {
    setSelectedGeneration(generation);
    setSearchParams({ generationId: generation.generationId!.toString() });
  };

  /**
   *
   */
  const handleClickUpdateSession = (session: CotatoSessionListResponse | null) => {
    if (!session) {
      return;
    }

    const updateSession: CotatoSessionListResponse = JSON.parse(JSON.stringify(session));
    setUpdateSession(updateSession);
    setIsDetailModalOpen(false);
    setIsUpdateModalOpen(true);
  };

  /**
   *
   */
  const requestImageAdd = (image: SessionListImageInfo, order: number): Promise<any> => {
    if (!image.imageFile) {
      return Promise.reject('No image file');
    }

    const formData = new FormData();
    formData.append('sessionId', updateSession?.sessionId?.toString() || '');
    formData.append('image', image.imageFile);
    formData.append('order', order.toString());

    return api.post('v1/api/session/image', formData);
  };

  /**
   *
   */
  const requestImageReorder = (imageList: SessionListImageInfo[]): Promise<any> => {
    const reorderedImageList = imageList.map((image) => {
      return {
        imageId: image.imageId,
        order: image.order,
      };
    });

    return api.patch('/v1/api/session/image/order', {
      sessionId: updateSession?.sessionId,
      orderInfos: reorderedImageList,
    });
  };

  /**
   *
   */
  const requestImageRemove = (image: SessionListImageInfo): Promise<any> => {
    if (!image.imageId) {
      return Promise.reject('No image id');
    }

    return api.delete('/v1/api/session/image', {
      data: {
        imageId: image.imageId,
      },
    });
  };

  /**
   *
   */
  const handleSessionAdd = (session: SessionUploadInfo) => {
    if (!session.sessionDateTime) {
      toast.error('세션 날짜를 입력해주세요.');
      return;
    }

    if (!session.attendTime?.attendanceDeadLine) {
      toast.error('출석 인정 시간을 입력해주세요.');
      return;
    }

    if (!session.attendTime?.lateDeadLine) {
      toast.error('지각 인정 시간을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('generationId', selectedGeneration?.generationId?.toString() || '');
    formData.append('title', session.title || '');
    formData.append('description', session.description || '');

    formData.append('latitude', session.location?.latitude?.toString() || '');
    formData.append('longitude', session.location?.longitude?.toString() || '');
    formData.append('placeName', session.placeName || '');

    formData.append('sessionDateTime', getDateString(session.sessionDateTime));
    formData.append('itIssue', session.itIssue);
    formData.append('csEducation', session.csEducation);
    formData.append('networking', session.networking);
    formData.append('devTalk', session.devTalk);

    formData.append('attendanceDeadLine', getDateString(session.attendTime.attendanceDeadLine));
    formData.append('lateDeadLine', getDateString(session.attendTime.lateDeadLine));

    session.imageInfos.forEach((imageInfo) => {
      if (imageInfo.imageFile) {
        formData.append('images', imageInfo.imageFile);
      }
    });

    api
      .post('/v1/api/session/add', formData)
      .then(() => {
        mutateSessionList();
        setIsAddModalOpen(false);
      })
      .catch(() => toast.error('세션 추가에 실패했습니다.'));
  };

  /**
   *
   */
  const handleSessionUpdate = (session: SessionUploadInfo) => {
    if (!session.sessionId) {
      return;
    }

    const updatedSessoinInfo = {
      sessionId: session.sessionId,
      title: session.title,
      description: session.description,
      sessionDateTime: getDateString(session.sessionDateTime),
      placeName: session.placeName,
      location: session.location,
      attendTime: {
        attendanceDeadLine: getDateString(session?.attendTime?.attendanceDeadLine),
        lateDeadLine: getDateString(session?.attendTime?.lateDeadLine),
      },
      itIssue: session.itIssue,
      csEducation: session.csEducation,
      networking: session.networking,
      devTalk: session.devTalk,
    };

    api
      .patch('/v1/api/session/update', updatedSessoinInfo)
      .then(() => {
        mutateSessionList();
        setIsUpdateModalOpen(false);
      })
      .catch(() => toast.error('세션 수정에 실패했습니다.'));
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
  const handleSessionClick = (session: CotatoSessionListResponse) => {
    setSelectedSession(session);
    setIsDetailModalOpen(true);
  };

  /**
   *
   */
  const handlePrevSessionClick = () => {
    if (!selectedSession || !sessionList) {
      return;
    }

    const currentSessionNumber = selectedSession?.sessionNumber || 0;

    if (currentSessionNumber === 0) {
      return;
    }

    const prevSession =
      sessionList?.find((session) => session.sessionNumber === currentSessionNumber - 1) || null;

    setSelectedSession(prevSession);

    if (!prevSession) {
      setIsDetailModalOpen(false);
    }
  };

  /**
   *
   */
  const handleNextSessionClick = () => {
    if (!selectedSession || !sessionList) {
      return;
    }

    const currentSessionNumber = selectedSession?.sessionNumber || 0;

    if (currentSessionNumber === sessionList?.length - 1) {
      return;
    }

    const nextSession =
      sessionList?.find((session) => session.sessionNumber === currentSessionNumber + 1) || null;

    setSelectedSession(nextSession);

    if (!nextSession) {
      setIsDetailModalOpen(false);
    }
  };

  /**
   *
   */
  const renderSettingTab = () => {
    return (
      <SettingTab>
        {generations && (
          <CotatoDropBox
            list={generations}
            onChange={handleGenerationChange}
            defaultItemId={selectedGeneration?.generationId}
            color="blue"
            width={isTabletOrSmaller ? '7.2rem' : '8rem'}
            height={isTabletOrSmaller ? '2.8rem' : '3.2rem'}
          />
        )}
        {userData?.role === 'ADMIN' && !isTabletOrSmaller && (
          <AddCircleIcon onClick={() => setIsAddModalOpen(true)} />
        )}
      </SettingTab>
    );
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
        {sessionList
          ? sessionList?.map((session: CotatoSessionListResponse) => (
              <SessionCard
                key={session.sessionId}
                session={session}
                handleSessionClick={handleSessionClick}
              />
            ))
          : new Array(12).fill(null).map((_, index) => <SessionCard key={index} />)}
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

    const slideList = sessionList ?? new Array(6).fill(null);

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
        {slideList?.map((session: CotatoSessionListResponse | null, index) => (
          <StyledSwiperSlide key={session?.sessionId || index}>
            <SessionCard
              session={session}
              isActive={activeSlideIndex === index}
              handleSessionClick={handleSessionClick}
            />
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
    );
  };

  /**
   * set generationId from url
   */
  useEffect(() => {
    if (!currentGeneration || !generations) {
      return;
    }

    const generationId = searchParams.get('generationId');

    if (generationId) {
      setSelectedGeneration(
        generations?.find((generation) => generation.generationId === Number(generationId)),
      );
    } else {
      setSearchParams({ generationId: currentGeneration!.generationId!.toString() });
      setSelectedGeneration(currentGeneration);
    }
  }, [currentGeneration, generations]);

  /**
   *
   */
  useEffect(() => {
    if (selectedGeneration) {
      mutateSessionList();
    }
  }, [selectedGeneration]);

  /**
   * prevent before page when tablet or smaller
   */
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      if (isDetailModalOpen && isTabletOrSmaller) {
        window.history.pushState(null, '', window.location.href);
        setIsDetailModalOpen(false);
      } else {
        navigate(-1);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isDetailModalOpen, isTabletOrSmaller]);

  return (
    <>
      <Wrapper>
        {renderSettingTab()}
        {renderSessionCards()}
        {renderMobileSessoinCards()}
      </Wrapper>
      <SessionDetailModal
        open={isDetailModalOpen}
        session={selectedSession}
        sessionCount={sessionList?.length || 0}
        handleClose={() => setIsDetailModalOpen(false)}
        handlePrevClick={handlePrevSessionClick}
        handleNextClick={handleNextSessionClick}
        handleClickUpdateSession={handleClickUpdateSession}
      />
      <SessionUploadModal
        open={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
        headerText="세션 추가"
        handleUpload={handleSessionAdd}
        lastSessionNumber={sessionList?.length}
      />
      <SessionUploadModal
        open={isUpdateModalOpen}
        handleClose={() => setIsUpdateModalOpen(false)}
        headerText="세션 수정"
        handleUpload={handleSessionUpdate}
        sessionInfo={updateSession}
        requestImageAdd={requestImageAdd}
        requestImageReorder={requestImageReorder}
        requestImageRemove={requestImageRemove}
      />
    </>
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

const SettingTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;

  > svg {
    position: absolute;
    right: 0;
    width: 2.75rem;
    cursor: pointer;
  }
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
      cursor: grab;
    }
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: auto !important;
`;

export default SessionHome;
