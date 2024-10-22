import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

//
//
//

interface StyledTooltipProps {
  fontFamiliy?: string;
  fontSize?: string;
  padding?: string;
  borderWidth?: string;
}

interface CotatoTooltipProps extends StyledTooltipProps, TooltipProps {}

//
//
//

const StyledTooltip = styled(({ className, ...props }: CotatoTooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))<{ fontFamily: string; fontSize: string; padding: string; borderWidth: string }>(
  ({ theme, fontFamily, fontSize, padding, borderWidth }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.colors.common.white,
      border: `${borderWidth} solid ${theme.colors.common.black}`,
      color: theme.colors.common.black,
      fontSize: `${fontSize}`,
      padding: `${padding}`,
      fontFamily: `${fontFamily}`,
      maxWidth: 'none',
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.colors.common.white,
      '&:before': {
        border: `${borderWidth} solid ${theme.colors.common.black}`,
      },
    },
  }),
);

//
//
//

const CotatoTooltip: React.FC<CotatoTooltipProps> = ({
  children,
  fontFamiliy = 'YComputer',
  fontSize = '1rem',
  padding = '0.2rem 1rem',
  borderWidth = '1px',
  ...props
}) => {
  return (
    <StyledTooltip
      {...props}
      fontFamily={fontFamiliy}
      fontSize={fontSize}
      padding={padding}
      borderWidth={borderWidth}
    >
      {children}
    </StyledTooltip>
  );
};

export default CotatoTooltip;
