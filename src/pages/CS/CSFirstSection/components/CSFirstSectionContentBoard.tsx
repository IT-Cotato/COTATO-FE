import React from 'react';
import { Box, Stack } from '@mui/material';
import { ReactComponent as BrowserBoardBackground } from '@assets/cs_browswer_board.svg';
import { styled } from 'styled-components';
import { ReactComponent as EducationCharacter } from '@assets/cotato_character_education_ground.svg';

//
//
//

const BOARD_WIDTH = 26;
const BOARD_HEIGHT = 10.5;

interface CSFirstSectionContentBoardProps {
  flip?: boolean;
  color?: string;
  text: string;
}

interface BrowserBoardProps {
  $flip?: boolean;
  $color?: string;
}

//
//
//

const CSFirstSectionContentBoard = ({
  flip = false,
  color,
  text,
}: CSFirstSectionContentBoardProps) => {
  return (
    <Stack
      sx={{
        height: 'fit-content',
        justifyContent: 'space-between',
        transform: flip ? 'scaleX(-1)' : 'none',
      }}
    >
      <Box
        sx={{
          marginLeft: '4rem',
          marginBottom: '-1rem',
        }}
      >
        <BrowserBoard $flip={flip} $color={color}>
          <BrowserBoardBackground />
          <p>{text}</p>
        </BrowserBoard>
      </Box>
      <EducationCharacter />
    </Stack>
  );
};

export default CSFirstSectionContentBoard;

//
//
//

const BrowserBoard = styled.div<BrowserBoardProps>`
  position: relative;
  width: ${BOARD_WIDTH}rem;
  height: ${BOARD_HEIGHT}rem;

  > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    > :first-child {
      fill: ${({ theme }) => theme.colors.common.white};
    }

    > *:not(:first-child) {
      ${({ $color }) => $color && `fill: ${$color};`}
    }
  }

  > p {
    position: relative;
    z-index: 1;
    color: ${({ theme }) => theme.colors.common.black};
    font-family: Ycomputer;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 140%;
    word-break: keep-all;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: ${({ $flip }) => ($flip ? '4.875rem 1.5rem 0 2.5rem' : '4.875rem 2rem 0 1rem')};
    transform: ${({ $flip }) => ($flip ? 'scaleX(-1)' : 'none')};
  }
`;
