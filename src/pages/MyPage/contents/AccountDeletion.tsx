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
        회원님께서 COTATO 동아리 페이지의 회원 탈퇴를 진행하실 경우, 아래 사항에 따라 모든 정보가
        삭제되며, 복구가 불가능하니 탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.
      </p>
      <ol>
        <li>
          <p>
            부원 활동 정보 삭제
            <p>
              회원 탈퇴가 완료되면, 동아리 활동 내역, 기여 기록 등 부원 활동과 관련된 모든 정보가
              삭제됩니다. 삭제된 정보는 다시 복구할 수 없으니 주의해 주세요.
            </p>
          </p>
        </li>
        <li>
          <p>
            개인 문제 풀이 내역 삭제
            <p>
              탈퇴와 함께 회원님의 개인 문제 풀이 내역이 삭제됩니다. 과거의 퀴즈 답변 기록, 풀이
              점수 등 동아리 내 학습 활동에 관련된 모든 데이터가 삭제되며, 삭제된 내역은 다시 되돌릴
              수 없습니다.
            </p>
          </p>
        </li>
        <li>
          <p>
            복구 불가 안내
            <p>
              탈퇴 요청이 접수되면, 회원님의 데이터는 즉시 삭제 처리되며 복구가 불가능합니다. 탈퇴
              후 다시 참여를 원하실 경우, 신규 가입을 통해 새로운 계정을 생성하셔야 합니다.
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
  background-color: ${({ theme }) => theme.colors.common.real_white};
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
