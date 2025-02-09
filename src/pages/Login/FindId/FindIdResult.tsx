import React from 'react';
import styled from 'styled-components';
import CotatoIcon from '@components/CotatoIcon';
import CotatoButton from '@components/CotatoButton';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

//
//
//

interface FindIdResultProps {
  userName: string;
  userId: string;
}

//
//
//

const FindIdResult = ({ userName, userId }: FindIdResultProps) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ResultContainer>
        <CotatoIcon
          icon="check-circle-solid"
          size="2rem"
          color={(theme) => theme.colors.sub3[60]}
          style={{ padding: '1rem 0' }}
        />
        <TextDiv>
          <p>{userName} 님의 아이디를</p>
          <p>찾았습니다!</p>
        </TextDiv>
        <span>{userId}</span>
      </ResultContainer>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '2.4rem' }}>
        <CotatoButton
          isEnabled={true}
          buttonStyle="filled"
          text="로그인"
          onClick={() => navigate('/signin')}
        />
        <CotatoButton
          isEnabled={true}
          buttonStyle="line"
          text="비밀번호 찾기"
          onClick={() => navigate('/findpw')}
        />
      </Box>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div``;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2.7rem;
  padding: 1rem;
  p {
    font-family: Pretendard;
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 800;
    margin: 0;
  }
  span {
    font-family: Pretendard;
    font-size: ${({ theme }) => theme.fontSize.xl};
    color: ${({ theme }) => theme.colors.sub3[60]};
    font-weight: 800;
    padding: 2rem 0;
  }
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

export default FindIdResult;
