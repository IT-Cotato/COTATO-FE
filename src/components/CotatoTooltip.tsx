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
}

interface CotatoTooltipProps extends StyledTooltipProps, TooltipProps {}

//
//
//

const StyledTooltip = styled(({ className, ...props }: CotatoTooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))<{ fontFamily: string; fontSize: string; padding: string }>(
  ({ theme, fontFamily, fontSize, padding }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.colors.common.white,
      border: `1px solid ${theme.colors.common.black}`,
      color: theme.colors.common.black,
      fontSize: `${fontSize}`,
      padding: `${padding}`,
      fontFamily: `${fontFamily}`,
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.colors.common.white,
      '&:before': {
        border: `1px solid ${theme.colors.common.black}`,
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
  ...props
}) => {
  return (
    <StyledTooltip {...props} fontFamily={fontFamiliy} fontSize={fontSize} padding={padding}>
      {children}
    </StyledTooltip>
  );
};

export default CotatoTooltip;
