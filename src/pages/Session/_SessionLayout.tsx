import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as SessionHomeTag } from '@assets/session_home_tag.svg';
import { Link } from 'react-router-dom';
import { device, media } from '@theme/media';
import { useMediaQuery } from '@mui/material';
import { HEADER_HEIGHT } from '@theme/constants/constants';

//
//
//

interface SessionLayoutProps {
  children?: React.ReactNode;
}

//
//
//

const SessionLayout = ({ children }: SessionLayoutProps) => {
  const isTabletOrSmaller = useMediaQuery(`(max-width:${device.tablet})`);

  return (
    <Wrapper>
      <Link to="/session">
        <SessionHomeTag width={isTabletOrSmaller ? '8.8rem' : '10rem'} />
      </Link>
      {children}
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
  padding: 4rem;
  min-height: calc(100vh - ${HEADER_HEIGHT});

  ${media.tablet`
    padding: 2rem 0;
    min-height: 100vh;

    > a {
      margin-bottom: -0.6rem;
    }
  `}
`;

export default SessionLayout;
