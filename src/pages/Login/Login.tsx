import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import WelcomeImg from '@assets/login_welcome_img.svg';
import idIcon from '@assets/login_id_icon.svg';
import passwordIcon from '@assets/login_pw_icon.svg';
import line from '@assets/login_line.svg';
import { Link, useNavigate } from 'react-router-dom';
import api from '@/api/api';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { media } from '@theme/media';
import { CotatoThemeType } from '@theme/theme';
import LoginSuccess from '@components/LoginSuccess';
import CotatoPixelButton from '@components/CotatoPixelButton';
import { ReactComponent as ButtonText } from '@assets/login_btn_text.svg';

//
//
//

const DELAY_TIME = 3000;

//
//
//

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const { mutate } = useSWR('/v1/api/member/info', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    // 서버 리소스를 한번 받아오고 나서는 다시 받아오지 않음
  });

  /**
   *
   */
  const handleIdChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);

  /**
   *
   */
  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  /**
   *
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    api
      .post('/login', {
        email: id,
        password: password,
      })
      .then((res) => {
        localStorage.setItem('token', res.headers.accesstoken);
        mutate('/v1/api/member/info'); // 로그인 후에는 swr 요청을 수동으로 해준다
        handleLoginSuccess();
      })
      .catch(() => {
        setIsError(true);
        // will be changed to toast
        !id || !password
          ? alert('아이디 또는 비밀번호를 입력해주세요')
          : alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      });
  };

  /**
   *
   */
  const handleLoginSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => {
      if (window.location.pathname !== '/signin') {
        return;
      }

      navigate('/');
    }, DELAY_TIME);
  };

  /**
   *
   */
  const renderLoginForm = () => {
    return (
      <>
        <BackImg src={WelcomeImg} />
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <InputBox>
              <img src={idIcon} />
              <input type="text" id="id" name="id" placeholder="아이디" onChange={handleIdChange} />
            </InputBox>
            <InputBox>
              <img src={passwordIcon} />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호"
                onChange={handlePasswordChange}
              />
            </InputBox>
          </InputContainer>
          <CotatoPixelButton BtnTextImg={ButtonText} />
        </Form>
      </>
    );
  };

  /**
   *
   */
  const renderNavSection = () => {
    return (
      <>
        <LinkContainer>
          <StyledLink to="/findid">아이디 찾기</StyledLink>
          <img src={line} />
          <StyledLink to="/findpw">비밀번호 찾기</StyledLink>
          <img src={line} />
          <StyledLink to="/joinus">회원가입</StyledLink>
        </LinkContainer>
      </>
    );
  };

  /**
   *
   */
  const renderLogin = () => {
    if (isSuccess) return;

    return (
      <>
        {renderLoginForm()}
        {renderNavSection()}
      </>
    );
  };

  /**
   *
   */
  const renderLoginSuccess = () => {
    if (!isSuccess) return;

    return <LoginSuccess />;
  };

  return (
    <Wrapper>
      {renderLogin()}
      {renderLoginSuccess()}
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 4rem;
  flex-direction: column;
  align-items: center;

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.colors.common.white} inset;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.gray60}; // 글자색 변경
  }
`;

const BackImg = styled.img`
  position: absolute;
  z-index: 10;
  width: 360px;
  ${media.mobile`
  width: 284px;
  margin-top: 72px;
`}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 14rem;
  margin-bottom: 3.6rem;
  z-index: 100;
`;

const InputContainer = styled.div`
  margin-bottom: 2rem;
`;

const InputBox = styled.div`
  width: 600px;
  height: 52px;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary90};
  background: ${({ theme }) => theme.colors.common.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1.25rem;
  &:first-child {
    margin-bottom: 1rem;
  }
  input {
    border: none;
    width: 100%;
    &:focus {
      outline: none;
    }
    caret-color: ${({ theme }) => theme.colors.primary90};
    caret-shape: bar;
    background-color: ${({ theme }) => theme.colors.common.white};
    color: ${({ theme }) => theme.colors.gray60};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
  img {
    width: 16px;
    height: 16px;
    margin-right: 0.8rem;
  }

  ${media.landscape`
    width: 350px;
  `}
  ${media.mobile`
    width: 220px;
  `}
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 25rem;
  height: fit-content;
  padding: 0.6rem 1.25rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.common.white};
  border: 2px solid ${({ theme }) => theme.colors.primary90};
  img {
    margin: 0 20px;
  }

  ${media.mobile`
    width: 18rem;
    img {
      margin: 0 12px;
    }
  `}
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray60};
  text-align: center;
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.md};
  ${media.mobile`
    font-size: ${({ theme }: { theme: CotatoThemeType }) => theme.fontSize.xs};
  `}
`;

export default Login;
