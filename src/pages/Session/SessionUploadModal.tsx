import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { styled } from 'styled-components';
import { ReactComponent as CloseIcon } from '@assets/close_dotted_circle.svg';
import { ReactComponent as PencilIcon } from '@assets/pencil.svg';
import { ReactComponent as CalendarIcon } from '@assets/calendar_icon_dotted.svg';
import SessionUploadModalImageInput from '@pages/Session/SessionUploadModalImageInput';
import { SessionListImageInfo, SessionListInfo } from '@/typing/session';
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

//
//
//

interface SessionUploadModalProps {
  open: boolean;
  headerText: string;
  handleClose: () => void;
  handleUpload: (session: SessionListInfo) => void;
  sessionInfo?: SessionListInfo | null;
  lastSessionNumber?: number;
  requestImageAdd?: (image: SessionListImageInfo) => Promise<any>;
  requestImageReorder?: (imageList: SessionListImageInfo[]) => Promise<any>;
  requestImageRemove?: (image: SessionListImageInfo) => Promise<any>;
}

interface InfoBoxProps {
  $height?: string;
  $bold?: boolean;
}

//
//
//

const INITIAL_SESSION_STATE: SessionListInfo = {
  sessionId: 0,
  sessionNumber: 0,
  title: '',
  description: '',
  sessionDate: '',
  generationId: 0,
  sessionContents: {
    itIssue: SessionContentsItIssue.ON,
    csEducation: SessionContentsCsEducation.ON,
    networking: SessionContentsNetworking.OFF,
    devTalk: SessionContentsDevTalk.OFF,
  },
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
  const [session, setSession] = useState<SessionListInfo>(INITIAL_SESSION_STATE);
  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);

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
  const handleItIssueChange = () => {
    setSession(
      produce(session, (draft) => {
        draft.sessionContents!.itIssue =
          session.sessionContents?.itIssue === SessionContentsItIssue.ON
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
        draft.sessionContents!.csEducation =
          session.sessionContents?.csEducation === SessionContentsCsEducation.ON
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
        draft.sessionContents!.networking =
          session.sessionContents?.networking === SessionContentsNetworking.ON
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
        draft.sessionContents!.devTalk =
          session.sessionContents?.devTalk === SessionContentsDevTalk.ON
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
        draft.sessionDate = dayjs(date).format('YYYY-MM-DD');
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
    const { itIssue, csEducation, networking, devTalk } = session.sessionContents!;

    const getContentsInput = () => {
      const contentList = [
        {
          name: 'IT 이슈',
          checked: itIssue === SessionContentsItIssue.ON,
          hanldeChange: handleItIssueChange,
        },
        {
          name: 'CS 교육',
          checked: csEducation === SessionContentsCsEducation.ON,
          hanldeChange: handleCsEducationChange,
        },
        {
          name: '네트워킹',
          checked: networking === SessionContentsNetworking.ON,
          hanldeChange: handleNetworkingChange,
        },
        {
          name: '데브토크',
          checked: devTalk === SessionContentsDevTalk.ON,
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
          <button type="button">
            <PencilIcon />
          </button>
        </TitleBox>
        <InfoBox>
          <input
            placeholder="세션 날짜를 선택해 주세요."
            value={session.sessionDate && dayjs(session.sessionDate).format('YYYY년 MM월 DD일')}
            readOnly={true}
          />
          <button type="button" onClick={() => setIsDayPickerOpen(true)}>
            <CalendarIcon />
          </button>
        </InfoBox>
        <InfoBox>
          <input value="장소 (아직 활성화 안됨)" readOnly={true} />
        </InfoBox>
        <InfoBox>
          <input value="시간 (출석 기능 출시 이후 활성화)" readOnly={true} />
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
      setSession(sessionInfo);
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
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.10)',
            backdropFilter: 'blur(4px)',
          },
        },
      }}
    >
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
          date={session.sessionDate ? new Date(session.sessionDate) : undefined}
          onDateChange={handleSessionDateChange}
          onClose={() => setIsDayPickerOpen(false)}
        />
      </UploadContainer>
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
  color: ${({ theme }) => theme.colors.gray100};
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
    color: ${({ theme }) => theme.colors.gray60};
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

const TitleBox = styled(InfoBox)`
  border: 2px solid ${({ theme }) => theme.colors.primary90};
  background: transparent;
`;

const ContentsInputWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.sm};
  gap: 0.6rem;

  > span {
    color: ${({ theme }) => theme.colors.gray60};
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
