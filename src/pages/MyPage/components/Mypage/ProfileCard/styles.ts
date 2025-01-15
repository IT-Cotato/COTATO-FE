import { TextField, TextFieldProps } from '@mui/material';
import styled, { useTheme } from 'styled-components';

export const ProfileCardSection = styled.div`
  display: flex;
  padding: 0.5rem 0rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
`;

export const ProfileCardSectionTitle = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.colors.common.black};
  font-family: Pretendard;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-style: normal;
  font-weight: 600;
`;

export const ProfileCardStringInputSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  align-self: stretch;
`;

//---custom input component---//

export const ProfileInput = styled(TextField)<{ isPrimary?: boolean }>`
  align-self: stretch;
  flex: 1;

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.colors.gray40};
      border-radius: 0.5rem;
    }
    &.MuiInputBase-sizeSmall.Mui-disabled fieldset {
      border: none;
    }
  }

  & .MuiInputBase-sizeSmall {
    height: 1.75rem;

    & .MuiInputBase-input {
      padding: 0.25rem 0.75rem;
    }
  }

  & .MuiInputBase-input {
    padding: 0.875rem 0.75rem;
  }

  & .MuiInputBase-input.Mui-disabled {
    -webkit-text-fill-color: ${({ theme, isPrimary = true }) =>
      isPrimary ? theme.colors.common.black_const : theme.colors.sub2[40]};
  }
`;
