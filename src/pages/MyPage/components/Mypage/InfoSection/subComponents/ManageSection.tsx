import React from 'react';
import { ReactComponent as RightAngle } from '@/pages/MyPage/tempAsssets/angle_right.svg';
import {
  InfoSectionItemContainer,
  InfoSectionTitle,
  SectionContainer,
  SectionItem,
} from '../styles';
import { useNavigate } from 'react-router-dom';
import { MY_PAGE_PATH } from '@pages/MyPage/MyPageRouter';
import styled from 'styled-components';

//
//
//

const ManageSection = () => {
  const navigate = useNavigate();

  return (
    <SectionContainer>
      <InfoSectionTitle>동아리 관리</InfoSectionTitle>
      <InfoSectionItemContainer>
        <ManageSectionItem $clickable onClick={() => navigate(MY_PAGE_PATH.YEAR)}>
          기수관리
          <RightAngle />
        </ManageSectionItem>
        <ManageSectionItem $clickable onClick={() => navigate(MY_PAGE_PATH.MEMBERS)}>
          부원 관리
          <RightAngle />
        </ManageSectionItem>
        <ManageSectionItem $clickable onClick={() => navigate(MY_PAGE_PATH.REGISTRATION)}>
          신입기수 관리
          <RightAngle />
        </ManageSectionItem>
      </InfoSectionItemContainer>
    </SectionContainer>
  );
};

//
//
//

const ManageSectionItem = styled(SectionItem)<{ $clickable?: boolean }>`
  padding: 1.875rem 1.25rem;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'cursor')};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
`;

export default ManageSection;
