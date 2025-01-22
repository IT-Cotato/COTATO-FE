import { Button, Dialog, Input, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Close } from '@/pages/MyPage/tempAsssets/close_button.svg';

//
//
//

//임시 상수값
const DUMMY_ID = '11';
const DUMMY_PASSWORD = '11';

//
//
//

interface AccoutDeletionModalProps {
  open: boolean;
  onClose: () => void;
}

//
//
//

const AccountDeletionModal = ({ open, onClose }: AccoutDeletionModalProps) => {
  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  //임시 로직
  useEffect(() => {
    const isValid = inputId === DUMMY_ID && inputPassword === DUMMY_PASSWORD;
    setIsButtonEnabled(isValid);
  }, [inputId, inputPassword]);

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <ModalContainer>
        <Close style={{ position: 'absolute', right: '1rem' }} onClick={onClose} />
        <HeaderSection>
          <p style={{ margin: 0 }}>회원 탈퇴 확인</p>
        </HeaderSection>
        <InfoSection>{renderInfoSection()}</InfoSection>
        <FormSection>
          <FormItem>
            <p style={{ margin: 0 }}>아이디</p>
            <ProfileInput value={inputId} onChange={handleIdChange} />
          </FormItem>
          <FormItem>
            <p style={{ margin: 0 }}>비밀번호</p>
            <ProfileInput type="password" value={inputPassword} onChange={handlePasswordChange} />
          </FormItem>
        </FormSection>
        <ButtonSection>
          <Button variant="contained" disabled={!isButtonEnabled}>
            탈퇴하기
          </Button>
        </ButtonSection>
      </ModalContainer>
    </Dialog>
  );
};

/**
 *
 */
const renderInfoSection = () => {
  return (
    <>
      <p style={{ marginTop: 0 }}>
        회원 탈퇴 시 계정은 30일 동안 비활성화 상태로 전환되며, 이후 회원 데이터가 영구적으로
        삭제됩니다. 비활성화 기간 동안 COTATO 서비스 이용이 제한됩니다.
      </p>
      <p>정말 탈퇴하시겠습니까?</p>
      <p style={{ margin: 0 }}>
        탈퇴를 진행하려면 아래 입력란에 아이디와 비밀번호를 입력해 주세요.
      </p>
    </>
  );
};

//
//
//

const ModalContainer = styled.div`
  display: inline-flex;
  max-width: 27rem;
  padding: 0.5rem 1.5rem 1.5rem 1.5rem;
  flex-direction: column;
  align-items: center;
  gap: 2.25rem;
  border-radius: 0.625rem;
  background: ${({ theme }) => theme.colors.common.real_white};
  box-shadow: 0px 4px 24px 2px rgba(0, 0, 0, 0.1);
  font-family: Pretendard;
`;

const HeaderSection = styled.div`
  display: flex;
  padding: 0.5rem 0rem;
  align-items: center;
`;

const InfoSection = styled.div`
  flex: 1 0 0;
`;

const FormSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const FormItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  align-self: stretch;
`;

const ButtonSection = styled.div`
  display: flex;
  padding: 0rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
`;
const ProfileInput = styled(TextField)<{ isPrimary?: boolean }>`
  width: 70%;
  margin: 0;

  & .MuiOutlinedInput-root {
    background-color: ${({ theme }) => theme.colors.primary20};
    &.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.colors.gray40};
      border-radius: 0.5rem;
    }
  }

  & .MuiInputBase-input {
    padding: 0.625rem;
  }
`;

export default AccountDeletionModal;
