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

interface NameSectionProps {
  name?: string;
}

//
//
//

/**
 * 이름 영역
 * @param name 사용자의 이름
 */
const NameSection = ({ name }: NameSectionProps) => {
  return (
    <ProfileCardSection>
      <ProfileCardSectionTitle>이름</ProfileCardSectionTitle>
      <ProfileCardStringInputSection>
        <ProfileInput defaultValue={name} isPrimary={true} disabled={true} />
      </ProfileCardStringInputSection>
    </ProfileCardSection>
  );
};

export default NameSection;
