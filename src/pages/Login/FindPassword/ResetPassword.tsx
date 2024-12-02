import React, { useState } from 'react';
import styled from 'styled-components';
import CotatoPanel from '@components/CotatoPanel';
import panelText from '@assets/find_password_reset_password_panel_text.svg';
import CotatoIcon from '@components/CotatoIcon';
import CotatoButton from '@components/CotatoButton';
import { Box } from '@mui/material';
import api from '@/api/api';
import { useNavigate } from 'react-router-dom';

//
//
//

const PASSWORD_LENGTH = /^.{8,16}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

//
//
//

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isPassword, setIsPassword] = useState(false);
  const [mismatchError, setMismatchError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isPasswordLength, setIsPasswordLength] = useState(false);
  const [isPasswordRegex, setIsPasswordRegex] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  /**
   *
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPassword(input);

    setIsPasswordLength(PASSWORD_LENGTH.test(input));
    setIsPasswordRegex(PASSWORD_REGEX.test(input));

    setIsPassword(isPasswordLength && isPasswordRegex);
  };

  /**
   *
   */
  const handlePasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPasswordCheck(input);

    if (password !== input) {
      setMismatchError(true);
      setErrorMsg('비밀번호가 일치하지 않습니다.');
    } else {
      setMismatchError(false);
      setErrorMsg('');
    }
  };

  /**
   *
   */
  const handleError = (code: string) => {
    switch (code) {
      case 'A-002':
        alert('올바르지 않은 비밀번호 형식입니다.');
        break;
      case 'M-301':
        alert('이전에 사용한 적 없는 비밀번호를 사용해주세요.');
        break;
      default:
        alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
        break;
    }
  };

  /**
   *
   */
  const updatePassword = () => {
    api
      .patch(
        '/v1/api/member/update/password',
        {
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token_reset_password')}`,
          },
        },
      )
      .then(() => {
        alert('비밀번호 변경이 완료되었습니다.');
        localStorage.removeItem('token_reset_password');
        navigate('/signin');
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

    if (isPassword && !mismatchError) {
      updatePassword();
    } else {
      alert('입력값을 확인해주세요.');
    }
  };

  /**
   *
   */
  const renderInputError = () => {
    if (!mismatchError) {
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
  const renderVisibleButton = () => {
    return (
      <div onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
        <CotatoIcon
          icon={isPasswordVisible ? 'eye-cross-solid' : 'eye-solid'}
          size="1.5rem"
          color={(theme) => theme.colors.gray60}
        />
      </div>
    );
  };

  /**
   *
   */
  const renderPasswordValidation = () => {
    return (
      <Box sx={{ display: 'flex', gap: '0.6rem', paddingLeft: '0.75rem' }}>
        <ValidationDiv isValid={isPasswordLength}>
          <CotatoIcon
            icon="check-box-solid"
            size="1.5rem"
            color={(theme) => (isPasswordLength ? theme.colors.sub3[60] : theme.colors.gray60)}
          />
          <span>8-16자 입력</span>
        </ValidationDiv>
        <ValidationDiv isValid={isPasswordRegex}>
          <CotatoIcon
            icon="check-box-solid"
            size="1.5rem"
            color={(theme) => (isPasswordRegex ? theme.colors.sub3[60] : theme.colors.gray60)}
          />
          <span>영문, 숫자, 특수문자 입력</span>
        </ValidationDiv>
      </Box>
    );
  };

  /**
   *
   */
  const renderPasswordInputField = () => {
    return (
      <Box>
        <Label>
          <p>새 비밀번호 입력</p>
        </Label>
        <InputDiv>
          <CotatoIcon icon="lock-alt-solid" color={(theme) => theme.colors.gray60} />
          <InputBox
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            value={password}
            placeholder="비밀번호를 입력해주세요."
            onChange={handlePasswordChange}
          />
          {renderVisibleButton()}
        </InputDiv>
        {renderPasswordValidation()}
      </Box>
    );
  };

  /**
   *
   */
  const renderPasswordCheckInputField = () => {
    return (
      <Box>
        <Label>
          <p>새 비밀번호 확인</p>
        </Label>
        <InputDiv>
          <CotatoIcon icon="lock-alt-solid" color={(theme) => theme.colors.gray60} />
          <InputBox
            type="password"
            id="password"
            name="password"
            value={passwordCheck}
            placeholder="비밀번호를 한 번 더 입력해주세요."
            onChange={handlePasswordCheckChange}
          />
        </InputDiv>
        {renderInputError()}
      </Box>
    );
  };

  /**
   *
   */
  const renderInputField = () => {
    return (
      <InputSection>
        {renderPasswordInputField()}
        {renderPasswordCheckInputField()}
      </InputSection>
    );
  };

  return (
    <Wrapper>
      <CotatoPanel size="default" textImgSrc={panelText} />
      {renderInputField()}
      <CotatoButton
        width="base"
        height="long"
        color="black"
        text="비밀번호 재설정"
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
  padding: 6rem;
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

const InputSection = styled.div`
  width: 32rem;
  margin-top: 5rem;
  margin-bottom: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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

const ValidationDiv = styled.div<{ isValid: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.3rem;
  span {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ isValid, theme }) => (isValid ? theme.colors.sub3[60] : theme.colors.gray60)};
  }
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  gap: 0.35rem;
  padding-left: 0.75rem;
  span {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.secondary80};
  }
`;

export default ResetPassword;
