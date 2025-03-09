import React from 'react';
import {
  ProfileCardSection,
  ProfileCardSectionTitle,
  ProfileCardStringInputSection,
  ProfileInput,
} from '../styles';

//
//
//

interface IntroductionSectionProps {
  isModifying: boolean;
  value: string;
  onChange: (value: string) => void;
}

//
//
//

/**
 * 자기소개 영역
 * @param isModifying 수정중인 상태
 */
const IntroductionSection = ({ isModifying, value, onChange }: IntroductionSectionProps) => {
  return (
    <ProfileCardSection>
      <ProfileCardSectionTitle>자기소개</ProfileCardSectionTitle>
      <ProfileCardStringInputSection>
        <ProfileInput
          disabled={!isModifying}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </ProfileCardStringInputSection>
    </ProfileCardSection>
  );
};

export default IntroductionSection;
