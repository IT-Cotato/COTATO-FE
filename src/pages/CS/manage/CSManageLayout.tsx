import React, { ReactNode, useCallback } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as ArrowBack } from '@assets/arrow_back.svg';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
  header: string;
  children: ReactNode;
}

const CSManageLayout = ({ header, children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const educationId = searchParams.get('educationId');

  const handlePrevButton = useCallback(() => {
    if (location.pathname === '/cs/manage') {
      navigate('/cs');
    } else {
      navigate(`/cs/manage?educationId=${educationId}`);
    }
  }, [location.pathname]);

  return (
    <CSManageWrapper>
      <BackButton width={24} height={24} onClick={handlePrevButton} />
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

const BackButton = styled(ArrowBack)`
  position: absolute;
  left: 72px;
  top: 64px;
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
