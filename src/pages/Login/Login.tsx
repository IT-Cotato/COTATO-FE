import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import WelcomeImg from '@assets/login_welcome_img.svg';
import idIcon from '@assets/login_id_icon.svg';
import passwordIcon from '@assets/login_pw_icon.svg';
import btnDefault from '@assets/login_btn_default.svg';
import btnHover from '@assets/login_btn_hover.svg';
import btnClicked from '@assets/login_btn_clicked.svg';
import line from '@assets/login_line.svg';
import { Link } from 'react-router-dom';
import api from '@/api/api';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { media } from '@theme/media';
import { CotatoThemeType } from '@theme/theme';

//
//
//

type btnStateType = 'default' | 'hover' | 'clicked';

//
//
//

const Login = () => {
  const [btnState, setBtnState] = useState<btnStateType>('default');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isError, setIsError] = useState(false);

  const { data, mutate } = useSWR('/v1/api/member/info', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    // 서버 리소스를 한번 받아오고 나서는 다시 받아오지 않음
  });

  const handleIdChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
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
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
          if (id === '' || password === '') {
            alert('아이디 또는 비밀번호를 입력해주세요');
          } else {
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
          }
        });
    },
    [id, password],
  );

  if (data) {
    console.log(data);
    window.location.href = '/';
  }

  return (
    <Wrapper>
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
        <ButtonContainer>
          <LoginBtn
            type="submit"
            onMouseOver={() => setBtnState('hover')}
            onMouseLeave={() => setBtnState('default')}
            onClick={() => setBtnState('clicked')}
          >
            <img
              src={
                btnState === 'default' ? btnDefault : btnState === 'hover' ? btnHover : btnClicked
              }
              style={{ width: '120px' }}
            />
          </LoginBtn>
        </ButtonContainer>
      </Form>
      <LinkContainer>
        <StyledLink to="/findid">아이디 찾기</StyledLink>
        <img src={line} />
        <StyledLink to="/findpw">비밀번호 찾기</StyledLink>
        <img src={line} />
        <StyledLink to="/joinus">회원가입</StyledLink>
      </LinkContainer>
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
  &:first-child {
    margin-bottom: 1rem;
  }
  input {
    border: none;
    width: 512px;
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
    margin-left: 1.25rem;
    margin-right: 0.8rem;
  }
  ${media.landscape`
    width: 350px;
  `}
  ${media.mobile`
    width: 220px;
  `}
`;

const ButtonContainer = styled.div`
  height: 5rem;
  display: flex;
  align-items: end;
`;

const LoginBtn = styled.button`
  background: none;
  border: none;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  padding: 0.6rem 1.25rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.common.white};
  border: 2px solid ${({ theme }) => theme.colors.primary90};
  img {
    margin: 0 20px;
  }
  ${media.mobile`
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
