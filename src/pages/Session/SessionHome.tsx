import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import useSWR from 'swr';
import SessionCard, { IMAGE_WIDTH } from '@pages/Session/SessionCard';
import fetcherWithParams from '@utils/fetcherWithParams';
import { SessionListImageInfo, SessionListInfo } from '@/typing/session';
import {
  SessionContentsCsEducation,
  SessionContentsDevTalk,
  SessionContentsItIssue,
  SessionContentsNetworking,
} from '@/enums/SessionContents';
import api from '@/api/api';
import SessionUploadModal from '@pages/Session/SessionUploadModal';
import {
  CotatoGenerationInfoResponse,
  CotatoSessionListResponse,
  CotatoUpdateSessionRequest,
} from 'cotato-openapi-clients';
import GenerationDropBox from '@components/GenerationDropBox';
import { useMediaQuery } from '@mui/material';
import { DropBoxColorEnum } from '@/enums/DropBoxColor';
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
import { useNavigate } from 'react-router-dom';

//
//
//

const SessionHome = () => {
  const [selectedGeneration, setSelectedGeneration] = useState<CotatoGenerationInfoResponse>();

  const { data: sessionList, mutate: mutateSessionList } = useSWR<CotatoSessionListResponse[]>(
    '/v1/api/session',
    (url: string) => fetcherWithParams(url, { generationId: selectedGeneration?.generationId }),
  );
  const { data: userData } = fetchUserData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateSession, setUpdateSession] = useState<SessionListInfo | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<CotatoSessionListResponse | null>(null);

  const isTabletOrSmaller = useMediaQuery(`(max-width:${device.tablet})`);
  const navigate = useNavigate();

  /**
   *
   */
  const handleGenerationChange = (generation: CotatoGenerationInfoResponse) => {
    setSelectedGeneration(generation);
  };

  /**
   *
   */
  const handleClickUpdateSession = (session: CotatoSessionListResponse | null) => {
    if (!session) {
      return;
    }

    const updateSession: SessionListInfo = JSON.parse(JSON.stringify(session));
    setUpdateSession(updateSession);
    setIsDetailModalOpen(false);
    setIsUpdateModalOpen(true);
  };

  /**
   *
   */
  const requestImageAdd = (image: SessionListImageInfo): Promise<any> => {
    if (!image.imageFile) {
      return Promise.reject('No image file');
    }

    const formData = new FormData();
    formData.append('sessionId', updateSession?.sessionId?.toString() || '');
    formData.append('image', image.imageFile);

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
  const handleSessionAdd = (session: SessionListInfo) => {
    if (!session.sessionDate) {
      toast.error('세션 날짜를 입력해주세요.');
      return;
    }

    if (!session.attendanceDeadLine) {
      toast.error('출석 인정 시간을 입력해주세요.');
      return;
    }

    if (!session.lateDeadLine) {
      toast.error('지각 인정 시간을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('generationId', selectedGeneration?.generationId?.toString() || '');
    formData.append('title', session.title || '');
    formData.append('description', session.description || '');
    formData.append('sessionDate', session.sessionDate || '');
    formData.append('itIssue', session.sessionContents?.itIssue || SessionContentsItIssue.OFF);
    formData.append(
      'csEducation',
      session.sessionContents?.csEducation || SessionContentsCsEducation.OFF,
    );
    formData.append(
      'networking',
      session.sessionContents?.networking || SessionContentsNetworking.OFF,
    );
    formData.append('devTalk', session.sessionContents?.devTalk || SessionContentsDevTalk.OFF);
    formData.append('attendanceDeadLine', session.attendanceDeadLine || '');
    formData.append('lateDeadLine', session.lateDeadLine || '');

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
  const handleSessionUpdate = (session: SessionListInfo) => {
    if (!session.sessionId) {
      return;
    }

    const updatedSessoinInfo: CotatoUpdateSessionRequest = {
      sessionId: session.sessionId,
      title: session.title,
      description: session.description,
      sessionDate: session.sessionDate || '',
      itIssue: session.sessionContents?.itIssue || SessionContentsItIssue.OFF,
      csEducation: session.sessionContents?.csEducation || SessionContentsCsEducation.OFF,
      networking: session.sessionContents?.networking || SessionContentsNetworking.OFF,
      devTalk: session.sessionContents?.devTalk || SessionContentsDevTalk.OFF,
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
        <GenerationDropBox
          color={DropBoxColorEnum.BLUE}
          handleGenerationChange={handleGenerationChange}
          width={isTabletOrSmaller ? '7.2rem' : '8rem'}
          height={isTabletOrSmaller ? '2.8rem' : '3.2rem'}
        />
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
