import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MY_PAGE_PATH } from '@pages/MyPage/MyPageRouter';
import { ReactComponent as RightAngle } from '@/pages/MyPage/tempAsssets/angle_right.svg';
import {
  InfoSectionItemContainer,
  InfoSectionTitle,
  SectionContainer,
  SectionItem,
} from '../styles';
import styled from 'styled-components';
import { logout } from '@utils/logout';

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

const AccountSection = ({ email, phoneNum }: AccountSectionProps) => {
  const navigate = useNavigate();

  const LogoutButtonHandler = async () => {
    await logout();
  };

  return (
    <SectionContainer>
      <InfoSectionHeader>
        계정 정보
        <LogoutButton onClick={LogoutButtonHandler}>로그아웃</LogoutButton>
      </InfoSectionHeader>
      <InfoSectionItemContainer>
        <InfoSectionItem>{email}</InfoSectionItem>
        <InfoSectionItem>{phoneNum}</InfoSectionItem>
        <InfoSectionItem $clickable onClick={() => navigate('/findpw')}>
          비밀번호 재설정
          <RightAngle style={{ position: 'absolute', right: '1.25rem' }} />
        </InfoSectionItem>
        <InfoSectionItem $clickable onClick={() => navigate(MY_PAGE_PATH.POLICY.INFO)}>
          개인정보 관리
          <RightAngle style={{ position: 'absolute', right: '1.25rem' }} />
        </InfoSectionItem>
      </InfoSectionItemContainer>
    </SectionContainer>
  );
};

//
//
//

const InfoSectionHeader = styled(InfoSectionTitle)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  font-family: Pretender;
  color: ${({ theme }) => theme.colors.gray60};
`;

const InfoSectionItem = styled(SectionItem)<{ $clickable?: boolean }>`
  padding: 1.25rem;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'cursor')};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
`;

export default AccountSection;
