import { Checkbox } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { AccountDeletionModal } from '../components/AccountDeletion';
import AccountDeletionImage from '@/pages/MyPage/tempAsssets/Text/AccountDeletion.svg';
import CotatoPanel, { SizeStateEnum } from '@components/CotatoPanel';
import { Header } from './style';
import BackButton from '../components/common/BackButton';
import CotatoButton from '@components/CotatoButton';
import useUser from '@/hooks/useUser';
import { useAccountDeletion } from '../hooks/useAccountDeletion';
import { CotatoLightTheme } from '@theme/theme';

//
//
//

const AccountDeletion = () => {
  const { user } = useUser();
  const { form, updateForm, deactivateAccount } = useAccountDeletion(user?.memberId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   *
   */
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  /**
   *
   */
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ContentContainer>
        <Header>
          <BackButton />
          <CotatoPanel size={SizeStateEnum.SHORT} textImgSrc={AccountDeletionImage} />
        </Header>
        <NotificationContainer>
          <Notification>
            {renderNotification()}
            <CheckboxContainer>
              <Checkbox onChange={(e) => updateForm('isTermsAgreed', e.target.checked)} />
              <p style={{ margin: 0 }}>안내사항을 모두 확인하였으며, 이에 동의합니다.</p>
            </CheckboxContainer>
          </Notification>
          <ButtonContainer>
            <CotatoButton
              isEnabled={form.isTermsAgreed}
              buttonStyle="filled"
              text="탈퇴하기"
              onClick={handleDeleteClick}
            />
          </ButtonContainer>
        </NotificationContainer>
      </ContentContainer>

      {/* Modal */}
      <AccountDeletionModal
        open={isModalOpen}
        onClose={handleModalClose}
        form={form}
        updateForm={updateForm}
        deactivateAccount={deactivateAccount}
      />
    </>
  );
};

/**
 *
 */
const renderNotification = () => {
  return (
    <>
      <h3 style={{ margin: 0 }}>탈퇴 안내</h3>
      <p style={{ marginBottom: 0 }}>
        회원님께서 COTATO 동아리 페이지의 회원 탈퇴를 진행하실 경우, 아래 사항에 따라 계정이
        비활성화되며, 30일 후에는 모든 정보가 영구적으로 삭제됩니다. 탈퇴를 신청하기 전에 안내
        사항을 꼭 확인해 주세요.
      </p>
      <ol>
        <li>
          <p>
            계정 비활성화
            <p>
              탈퇴 신청을 하시면 해당 계정은 30일 동안 비활성화 상태로 전환됩니다. 비활성화 기간
              동안 COTATO 서비스 이용이 제한됩니다.
            </p>
          </p>
        </li>
        <li>
          <p>
            데이터 수정 및 보존 탈퇴 신청 후 30일이 지나면 회원 정보는 아래와 처리됩니다.
            <ul>
              <li>이름: 일부가 마스킹 처리되어 보관. 예) 홍길동 → 홍*동</li>
              <li>이메일, 비밀번호, 전화번호: 삭제.</li>
            </ul>
            보존되는 데이터(예: 문제 풀이 기록, 출결 기록, 활동 내역)는 아래와 같이 표시됩니다.
            <ul>
              <li>활동 내역: 예) 6기 홍길동 백엔드 → 6기 홍*동 백엔드</li>
              <li>개인 정보: 예) 홍길동(1234) → 홍*동(0000)</li>
            </ul>
          </p>
        </li>
        <li>
          <p>
            계정 복구 가능 기간
            <p>
              비활성화 기간 중(30일 이내)에 다시 로그인하면 계정이 활성화되어 서비스를 계속 이용하실
              수 있습니다.
            </p>
          </p>
        </li>
      </ol>
      <p style={{ margin: 0 }}>
        탈퇴와 관련해 추가적인 문의 사항이 있으시면 COTATO 관리자에게 연락해주시기 바랍니다.
      </p>
      <div style={{ height: '6.25rem' }} />
    </>
  );
};

//
//
//

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
  align-items: flex-start;
  gap: 6.25rem;
  border-radius: 1rem;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.colors.common.black};
  background-color: ${({ theme }) =>
    theme === CotatoLightTheme ? theme.colors.common.real_white : '#363532'};
`;

const Notification = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: center;
`;

export default AccountDeletion;
