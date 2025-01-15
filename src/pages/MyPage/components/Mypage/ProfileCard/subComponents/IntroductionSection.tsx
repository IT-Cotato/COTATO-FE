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
}

//
//
//

/**
 * 자기소개 영역
 * @param isModifying 수정중인 상태
 */
const IntroductionSection = ({ isModifying }: IntroductionSectionProps) => {
  return (
    <ProfileCardSection>
      <ProfileCardSectionTitle>자기소개</ProfileCardSectionTitle>
      <ProfileCardStringInputSection>
        <ProfileInput disabled={!isModifying} />
      </ProfileCardStringInputSection>
    </ProfileCardSection>
  );
};

export default IntroductionSection;
