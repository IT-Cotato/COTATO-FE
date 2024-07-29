import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import SignUpModal from '@components/SignUpModal';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';
import WelcomeImg from '@assets/login_welcome_img.svg';
import { CotatoThemeType } from '@theme/theme';
import userIcon from '@assets/sign_up_user_icon.svg';
import phoneIcon from '@assets/sign_up_phone_icon.svg';
import pwIcon from '@assets/sign_up_pw_icon.svg';
import PixelButton from '@components/PixelButton';
import { ReactComponent as ButtonText } from '@assets/sign_up_btn_text.svg';
import eyesDefaultIcon from '@assets/sign_up_eyes_default_icon.svg';
import eyesInvisibleIcon from '@assets/sign_up_eyes_invisible_icon.svg';

const SignUp = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [mismatchError, setMismatchError] = useState(false);
  const [authNum, setAuthNum] = useState('');

  // 오류 메시지
  const [idMessage, setIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [telMessage, setTelMessage] = useState('');

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isTel, setIsTel] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setId(emailCurrent);
    if (!emailRegex.test(emailCurrent)) {
      setIdMessage('올바른 이메일 형식이 아닙니다.');
      setIsId(false);
    } else {
      setIdMessage('');
      setIsId(true);
    }
  }, []);

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,16}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);
      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          '영문 대소문자, 숫자, 특수문자(@$!%*#?&.)를 포함하여 8-16자로 입력하세요.',
        );
        setIsPassword(false);
      } else {
        setPasswordMessage('');
        setIsPassword(true);
      }
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (!e.target.value) {
      setNameMessage('필수 입력 항목입니다!');
      setIsName(false);
    } else {
      setNameMessage('');
      setIsName(true);
    }
  }, []);

  const onChangeTel = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const telRegex = /^010\d{4}\d{4}$/;
    const telCurrent = e.target.value;
    setTel(telCurrent);
    if (!telRegex.test(telCurrent)) {
      setTelMessage('올바른 전화번호 형식이 아닙니다.');
      setIsTel(false);
    } else {
      setTelMessage('');
      setIsTel(true);
    }
  }, []);

  const emailData = {
    email: id,
  };
  const onSendEmail = async () => {
    if (isId) {
      alert('인증 메일이 발송되었습니다.');
    }
    await api
      .post('/v1/api/auth/verification', emailData, {
        params: {
          type: 'sign-up',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 409) {
          alert('이미 가입된 이메일입니다.');
        } else if (err.response.status === 400) {
          alert('이메일 형식을 다시 확인해주세요.');
        }
      });
  };

  const handleEmailAuth = async () => {
    await api
      .get('/v1/api/auth/verification', {
        params: {
          email: id,
          code: authNum,
          type: 'sign-up',
        },
      })
      .then((res) => {
        console.log(res);
        alert('이메일 인증이 완료되었습니다.');
        setIsAuthorized(true);
      })
      .catch((err) => {
        console.log(err);
        alert('인증번호가 일치하지 않습니다. 다시 확인해주세요.'); // 10분 지난 경우 따로 처리?
      });
  };

  const onChangeAuthNum = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthNum(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(id, password, passwordCheck, name, tel);
      if (!mismatchError) {
        console.log('서버로 회원가입하기');
        api
          .post('/v1/api/auth/join', {
            email: id,
            password: password,
            name: name,
            phoneNumber: tel,
          })
          .then((res) => {
            console.log(res);
            if (isId && isPassword && !mismatchError && isName && isTel && isAuthorized) {
              setIsModalOpen(true);
            }
          })
          .catch((err) => {
            console.log(err);
            setIsModalOpen(false);
            if (err.response.data.message === '존재하는 전화번호입니다.') {
              alert('이미 가입된 전화번호입니다.');
            } else {
              alert('입력값을 확인해주세요.');
            }
          });
      }
    },
    [id, password, passwordCheck, name, tel, mismatchError, authNum],
  );

  return (
    <Wrapper>
      <FormDiv>
        <BackImg src={WelcomeImg} />
        <Form onSubmit={onSubmit}>
          <Label>
            <span>이름</span>
            <InputDiv>
              <Icon src={userIcon} alt="user icon" />
              <InputBox
                type="text"
                id="name"
                name="name"
                placeholder="이름을 입력해주세요."
                value={name}
                onChange={onChangeName}
              />
            </InputDiv>
            {!isName && <Error>{nameMessage}</Error>}
          </Label>
          <Label>
            <span>아이디</span>
            <InputDiv>
              <Icon src={userIcon} alt="user icon" />
              <InputBox
                type="text"
                id="id"
                name="id"
                placeholder="이메일 형식으로 작성해주세요."
                value={id}
                onChange={onChangeId}
              />
              <AuthButton type="button" onClick={onSendEmail} disable={isAuthorized}>
                인증 메일 발송
              </AuthButton>
            </InputDiv>
            {!isId && <Error>{idMessage}</Error>}
            <InputDiv>
              <InputBox
                type="text"
                id="id"
                name="id"
                placeholder="발송된 이메일의 인증번호를 입력해주세요."
                value={authNum}
                onChange={onChangeAuthNum}
              />
              <AuthButton type="button" onClick={handleEmailAuth} disable={isAuthorized}>
                인증하기
              </AuthButton>
            </InputDiv>
          </Label>
          <Label>
            <span>전화번호</span>
            <InputDiv>
              <Icon src={phoneIcon} alt="phone icon" />
              <InputBox
                type="tel"
                id="tel"
                name="tel"
                placeholder="'-'를 제외한 숫자만 입력해주세요."
                value={tel}
                onChange={onChangeTel}
              />
            </InputDiv>
            {!isTel && <Error>{telMessage}</Error>}
          </Label>
          <Label>
            <span>비밀번호</span>
            <InputDiv>
              <Icon src={pwIcon} alt="password icon" />
              <InputBox
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={onChangePassword}
              />
              <Eyes
                src={isPasswordVisible ? eyesInvisibleIcon : eyesDefaultIcon}
                alt="eyes icon"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            </InputDiv>
            {!isPassword && <Error>{passwordMessage}</Error>}
          </Label>
          <Label>
            <span>비밀번호 확인</span>
            <InputDiv>
              <Icon src={pwIcon} alt="password icon" />
              <InputBox
                type="password"
                id="passwordCheck"
                name="passwordCheck"
                placeholder="비밀번호를 한 번 더 입력해주세요."
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
            </InputDiv>
            {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          </Label>
          <ButtonDiv>
            <PixelButton BtnTextImg={ButtonText} />
          </ButtonDiv>
        </Form>
      </FormDiv>
    </Wrapper>
  );
};

export default SignUp;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 4rem;
  margin-bottom: 5rem;

  @media screen and (max-width: 392px) {
    margin-top: 40px;
  }
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackImg = styled.img`
  z-index: 10;
  width: 24rem;
  top: 0px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  margin-top: -88px;
`;

const Label = styled.label`
  margin-bottom: 20px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray100};
  span {
    padding-left: 4px;
  }
`;

const InputDiv = styled.div`
  width: 40rem !important;
  height: 52px;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary90} !important;
  background: ${({ theme }) => theme.colors.common.white};
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 512px;
  margin-top: 4px;
  padding: 0 1rem;
  position: relative;

  @media screen and (max-width: 768px) {
    width: 440px !important;
  }
  @media screen and (max-width: 392px) {
    width: 340px !important;
    &::placeholder {
      font-size: 0.74rem;
    }
    padding: 12px;
    margin-bottom: 4px;
  }
`;

const Icon = styled.img`
  padding-right: 0.6rem;
`;

const InputBox = styled.input`
  border: none;
  width: 100%;
  background: ${({ theme }) => theme.colors.common.white};
  &:focus {
    outline: none;
  }
`;

const AuthButton = styled.button<{ disable: boolean }>`
  width: 96px;
  height: 36px;
  font-size: 0.8rem;
  font-weight: 300;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.primary90};
  color: #fff;
  border: none;
  position: absolute;
  right: 12px;
  top: 6px;
  cursor: pointer;
  ${(props) =>
    props.disable &&
    `
    background: ${({ theme }: { theme: CotatoThemeType }) => theme.colors.gray20};
    pointer-events: none;
    cursor: default;
  `}

  @media screen and (max-width: 392px) {
    width: 72px;
    height: 32px;
    font-size: 0.6rem;
    top: 10px;
  }
`;

const Eyes = styled.img`
  position: absolute;
  right: 12px;
`;

const Error = styled.p`
  color: #eb5353;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  padding-left: 4px;
`;

const ButtonDiv = styled.div`
  margin-top: 10rem;
`;
