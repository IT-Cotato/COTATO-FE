import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as SessionHomeTag } from '@assets/session_home_tag.svg';
import { Link } from 'react-router-dom';

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
  return (
    <Wrapper>
      <Link to="/session">
        <SessionHomeTag width="10rem" />
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
  // full height except for the header
  min-height: calc(100vh - 4rem);
`;

export default SessionLayout;
