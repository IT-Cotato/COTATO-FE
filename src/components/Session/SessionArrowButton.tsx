import React from 'react';
import CotatoIcon from '@components/CotatoIcon';
import { styled } from 'styled-components';

//
//
//

interface SessionArrowButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

//
//
//

const SessionArrowButton = ({ direction, onClick }: SessionArrowButtonProps) => {
  return (
    <ArrowButton onClick={onClick}>
      {direction === 'prev' ? (
        <CotatoIcon icon="angle-left-solid" color={(theme) => theme.colors.common.white} />
      ) : (
        <CotatoIcon icon="angle-right-solid" color={(theme) => theme.colors.common.white} />
      )}
    </ArrowButton>
  );
};

//
//
//

const ArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.common.white_const};
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary100};

    > svg > path {
      fill: ${({ theme }) => theme.colors.common.white_const};
    }
  }
`;

export default SessionArrowButton;
