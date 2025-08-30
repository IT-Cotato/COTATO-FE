import React, { useCallback } from 'react';
import { styled } from 'styled-components';
import status_background from '@assets/cs_status_background.svg';
import { Box } from '@mui/material';
import { media, device } from '@theme/media';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { DESKTOP_HEIGHT } from '../constants';

//
//
//

const BOX_WIDTH = 10.125;
const BOX_HEIGHT = 10.625;
const BOX_WIDTH_MEDIUM = 7.5;
const BOX_HEIGHT_MEDIUM = 7.875;
const BOX_WIDTH_SMALL = 6;
const BOX_HEIGHT_SMALL = 6.25;

interface CSFirstSectionContentStatusProps {
  icon: React.ReactNode;
  status: string | number;
  unit: string;
  title: string;
}

//
//
//

const CSFirstSectionContentStatus = ({
  icon,
  status,
  unit,
  title,
}: CSFirstSectionContentStatusProps) => {
  const { isTabletOrSmaller } = useBreakpoints();

  /**
   * Abandon the ones place of the number
   * 81 -> 80, 157 -> 150,
   */
  const roundDownOnesPlace = useCallback((number: string) => {
    return number.replace(/\d$/, '0');
  }, []);

  //
  //
  //

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: isTabletOrSmaller ? '0.25rem' : '0.5rem',
      }}
    >
      <StatusBox>
        {icon}
        <span>
          {roundDownOnesPlace(status.toString())}
          {unit}+
        </span>
      </StatusBox>
      <StyledTypo>{title}</StyledTypo>
    </Box>
  );
};

export default CSFirstSectionContentStatus;

//
//
//

const StatusBox = styled.div`
  background-image: url(${status_background});
  background-size: cover;
  width: ${BOX_WIDTH}rem;
  height: ${BOX_HEIGHT}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 0.5rem;

  > span {
    font-family: Pretendard;
    color: ${({ theme }) => theme.colors.gray100};
    font-size: 2rem;
    font-weight: 700;
  }

  /* ${media.desktop`
    width: ${BOX_WIDTH_MEDIUM}rem;
    height: ${BOX_HEIGHT_MEDIUM}rem;
    padding-bottom: 0.375rem;

    > span {
      font-size: 1.25rem;
    }
  `} */

  @media (max-width: ${device.desktop}), (max-height: ${DESKTOP_HEIGHT}) {
    width: ${BOX_WIDTH_MEDIUM}rem;
    height: ${BOX_HEIGHT_MEDIUM}rem;
    padding-bottom: 0.375rem;

    > span {
      font-size: 1.25rem;
    }
  }

  ${media.tablet`
    width: ${BOX_WIDTH_SMALL}rem;
    height: ${BOX_HEIGHT_SMALL}rem;
    padding-bottom: 0.25rem;
    gap: 0.5rem;

    > span {
      font-size: 1.125rem;
    }

    > svg {
      width: 2.5rem;
      height: 2rem;
    }
  `}
`;

const StyledTypo = styled.span`
  font-family: Ycomputer;
  font-size: 1.25rem;
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.colors.common.black};

  ${media.tablet`
    font-size: 1rem;
  `}
`;
