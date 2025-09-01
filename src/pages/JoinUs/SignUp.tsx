import React, { useCallback, useState, useMemo } from 'react';
import styled from 'styled-components';
import api from '@/api/api';
import {
  CotatoJoinRequest,
  CotatoJoinResponse,
  CotatoPoliciesResponse,
} from 'cotato-openapi-clients';
import { CotatoThemeType } from '@theme/theme';
import { media } from '@theme/media';
import { ReactComponent as ButtonText } from '@assets/sign_up_btn_text.svg';
import WelcomeImg from '@assets/login_welcome_img.svg';
import SignUpSuccess from '@components/SignUp/SignUpSuccess';
import CotatoPixelButton from '@components/CotatoPixelButton';
import SignUpUserAgreement from '@components/SignUp/SignUpUserAgreement';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import CotatoIcon from '@components/CotatoIcon';
import { IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/react';
import { LoadingIndicator } from '@components/LoadingIndicator';
import { debounce } from 'es-toolkit';

//
//
//

const AUTH_CODE_MAX_LENGTH = 6;
const EMAIL_REGEX = /^[^@]+@[^@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
const PASSWORD_LENTH_REGEX = /^.{8,16}$/;
const TEL_REGEX = /^010\d{4}\d{4}$/;

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [mismatchError, setMismatchError] = useState(false);
  const [authNum, setAuthNum] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 오류 메시지
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nameMessage, setNameMessage] = useState('');
  const [telMessage, setTelMessage] = useState('');

  // 유효성 검사
  const [isValidEmail, setValidEmail] = useState(false);
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

  const { data: policiesData } = useSWR<CotatoPoliciesResponse>(
    '/v2/api/policies?category=PERSONAL_INFORMATION',
    fetcher,
    { revalidateOnFocus: false, keepPreviousData: true },
  );

  /**
   * 이메일 검증 함수
   */
  const validateEmail = useCallback((email: string) => {
    if (!email) {
      setEmailErrorMessage('');
      setValidEmail(false);
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setEmailErrorMessage('잘못된 이메일 형식입니다.');
      setValidEmail(false);
    } else {
      setEmailErrorMessage('');
      setValidEmail(true);
    }
  }, []);

  /**
   *
   */
  const debouncedValidateEmail = useMemo(() => debounce(validateEmail, 500), [validateEmail]);

  /**
   *
   */
  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);

      if (!isAuthorized) {
        debouncedValidateEmail(emailCurrent);
      }
    },
    [isAuthorized, debouncedValidateEmail],
  );

  /**
   *
   */
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);
      setIsPasswordLength(PASSWORD_LENTH_REGEX.test(passwordCurrent));
      setIsPasswordRegex(PASSWORD_REGEX.test(passwordCurrent));
      if (PASSWORD_LENTH_REGEX && PASSWORD_REGEX) setIsPassword(true);
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
    const telCurrent = e.target.value;
    setTel(telCurrent);
    if (!TEL_REGEX.test(telCurrent)) {
      setTelMessage('잘못된 전화번호 형식입니다.');
      setIsTel(false);
    } else {
      setTelMessage('');
      setIsTel(true);
    }
  }, []);

  /**
   *
   */
  const handleEmailSend = async () => {
    let errorMessage = '';
    setIsLoading(true);

    await api
      .post('/v1/api/auth/verification', { email }, { params: { type: 'sign-up' } })
      .catch((err) => {
        switch (err.response.status) {
          case 409:
            errorMessage = '이미 가입된 이메일입니다.';
            break;

          case 400:
            errorMessage = '이메일 형식을 다시 확인해주세요.';

            break;

          default:
            Sentry.captureException(err);
            errorMessage = '인증 메일 발송에 실패하였습니다. 다시 시도해주세요.';
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      toast.success('인증 메일이 발송되었습니다.');
    }
  };

  /**
   *
   */
  const handleEmailAuthError = (errorCode: string) => {
    switch (errorCode) {
      case 'A-101':
        toast.error('인증번호가 일치하지 않습니다. 다시 확인해주세요.');
        break;
      case 'A-102':
        toast.error('인증번호가 만료되었습니다. 다시 인증해주세요.');
        break;
      case 'A-202':
        toast.error('인증번호 발급에 실패하였습니다. 다시 시도해주세요.');
        break;
      default:
        console.log('Exception Error: 이메일 인증 실패');
        break;
    }
  };

  /**
   *
   */
  const verifyAuthCode = async (code: string) => {
    await api
      .get('/v1/api/auth/verification', { params: { email, code, type: 'sign-up' } })
      .then(() => {
        toast.success('이메일 인증이 완료되었습니다.');
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
  const handleAuthButtonClick = async () => {
    await verifyAuthCode(authNum);
  };

  /**
   *
   */
  const handleAuthNumChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentAuthNum = e.target.value;
    if (!isAuthorized) {
      setAuthNum(currentAuthNum);
    }
    if (currentAuthNum.length === AUTH_CODE_MAX_LENGTH) {
      await verifyAuthCode(currentAuthNum);
    }
  }, []);

  /**
   *
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const policies = policiesData?.policies ?? [];
    const isPoliciesCheckedAll = policies.every((policy) => isChecked.get(policy.policyId ?? 0));

    e.preventDefault();

    if (!isPoliciesCheckedAll) {
      return toast.error('이용 약관에 동의해주세요.');
    }

    if (
      isName &&
      isValidEmail &&
      isAuthorized &&
      isTel &&
      isPassword &&
      !mismatchError &&
      isCheckedAll
    ) {
      api
        .post<CotatoJoinResponse>('/v1/api/auth/join', {
          email,
          password,
          name,
          phoneNumber: tel,
          policies: policies.map((policy) => {
            // TODO: remove if statement after api type is fixed
            if (!policy.policyId) {
              throw new (Error as any)('policyId is undefined');
            }

            return {
              policyId: policy.policyId,
              isChecked: isChecked.get(policy.policyId) ?? false,
            };
          }),
        } as CotatoJoinRequest)
        .then(() => {
          setIsSuccess(true);
        })
        .catch((err) => {
          const errorCode = err.response.data.code;
          switch (errorCode) {
            case 'A-302': {
              toast.error('이미 가입된 전화번호입니다.');
              break;
            }
            case 'A-401':
              toast.error('이메일 인증을 완료해주세요.');
              break;
          }
        });
    } else {
      if (
        isName &&
        isValidEmail &&
        isAuthorized &&
        isTel &&
        isPassword &&
        !mismatchError &&
        !isCheckedAll
      ) {
        toast.error('이용 약관에 동의해주세요.');
      } else {
        toast.error('입력값을 확인해주세요.');
      }
    }
  };

  /**
   *
   */
  const renderErrorMsg = (errorMsg: string) => {
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
  const PasswordValidation = () => {
    return (
      <ValidationSection>
        <ValidationDiv color={isPasswordLength}>
          <CotatoIcon
            icon="check-box-solid"
            size="1.5rem"
            color={(theme) => (isPasswordLength ? theme.colors.sub3[60] : theme.colors.gray60)}
          />
          <span>8-16자 입력</span>
        </ValidationDiv>
        <ValidationDiv color={isPasswordRegex}>
          <CotatoIcon
            icon="check-box-solid"
            size="1.5rem"
            color={(theme) => (isPasswordRegex ? theme.colors.sub3[60] : theme.colors.gray60)}
          />
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
            <StyledCotatoIcon
              icon="user-solid"
              size="1.5rem"
              color={(theme) => theme.colors.gray30}
            />
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
            <StyledCotatoIcon
              icon="user-solid"
              size="1.5rem"
              color={(theme) => theme.colors.gray30}
            />
            <InputBox
              type="text"
              id="email"
              name="email"
              disabled={isAuthorized}
              placeholder="이메일 형식으로 작성해주세요."
              value={email}
              onChange={handleEmailChange}
            />
            <AuthButton type="button" onClick={handleEmailSend} disabled={isAuthorized}>
              인증 메일 발송
            </AuthButton>
          </InputDiv>
          {!isValidEmail && emailErrorMessage && renderErrorMsg(emailErrorMessage)}
          <InputDiv>
            <InputBox
              type="text"
              id="auth"
              name="auth"
              placeholder="발송된 인증번호를 입력해주세요."
              value={authNum}
              onChange={handleAuthNumChange}
              disabled={isAuthorized}
            />
            <AuthButton type="button" onClick={handleAuthButtonClick} disabled={isAuthorized}>
              인증하기
            </AuthButton>
          </InputDiv>
        </Label>
        <Label>
          <span>전화번호</span>
          <InputDiv>
            <CotatoIcon
              icon="phone-ringing-low-solid"
              style={{ marginRight: '0.6rem' }}
              size="1.5rem"
              color={(theme) => theme.colors.gray30}
            />
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
            {/* <Icon src={pwIcon} alt="password icon" /> */}
            <StyledCotatoIcon
              icon="lock-solid"
              size="1.5rem"
              color={(theme) => theme.colors.gray30}
            />
            <InputBox
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={handlePasswordChange}
            />
            <IconButton onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              <CotatoIcon
                icon={isPasswordVisible ? 'eye-cross-solid' : 'eye-solid'}
                color={(theme) => theme.colors.gray30}
                size="1.5rem"
              />
            </IconButton>
          </InputDiv>
          <PasswordValidation />
        </Label>
        <Label>
          <span>비밀번호 확인</span>
          <InputDiv>
            {/* <Icon src={pwIcon} alt="password icon" /> */}
            <StyledCotatoIcon
              icon="lock-solid"
              size="1.5rem"
              color={(theme) => theme.colors.gray30}
            />
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
          policies={policiesData?.policies}
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

  //
  //
  //

  return (
    <Wrapper>
      <LoadingIndicator isLoading={isLoading} />
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
  padding: 0 12rem;
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40rem;

  ${media.tablet`
  width: 30rem;
  `}
  ${media.landscape`
  width: 20rem;
  `}
`;

const BackImg = styled.img`
  z-index: 10;
  width: 24rem;
  top: 0;

  ${media.mobile`
  width: 20rem;
  `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 50;
  margin-top: -88px;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 20px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray100};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    width: 100%;
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
`;

const StyledCotatoIcon = styled(CotatoIcon)`
  margin-right: 0.6rem;

  ${media.mobile`
    margin-right: 0.4rem;
  `}
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

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray20};
    color: ${({ theme }) => theme.colors.gray60};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-out;
  }
`;

const AuthButton = styled.button`
  width: 6rem;
  height: 1.725rem;
  font-size: 0.8rem;
  font-weight: 300;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.primary100_1};
  background: ${({ theme }) => theme.colors.primary50};
  color: ${({ theme }) => theme.colors.secondary80};
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }: { theme: CotatoThemeType }) => theme.colors.gray20};
    color: ${({ theme }: { theme: CotatoThemeType }) => theme.colors.gray60};
    cursor: not-allowed;
  }

  ${media.mobile`
    width: 4.25rem;
    height: 2rem;
    padding: 0;
  `}
`;

const Error = styled.div`
  color: ${({ theme }) => theme.colors.secondary80};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  margin: 0;
  padding-left: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  ${media.mobile`
    img {
      width: 1rem;
    }
    span {
      font-size: 0.725rem;
    }
  `}
`;

const ValidationSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 0.8rem;
  width: 100%;
`;

const ValidationDiv = styled.div<{ color: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 0.8rem;
  span {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ color, theme }) => (color ? theme.colors.sub3[60] : theme.colors.gray60)};
  }

  ${media.mobile`
    img {
      width: 1rem;
    }
    span {
      font-size: 0.8rem;
    }
  `}
`;

const UserAgreementDiv = styled.div`
  margin-top: 4.2rem;
  margin-bottom: 3rem;
  width: 100%;
`;

export default SignUp;
