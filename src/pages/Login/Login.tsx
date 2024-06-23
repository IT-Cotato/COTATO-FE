import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as WelcomeImg } from '@assets/login_welcome_img.svg';
import idIcon from '@assets/login_id_icon.svg';
import passwordIcon from '@assets/login_pw_icon.svg';
import btnDefault from '@assets/login_btn_default.svg';
import btnHover from '@assets/login_btn_hover.svg';
import btnClicked from '@assets/login_btn_clicked.svg';
import line from '@assets/login_line.svg';
import { Link } from 'react-router-dom';

//
//
//

const Login = () => {
  const [btnState, setBtnState] = useState('default');

  return (
    <Wrapper>
      <WelcomeImg style={{ position: 'absolute', zIndex: 10, width: '360px' }} />
      <Form>
        <InputBox>
          <img src={idIcon} />
          <input type="text" id="id" name="id" placeholder="아이디" />
        </InputBox>
        <InputBox>
          <img src={passwordIcon} />
          <input type="text" id="id" name="id" placeholder="비밀번호" />
        </InputBox>
        <div style={{ height: '84px', display: 'flex', alignItems: 'end', marginTop: '12px' }}>
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
        </div>
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
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 240px;
  margin-bottom: 24px;
  z-index: 100;
`;

const InputBox = styled.div`
  width: 600px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.primary90};
  background: ${({ theme }) => theme.colors.common.white};
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  input {
    border: none;
    width: 512px;
    &:focus {
      outline: none;
    }
    color: ${({ theme }) => theme.colors.gray60};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
  img {
    width: 16px;
    height: 16px;
    margin-left: 20px;
    margin-right: 8px;
  }
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
  padding: 8px 20px;
  margin-top: 32px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.common.white};
  border: 2px solid ${({ theme }) => theme.colors.primary90};
  img {
    margin: 0 20px;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray60};
  text-align: center;
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export default Login;
