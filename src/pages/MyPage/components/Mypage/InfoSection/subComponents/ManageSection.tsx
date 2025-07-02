import React from 'react';
import {
  InfoSectionItemContainer,
  InfoSectionTitle,
  SectionContainer,
  SectionItem,
} from '../styles';
import { useNavigate } from 'react-router-dom';
import { MY_PAGE_PATH } from '@pages/MyPage/MyPageRouter';
import styled from 'styled-components';
import CotatoIcon from '@components/CotatoIcon';

//
//
//

const ManageSection = () => {
  const navigate = useNavigate();

  return (
    <SectionContainer>
      <InfoSectionTitle>동아리 관리</InfoSectionTitle>
      <InfoSectionItemContainer>
        <ManageSectionItem $clickable onClick={() => navigate(MY_PAGE_PATH.GENERATION_MANAGEMENT)}>
          기수 관리
          <CotatoIcon
            icon="angle-right-solid"
            style={{ position: 'absolute', right: '1.25rem' }}
            color={(theme) => theme.colors.gray60}
          />
        </ManageSectionItem>
        <ManageSectionItem $clickable onClick={() => navigate(MY_PAGE_PATH.MEMBERS)}>
          부원 관리
          <CotatoIcon
            icon="angle-right-solid"
            style={{ position: 'absolute', right: '1.25rem' }}
            color={(theme) => theme.colors.gray60}
          />
        </ManageSectionItem>
        <ManageSectionItem $clickable onClick={() => navigate(MY_PAGE_PATH.REGISTRATION)}>
          신입기수 관리
          <CotatoIcon
            icon="angle-right-solid"
            style={{ position: 'absolute', right: '1.25rem' }}
            color={(theme) => theme.colors.gray60}
          />
        </ManageSectionItem>
      </InfoSectionItemContainer>
    </SectionContainer>
  );
};

//
//
//

const ManageSectionItem = styled(SectionItem)<{ $clickable?: boolean }>`
  padding: 1.25rem 0.75rem;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'cursor')};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
`;

export default ManageSection;
