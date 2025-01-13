import React, { Dispatch, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import styled, { useTheme } from 'styled-components';
import { ReactComponent as Github } from '@/pages/MyPage/tempAsssets/github_icon.svg';
import { ReactComponent as Link } from '@/pages/MyPage/tempAsssets/link2_icon.svg';
import { ReactComponent as Upload } from '@/pages/MyPage/tempAsssets/upload.svg';
import cotatoCharacterFront from '@assets/cotato_character_front.svg';
import cotatoCharacterBack from '@assets/cotato_character_back.svg';
import cotatoCharacterPM from '@assets/cotato_character_pm.svg';
import cotatoCharacterDesign from '@assets/cotato_character_design.svg';
import cotatoCharacter from '@assets/crown_character.svg';
import { CotatoMemberInfoResponsePositionEnum } from 'cotato-openapi-clients';
import useUser from '@/hooks/useUser';
import { media } from '@theme/media';

//
//
//

interface ProfileImageSectionProps {
  position?: CotatoMemberInfoResponsePositionEnum;
}
interface ProfileNameSectionProps {
  name?: string;
}
interface ProfileInfoSectionProps {
  position?: CotatoMemberInfoResponsePositionEnum;
  canModify: boolean;
}
interface IntroductionSectionProps {
  canModify: boolean;
}
interface LinksSectionProps {
  canModify: boolean;
}
interface ButtonSectionProps {
  canModify: boolean;
  setCanModify: Dispatch<React.SetStateAction<boolean>>;
}

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

const ProfileCard = () => {
  const { user } = useUser();
  const [canModify, setCanModify] = useState(false);

  return (
    <ProfileCardContainer>
      <ProfileImageSection position={user?.position} />
      <NameSection name={user?.name} />
      <InfoSection position={user?.position} canModify={canModify} />
      <IntroductionSection canModify={canModify} />
      <LinksSection canModify={canModify} />
      <ButtonSection canModify={canModify} setCanModify={setCanModify} />
    </ProfileCardContainer>
  );
};

//
//
//

const ProfileImageSection = ({ position }: ProfileImageSectionProps) => {
  return (
    <ProfileImage
      src={COTATO_CHARCTER_SVG_MAP[position ?? CotatoMemberInfoResponsePositionEnum.None]}
    />
  );
};

const NameSection = ({ name }: ProfileNameSectionProps) => {
  return (
    <ProfileCardSection>
      <ProfileCardSectionTitle>이름</ProfileCardSectionTitle>
      <ProfileCardStringInputSection>
        <ProfileInput defaultValue={name} isPrimary={true} disabled={true} />
      </ProfileCardStringInputSection>
    </ProfileCardSection>
  );
};

const InfoSection = ({ position, canModify }: ProfileInfoSectionProps) => {
  return (
    <ProfileCardSection>
      <ProfileCardSectionTitle>정보</ProfileCardSectionTitle>
      <ProfileCardStringInputSection>
        <ProfileInput placeholder="기수" defaultValue={'9기'} isPrimary={false} disabled={true} />
        <ProfileInput
          placeholder="파트"
          defaultValue={COTATO_POSITION_MAP[position ?? CotatoMemberInfoResponsePositionEnum.None]}
          isPrimary={false}
          disabled={true}
        />
        <ProfileInput placeholder="소속" disabled={!canModify} />
      </ProfileCardStringInputSection>
    </ProfileCardSection>
  );
};

const IntroductionSection = ({ canModify }: IntroductionSectionProps) => {
  return (
    <ProfileCardSection>
      <ProfileCardSectionTitle>자기소개</ProfileCardSectionTitle>
      <ProfileCardStringInputSection>
        {canModify ? <ProfileInput /> : <ProfileInput disabled />}
      </ProfileCardStringInputSection>
    </ProfileCardSection>
  );
};

const LinksSection = ({ canModify }: LinksSectionProps) => {
  return (
    <ProfileCardSection>
      <ProfileCardLinkInputSection>
        <LinkContainer>
          <Github />
          <ProfileInput size="small" disabled={!canModify} />
        </LinkContainer>
        <LinkContainer>
          <Link />
          <ProfileInput size="small" disabled={!canModify} />
        </LinkContainer>
      </ProfileCardLinkInputSection>
    </ProfileCardSection>
  );
};

const ButtonSection = ({ canModify, setCanModify }: ButtonSectionProps) => {
  return (
    <ProfileCardButtonSection>
      <ProfileCardButton>
        <Upload />
      </ProfileCardButton>
      <ProfileCardButton
        onClick={() => {
          setCanModify((prev: boolean) => !prev);
        }}
        canModify={canModify}
      >
        {canModify ? '수정완료' : '수정하기'}
      </ProfileCardButton>
    </ProfileCardButtonSection>
  );
};

//
//
//

const ProfileCardContainer = styled.div`
  display: flex;
  max-width: 25rem;
  width: 100%;
  padding: 1.5rem 1rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.primary100_1};
  background-color: ${({ theme }) => theme.colors.common.real_white};
  ${media.tablet`
      max-width: 50rem;
  `}
`;

const ProfileImage = styled.div<{ src: string }>`
  width: 15rem;
  height: 15rem;
  border-radius: 15rem;
  background-image: url(${(props) => props.src});
  background-size: cover;
`;

const ProfileCardSection = styled.div`
  display: flex;
  padding: 0.5rem 0rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
`;

const ProfileCardSectionTitle = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.colors.common.black};
  font-family: Pretendard;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-style: normal;
  font-weight: 600;
`;

const ProfileCardStringInputSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  align-self: stretch;
`;

const ProfileCardLinkInputSection = styled.div`
  display: flex;
  padding: 1rem 0rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
`;

const ProfileCardButtonSection = styled.div`
  display: flex;
  padding: 0.5rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
`;

const ProfileCardButton = styled.button<{ canModify?: boolean }>`
  display: flex;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border: none;
  border-radius: 0.25rem;
  background-color: ${({ canModify, theme }) =>
    canModify ? theme.colors.primary100_1 : theme.colors.common.black};
  color: ${({ theme }) => theme.colors.common.real_white};
  cursor: pointer;
  font-family: Pretendard;
  font-size: ${({ theme }) => theme.fontSize.md};
`;

//---custom input component---//

interface ProfileInputProps {
  isPrimary?: boolean;
}

const ProfileInput = ({ isPrimary = true, ...props }: ProfileInputProps & TextFieldProps) => {
  const theme = useTheme();

  return (
    <TextField
      sx={{
        alignSelf: 'stretch',
        flex: 1,

        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: theme.colors.gray40,
            borderRadius: '0.5rem',
          },
          '&.MuiInputBase-sizeSmall.Mui-disabled fieldset': {
            border: 'none',
          },
        },
        '& .MuiInputBase-sizeSmall': {
          height: '1.75rem',
          '& .MuiInputBase-input': {
            padding: '0.25rem 0.75rem',
          },
        },
        '& .MuiInputBase-input': {
          padding: '0.875rem 0.75rem',
        },
        '& .MuiInputBase-input.Mui-disabled': {
          '-webkit-text-fill-color': isPrimary
            ? theme.colors.common.black_const
            : theme.colors.sub2[40],
        },
      }}
      {...props}
    />
  );
};

export default ProfileCard;
