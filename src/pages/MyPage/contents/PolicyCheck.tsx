import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MY_PAGE_PATH } from '../MyPageRouter';
import { Button } from '@mui/material';
import { ReactComponent as RightAngle } from '@/pages/MyPage/tempAsssets/angle_right.svg';

//
//
//

const PolicyCheck = () => {
  const navigate = useNavigate();
  return (
    <ContentContainer>
      <div>PolicyCheck</div>
      <NotificationContainer>
        <Notification>
          <h2 id="-">개인정보 수집 및 이용</h2>
          <p>
            개인정보보호법에 따라 코테이토에 회원가입을 신청하시는 분께 수집하는 개인정보의 항목,
            개인정보의 수집 및 이용 목적, 개인정보의 보유 및 이용 기간, 동의 거부권 및 동의 거부 시
            불이익에 관한 사항을 안내해 드리니 확인 후 동의하여 주시기를 바랍니다. 회원 가입을
            위해서는 아래와 같이 개인정보를 수집·이용합니다
          </p>
          <ol>
            <li>개인정보 수집 항목: 이름, 아이디(이메일), 비밀번호, 전화번호</li>
            <li>개인정보 수집 목적: 회원 관리</li>
            <li>보유 및 이용 기간: 회원 탈퇴 시까지</li>
          </ol>
          <p>
            이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있으나 동의 거부 시 서비스 이용이
            제한됩니다.
          </p>
        </Notification>
        <Notification>
          <h2 id="-">개인위치정보 수집 및 이용</h2>
          <p>
            코테이토 페이지에서 서비스 제공을 위해 이용자의 현재 위치 정보를 수집합니다. 이에 따라
            위치기반서비스와 관련하여 정보 수집 동의에 관한 사항을 안내해 드리니 확인 후 동의하여
            주시기를 바랍니다.
          </p>
          <ol>
            <li>수집 정보 : 현재 GPS 위치 정보 2, 개인위치정보 수집 목적 : 출석 확인</li>
            <li>
              개인위치정보 사용 방법 : 출석 체크 시에만 사용되며, 다른 목적으로 사용되지 않습니다.
              출석 확인 후 정보가 저장되지 않으며, 즉시 삭제됩니다.
            </li>
            <li>보유 및 이용 기간: 회원 탈퇴 시까지</li>
          </ol>
          <p>
            이용자는 언제든지 개인위치정보 수집 동의를 철회할 수 있으며, 이 경우 서비스 이용에 일부
            제한이 있을 수 있습니다.
          </p>
          <p>*수집된 정보는 동아리 활동 종료 시 폐기 됩니다. </p>
        </Notification>
        <ButtonContainer>
          <Button
            variant="text"
            endIcon={<RightAngle />}
            onClick={() => navigate(MY_PAGE_PATH.POLICY.DELETION)}
          >
            <ButtonText>회원 탈퇴</ButtonText>
          </Button>
        </ButtonContainer>
      </NotificationContainer>
    </ContentContainer>
  );
};

export default PolicyCheck;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3.75rem;
  padding: 0 1.5rem 1.5rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.common.white};
`;

const NotificationContainer = styled.div`
  display: flex;
  max-width: 77rem;
  padding: 2.25rem;
  flex-direction: column;
  align-items: center;
  gap: 6.25rem;
  align-self: stretch;
  background-color: ${({ theme }) => theme.colors.common.real_white};
`;

const Notification = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-self: stretch;
`;

const ButtonText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.gray60};
  font-family: Pretendard;
  margin: 0;
`;
