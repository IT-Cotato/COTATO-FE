import React from 'react';
import { styled } from 'styled-components';

//
//
//

interface SessionIconProps {
  Icon: React.ReactNode;
  /**
   * size of the icon
   * - **sm** : small
   * - **md** : medium
   * - **lg** : large
   */
  size: string;
}

interface CircleProps {
  $radius: string;
  $padding: string;
}

//
//
//

/**
 * icon with circle background
 * @param Icon svg file to ReactComponent
 * @param size size of the icon (default : sm)
 */
const SessionIcon = ({ Icon, size = 'sm' }: SessionIconProps) => {
  /**
   *
   */
  const getIconStyles = () => {
    if (size === 'sm') {
      return {
        radius: '1.2rem',
        padding: '0.2rem',
      };
    } else if (size === 'md') {
      return {
        radius: '2rem',
        padding: '0.4rem',
      };
    } else if (size === 'lg') {
      return {
        radius: '2.5rem',
        padding: '0.5rem',
      };
    }

    return {
      radius: '1.2rem',
      padding: '0.2rem',
    };
  };

  const { radius, padding } = getIconStyles();

  return (
    <Circle $radius={radius} $padding={padding}>
      {Icon}
    </Circle>
  );
};

//
//
//

const Circle = styled.div<CircleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $radius }) => $radius};
  height: ${({ $radius }) => $radius};
  padding: ${({ $padding }) => $padding};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary100_1};

  > svg {
    > path {
      fill: ${({ theme }) => theme.colors.common.white};
    }
  }
`;

export default SessionIcon;
