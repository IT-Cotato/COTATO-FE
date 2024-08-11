import React, { useCallback, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import api from '@/api/api';
import { CotatoSendEmailRequest } from 'cotato-openapi-clients';
import { CotatoThemeType } from '@theme/theme';
import { media } from '@theme/media';
import { ReactComponent as ButtonText } from '@assets/sign_up_btn_text.svg';
import { ReactComponent as CheckIcon } from '@assets/sign_up_check_icon.svg';
import WelcomeImg from '@assets/login_welcome_img.svg';
import userIcon from '@assets/sign_up_user_icon.svg';
import phoneIcon from '@assets/sign_up_phone_icon.svg';
import pwIcon from '@assets/sign_up_pw_icon.svg';
import eyesDefaultIcon from '@assets/sign_up_eyes_default_icon.svg';
import eyesInvisibleIcon from '@assets/sign_up_eyes_invisible_icon.svg';
import unvalidIcon from '@assets/sign_up_unvalid_icon.svg';
import SignUpSuccess from '@components/SignUp/SignUpSuccess';
import CotatoPixelButton from '@components/CotatoPixelButton';
import SignUpUserAgreement from '@components/SignUp/SignUpUserAgreement';

//
//
//

const AGREEMENT_ITEMS = [
  {
    id: 1,
    name: '개인정보 수집 및 이용',
    isRequired: true,
    content:
      '개인정보보호법에 따라 코테이토에 회원가입을 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용 목적, 개인정보의 보유 및 이용 기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내해 드리니 확인 후 동의하여 주시기를 바랍니다.\n회원 가입을 위해서는 아래와 같이 개인정보를 수집·이용합니다\n\n1. 개인정보 수집 항목: 이름, 아이디(이메일), 비밀번호, 전화번호\n2. 개인정보 수집 목적: 회원 관리\n3. 보유 및 이용 기간: 회원 탈퇴 시까지\n\n이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있으나 동의 거부 시 서비스 이용이 제한됩니다.',
  },
  {
    id: 2,
    name: '개인위치정보 수집 및 이용',
    isRequired: true,
    content:
      '코테이토 페이지에서 서비스 제공을 위해 이용자의 현재 위치 정보를 수집합니다. 이에 따라 위치기반서비스와 관련하여 정보 수집 동의에 관한 사항을 안내해 드리니 확인 후 동의하여 주시기를 바랍니다.\n\n1. 수집 정보 : 현재 GPS 위치 정보\n2. 개인위치정보 수집 목적 : 출석 확인\n3. 개인위치정보 사용 방법 : 출석 체크 시에만 사용되며, 다른 목적으로 사용되지 않습니다. 출석 확인 후 정보가 저장되지 않으며, 즉시 삭제됩니다.\n4. 보유 및 이용 기간: 회원 탈퇴 시까지\n\n이용자는 언제든지 개인위치정보 수집 동의를 철회할 수 있으며, 이 경우 서비스 이용에 일부 제한이 있을 수 있습니다.\n\n수집된 정보는 동아리 활동 종료 시 폐기 됩니다. ',
  },
];

//
//
//

const SignUp = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [mismatchError, setMismatchError] = useState(false);
  const [authNum, setAuthNum] = useState('');

  // 오류 메시지
  const [idMessage, setIdMessage] = useState('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nameMessage, setNameMessage] = useState('');
  const [telMessage, setTelMessage] = useState('');

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordLength, setIsPasswordLength] = useState(false);
  const [isPasswordRegex, setIsPasswordRegex] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isTel, setIsTel] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState<Map<number, boolean>>(
    new Map(AGREEMENT_ITEMS.map((item) => [item.id, false])),
  );

  const theme = useTheme();

  /**
   *
   */
  const handleIdChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isId && !isAuthorized) {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setId(emailCurrent);
      if (!emailRegex.test(emailCurrent)) {
        setIdMessage('잘못된 이메일 형식입니다.');
        setIsId(false);
      } else {
        setIdMessage('');
        setIsId(true);
      }
    }
  }, []);

  /**
   *
   */
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordLength = /^.{8,16}$/;
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);
      setIsPasswordLength(passwordLength.test(passwordCurrent));
      setIsPasswordRegex(passwordRegex.test(passwordCurrent));
      if (passwordLength && passwordRegex) setIsPassword(true);
    },
    [isPasswordLength, isPasswordRegex, passwordCheck],
  );

  /**
   *
   */
  const handlePasswordCheckChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const PasswordCheckCurrent = e.target.value;
      setPasswordCheck(PasswordCheckCurrent);
      if (PasswordCheckCurrent !== password) {
        setMismatchError(true);
        setPasswordCheckMessage('비밀번호가 일치하지 않습니다.');
      } else {
        setMismatchError(false);
        setPasswordCheckMessage('');
      }
    },
    [password],
  );

  /**
   *
   */
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (!e.target.value) {
      setNameMessage('필수 입력 항목입니다!');
      setIsName(false);
    } else {
      setNameMessage('');
      setIsName(true);
    }
  }, []);

  /**
   *
   */
  const handleTelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const telRegex = /^010\d{4}\d{4}$/;
    const telCurrent = e.target.value;
    setTel(telCurrent);
    if (!telRegex.test(telCurrent)) {
      setTelMessage('잘못된 전화번호 형식입니다.');
      setIsTel(false);
    } else {
      setTelMessage('');
      setIsTel(true);
    }
  }, []);

  const emailData = {
    email: id,
  } as CotatoSendEmailRequest;

  /**
   *
   */
  const handleEmailSend = async () => {
    if (isId) {
      alert('인증 메일이 발송되었습니다.');
    }
    await api
      .post('/v1/api/auth/verification', emailData, {
        params: {
          type: 'sign-up',
        },
      })
      .catch((err) => {
        if (err.response.status === 409) {
          alert('이미 가입된 이메일입니다.');
        } else if (err.response.status === 400) {
          alert('이메일 형식을 다시 확인해주세요.');
        }
      });
  };

  /**
   *
   */
  const handleEmailAuthError = (errorCode: string) => {
    switch (errorCode) {
      case 'A-101':
        alert('인증번호가 일치하지 않습니다. 다시 확인해주세요.');
        break;
      case 'A-102':
        alert('인증번호가 만료되었습니다. 다시 인증해주세요.');
        break;
      case 'A-202':
        alert('인증번호 발급에 실패하였습니다. 다시 시도해주세요.');
        break;
      default:
        console.log('Exception Error: 이메일 인증 실패');
        break;
    }
  };

  /**
   *
   */
  const handleAuthButtonClick = async () => {
    await api
      .get('/v1/api/auth/verification', {
        params: {
          email: id,
          code: authNum,
          type: 'sign-up',
        },
      })
      .then(() => {
        alert('이메일 인증이 완료되었습니다.');
        setIsAuthorized(true);
      })
      .catch((err) => {
        setAuthNum('');
        const errorCode = err.response.data.code;
        handleEmailAuthError(errorCode);
      });
  };

  /**
   *
   */
  const handleAuthNumChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAuthorized) setAuthNum(e.target.value);
  }, []);

  /**
   *
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isName && isId && isAuthorized && isTel && isPassword && !mismatchError && isCheckedAll) {
      api
        .post('/v1/api/auth/join', {
          email: id,
          password: password,
          name: name,
          phoneNumber: tel,
        })
        .then(() => {
          setIsSuccess(true);
        })
        .catch((err) => {
          const errorCode = err.response.data.code;
          if (errorCode === 'A-302') alert('이미 가입된 전화번호입니다.');
          if (errorCode === 'A-401') alert('이메일 인증을 완료해주세요.');
        });
    } else {
      if (
        isName &&
        isId &&
        isAuthorized &&
        isTel &&
        isPassword &&
        !mismatchError &&
        !isCheckedAll
      ) {
        alert('이용 약관에 동의해주세요.');
      } else {
        alert('입력값을 확인해주세요.');
      }
    }
  };

  /**
   *
   */
  const renderErrorMsg = (errorMsg: string) => {
    return (
      <Error>
        <img src={unvalidIcon} alt="unvalid icon" />
        <span>{errorMsg}</span>
      </Error>
    );
  };

  /**
   *
   */
  const PasswordValidation = () => {
    return (
      <ValidationSection>
        <ValidationDiv color={isPasswordLength}>
          <CheckIcon fill={isPasswordLength ? theme.colors.sub3[60] : theme.colors.gray60} />
          <span>8-16자 입력</span>
        </ValidationDiv>
        <ValidationDiv color={isPasswordRegex}>
          <CheckIcon fill={isPasswordRegex ? theme.colors.sub3[60] : theme.colors.gray60} />
          <span>영문, 숫자, 특수문자 입력</span>
        </ValidationDiv>
      </ValidationSection>
    );
  };

  /**
   *
   */
  const renderSignUpForm = () => {
    return (
      <>
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
              onChange={handleNameChange}
            />
          </InputDiv>
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
              onChange={handleIdChange}
            />
            <AuthButton type="button" onClick={handleEmailSend} disable={isAuthorized}>
              인증 메일 발송
            </AuthButton>
          </InputDiv>
          {!isId && idMessage && renderErrorMsg(idMessage)}
          <InputDiv>
            <InputBox
              type="text"
              id="auth"
              name="auth"
              placeholder="발송된 이메일의 인증번호를 입력해주세요."
              value={authNum}
              onChange={handleAuthNumChange}
            />
            <AuthButton type="button" onClick={handleAuthButtonClick} disable={isAuthorized}>
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
              onChange={handleTelChange}
            />
          </InputDiv>
          {!isTel && telMessage && renderErrorMsg(telMessage)}
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
              onChange={handlePasswordChange}
            />
            <Eyes
              src={isPasswordVisible ? eyesInvisibleIcon : eyesDefaultIcon}
              alt="eyes icon"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </InputDiv>
          <PasswordValidation />
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
              onChange={handlePasswordCheckChange}
            />
          </InputDiv>
          {mismatchError && renderErrorMsg(passwordCheckMessage)}
        </Label>
      </>
    );
  };

  /**
   *
   */
  const renderUserAgreement = () => {
    return (
      <UserAgreementDiv>
        <SignUpUserAgreement
          agreementItems={AGREEMENT_ITEMS}
          isCheckedAll={isCheckedAll}
          setIsCheckedAll={setIsCheckedAll}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
      </UserAgreementDiv>
    );
  };

  /**
   *
   */
  const renderSubmitButton = () => {
    return <CotatoPixelButton BtnTextImg={ButtonText} />;
  };

  /**
   *
   */
  const renderSignUp = () => {
    if (isSuccess) return;

    return (
      <FormDiv>
        <BackImg src={WelcomeImg} />
        <Form onSubmit={handleSubmit}>
          {renderSignUpForm()}
          {renderUserAgreement()}
          {renderSubmitButton()}
        </Form>
      </FormDiv>
    );
  };

  /**
   *
   */
  const renderSignUpSuccess = () => {
    if (!isSuccess) return;

    return <SignUpSuccess />;
  };

  return (
    <Wrapper>
      {renderSignUp()}
      {renderSignUpSuccess()}
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
  padding-top: 4rem !important;
  margin-bottom: 5rem;
  padding: 0 30rem;

  @media screen and (max-width: 392px) {
    margin-top: 40px;
  }
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const BackImg = styled.img`
  z-index: 10;
  width: 24rem;
  top: 0;
  ${media.mobile`
  width: 284px;
  `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  margin-top: -88px;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 20px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray100};
  width: 100%;
  span {
    padding-left: 4px;
  }
`;

const InputDiv = styled.div`
  width: 100%;
  height: 3.5rem;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary90} !important;
  background: ${({ theme }) => theme.colors.common.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.5rem 0;
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
    padding: 0.75rem;
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
  font-family: Pretendard;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.common.black};
  &:focus {
    outline: none;
  }
`;

const AuthButton = styled.button<{ disable: boolean }>`
  width: 6rem;
  height: 1.75rem;
  font-size: 0.8rem;
  font-weight: 300;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.primary100_1};
  background: ${({ theme }) => theme.colors.primary50};
  color: ${({ theme }) => theme.colors.secondary80};
  position: absolute;
  right: 1rem;
  top: 25%;
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
  right: 0.75rem;
`;

const Error = styled.p`
  color: ${({ theme }) => theme.colors.secondary80};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  margin: 0;
  padding-left: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ValidationSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 0.8rem;
`;

const ValidationDiv = styled.div<{ color: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 0.8rem;
  img {
    width: 1.2rem;
    margin-right: 0.3rem;
  }
  span {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ color, theme }) => (color ? theme.colors.sub3[60] : theme.colors.gray60)};
  }
`;

const UserAgreementDiv = styled.div`
  margin-top: 4.2rem;
  margin-bottom: 3rem;
  width: 100%;
`;

export default SignUp;
