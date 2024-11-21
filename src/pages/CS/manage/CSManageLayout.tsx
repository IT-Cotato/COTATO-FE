import React, { ReactNode, useCallback } from 'react';
import { styled } from 'styled-components';
import { useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import CotatoIcon from '@components/CotatoIcon';

interface Props {
  header: string;
  children: ReactNode;
}

const CSManageLayout = ({ header, children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { generationId, educationId } = useParams();

  const match = useMatch('/cs/manage/generation/:generationId/education/:educationId');

  const handlePrevButton = useCallback(() => {
    if (match) {
      navigate(`/cs/start/generation/${generationId}/education/${educationId}`);
    } else {
      navigate(`/cs/manage/generation/${generationId}/education/${educationId}`);
    }
  }, [location.pathname]);

  return (
    <CSManageWrapper>
      <IconButton
        style={{
          position: 'absolute',
          left: '4rem',
          top: '3.5rem',
        }}
        onClick={handlePrevButton}
      >
        <CotatoIcon icon="angle-left-solid" size="2rem" color={(theme) => theme.colors.primary90} />
      </IconButton>
      <CSManageHeader>
        <h3>{header}</h3>
      </CSManageHeader>
      {children}
    </CSManageWrapper>
  );
};

export default CSManageLayout;

const CSManageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: #eee;
`;

const CSManageHeader = styled.div`
  margin: 80px 0 40px;

  > h3 {
    color: #1d1d1d;
    font-family: Inter;
    font-size: 32px;
    font-weight: 600;
  }
`;
