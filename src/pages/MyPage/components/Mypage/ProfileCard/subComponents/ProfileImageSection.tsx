import { CotatoMemberInfoResponsePositionEnum } from 'cotato-openapi-clients';
import React from 'react';
import cotatoCharacterFront from '@assets/cotato_character_front.svg';
import cotatoCharacterBack from '@assets/cotato_character_back.svg';
import cotatoCharacterPM from '@assets/cotato_character_pm.svg';
import cotatoCharacterDesign from '@assets/cotato_character_design.svg';
import cotatoCharacter from '@assets/crown_character.svg';
import styled from 'styled-components';

//
//
//

/**
 * user.positin : 포지션 이미지 src
 */
const COTATO_CHARCTER_SVG_MAP: Record<CotatoMemberInfoResponsePositionEnum, string> = {
  FE: cotatoCharacterFront,
  BE: cotatoCharacterBack,
  PM: cotatoCharacterPM,
  DESIGN: cotatoCharacterDesign,
  NONE: cotatoCharacter,
};

//
//
//

interface ProfileImageSectionProps {
  position?: CotatoMemberInfoResponsePositionEnum;
  onImageChange: (file: File) => void;
  isModifying: boolean;
}

//
//
//

/**
 * 프로필 이미지 영역
 * @param position 사용자의 파트
 */
const ProfileImageSection = ({
  position,
  onImageChange,
  isModifying,
}: ProfileImageSectionProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  return (
    <div>
      <ProfileImage
        src={COTATO_CHARCTER_SVG_MAP[position ?? CotatoMemberInfoResponsePositionEnum.None]}
      />
      {isModifying && (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="profile-image-input"
        />
      )}
    </div>
  );
};

//
//
//

const ProfileImage = styled.div<{ src: string }>`
  width: 15rem;
  height: 15rem;
  border-radius: 15rem;
  background-image: url(${({ src }) => src});
  background-size: cover;
`;

export default ProfileImageSection;
