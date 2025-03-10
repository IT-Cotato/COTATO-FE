import { CotatoMemberInfoResponsePositionEnum } from 'cotato-openapi-clients';
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

/**
 * user.position : 포지션 string
 */
const COTATO_POSITION_MAP: Record<CotatoMemberInfoResponsePositionEnum, string> = {
  FE: 'Frontend',
  BE: 'Backend',
  PM: 'ProductManager',
  DESIGN: 'Designer',
  NONE: 'None',
};

//
//
//

interface InfoSectionProps {
  position?: CotatoMemberInfoResponsePositionEnum;
  generationNumber: number;
  value: string;
  isModifying: boolean;
  onChange: (value: string) => void;
}

//
//
//

/**
 * 기본 정보 영역
 * @param position 사용자의 파트
 * @param isModifying 수정중인 상태
 */
const InfoSection = ({
  position,
  generationNumber,
  value,
  onChange,
  isModifying,
}: InfoSectionProps) => {
  return (
    <ProfileCardSection>
      <ProfileCardSectionTitle>정보</ProfileCardSectionTitle>
      <ProfileCardStringInputSection>
        <ProfileInput
          placeholder="기수"
          value={`${generationNumber}기`}
          isPrimary={false}
          disabled={true}
        />
        <ProfileInput
          placeholder="파트"
          value={COTATO_POSITION_MAP[position ?? CotatoMemberInfoResponsePositionEnum.None]}
          isPrimary={false}
          disabled={true}
        />
        <ProfileInput
          placeholder="소속"
          disabled={!isModifying}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </ProfileCardStringInputSection>
    </ProfileCardSection>
  );
};

export default InfoSection;
