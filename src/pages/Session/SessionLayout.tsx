import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from '@theme/media';
import { HEADER_HEIGHT } from '@theme/constants/constants';
import CotatoPanel from '@components/CotatoPanel';
import PanelText from '@assets/session_panel_text.svg';

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
        <CotatoPanel size="short" textImgSrc={PanelText} />
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
  padding: 4rem 8rem;
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
