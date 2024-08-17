import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as ArrowRightIcon } from '@assets/arrow_right_dotted.svg';

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
      {direction === 'prev' ? <PrevIcon /> : <NextIcon />}
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

const NextIcon = styled(ArrowRightIcon)`
  > path {
    fill: ${({ theme }) => theme.colors.common.black_const};
  }
`;

const PrevIcon = styled(NextIcon)`
  transform: rotate(180deg);
`;

export default SessionArrowButton;
