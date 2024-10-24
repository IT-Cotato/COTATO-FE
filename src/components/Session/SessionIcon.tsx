import React from 'react';
import { styled, useTheme } from 'styled-components';

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
  isActive?: boolean;
}

interface CircleProps {
  $radius: string;
  $padding: string;
  $background: string;
}

//
//
//

/**
 * icon with circle background
 * @param Icon svg file to ReactComponent
 * @param size size of the icon (default : sm)
 */
const SessionIcon = ({ Icon, size = 'sm', isActive }: SessionIconProps) => {
  const theme = useTheme();

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
        radius: '2.2rem',
        padding: '0.4rem',
      };
    }

    return {
      radius: '1.2rem',
      padding: '0.2rem',
    };
  };

  const { radius, padding } = getIconStyles();
  const background = isActive === false ? theme.colors.gray30 : theme.colors.primary100_1;

  return (
    <Circle className="circle-icon" $radius={radius} $padding={padding} $background={background}>
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
  background: ${({ $background }) => $background};

  > svg {
    path {
      fill: ${({ theme }) => theme.colors.common.white};
    }
  }
`;

export default SessionIcon;
