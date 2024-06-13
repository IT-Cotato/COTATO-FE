import React from 'react';
import styled from 'styled-components';
import Ellipse from './Ellipse';
import AnimatedText from './AnimatedText';

const Home = () => {
  const body: any = document.querySelector('body');
  body.style.overflowX = 'hidden';

  // 새로고침마다 오른쪽으로 스크롤이 이동하는 버그 방지
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);

  console.log('Welcome!');

  return (
    <Wrapper>
      <Ground>
        <Ellipse top={'-450px'} left={'-10%'} time={20} delay={0.2} width="600px" height="600px" />
        <Ellipse top={'550px'} left={'20%'} time={0} delay={0} width="500px" height="500px" />
        <Ellipse top={'200px'} left={'50%'} time={5} delay={1} width="100px" height="100px" />
        <Ellipse top={'470px'} left={'80%'} time={10} delay={0} width="100px" height="100px" />
        <Ellipse
          top={'300px'}
          left={'55%'}
          time={10}
          delay={1.2}
          width="400px"
          height="300px"
          src="https://velog.velcdn.com/images/ea_st_ring/post/f773af96-fb7d-4f5e-8132-db3729bf3e04/image.png"
        />
        <TextBox>
          <AnimatedText />
        </TextBox>
      </Ground>
      <Div></Div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Ground = styled.div`
  width: 100vw;
  max-width: 100vw;
  min-height: 100%;
  background-color: #0d0d0d;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: fit-content;
  margin-top: 120px;
  margin-left: 180px;
  z-index: 10;
  color: #fff;
  span {
    font-size: 64px;
    font-weight: 700;
    font-family: 'Noto Sans';
    z-index: 10;
  }
  span + span {
    margin-left: 4px;
  }
  h1 {
    text-align: center;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: 'Noto Sans';
    font-size: 86px;
    margin: 0;
    z-index: 10;
  }
  h2 {
    z-index: 10;
  }
  h3 {
    text-align: center;
    font-family: 'Nanum Gothic';
    font-size: 24px;
    font-weight: 700;
    z-index: 10;
  }
  p {
    color: #404040;
    text-align: center;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: 'Noto Sans';
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 3.12px;
    margin: 0;
    z-index: 10;
  }

  button {
    width: 200px;
    height: 50px;
    margin-top: 48px;
    border: none;
    border-radius: 20px;
    background: #5ef4f0;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    z-index: 10;
    cursor: pointer;
    transition: 0.1s;
  }
  button:hover {
    transform: scale(1.02);
  }
  @media screen and (max-width: 768px) {
    margin-left: 80px;
  }
`;

const Div = styled.div`
  width: 100%;
  height: 60%;
  background-color: #fff;
  z-index: 10;
`;

export default Home;
