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
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fade_in 0.7s ease-in-out;
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
