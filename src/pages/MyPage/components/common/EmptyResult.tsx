import CotatoIcon from '@components/CotatoIcon';
import React from 'react';
import styled, { CSSProperties } from 'styled-components';

//
//
//

interface EmptyResultProps {
  text: string;
  border?: CSSProperties['border'];
}

//
//
//

const EmptyResult = ({ text, border }: EmptyResultProps) => {
  return (
    <Wrapper border={border}>
      <CotatoIcon icon="user-check-solid" size="2.5rem" color={(theme) => theme.colors.gray60} />
      <p>{text}</p>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div<{ border?: CSSProperties['border'] }>`
  width: 100%;
  height: 30rem;
  border-radius: 0.25rem;
  border: ${({ theme, border }) => (border ? `${border}` : `2px solid ${theme.colors.primary70}`)};
  background: ${({ theme }) => theme.colors.common.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  p {
    text-align: center;
    color: ${({ theme }) => theme.colors.gray60};
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 400;
    margin: 0;
  }
`;

export default EmptyResult;
