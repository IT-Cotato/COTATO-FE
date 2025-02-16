import React, { useState } from 'react';
import styled from 'styled-components';
import useUser from '@/hooks/useUser';
import { media } from '@theme/media';
import {
  ButtonSection,
  InfoSection,
  IntroductionSection,
  LinksSection,
  NameSection,
  ProfileImageSection,
} from './subComponents';
import { useProfileForm } from '@pages/MyPage/hooks/useProfileForm';

//
//
//

const ProfileCard = () => {
  const { user } = useUser();
  const [isModifying, setIsModifying] = useState(false);
  const {
    form,
    handleUniversityChange,
    handleIntroChange,
    handleLinkChange,
    handleImageChange,
    submitProfile,
  } = useProfileForm(user?.memberId);

  if (!form) return <div>loading</div>;

  /**
   *
   */
  const handleSubmit = async () => {
    const success = await submitProfile();
    if (success) {
      setIsModifying(false);
    }
  };

  return (
    <ProfileCardContainer>
      <ProfileImageSection
        position={form.position}
        value={form.profileImage}
        onImageChange={handleImageChange}
        isModifying={isModifying}
      />
      <NameSection name={user?.name} />
      <InfoSection
        position={form.position}
        isModifying={isModifying}
        generationNumber={form.generationNumber}
        value={form.university ?? ''}
        onChange={(value) => handleUniversityChange(value)}
      />
      <IntroductionSection
        isModifying={isModifying}
        value={form.introduction ?? ''}
        onChange={(value) => handleIntroChange(value)}
      />
      <LinksSection
        isModifying={isModifying}
        links={form.profileLinks}
        onChange={handleLinkChange}
      />
      <ButtonSection
        isModifying={isModifying}
        setIsModifying={setIsModifying}
        onSubmit={handleSubmit}
      />
    </ProfileCardContainer>
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

export default ProfileCard;
