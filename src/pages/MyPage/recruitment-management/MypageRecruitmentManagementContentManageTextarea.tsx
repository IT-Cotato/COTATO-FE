import React from 'react';
import styled from 'styled-components';

//
//
//

interface MypageRecruitmentManagementContentManageTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

//
//
//

const MypageRecruitmentManagementContentManageTextarea = ({
  value,
  onChange,
}: MypageRecruitmentManagementContentManageTextareaProps) => {
  return <TextArea value={value} onChange={onChange} />;
};

//
//
//

const TextArea = styled.textarea`
  padding: 0.875rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.gray30};
  resize: none;
  width: 100%;
  height: 10rem;

  color: ${({ theme }) => theme.colors.gray100};
  font-family: Pretendard;
  font-size: 1rem;

  &:focus-visible {
    outline: none;
  }
`;

export default MypageRecruitmentManagementContentManageTextarea;
