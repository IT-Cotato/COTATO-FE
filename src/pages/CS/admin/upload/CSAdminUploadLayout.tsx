import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import CotatoIcon from '@components/CotatoIcon';
import { IconButton } from '@mui/material';

interface CSAdminUploadLayoutProps {
  children: React.ReactNode;
  generationNumber?: string;
  educationNumber?: string;
}

const CSAdminUploadLayout: React.FC<CSAdminUploadLayoutProps> = ({
  children,
  generationNumber,
  educationNumber,
}) => {
  const navigate = useNavigate();
  const { generationId, educationId } = useParams();

  //
  //
  //
  return (
    <Wrapper>
      <TitleBox>
        <IconButton
          style={{
            position: 'absolute',
            left: '2rem',
            top: '2rem',
          }}
          onClick={() => {
            const confirm = window.confirm('저장하지 않고 나가면 변경사항이 사라질 수 있어요!');
            if (confirm) {
              navigate(`/cs/start/generation/${generationId}/education/${educationId}`);
            }
          }}
        >
          <CotatoIcon
            icon="angle-left-solid"
            size="2rem"
            color={(theme) => theme.colors.primary90}
          />
        </IconButton>
        <h1>CS 문제업로드</h1>
        <p>{`${generationNumber}기 / ${educationNumber}차 세션`}</p>
      </TitleBox>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding: 40px 120px;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.colors.common.black};
  @media screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 40px 0px;
  h1 {
    font-size: 32px;
    margin-right: 16px;
  }
  p {
    font-size: 16px;
    font-weight: 700;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default CSAdminUploadLayout;
