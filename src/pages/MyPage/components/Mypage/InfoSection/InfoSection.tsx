import React from 'react';
import styled from 'styled-components';
import { media } from '@theme/media';
import { AccountSection, ManageSection } from './subComponents';

//
//
//

const InfoSection = () => {
  return (
    <InfoSectionContainer>
      <AccountSection email={'aaa@naver.com'} phoneNum={'000-0000-0000'} />
      <ManageSection />
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
