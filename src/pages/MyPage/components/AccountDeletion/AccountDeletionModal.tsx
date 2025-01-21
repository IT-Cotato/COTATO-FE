import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const AccountDeletionModal = () => {
  return (
    <ModalContainer>
      <HeaderSection>회원 탈퇴 확인</HeaderSection>
      <InfoSection>
        <p>
          회원 탈퇴 시 계정은 30일 동안 비활성화 상태로 전환되며, 이후 회원 데이터가 영구적으로
          삭제됩니다. 비활성화 기간 동안 COTATO 서비스 이용이 제한됩니다.
        </p>
        <p>정말 탈퇴하시겠습니까?</p>
        <p>탈퇴를 진행하려면 아래 입력란에 아이디와 비밀번호를 입력해 주세요.</p>
      </InfoSection>
      <FormSection>
        <FormItem>
          <p>아이디</p>
        </FormItem>
        <FormItem>
          <p>비밀번호</p>
        </FormItem>
      </FormSection>
      <ButtonSection>
        <Button variant="contained" disabled={true}>
          탈퇴하기
        </Button>
      </ButtonSection>
    </ModalContainer>
  );
};

export default AccountDeletionModal;

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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const FormItem = styled.div`
  display: flex;
  align-items: center;
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
