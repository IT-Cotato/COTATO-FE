import React from 'react';
import styled from 'styled-components';

interface MypageRecruitmentManagementContentManageProps {
  nextGenerationNumber?: number;
  onChange: (value: number | undefined) => void;
}

const MypageRecruitmentManagementContentManageTextarea = ({
  nextGenerationNumber,
  onChange,
}: MypageRecruitmentManagementContentManageProps) => {
  /**
   *
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      onChange(undefined);
    } else if (!isNaN(Number(e.target.value))) {
      onChange(Number(e.target.value));
    }
  };

  return (
    <TextContainer>
      코테이토&nbsp;
      <InlineInput type="text" value={nextGenerationNumber} onChange={handleChange} />
      기 모집이 시작되었습니다!
      <br />
      <br />
      무엇이라도 해내야겠다는 마음가짐, 발전하고자 하는 열정이면 충분합니다.
      <br />
      <br />
      코테이토 홈페이지에 접속하여 지원해주세요!
    </TextContainer>
  );
};

const TextContainer = styled.div`
  padding: 0.875rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.gray30};
  width: 100%;
  height: 10rem;
  resize: none;

  color: ${({ theme }) => theme.colors.gray100};
  font-family: Pretendard;
  font-size: 1rem;
  line-height: 1.5;
  overflow-y: auto;
  white-space: pre-wrap;

  &:focus-within {
    outline: none;
  }
`;

const InlineInput = styled.input`
  width: 2rem;
  padding: 0.2rem 0.4rem;
  font-size: 1rem;
  font-family: Pretendard;
  border: 1px solid ${({ theme }) => theme.colors.gray30};
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.gray100};

  &:focus-visible {
    outline: none;
  }
`;

export default MypageRecruitmentManagementContentManageTextarea;
