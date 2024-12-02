import React, { useState } from 'react';
import styled from 'styled-components';
import CotatoPanel from '@components/CotatoPanel';
import panelText from '@assets/find_password_reset_password_panel_text.svg';
import CotatoIcon from '@components/CotatoIcon';
import CotatoButton from '@components/CotatoButton';
import { Box } from '@mui/material';

//
//
//

interface ResetPasswordProps {
  isPassword: boolean;
  setIsPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isPasswordCheck: boolean;
  setIsPasswordCheck: React.Dispatch<React.SetStateAction<boolean>>;
  mismatchError: boolean;
  setMismatchError: React.Dispatch<React.SetStateAction<boolean>>;
  isEmail: boolean;
  setIsEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

//
//
//

const PASSWORD_LENGTH = /^.{8,16}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

//
//
//

const ResetPassword: React.FC<ResetPasswordProps> = ({
  isPassword,
  setIsPassword,
  isPasswordCheck,
  setIsPasswordCheck,
  mismatchError,
  setMismatchError,
  isEmail,
  setIsEmail,
}) => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isPasswordLength, setIsPasswordLength] = useState(false);
  const [isPasswordRegex, setIsPasswordRegex] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  /**
   *
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPassword(input);

    setIsPasswordLength(PASSWORD_LENGTH.test(input));
    setIsPasswordRegex(PASSWORD_REGEX.test(input));
    if (isPasswordLength && isPasswordRegex) {
      setIsPassword(true);
    }
  };

  /**
   *
   */
  const handlePasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPasswordCheck(input);

    if (password !== passwordCheck) {
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
  const handleSubmit = () => {};

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
