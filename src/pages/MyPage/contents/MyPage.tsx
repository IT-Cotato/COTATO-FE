import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MY_PAGE_PATH } from '../MyPageRouter';
import useUser from '@/hooks/useUser';
import ProfileCard from '../components/ProfileCard';
import styled from 'styled-components';

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
              <InfoSectionItem>비밀번호 재설정 버튼</InfoSectionItem>
              <InfoSectionItem>개인정보 관리 버튼</InfoSectionItem>
            </InfoSectionItemContainer>
          </InfoSection>

          <InfoSection>
            <InfoSectionTitle>Cotato Management Section</InfoSectionTitle>
            <InfoSectionItemContainer>
              <InfoSectionItem>기수관리 버튼</InfoSectionItem>
              <InfoSectionItem>부원 관리 버튼</InfoSectionItem>
              <InfoSectionItem>신입기수 관리 버튼</InfoSectionItem>
            </InfoSectionItemContainer>
          </InfoSection>
        </InfoSectionContainer>
      </ContentContainer>
      <div>
        <button onClick={() => navigate(MY_PAGE_PATH.POLICY)}>policy</button>
        <button onClick={() => navigate(MY_PAGE_PATH.YEAR)}>year</button>
        <button onClick={() => navigate(MY_PAGE_PATH.MEMBERS)}>members</button>
        <button onClick={() => navigate(MY_PAGE_PATH.REGISTRATION)}>registration</button>
      </div>
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

const InfoSectionItem = styled.div`
  display: flex;
  height: 3.75rem;
  padding: 1.25rem;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 0.5rem;
  border: 2px solid;
  border-color: ${({ theme }) => theme.colors.primary90};
  background-color: ${({ theme }) => theme.colors.common.white};
  color: ${({ theme }) => theme.colors.gray60};
`;
