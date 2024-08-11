import React from 'react';
import styled from 'styled-components';
import welcomeImg from '@assets/sign_up_success.svg';
import potatoImg from '@assets/login_success_potatoes.svg';
import { media } from '@theme/media';

//
//
//

const SignUpSuccess = () => {
  return (
    <Wrapper>
      <WelcomeImg src={welcomeImg} alt="welcome" />
      <PotatoImg src={potatoImg} alt="potatoes" />
      <p>
        *가입 신청 승인이 완료되면,
        <br />
        코테이토의 모든 서비스 이용이 가능합니다.
      </p>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fade_in 0.7s ease-in-out;
  p {
    color: ${({ theme }) => theme.colors.gray60};
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.sm};
    line-height: 1.5rem;
    width: 20rem;
    margin-top: 2.7rem;
  }
  @keyframes fade_in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const WelcomeImg = styled.img`
  position: relative;
  ${media.mobile`
  width: 284px;
  margin-top: 50%;
  `}
`;

const PotatoImg = styled.img`
  position: absolute;
  top: 26rem;
  animation: bounce 0.5s ease-out infinite alternate;
  @keyframes bounce {
    100% {
      transform: translateY(-4rem);
    }
  }
  ${media.mobile`
  width: 240px;
  top: 26rem;
  `}
`;

export default SignUpSuccess;
