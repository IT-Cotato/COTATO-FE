import React from 'react';
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

//
//
//

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

const ProfileCard = () => {
  const { user } = useUser();

  return (
    <ProfileCardContainer>
      <ProfileImage
        src={COTATO_CHARCTER_SVG_MAP[user?.position ?? CotatoMemberInfoResponsePositionEnum.None]}
      />
      <ProfileCardSection>
        <ProfileCardSectionTitle>이름</ProfileCardSectionTitle>
        <ProfileCardStringInputSection>
          <ProfileInput defaultValue="한승연" isPrimary={true} disabled={true} />
        </ProfileCardStringInputSection>
      </ProfileCardSection>
      <ProfileCardSection>
        <ProfileCardSectionTitle>정보</ProfileCardSectionTitle>
        <ProfileCardStringInputSection>
          <ProfileInput placeholder="기수" defaultValue={'9기'} isPrimary={false} disabled={true} />
          <ProfileInput
            placeholder="파트"
            defaultValue={'FrontEnd'}
            isPrimary={false}
            disabled={true}
          />
          <ProfileInput />
        </ProfileCardStringInputSection>
      </ProfileCardSection>
      <ProfileCardSection>
        <ProfileCardSectionTitle>자기소개</ProfileCardSectionTitle>
        <ProfileCardStringInputSection>
          <ProfileInput />
        </ProfileCardStringInputSection>
      </ProfileCardSection>
      <ProfileCardSection>
        <ProfileCardLinkInputSection>
          <LinkContainer>
            <Github />
            <ProfileInput size="small" />
          </LinkContainer>
          <LinkContainer>
            <Link />
            <ProfileInput size="small" />
          </LinkContainer>
        </ProfileCardLinkInputSection>
      </ProfileCardSection>
      <ProfileCardButtonSection>
        <ProfileCardButton>
          <Upload />
        </ProfileCardButton>
        <ProfileCardButton>수정하기</ProfileCardButton>
      </ProfileCardButtonSection>
    </ProfileCardContainer>
  );
};

export default ProfileCard;

const ProfileCardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.common.white};
  display: flex;
  width: 25rem;
  padding: 1.5rem 1rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.primary100_1};
  background-color: ${({ theme }) => theme.colors.common.real_white};
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
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.0625rem;
  letter-spacing: -0.003rem;
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

const ProfileCardButton = styled.button`
  display: flex;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.common.black};
  color: ${({ theme }) => theme.colors.common.real_white};
  font-family: Pretendard;
  font-size: 1rem;
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
        },
        '& .MuiInputBase-sizeSmall': {
          height: '1.75rem',
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
