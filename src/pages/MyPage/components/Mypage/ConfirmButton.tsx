import React from 'react';
import styled from 'styled-components';

//
//
//

interface ConfirmButtonProps {
  isApproval: boolean;
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ConfirmButton = ({ isApproval, text, onClick }: ConfirmButtonProps) => {
  return (
    <Wrapper $isApproval={isApproval} onClick={onClick}>
      {text}
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.button<{ $isApproval: boolean }>`
  width: 8.4rem;
  height: 3.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.const.white};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 400;
  cursor: pointer;
  ${({ $isApproval, theme }) =>
    $isApproval
      ? ` border: 1px solid ${theme.colors.sub3[80]};
      background: ${theme.colors.sub3[60]}`
      : `border: 1px solid ${theme.colors.secondary100};
      background: ${theme.colors.secondary80}`};
  }
`;

export default ConfirmButton;
