import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { styled } from 'styled-components';
import { ReactComponent as CloseIcon } from '@assets/close_dotted_circle.svg';
// import { ReactComponent as PencilIcon } from '@assets/pencil.svg';
// import { ReactComponent as CalendarIcon } from '@assets/calendar_icon_dotted.svg';
import { ReactComponent as SearchIcon } from '@assets/search_icon.svg';
import SessionUploadModalImageInput from '@pages/Session/SessionUploadModalImageInput';
import { Place, SessionListImageInfo, SessionUploadInfo } from '@/typing/session';
import CotatoThemeToggleSwitch from '@components/CotatoToggleSwitch';
import { produce } from 'immer';
import {
  SessionContentsItIssue,
  SessionContentsCsEducation,
  SessionContentsNetworking,
  SessionContentsDevTalk,
} from '@/enums/SessionContents';
import CotatoDatePicker from '@components/CotatoDatePicker';
import dayjs from 'dayjs';
import { ToastContainer } from 'react-toastify';
import SearchLocationModal from '@components/SearchLocation/SearchLocationModal';
import {
  CotatoLocalTime,
  CotatoSessionContentsCsEducationEnum,
  CotatoSessionContentsDevTalkEnum,
  CotatoSessionContentsItIssueEnum,
  CotatoSessionContentsNetworkingEnum,
  CotatoSessionListResponse,
} from 'cotato-openapi-clients';
import CotatoTimePicker from '@components/CotatoTimePicker';
import api from '@/api/api';
import CotatoIcon from '@components/CotatoIcon';
import { IconButton } from '@mui/material';

//
//
//

interface SessionUploadModalProps {
  open: boolean;
  headerText: string;
  handleClose: () => void;
  handleUpload: (session: SessionUploadInfo) => void;
  sessionInfo?: CotatoSessionListResponse | null;
  lastSessionNumber?: number;
  requestImageAdd?: (image: SessionListImageInfo, order: number) => Promise<any>;
  requestImageReorder?: (imageList: SessionListImageInfo[]) => Promise<any>;
  requestImageRemove?: (image: SessionListImageInfo) => Promise<any>;
}

interface InfoBoxProps {
  $height?: string;
  $bold?: boolean;
}

interface LocationInputBoxProps {
  $width?: string;
}

//
//
//

const INITIAL_SESSION_STATE: SessionUploadInfo = {
  title: '',
  description: '',
  sessionDateTime: new Date(),
  attendTime: {
    attendanceDeadLine: {
      hour: 19,
      minute: 10,
      second: 0,
    },
    lateDeadLine: {
      hour: 19,
      minute: 20,
      second: 0,
    },
  },
  itIssue: CotatoSessionContentsItIssueEnum.Off,
  csEducation: CotatoSessionContentsCsEducationEnum.On,
  networking: CotatoSessionContentsNetworkingEnum.On,
  devTalk: CotatoSessionContentsDevTalkEnum.Off,
  imageInfos: [],
};

//
//
//

const SessionUploadModal = ({
  open,
  headerText,
  handleClose,
  handleUpload,
  sessionInfo,
  lastSessionNumber,
  requestImageAdd,
  requestImageReorder,
  requestImageRemove,
}: SessionUploadModalProps) => {
  const [session, setSession] = useState<SessionUploadInfo>(INITIAL_SESSION_STATE);
  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [address, setAddress] = useState('');

  /**
   *
   */
  const fetchUpdateSession = async () => {
    try {
      const response = await api.get('/v2/api/attendances/info', {
        params: {
          sessionId: sessionInfo?.sessionId,
        },
      });

      const updateSession: SessionUploadInfo = {
        sessionId: sessionInfo?.sessionId || 0,
        title: sessionInfo?.title || '',
        description: sessionInfo?.description || '',
        sessionDateTime: new Date(sessionInfo?.sessionDateTime || ''),
        placeName: sessionInfo?.placeName || '',
        location: {
          latitude: response.data.location?.latitude,
          longitude: response.data.location?.longitude,
        },
        attendTime: {
          attendanceDeadLine: {
            hour: response.data.attendanceDeadLine?.hour || 19,
            minute: response.data.attendanceDeadLine?.minute || 10,
            second: response.data.attendanceDeadLine?.second || 0,
          },
          lateDeadLine: {
            hour: response.data.lateDeadLine?.hour || 19,
            minute: response.data.lateDeadLine?.minute || 20,
            second: response.data.lateDeadLine?.second || 0,
          },
        },
        itIssue: sessionInfo?.sessionContents?.itIssue || CotatoSessionContentsItIssueEnum.Off,
        csEducation:
          sessionInfo?.sessionContents?.csEducation || CotatoSessionContentsCsEducationEnum.On,
        networking:
          sessionInfo?.sessionContents?.networking || CotatoSessionContentsNetworkingEnum.On,
        devTalk: sessionInfo?.sessionContents?.devTalk || CotatoSessionContentsDevTalkEnum.Off,
        imageInfos: sessionInfo?.imageInfos || [],
      };

      setSession(updateSession);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   *
   */
  const convertCotatoLocalTimeToDate = (localTime?: CotatoLocalTime): Date => {
    const date = new Date();
    date.setHours(localTime?.hour || 0);
    date.setMinutes(localTime?.minute || 0);
    date.setSeconds(localTime?.second || 0);
    return date;
  };

  /**
   *
   */
  const handleSearchLocationButtonClick = () => {
    setIsLocationModalOpen(true);
  };

  /**
   *
   */
  const handleImageListChange = (imageList: SessionListImageInfo[]) => {
    setSession(
      produce(session, (draft) => {
        draft.imageInfos = imageList;
      }),
    );
  };

  /**
   *
   */
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSession(
      produce(session, (draft) => {
        draft.title = e.target.value;
      }),
    );
  };

  /**
   *
   */
  const handleLocationChange = (place: Place) => {
    setSession(
      produce(session, (draft) => {
        draft.placeName = place.placeName;
        draft.location = {
          latitude: place.location.latitude,
          longitude: place.location.longitude,
        };
      }),
    );
    setAddress(place.addressName || '');
  };

  /**
   *
   */
  const handlePlaceNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSession(
      produce(session, (draft) => {
        draft.placeName = e.target.value;
      }),
    );
  };

  /**
   *
   */
  const handleItIssueChange = () => {
    setSession(
      produce(session, (draft) => {
        draft.itIssue =
          session.itIssue === SessionContentsItIssue.ON
            ? SessionContentsItIssue.OFF
            : SessionContentsItIssue.ON;
      }),
    );
  };

  /**
   *
   */
  const handleCsEducationChange = () => {
    setSession(
      produce(session, (draft) => {
        draft.csEducation =
          session.csEducation === SessionContentsCsEducation.ON
            ? SessionContentsCsEducation.OFF
            : SessionContentsCsEducation.ON;
      }),
    );
  };

  /**
   *
   */
  const handleNetworkingChange = () => {
    setSession(
      produce(session, (draft) => {
        draft.networking =
          session.networking === SessionContentsNetworking.ON
            ? SessionContentsNetworking.OFF
            : SessionContentsNetworking.ON;
      }),
    );
  };

  /**
   *
   */
  const handleDevTalkChange = () => {
    setSession(
      produce(session, (draft) => {
        draft.devTalk =
          session.devTalk === SessionContentsDevTalk.ON
            ? SessionContentsDevTalk.OFF
            : SessionContentsDevTalk.ON;
      }),
    );
  };

  /**
   *
   */
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSession(
      produce(session, (draft) => {
        draft.description = e.target.value;
      }),
    );
  };

  /**
   *
   */
  const handleSessionDateChange = (date: Date) => {
    setSession(
      produce(session, (draft) => {
        draft.sessionDateTime = new Date(date);
      }),
    );
  };

  /**
   *
   */
  const handleAttendanceDeadlineChange = (date: Date) => {
    setSession(
      produce(session, (draft) => {
        if (draft.attendTime?.attendanceDeadLine) {
          draft.attendTime.attendanceDeadLine.hour = date.getHours();
          draft.attendTime.attendanceDeadLine.minute = date.getMinutes();
          draft.attendTime.attendanceDeadLine.second = date.getSeconds();
        } else {
          draft.attendTime = {
            attendanceDeadLine: {
              hour: date.getHours(),
              minute: date.getMinutes(),
              second: date.getSeconds(),
            },
          };
        }
      }),
    );
  };

  /**
   *
   */
  const handleLateDeadLineChange = (date: Date) => {
    setSession(
      produce(session, (draft) => {
        if (draft.attendTime?.lateDeadLine) {
          draft.attendTime.lateDeadLine.hour = date.getHours();
          draft.attendTime.lateDeadLine.minute = date.getMinutes();
          draft.attendTime.lateDeadLine.second = date.getSeconds();
        } else {
          draft.attendTime = {
            lateDeadLine: {
              hour: date.getHours(),
              minute: date.getMinutes(),
              second: date.getSeconds(),
            },
          };
        }
      }),
    );
  };

  /**
   *
   */
  const renerCloseButton = () => (
    <CloseButton type="button" onClick={handleClose}>
      <CloseIcon />
    </CloseButton>
  );

  /**
   *
   */
  const renderHeader = () => <ModalHeader>{headerText}</ModalHeader>;

  /**
   *
   */
  const renderImageInput = () => {
    return (
      <SessionUploadModalImageInput
        imageList={session.imageInfos}
        handleImageListChange={handleImageListChange}
        requestImageAdd={requestImageAdd}
        requestImageReorder={requestImageReorder}
        requestImageRemove={requestImageRemove}
      />
    );
  };

  /**
   *
   */
  const renderInfoInput = () => {
    const getContentsInput = () => {
      const contentList = [
        {
          name: 'IT 이슈',
          checked: session.itIssue === CotatoSessionContentsItIssueEnum.On,
          hanldeChange: handleItIssueChange,
        },
        {
          name: 'CS 교육',
          checked: session.csEducation === CotatoSessionContentsCsEducationEnum.On,
          hanldeChange: handleCsEducationChange,
        },
        {
          name: '네트워킹',
          checked: session.networking === CotatoSessionContentsNetworkingEnum.On,
          hanldeChange: handleNetworkingChange,
        },
        {
          name: '데브토크',
          checked: session.devTalk === CotatoSessionContentsDevTalkEnum.On,
          hanldeChange: handleDevTalkChange,
        },
      ];

      return (
        <>
          {contentList.map((content, index) => (
            <ContentsInputWrapper key={index}>
              <span>{content.name}</span>
              <CotatoThemeToggleSwitch checked={content.checked} onChange={content.hanldeChange} />
            </ContentsInputWrapper>
          ))}
        </>
      );
    };

    return (
      <InfoInputWrapper>
        <TitleBox $bold={true}>
          <input value={session.title} onChange={handleTitleChange} />
          <IconButton>
            <CotatoIcon icon="pencil-solid" color={(theme) => theme.colors.gray60} />
          </IconButton>
        </TitleBox>
        <InfoBox onClick={() => setIsDayPickerOpen(true)}>
          <input
            placeholder="세션 날짜를 선택해 주세요."
            value={
              session.sessionDateTime &&
              dayjs(session.sessionDateTime).format('YYYY년 MM월 DD일 HH시 mm분')
            }
            readOnly={true}
            style={{ cursor: 'pointer' }}
          />
          <IconButton>
            <CotatoIcon icon="calender-solid" color={(theme) => theme.colors.gray60} />
          </IconButton>
        </InfoBox>
        <InfoBox $bold={true}>
          <div>세션 장소</div>
          <div>
            <LocationInputBox onClick={handleSearchLocationButtonClick}>
              <input placeholder="장소 검색" value={address} readOnly={true} />
              <button type="button">
                <SearchIcon />
              </button>
            </LocationInputBox>
            <LocationInputBox $width="9rem">
              <input
                placeholder="장소명"
                value={session.placeName}
                readOnly={session.location === undefined}
                onChange={handlePlaceNameChange}
              />
            </LocationInputBox>
          </div>
        </InfoBox>
        <InfoBox $bold={true}>
          <div>
            출석 인정
            <CotatoTimePicker
              date={convertCotatoLocalTimeToDate(session.attendTime?.attendanceDeadLine)}
              onDateChange={handleAttendanceDeadlineChange}
            />
          </div>
          <div>
            지각 인정
            <CotatoTimePicker
              date={convertCotatoLocalTimeToDate(session?.attendTime?.lateDeadLine)}
              onDateChange={handleLateDeadLineChange}
            />
          </div>
        </InfoBox>
        <InfoBox>{getContentsInput()}</InfoBox>
        <InfoBox $height="8rem">
          <textarea
            placeholder="활동 내용을 작성하세요."
            value={session.description}
            onChange={handleDescriptionChange}
          />
        </InfoBox>
      </InfoInputWrapper>
    );
  };

  /**
   *
   */
  const renderSearchLocationModal = () => {
    if (isLocationModalOpen) {
      return (
        <SearchLocationModal
          setIsSearchModalOpen={setIsLocationModalOpen}
          onPlaceChange={handleLocationChange}
        />
      );
    }
  };

  /**
   *
   */
  const renderUplaodButton = () => (
    <UploadButtonWrapper>
      <button onClick={() => handleUpload(session)}>업로드</button>
    </UploadButtonWrapper>
  );

  /**
   * Set default session state
   */
  useEffect(() => {
    if (sessionInfo) {
      fetchUpdateSession();
    } else {
      const getNextFiday = () => {
        const today = new Date();
        const day = today.getDay();
        const diff = 5 - day;
        const nextFriday = new Date(today);
        nextFriday.setDate(today.getDate() + diff);
        nextFriday.setHours(19, 0, 0, 0);
        return nextFriday;
      };

      const initialSession = produce(INITIAL_SESSION_STATE, (draft) => {
        draft.sessionDateTime = getNextFiday();
      });

      setSession(initialSession);
    }

    if (lastSessionNumber !== undefined) {
      setSession(
        produce(session, (darft) => {
          darft.title = lastSessionNumber > 0 ? `${lastSessionNumber}주차 세션` : 'OT';
        }),
      );
    }
  }, [sessionInfo, lastSessionNumber]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.10)',
            backdropFilter: 'blur(4px)',
          },
        },
      }}
    >
      <>
        <UploadContainer>
          <Wrapper>
            {renerCloseButton()}
            {renderHeader()}
            {renderImageInput()}
            {renderInfoInput()}
            {renderUplaodButton()}
            {renderSearchLocationModal()}
          </Wrapper>
          <CotatoDatePicker
            open={isDayPickerOpen}
            date={session.sessionDateTime}
            onDateChange={handleSessionDateChange}
            onClose={() => setIsDayPickerOpen(false)}
          />
        </UploadContainer>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          pauseOnFocusLoss={false}
          theme={localStorage.getItem('theme') || 'light'}
        />
      </>
    </Modal>
  );
};

//
//
//

const UploadContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 80vh;
  overflow-y: scroll;
  padding: 1.6rem 3rem;
  border-radius: ${({ theme }) => theme.size.xl};
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.colors.common.white};

  &:focus-visible {
    outline: none;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;

  > svg {
    width: 2rem;
    height: 2rem;
  }
`;

const ModalHeader = styled.div`
  padding: ${({ theme }) => theme.size.md};
  color: ${({ theme }) => theme.colors.common.black};
  text-align: center;
  font-family: Pretendard-Bold;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const InfoInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.size.lg} 0;
  gap: 0.6rem;
`;

const InfoBox = styled.div<InfoBoxProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 34rem;
  height: ${({ $height }) => $height || '3.2rem'};
  padding: ${({ theme }) => theme.size.lg} ${({ theme }) => theme.size.md};
  border-radius: ${({ theme }) => theme.size.sm};
  background: ${({ theme }) => theme.colors.gray20};

  > input,
  textarea {
    width: 100%;
    height: 100%;
    padding: 0;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.gray100};
    font-family: Pretendard;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ $bold }) => ($bold ? '600' : '300')};
    line-height: 125%;

    &::placeholder {
      font-size: ${({ theme }) => theme.fontSize.sm};
      font-weight: 300;
    }

    &:focus-visible {
      outline: none;
    }
  }

  > textarea {
    resize: none;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: ${({ theme }) => theme.colors.gray100};
    font-family: Pretendard;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ $bold }) => ($bold ? '600' : '300')};
    line-height: 125%;
  }

  > button {
    border: none;
    background: none;
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    cursor: pointer;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

const LocationInputBox = styled.span<LocationInputBoxProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ $width }) => $width || '10rem'};
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray60};
  background: ${({ theme }) => theme.colors.common.white_const};

  > input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: none;
    background: none;
    font-family: Pretendard;
    font-size: 0.875rem;

    &::placeholder {
      font-weight: 200;
    }

    &:focus-visible {
      outline: none;
    }
  }

  > button {
    border: none;
    background: none;
    cursor: pointer;
  }
`;

const TitleBox = styled(InfoBox)`
  border: 2px solid ${({ theme }) => theme.colors.primary90};
  background: ${({ theme }) => theme.colors.common.white_const};
`;

const ContentsInputWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.sm};
  gap: 0.6rem;

  > span {
    color: #6a6967;
    color: ${({ theme }) => theme.colors.gray100};
    font-family: Pretendard;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 300;
    line-height: 125%;
  }

  > label {
    margin-right: 0;
    > span {
      height: auto;
    }
  }
`;

const UploadButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-top: ${({ theme }) => theme.size.md};

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.size.sm} ${({ theme }) => theme.size.lg};
    border: none;
    border-radius: 6rem;
    background: ${({ theme }) => theme.colors.primary100_1};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.common.white};
    text-align: center;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
  }
`;

export default SessionUploadModal;
