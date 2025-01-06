import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MY_PAGE_PATH } from '../MyPageRouter';
import ProfileCard from '../components/ProfileCard';
import styled from 'styled-components';
import { ReactComponent as RightAngle } from '@/pages/MyPage/tempAsssets/angle_right.svg';

//
//
//

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <MyPageWrapper>
      <div>Mypage Header</div>
      <ContentContainer>
        <ProfileCard />
        <InfoSectionContainer>
          <InfoSection>
            <InfoSectionTitle>계정 정보</InfoSectionTitle>
            <InfoSectionItemContainer>
              <InfoSectionItem>aaa@gmail.com</InfoSectionItem>
              <InfoSectionItem>전화번호</InfoSectionItem>
              <InfoSectionItem $clickable onClick={() => console.log('비밀번호 변경하기')}>
                비밀번호 재설정 버튼
                <RightAngle />
              </InfoSectionItem>
              <InfoSectionItem $clickable onClick={() => navigate(MY_PAGE_PATH.POLICY)}>
                개인정보 관리 버튼
                <RightAngle />
              </InfoSectionItem>
            </InfoSectionItemContainer>
          </InfoSection>

          <InfoSection>
            <InfoSectionTitle>동아리 관리</InfoSectionTitle>
            <InfoSectionItemContainer>
              <ManageSectionItem $clickable onClick={() => navigate(MY_PAGE_PATH.YEAR)}>
                기수관리 버튼
                <RightAngle />
              </ManageSectionItem>
              <ManageSectionItem $clickable onClick={() => navigate(MY_PAGE_PATH.MEMBERS)}>
                부원 관리 버튼
                <RightAngle />
              </ManageSectionItem>
              <ManageSectionItem $clickable onClick={() => navigate(MY_PAGE_PATH.REGISTRATION)}>
                신입기수 관리 버튼
                <RightAngle />
              </ManageSectionItem>
            </InfoSectionItemContainer>
          </InfoSection>
        </InfoSectionContainer>
      </ContentContainer>
    </MyPageWrapper>
  );
};

export default MyPage;

const MyPageWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 4.75rem 6.5rem 0rem 6.5rem;
  flex-direction: column;
  align-items: center;
  gap: 5.375rem;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.25rem;
  width: 100%;
`;

const InfoSectionContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 50rem;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
`;

const InfoSection = styled.div`
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
  display: flex;
  padding: 1.25rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 0.5rem;
  border: 2px solid;
  border-color: ${({ theme }) => theme.colors.primary90};
  background-color: ${({ theme }) => theme.colors.common.white};
  color: ${({ theme }) => theme.colors.gray60};
`;

const InfoSectionItem = styled(SectionItem)<{ $clickable?: boolean }>`
  height: 3.75rem;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'cursor')};
`;

const ManageSectionItem = styled(SectionItem)<{ $clickable?: boolean }>`
  padding: 1.875rem 0.75rem;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'cursor')};
`;
