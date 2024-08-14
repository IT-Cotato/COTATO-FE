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
      <div>
        <WelcomeImg src={welcomeImg} alt="welcome" />
        <PotatoImg src={potatoImg} alt="potatoes" />
      </div>
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
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  p {
    color: ${({ theme }) => theme.colors.gray60};
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.sm};
    line-height: 1.5rem;
    width: 20rem;
    margin-top: 2.5rem;
  }
  @keyframes fade_in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  ${media.tablet`
    margin-top: 4.5rem;
  `}
  ${media.mobile`
    div {
      margin-top: 30%;
    }
  `}
`;

const WelcomeImg = styled.img`
  ${media.landscape`
    width: 24rem;
  `}
  ${media.mobile`
    width: 17rem;
  `}
`;

const PotatoImg = styled.img`
  width: 20rem;
  margin-top: -3rem;
  animation: bounce 0.5s ease-out infinite alternate;
  @keyframes bounce {
    100% {
      transform: translateY(-4rem);
    }
  }

  ${media.landscape`
    width: 18rem;
  `}
  ${media.mobile`
    width: 17rem;
  `}
`;

export default SignUpSuccess;
