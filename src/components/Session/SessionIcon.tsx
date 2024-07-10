import React from 'react';
import { styled } from 'styled-components';

//
//
//

interface SessionIconProps {
  Icon: React.ReactNode;
  size: string;
  padding: string;
}

interface CircleProps {
  $size: string;
  $padding: string;
}

//
//
//

/**
 * icon with circle background
 * @param Icon svg file to ReactComponent
 * @param size size of the icon
 */
const SessionIcon = ({ Icon, size, padding }: SessionIconProps) => {
  return (
    <Circle $size={size} $padding={padding}>
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
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
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
