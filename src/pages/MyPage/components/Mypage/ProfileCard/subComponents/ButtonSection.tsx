import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Upload } from '@/pages/MyPage/tempAsssets/upload.svg';

//
//
//

interface ButtonSectionProps {
  isModifying: boolean;
  setIsModifying: (value: boolean) => void;
  onSubmit: () => Promise<void>;
}

//
//
//

/**
 * 업로드 버튼, 수정하기 버튼 영역
 * @param isModifying 수정중인 상태
 * @param setIsModifing 수정중인 상태 set함수
 */
const ButtonSection = ({ isModifying, setIsModifying, onSubmit }: ButtonSectionProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <ProfileCardButtonSection>
      <ProfileCardButton onClick={() => fileInputRef.current?.click()}>
        <Upload />
      </ProfileCardButton>
      <ProfileCardButton
        onClick={() => {
          if (isModifying) {
            onSubmit();
          } else {
            setIsModifying(true);
          }
        }}
        isModifying={isModifying}
      >
        {isModifying ? '수정완료' : '수정하기'}
      </ProfileCardButton>
    </ProfileCardButtonSection>
  );
};

//
//
//

const ProfileCardButtonSection = styled.div`
  display: flex;
  padding: 0.5rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
`;

const ProfileCardButton = styled.button<{ isModifying?: boolean }>`
  display: flex;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border: none;
  border-radius: 0.25rem;
  background-color: ${({ isModifying, theme }) =>
    isModifying ? theme.colors.primary100_1 : theme.colors.common.black};
  color: ${({ theme }) => theme.colors.common.real_white};
  cursor: pointer;
  font-family: Pretendard;
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export default ButtonSection;
