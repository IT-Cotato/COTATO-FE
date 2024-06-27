import React, { ChangeEvent, MouseEvent, useCallback, useState } from 'react';
import ReactModal from 'react-modal';
import { css, styled } from 'styled-components';
import { ReactComponent as CloseIcon } from '@assets/close_icon.svg';
import ToggleButton from '@components/ToggleButton';
import ImageBox from '@pages/Session/SessionModal/ImageBox';
import TextBox from '@components/TextBox';
import PopUp from '@pages/Session/SessionModal/PopUp';
import { ISession } from '@/typing/db';
import api from '@/api/api';

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  session?: ISession;
  lastWeek: number;
  generationId?: number;
  fetchSessions: (generationId?: number) => void;
  sessionCount?: number;
}

const SessionModal = ({
  isOpen,
  onCloseModal,
  session,
  lastWeek,
  generationId,
  fetchSessions,
  sessionCount,
}: Props) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<Blob | null>(null);
  const [itIssue, setItIssue] = useState(true);
  const [csEdu, setCsEdu] = useState(true);
  const [networking, setNetworking] = useState(false);
  const [description, setDescription] = useState('');

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isImageUpdated, setIsImageUpdated] = useState(false);

  const getTitle = useCallback(
    (week: number) => {
      if (week === 0) {
        return 'OT';
      } else if (sessionCount && week === sessionCount - 1) {
        return '데모데이';
      }
      return `${week}주차 세션`;
    },
    [sessionCount],
  );

  const handleAfterOpen = useCallback(() => {
    if (session) {
      setTitle(session.title);
      setDescription(session.description);
      setItIssue(session.sessionContents.itIssue === 'IT_ON');
      setNetworking(session.sessionContents.networking === 'NW_ON');
      setCsEdu(session.sessionContents.csEducation === 'CS_ON');
    } else {
      setTitle(getTitle(lastWeek + 1));
    }

    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  }, [session, lastWeek]);

  const handelAfterClose = useCallback(() => {
    setTitle('');
    setImage(null);
    setItIssue(true);
    setCsEdu(true);
    setNetworking(false);
    setDescription('');
    setIsImageUpdated(false);
    document.body.style.overflow = 'unset';
  }, []);

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setTitle(e.target.value);
    },
    [title],
  );

  const onChangeItNews = useCallback(() => {
    setItIssue(!itIssue);
  }, [itIssue]);

  const onChangeCsEdu = useCallback(() => {
    setCsEdu(!csEdu);
  }, [csEdu]);

  const onChangeNetworking = useCallback(() => {
    setNetworking(!networking);
  }, [networking]);

  const onChangeDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }, []);

  const onClickAddButton = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const formData = new FormData();
      if (image) formData.append('sessionImage', image);
      formData.append('description', description);
      formData.append('itIssue', itIssue ? 'IT_ON' : 'IT_OFF');
      formData.append('networking', networking ? 'NW_ON' : 'NW_OFF');
      formData.append('csEducation', csEdu ? 'CS_ON' : 'CS_OFF');

      if (!session) {
        if (generationId) formData.append('generationId', generationId.toString());

        api
          .post('/v1/api/session/add', formData)
          .then(() => {
            fetchSessions(generationId);
            onCloseModal();
          })
          .catch((err) => console.log(err));
      } else {
        formData.append('isPhotoUpdated', isImageUpdated.toString());
        formData.append('sessionId', session.sessionId.toString());

        api
          .patch('v1/api/session/update', formData)
          .then(() => {
            fetchSessions(generationId);
            onCloseModal();
          })
          .catch((err) => console.error(err));
      }
    },
    [session, image, generationId, itIssue, csEdu, networking, description, isImageUpdated],
  );

  const closePopUp = useCallback(() => {
    setIsPopUpOpen(false);
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={handleAfterOpen}
      onAfterClose={handelAfterClose}
      style={modalStyle}
    >
      <ModalWrapper>
        <ModalCloseButton>
          <CloseIcon width="57" height="56" fill="#686868" onClick={onCloseModal} />
        </ModalCloseButton>
        <Header>
          <h3>{!session ? '세션 추가' : '세션 수정'}</h3>
        </Header>
        <BoxContainer>
          <ImageBox
            image={image}
            photoUrl={session?.photoUrl}
            setImage={setImage}
            setIsPopUpOpen={setIsPopUpOpen}
            setIsImageUpdated={setIsImageUpdated}
          />
          <TextBox value={title} height="60px" onChange={onChangeTitle} />
          <ToggleButtonBox>
            <p>it 뉴스</p>
            <ToggleButton toggled={itIssue} onClick={onChangeItNews} />
            <p>CS 교육</p>
            <ToggleButton toggled={csEdu} onClick={onChangeCsEdu} />
            <p>네트워킹</p>
            <ToggleButton toggled={networking} onClick={onChangeNetworking} />
          </ToggleButtonBox>
          <TextBox
            value={description}
            placeholder="내용을 입력해주세요."
            onChange={onChangeDescription}
            height="110px"
          />
        </BoxContainer>
        <ButtonContainer>
          <UploadButton type="button" onClick={onClickAddButton}>
            업로드
          </UploadButton>
        </ButtonContainer>
        {isPopUpOpen && <PopUp closePopUp={closePopUp} text="하나의 이미지만 드래그 해주세요." />}
      </ModalWrapper>
    </ReactModal>
  );
};

export default SessionModal;

const modalStyle = {
  overlay: {
    overflow: 'auto',
  },
  content: {
    width: '740px',
    height: '800px',
    marginTop: '10%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    justifyContent: 'center',
  },
};

const ModalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ModalCloseButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  cursor: pointer;
`;

const fontStyle = css`
  color: #a1a1a1a1;
  font-family: NanumSquareRound;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px;

  > h3 {
    ${fontStyle}
    color: #000;
    font-size: 24px;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 500px;
`;

const ToggleButtonBox = styled.div`
  display: flex;
  width: 500px;
  height: 60px;
  border-radius: 10px;
  background: #f1f1f1;
  margin: 4px;
  align-items: center;

  > p {
    ${fontStyle}
    color: #7b7b7b;
    padding: 5px 0;
    margin-left: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 500px;
  margin: 28px auto;
`;

const Button = styled.button`
  width: 96px;
  height: 40px;
  margin-left: 8px;
  border-radius: 5px;
`;

const UploadButton = styled(Button)`
  background: #477feb;
  border: none;
  ${fontStyle}
  color: #FFF;
`;
