import { Button, ButtonProps } from '@mui/material';
import { media } from '@theme/media';
import React from 'react';
import styled from 'styled-components';

//
//
//

interface TagButtonProps extends ButtonProps {
  isSelected?: boolean;
}

//
//
//

export const TagButton = ({ isSelected, ...props }: TagButtonProps) => {
  return <StyledButton isSelected={isSelected ?? false} {...props} />;
};

const StyledButton = styled(Button)<{ isSelected: boolean }>`
  && {
    display: flex;
    min-width: 6.25rem;
    ${media.tablet`
      min-width: 0;
      padding: 0.125rem;
      `}
    justify-content: center;
    align-items: center;
    padding: 0.25rem 0.625rem;
    border: 0;
    border-radius: 0.25rem;
    gap: 0.625rem;
    color: ${({ theme, disabled }) => (disabled ? theme.colors.gray30 : theme.colors.common.black)};
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-family: YComputer;
    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.primary100_1 : theme.colors.gray30};
  }
`;
