import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import ReactModal from 'react-modal';
import TextBox from '@components/TextBox';
import { IEducation } from '@/typing/db';
import api from '@/api/api';
import { ToastContainer, toast } from 'react-toastify';
import CotatoIcon from '@components/CotatoIcon';
import { IconButton } from '@mui/material';

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  educatoin?: IEducation;
  generationId?: number;
  fetchEducations: (generationId?: number) => void;
  sessionCount?: number;
}

const CSModal = ({ isOpen, onCloseModal, educatoin, generationId, fetchEducations }: Props) => {
  const [educationNum, setEducationNum] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    if (educatoin) {
      setEducationNum(`${educatoin.educationNumber}주차 교육`);
      setSubject(educatoin.subject);
    }
  }, [educatoin]);

  const handleAfterOpen = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const handleAfterClose = useCallback(() => {
    setEducationNum('');
    setSubject('');
    document.body.style.overflow = 'unset';
  }, []);

  const onChangeEducationNum = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setEducationNum(e.target.value);
  }, []);

  const onChangeSubject = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setSubject(e.target.value);
  }, []);

  const onClickAddButton = useCallback(() => {
    if (!subject || !parseInt(educationNum)) {
      toast.error('입력 값을 확인해주세요.');
    } else if (!educatoin) {
      api
        .post('/v1/api/education/add', {
          generationId,
          subject: subject,
          educationNumber: parseInt(educationNum),
        })
        .then(() => {
          fetchEducations(generationId);
          onCloseModal();
        })
        .catch((err) => console.error(err));
    } else {
      api
        .patch('/v1/api/education', {
          educationId: educatoin.educationId,
          newSubject: subject,
          newNumber: parseInt(educationNum),
        })
        .then(() => {
          fetchEducations(generationId);
          onCloseModal();
        })
        .catch((err) => console.error(err));
    }
  }, [educatoin, educationNum, subject]);

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={handleAfterOpen}
      onAfterClose={handleAfterClose}
      style={modalStyle}
    >
      <ModalWrapper>
        <ModalCloseButton>
          <IconButton onClick={onCloseModal}>
            <CotatoIcon icon="times-solid" size="32px" color={(theme) => theme.colors.gray40} />
          </IconButton>
        </ModalCloseButton>
        <Header>
          <h3>{!educatoin ? '교육 추가' : '교육 수정'}</h3>
        </Header>
        <BoxContainer>
          <TextBox
            value={educationNum}
            placeholder="교육 주차를 입력하세요"
            onChange={onChangeEducationNum}
            height="60px"
          />
          <TextBox
            value={subject}
            placeholder="주제를 입력하세요."
            onChange={onChangeSubject}
            height="60px"
          />
        </BoxContainer>
        <ButtonContainer>
          <UploadButton type="button" onClick={onClickAddButton}>
            업로드
          </UploadButton>
        </ButtonContainer>
      </ModalWrapper>
      <ToastContainer position="top-center" autoClose={2000} />
    </ReactModal>
  );
};

export default CSModal;

const modalStyle = {
  overlay: {
    overflow: 'auto',
  },
  content: {
    width: '740px',
    height: '480px',
    top: '55%',
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
    ${fontStyle};
    color: #000;
    font-size: 24px;
    margin-top: 0;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 500px;
  gap: 8px;
`;

const Button = styled.button`
  width: 96px;
  height: 40px;
  margin-left: 8px;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 500px;
  margin: 32px auto;
`;

const UploadButton = styled(Button)`
  background: #477feb;
  border: none;
  ${fontStyle};
  color: #fff;
`;
