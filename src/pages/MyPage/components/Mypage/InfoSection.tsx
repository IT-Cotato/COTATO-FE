import React from 'react';
import styled from 'styled-components';
import { ReactComponent as RightAngle } from '@/pages/MyPage/tempAsssets/angle_right.svg';
import { useNavigate } from 'react-router-dom';
import { MY_PAGE_PATH } from '@pages/MyPage/MyPageRouter';
import { media } from '@theme/media';

//
//
//

interface AccountSectionProps {
  email: string;
  phoneNum: string;
}

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

const AccountSection = ({ email, phoneNum }: AccountSectionProps) => {
  const navigate = useNavigate();

  return (
    <SectionContainer>
      <InfoSectionTitle>계정 정보</InfoSectionTitle>
      <InfoSectionItemContainer>
        <InfoSectionItem>{email}</InfoSectionItem>
        <InfoSectionItem>{phoneNum}</InfoSectionItem>
        <InfoSectionItem $clickable onClick={() => navigate('/findpw')}>
          비밀번호 재설정
          <RightAngle style={{ position: 'absolute', right: '1.25rem' }} />
        </InfoSectionItem>
        <InfoSectionItem $clickable onClick={() => navigate(MY_PAGE_PATH.POLICY)}>
          개인정보 관리
          <RightAngle style={{ position: 'absolute', right: '1.25rem' }} />
        </InfoSectionItem>
      </InfoSectionItemContainer>
    </SectionContainer>
  );
};

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

const SectionContainer = styled.div`
  display: flex;
  padding: 2.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.25rem;
  align-self: stretch;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.primary100_1};
  background-color: ${({ theme }) => theme.colors.common.real_white};
`;

const InfoSectionTitle = styled.div`
  font-family: Pretendard;
  font-size: 1.75rem;
  font-weight: 600;
`;

const InfoSectionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
  align-self: stretch;
`;

const SectionItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 0.5rem;
  border: 2px solid;
  border-color: ${({ theme }) => theme.colors.primary90};
  background-color: ${({ theme }) => theme.colors.common.white};
  color: ${({ theme }) => theme.colors.gray60};
  font-family: Pretendard;
`;

const InfoSectionItem = styled(SectionItem)<{ $clickable?: boolean }>`
  padding: 1.25rem;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'cursor')};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
`;

const ManageSectionItem = styled(SectionItem)<{ $clickable?: boolean }>`
  padding: 1.875rem 1.25rem;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'cursor')};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
`;

export default InfoSection;
