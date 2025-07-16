import { RegularIconName } from '@/types/regularIconNames';
import { SolidIconName } from '@/types/solidIconNames';
import CotatoIcon from '@components/CotatoIcon';
import React from 'react';
import styled, { useTheme } from 'styled-components';

//
//
//

interface MypageRecruitmentManagementContentManageTextInputProps {
  readonly?: boolean;
  iconName?: RegularIconName | SolidIconName;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  style?: React.CSSProperties;
}

//
//
//

const MypageRecruitmentManagementContentManageTextInput = ({
  readonly = false,
  iconName,
  placeholder,
  value,
  onChange,
  onClick,
  style,
}: MypageRecruitmentManagementContentManageTextInputProps) => {
  const theme = useTheme();

  return (
    <InputWrapper style={style}>
      {iconName !== undefined && (
        <CotatoIcon
          icon={iconName as RegularIconName | SolidIconName}
          color={theme.colors.const.black}
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readonly}
        onClick={onClick}
      />
    </InputWrapper>
  );
};

//
//
//

const InputWrapper = styled.div`
  display: flex;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`;

const Input = styled.input`
  width: 100%;
  border: none;
  font-family: 'Ycomputer';
  font-size: 1.125rem;
  background-color: inherit;
  cursor: inherit;

  &:focus-visible {
    outline: none;
  }
`;

export default MypageRecruitmentManagementContentManageTextInput;
