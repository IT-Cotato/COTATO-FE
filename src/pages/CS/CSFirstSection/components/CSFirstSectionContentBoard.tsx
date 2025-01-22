import React from 'react';
import { Stack } from '@mui/material';
import { ReactComponent as BrowserBoardBackground } from '@assets/cs_browswer_board.svg';
import { styled } from 'styled-components';
import { ReactComponent as EducationCharacter } from '@assets/cotato_character_education_ground.svg';
import { media } from '@theme/media';

//
//
//

const BOARD_WIDTH = 26;
const BOARD_HEIGHT = 10.5;
const BOARD_WIDTH_MEDIUM = 20;
const BOARD_HEIGHT_MEDIUM = 8.125;
const BOARD_WIDTH_SMALL = 15;
const BOARD_HEIGHT_SMALL = 6;

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
      <BrowserBoardWrapper>
        <BrowserBoard $flip={flip} $color={color}>
          <BrowserBoardBackground />
          <p>{text}</p>
        </BrowserBoard>
      </BrowserBoardWrapper>
      <StyledCharacter />
    </Stack>
  );
};

export default CSFirstSectionContentBoard;

//
//
//

const BrowserBoardWrapper = styled.div`
  margin-left: 4rem;
  margin-bottom: -1rem;

  ${media.tablet`
    margin-left: 3.5rem;
    margin-bottom: -1.5rem;
  `}
`;

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
    padding: ${({ $flip }) => ($flip ? '4.875rem 1.5rem 0 2.5rem' : '4.875rem 2.5rem 0 1.5rem')};
    transform: ${({ $flip }) => ($flip ? 'scaleX(-1)' : 'none')};
  }

  ${media.desktop`
    width: ${BOARD_WIDTH_MEDIUM}rem;
    height: ${BOARD_HEIGHT_MEDIUM}rem;

    > p {
      font-size: 1rem;
      padding: ${({ $flip }: { $flip: boolean }) => ($flip ? '3.75rem 1rem 0 2.25rem' : '3.75rem 2rem 0 1.125rem')};
  `}

  ${media.tablet`
    width: ${BOARD_WIDTH_SMALL}rem;
    height: ${BOARD_HEIGHT_SMALL}rem;

    > p {
      font-size: 0.8125rem;
      padding: ${({ $flip }: { $flip: boolean }) => ($flip ? '2.75rem 0.5rem 0 1.25rem' : '2.625rem 0.3rem 0 0.5rem')};
    }
  `}
`;

const StyledCharacter = styled(EducationCharacter)`
  ${media.tablet`
    width: 5.5rem;
    height: 4.75rem;
  `}
`;
