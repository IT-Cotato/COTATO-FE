import { th } from 'date-fns/locale';
import React from 'react';
import styled from 'styled-components';

//
//
//

interface CotatoButtonProps {
  isEnabled: boolean;
  buttonStyle?: 'filled' | 'line';
  text: string;
  onClick?: React.FormEventHandler | React.MouseEventHandler<HTMLButtonElement>;
}

//
//
//

const BUTTON_STYLE = (theme: any, buttonStyle?: string) => ({
  enabled: {
    cursor: 'pointer',
    borderWidth: '1px',
    color: theme.colors.common.black,
    filter: 'drop-shadow(1px 1px 15px rgba(255, 160, 0, 0.15))',
    backgroundColor: getBackgroundColor(theme, buttonStyle as string),
  },
  disabled: {
    cursor: 'not-allowed',
    borderWidth: '0px',
    color: theme.colors.gray80,
    backgroundColor: theme.colors.gray30,
  },
});

/**
 *
 */
const getBackgroundColor = (theme: any, style: string) => {
  switch (style) {
    case 'filled':
      return theme.colors.primary80;
    case 'line':
      return theme.colors.common.white;
    default:
      return theme.colors.primary80;
  }
};

/**
 * cotato button component
 * @param isEnabled button enable or disable
 * @param buttonStyle enabled button style - filled, line
 * @param text button text
 * @param onClick button click event
 */
const CotatoButton: React.FC<CotatoButtonProps> = ({ isEnabled, buttonStyle, text, onClick }) => {
  return (
    <StyledButton isEnabled={isEnabled} buttonStyle={buttonStyle} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

//
//
//

const StyledButton = styled.button<{ isEnabled: boolean; buttonStyle: string | undefined }>`
  width: 17.5rem;
  height: 3rem;
  border-radius: 1rem;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.primary100_1};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ buttonStyle, theme }) =>
    buttonStyle === 'filled' ? theme.colors.const.black : theme.colors.common.black} !important;
  ${({ isEnabled, buttonStyle, theme }) =>
    isEnabled ? BUTTON_STYLE(theme, buttonStyle).enabled : BUTTON_STYLE(theme).disabled};
`;

export default CotatoButton;
