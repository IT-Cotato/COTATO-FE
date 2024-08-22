import React from 'react';
import styled from 'styled-components';
import { ReactComponent as WorkingPotato } from '@assets/potato_working.svg';
import { media } from '@theme/media';

const ReadyState = () => {
  return (
    <Wrapper>
      <StyledWorkingPotato />
      <h1>페이지 준비중입니다. 조만간 뵙겠습니다.</h1>
      <button
        onClick={() => {
          window.location.href = '/';
        }}
      >
        홈 화면으로 이동하기
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0);

  h1 {
    color: ${({ theme }) => theme.colors.gray80_2};
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
  }
  button {
    display: flex;
    padding: 16px 32px;
    justify-content: center;
    margin-top: 24px;
    font-size: 18px;
    align-items: center;
    gap: 10px;
    border-radius: 100px;
    color: ${({ theme }) => theme.colors.gray80_2};
    background-color: ${({ theme }) => theme.colors.common.white};
    cursor: pointer;
    border: 4px solid ${({ theme }) => theme.colors.primary100_1};
  }

  ${media.landscape`
    h1 {
      font-size: 20px;
    }

    button {
      padding: 12px 28px;
      margin-top: 20px;
      font-size: 16px;
      border-radius: 80px;
    }
  `}
`;

const StyledWorkingPotato = styled(WorkingPotato)`
  width: 180px;
  height: 140px;
  margin-bottom: 16px;

  ${media.landscape`
    width: 140px;
    height: 120px;
  `}
`;

export default ReadyState;
