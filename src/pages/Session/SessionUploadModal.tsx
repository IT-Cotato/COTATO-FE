import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { styled } from 'styled-components';
import { ReactComponent as CloseIcon } from '@assets/close_dotted_circle.svg';
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
  CotatoSessionContentsCsEducationEnum,
  CotatoSessionContentsDevTalkEnum,
  CotatoSessionContentsItIssueEnum,
  CotatoSessionContentsNetworkingEnum,
  CotatoSessionWithAttendanceResponse,
} from 'cotato-openapi-clients';
import CotatoTimePicker from '@components/CotatoTimePicker';
import api from '@/api/api';
import CotatoIcon from '@components/CotatoIcon';
import { IconButton } from '@mui/material';
import { getNextFriday } from './util/getNextFriday';

//
//
//

interface SessionUploadModalProps {
  open: boolean;
  headerText: string;
  handleClose: () => void;
  handleUpload: (session: SessionUploadInfo) => void;
  sessionId: number | null;
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
  sessionDateTime: getNextFriday(),
  attendTime: {
    attendanceDeadLine: getNextFriday(19, 10),
    lateDeadLine: getNextFriday(19, 20),
  },
  isOffline: true,
  isOnline: false,
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
  sessionId,
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
      const { data: sessionWithAttendance } = await api.get<CotatoSessionWithAttendanceResponse>(
        `/v1/api/session/${sessionId}`,
      );

      const updateSession: SessionUploadInfo = {
        sessionId: sessionWithAttendance.sessionId,
        title: sessionWithAttendance.title,
        description: sessionWithAttendance.description,
        sessionDateTime: new Date(sessionWithAttendance.sessionDateTime || ''),
        placeName: sessionWithAttendance.placeName,
        location: sessionWithAttendance.attendance?.location,
        attendTime: {
          attendanceDeadLine: new Date(sessionWithAttendance.attendance?.attendanceDeadLine || ''),
          lateDeadLine: new Date(sessionWithAttendance.attendance?.lateDeadLine || ''),
        },
        isOffline: sessionWithAttendance.isOffline,
        isOnline: sessionWithAttendance.isOnline,
        itIssue: sessionWithAttendance.sessionContents!.itIssue!,
        csEducation: sessionWithAttendance.sessionContents!.csEducation!,
        networking: sessionWithAttendance.sessionContents!.networking!,
        devTalk: sessionWithAttendance.sessionContents!.devTalk!,
        imageInfos: sessionWithAttendance.sessionImages!,
      };

      setSession(updateSession);
    } catch (error) {
      console.error(error);
    }
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
  const handlePlaceClearButtonClick = () => {
    setSession(
      produce(session, (draft) => {
        draft.placeName = '';
      }),
    );
    setAddress('');
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
    const attendanceDeadLine = dayjs(date)
      .set('hour', session.attendTime!.attendanceDeadLine!.getHours())
      .set('minute', session.attendTime!.attendanceDeadLine!.getMinutes())
      .toDate();

    const lateDeadLine = dayjs(date)
      .set('hour', session.attendTime!.lateDeadLine!.getHours())
      .set('minute', session.attendTime!.lateDeadLine!.getMinutes())
      .toDate();

    setSession(
      produce(session, (draft) => {
        draft.sessionDateTime = new Date(date);
        draft.attendTime!.attendanceDeadLine = attendanceDeadLine;
        draft.attendTime!.lateDeadLine = lateDeadLine;
      }),
    );
  };

  /**
   *
   */
  const handleAttendanceOfflineChange = () => {
    setSession(
      produce(session, (draft) => {
        draft.isOffline = !session.isOffline;
      }),
    );
  };

  /**
   *
   */
  const handleAttendanceOnlineChange = () => {
    setSession(
      produce(session, (draft) => {
        draft.isOnline = !session.isOnline;
      }),
    );
  };

  /**
   *
   */
  const handleAttendanceDeadlineChange = (date: Date) => {
    setSession(
      produce(session, (draft) => {
        draft.attendTime!.attendanceDeadLine = date;
      }),
    );
  };

  /**
   *
   */
  const handleLateDeadLineChange = (date: Date) => {
    setSession(
      produce(session, (draft) => {
        draft.attendTime!.lateDeadLine = date;
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
    return (
      <InfoInputWrapper>
        {renderTitleInput()}
        {renderDateInput()}
        {renderLocationInput()}
        {renderAttendanceTypeInput()}
        {renderAttendanceDeadlineInput()}
        {renderAttendanceLateDeadlineInput()}
        {renderSessionContentsInput()}
        {renderDescriptionInput()}
      </InfoInputWrapper>
    );
  };

  /**
   *
   */
  const renderTitleInput = () => {
    return (
      <TitleBox $bold={true}>
        <input value={session.title} onChange={handleTitleChange} />
        <IconButton>
          <CotatoIcon icon="pencil-solid" color={(theme) => theme.colors.gray60} />
        </IconButton>
      </TitleBox>
    );
  };

  /**
   *
   */
  const renderDateInput = () => {
    return (
      <InfoBox onClick={() => setIsDayPickerOpen(true)}>
        <input
          value={dayjs(session.sessionDateTime).format('YYYY년 MM월 DD일 HH시 mm분')}
          readOnly={true}
          style={{ cursor: 'pointer' }}
        />
        <IconButton>
          <CotatoIcon icon="calender-solid" color={(theme) => theme.colors.gray60} />
        </IconButton>
      </InfoBox>
    );
  };

  /**
   *
   */
  const renderLocationInput = () => {
    return (
      <InfoBox $bold={true}>
        <div>세션 장소</div>
        <div>
          <LocationInputBox onClick={handleSearchLocationButtonClick}>
            <input placeholder="장소 검색" value={address} readOnly={true} />
            <button type="button">
              <CotatoIcon icon="search" size="1.25rem" color={(theme) => theme.colors.gray60} />
            </button>
          </LocationInputBox>
          <LocationInputBox $width="12rem">
            <input
              placeholder="장소명"
              value={session.placeName}
              readOnly={session.location === undefined}
              onChange={handlePlaceNameChange}
            />
            <button type="button" onClick={handlePlaceClearButtonClick}>
              <CotatoIcon icon="trash-alt" size="1.25rem" color={(theme) => theme.colors.gray60} />
            </button>
          </LocationInputBox>
        </div>
      </InfoBox>
    );
  };

  /**
   *
   */
  const renderAttendanceTypeInput = () => {
    return (
      <InfoBox $bold={true}>
        <div>출석</div>
        <div>
          <ContentsInputWrapper>
            <span>대면</span>
            <CotatoThemeToggleSwitch
              checked={session.isOffline}
              onChange={handleAttendanceOfflineChange}
            />
          </ContentsInputWrapper>
          <ContentsInputWrapper>
            <span>비대면</span>
            <CotatoThemeToggleSwitch
              checked={session.isOnline}
              onChange={handleAttendanceOnlineChange}
            />
          </ContentsInputWrapper>
        </div>
      </InfoBox>
    );
  };

  /**
   *
   */
  const renderAttendanceDeadlineInput = () => {
    return (
      <InfoBox $bold={true}>
        <div>출석 인정 시간</div>
        <div>
          <CotatoTimePicker readonly date={session.sessionDateTime} />
          <Seperator />
          <CotatoTimePicker
            date={session.attendTime?.attendanceDeadLine ?? new Date()}
            onDateChange={handleAttendanceDeadlineChange}
          />
        </div>
      </InfoBox>
    );
  };

  /**
   *
   */
  const renderAttendanceLateDeadlineInput = () => {
    return (
      <InfoBox $bold={true}>
        <div>지각 인정 시간</div>
        <div>
          <CotatoTimePicker readonly date={session.attendTime?.attendanceDeadLine ?? new Date()} />
          <Seperator />
          <CotatoTimePicker
            date={session.attendTime?.lateDeadLine ?? new Date()}
            onDateChange={handleLateDeadLineChange}
          />
        </div>
      </InfoBox>
    );
  };

  /**
   *
   */
  const renderSessionContentsInput = () => {
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
      <InfoBox>
        {contentList.map((content, index) => (
          <ContentsInputWrapper key={index}>
            <span>{content.name}</span>
            <CotatoThemeToggleSwitch checked={content.checked} onChange={content.hanldeChange} />
          </ContentsInputWrapper>
        ))}
      </InfoBox>
    );
  };

  /**
   *
   */
  const renderDescriptionInput = () => {
    return (
      <InfoBox $height="8rem">
        <textarea
          placeholder="활동 내용을 작성하세요."
          value={session.description}
          onChange={handleDescriptionChange}
        />
      </InfoBox>
    );
  };

  /**
   *
   */
  const renderSearchLocationModal = () => {
    if (isLocationModalOpen) {
      return (
        <SearchLocationModal
          width="38rem"
          height="80vh"
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
    if (sessionId) {
      fetchUpdateSession();
    }

    if (lastSessionNumber !== undefined) {
      setSession(
        produce(session, (darft) => {
          darft.title = lastSessionNumber > 0 ? `${lastSessionNumber}주차 세션` : 'OT';
        }),
      );
    }
  }, [sessionId, lastSessionNumber]);

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
        {renderSearchLocationModal()}
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

const Seperator = styled.div`
  width: 0.75rem;
  height: 0;
  border: 1px solid ${({ theme }) => theme.colors.gray70};
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
