import React, { useState } from 'react';
import styled from 'styled-components';
import CotatoPanel from '@components/CotatoPanel';
import { Box } from '@mui/material';
import CotatoButton from '@components/CotatoButton';
import CotatoIcon from '@components/CotatoIcon';
import panelText from '@assets/find_password_sending_email_panel_text.svg';
import api from '@/api/api';

//
//
//

interface SendAuthEmailProps {
  goToNextStep: () => void;
  isEmail: boolean;
  setIsEmail: React.Dispatch<React.SetStateAction<boolean>>;
  isPassword: boolean;
  isPasswordCheck: boolean;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

//
//
//

const EMAIL_REGEX =
  /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

//
//
//

const SendAuthEmail: React.FC<SendAuthEmailProps> = ({
  goToNextStep,
  isEmail,
  setIsEmail,
  isPassword,
  isPasswordCheck,
  email,
  setEmail,
}) => {
  const [errorMsg, setErrorMsg] = useState('');

  const emailData = {
    email: email,
  };

  /**
   *
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setEmail(input);

    if (!EMAIL_REGEX.test(input)) {
      setErrorMsg('올바른 이메일 형식이 아닙니다.');
      setIsEmail(false);
    } else {
      setErrorMsg('');
      setIsEmail(true);
    }
  };

  /**
   *
   */
  const handleError = (code: string) => {
    switch (code) {
      case 'A-001' || 'A-002':
        alert('올바르지 않은 이메일 형식입니다.');
        break;
      case 'A-201':
        alert('존재하지 않는 이메일입니다.');
        break;
      default:
        alert('입력하신 이메일로 인증 메일을 보내는데 실패했습니다.');
        break;
    }
  };

  /**
   *
   */
  const checkInputValidation = () => {
    if (email === '') {
      alert('이메일을 입력해주세요.');
      return;
    }

    if (!isEmail) {
      alert('이메일이 올바르게 입력되었는지 확인해주세요.');
      return;
    }

    return true;
  };

  /**
   *
   */
  const sendEmail = () => {
    if (!checkInputValidation()) {
      return;
    }

    api
      .post('/v1/api/auth/verification', emailData, {
        params: {
          type: 'find-password',
        },
      })
      .then(() => {
        goToNextStep();
      })
      .catch((err) => {
        handleError(err.response.data.code);
      });
  };

  /**
   *
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendEmail();
  };

  /**
   *
   */
  const renderInputError = () => {
    if (isEmail || !errorMsg) {
      return;
    }

    return (
      <Error>
        <CotatoIcon
          icon="times-circle"
          size="1.25rem"
          color={(theme) => theme.colors.secondary80}
        />
        <span>{errorMsg}</span>
      </Error>
    );
  };

  /**
   *
   */
  const renderInputField = () => {
    return (
      <Box sx={{ width: '32rem', marginTop: '5rem' }}>
        <Label>
          <p>이메일 입력</p>
        </Label>
        <InputDiv>
          <CotatoIcon icon="user-solid" color={(theme) => theme.colors.gray60} />
          <InputBox
            id="id"
            name="id"
            type="text"
            placeholder="본인의 이메일(아이디)를 입력해주세요."
            value={email}
            onChange={handleEmailChange}
          />
        </InputDiv>
        {renderInputError()}
      </Box>
    );
  };

  return (
    <Wrapper>
      <CotatoPanel size="long" textImgSrc={panelText} />
      {renderInputField()}
      <CotatoButton
        width="base"
        height="long"
        color="black"
        text="버튼"
        handleClick={handleSubmit}
      />
    </Wrapper>
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
  padding: 6rem !important;
`;

const Label = styled.div`
  width: 100%;
  display: flex;
  p {
    color: ${({ theme }) => theme.colors.common.black};
    font-size: ${({ theme }) => theme.fontSize.md};
    margin: 0;
  }
`;

const InputDiv = styled.div`
  width: 100%;
  height: 3.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 0.75rem;
  margin: 0.5rem 0;
  gap: 0.625rem;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary100};
`;

const InputBox = styled.input`
  width: 100%;
  border: none;
  background: none;
  outline: none;
  font-family: Pretendard;
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  gap: 0.35rem;
  span {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.secondary80};
  }
`;

export default SendAuthEmail;