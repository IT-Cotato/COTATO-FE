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

//
//
//

const ProfileCard = () => {
  const { user } = useUser();
  const [isModifying, setisModifying] = useState(false);

  return (
    <ProfileCardContainer>
      <ProfileImageSection position={user?.position} />
      <NameSection name={user?.name} />
      <InfoSection position={user?.position} isModifying={isModifying} />
      <IntroductionSection isModifying={isModifying} />
      <LinksSection isModifying={isModifying} />
      <ButtonSection isModifying={isModifying} setisModifying={setisModifying} />
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
