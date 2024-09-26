import React from 'react';
import { styled } from 'styled-components';

//
//
//

interface AboutLineProps {
  width: string;
}

//
//
//

const AboutLine: React.FC<AboutLineProps> = ({ width }) => {
  return (
    <Wrapper>
      <Diamond />
      <Line $width={width} />
      <Diamond />
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Diamond = styled.div`
  width: 1rem;
  height: 1rem;
  background: ${({ theme }) => theme.colors.primary100_1};
  transform: rotate(45deg);
`;

const Line = styled.span<{ $width: string }>`
  width: ${({ $width }) => $width};
  border: 0.125rem solid transparent;
  background-image: ${({ theme }) =>
    `linear-gradient(to right, ${theme.colors.primary100_1} 50%, rgba(255, 255, 255, 0) 0%)`};
  background-size: 1.25rem 0.125rem;
`;

export default AboutLine;
