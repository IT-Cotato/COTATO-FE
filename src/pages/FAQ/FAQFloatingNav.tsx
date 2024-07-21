import { Stack } from '@mui/material';
import { THEME_CHANGE_TRANSITION } from '@theme/constants/constants';
import React from 'react';
import styled from 'styled-components';

//
//
//

interface FAQFloatingNavProps {
  title: string;
  summaries: string[];
  hashes: string[];
  handleNavClick: (hash: string) => void;
}

//
//
//

const FAQFloatingNav: React.FC<FAQFloatingNavProps> = ({
  title,
  summaries,
  hashes,
  handleNavClick,
}) => {
  //
  //
  //

  return (
    <Wrapper>
      <StyledTitle>{title}</StyledTitle>
      <Stack gap="0.5rem">
        {hashes.map((hash, idx) => (
          <StyledStack
            key={idx}
            gap="0.25rem"
            padding="0.5rem 1rem"
            direction="row"
            borderRadius="0.25rem"
            justifyContent="flex-start"
            onClick={() => handleNavClick(hash)}
          >
            &#x2022;
            {summaries[idx]}
          </StyledStack>
        ))}
      </Stack>
    </Wrapper>
  );
};

export default FAQFloatingNav;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.common.white};
  transition: ${THEME_CHANGE_TRANSITION};
`;

const StyledTitle = styled.div`
  color: ${({ theme }) => theme.colors.primary100_2};
  font-family: 'Pretendard';
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  margin-bottom: 1rem;
`;

const StyledStack = styled(Stack)`
  background-color: ${({ theme }) => theme.colors.gray10};
  color: ${({ theme }) => theme.colors.gray100};
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray30};
  }
`;
