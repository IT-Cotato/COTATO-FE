import React from 'react';
import styled from 'styled-components';
import { media } from '@theme/media';
import { AccountSection, ManageSection } from './subComponents';
import { useInfoForm } from '@pages/MyPage/hooks/useInfoForm';
import useUser from '@/hooks/useUser';

//
//
//

const InfoSection = () => {
  const { user } = useUser();
  const { form } = useInfoForm(user?.memberId);
  return (
    <InfoSectionContainer>
      <AccountSection email={form.email} phoneNum={form.phoneNumber} />
      {user?.role !== 'MEMBER' && <ManageSection />}
    </InfoSectionContainer>
  );
};

//
//
//

const InfoSectionContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 50rem;
  min-width: 18rem;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  gap: 2.25rem;
  ${media.tablet`
    flex: none;
    min-width: 16rem;
  `}
`;

export default InfoSection;
