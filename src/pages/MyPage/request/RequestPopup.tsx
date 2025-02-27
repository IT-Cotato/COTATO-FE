import React, { useCallback, useEffect } from 'react';
import { IApplyMember, IEnrollMember } from '@/typing/db';
import styled from 'styled-components';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import api from '@/api/api';
import useSWRImmutable from 'swr/immutable';
import { CotatoGenerationInfoResponse } from 'cotato-openapi-clients';
import CotatoIcon from '@components/CotatoIcon';
import { IconButton } from '@mui/material';

interface Props {
  mode: string;
  member: IApplyMember;
  generation?: CotatoGenerationInfoResponse;
  position: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RequestPopup = ({ mode, member, generation, position, isOpen, setIsOpen }: Props) => {
  const { mutate: mutateApply } = useSWR<IApplyMember[]>('/v1/api/admin/applicants', fetcher);
  const { mutate: mutateReject } = useSWRImmutable<IApplyMember[]>(
    '/v1/api/admin/reject-applicants',
    fetcher,
  );
  const { mutate: mutateActive } = useSWRImmutable<IEnrollMember[]>(
    '/v1/api/admin/active-members',
    fetcher,
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const getMemberPosition = useCallback(() => {
    if (position === '백엔드') {
      return 'BE';
    } else if (position === '프론트엔드') {
      return 'FE';
    } else if (position === '디자인') {
      return 'DESIGN';
    } else if (position === '기획') {
      return 'PM';
    }

    return '';
  }, [position]);

  const onClickConfirmButton = useCallback(() => {
    if (mode === 'approve') {
      api
        .patch('/v1/api/admin/approve', {
          memberId: member.id,
          position: getMemberPosition(),
          generationId: generation?.generationId,
        })
        .then(() => {
          mutateApply();
          mutateActive();
          setIsOpen(false);
        })
        .catch((err) => console.error(err));
    } else if (mode === 'reject') {
      api
        .patch('/v1/api/admin/reject', {
          memberId: member.id,
        })
        .then(() => {
          mutateApply();
          mutateReject();
          mutateActive();
          setIsOpen(false);
        })
        .catch((err) => console.error(err));
    } else if (mode === 'reapprove') {
      api
        .patch('/v1/api/admin/reapprove', {
          memberId: member.id,
          position: getMemberPosition(),
          generationId: generation?.generationId,
        })
        .then(() => {
          mutateApply();
          mutateReject();
          setIsOpen(false);
        })
        .catch((err) => console.error(err));
    }
  }, [mode, member, generation, position]);

  if (!isOpen) {
    return <></>;
  }

  return (
    <Overlay>
      <PopupWrapper>
        <IconButton
          sx={{
            position: 'absolute',
            top: '24px',
            right: '32px',
          }}
          onClick={() => setIsOpen(false)}
        >
          <CotatoIcon
            icon="times-solid"
            size="36px"
            color={(theme) => theme.colors.gray70}
            onClick={() => setIsOpen(false)}
          />
        </IconButton>
        <InformWrapper>
          {mode === 'reject' ? (
            <CotatoIcon
              icon="times-circle-solid"
              size="3rem"
              color={(theme) => theme.colors.common.black_const}
            />
          ) : (
            <CotatoIcon
              icon="check-solid"
              color={(theme) => theme.colors.common.black_const}
              size="2rem"
            />
          )}
          <p>
            {member.name}님의 가입을 {mode === 'reject' ? '거절' : '승인'} 하시겠습니까?
          </p>
        </InformWrapper>
        <ConfirmButton onClick={onClickConfirmButton}>
          <p>확인</p>
        </ConfirmButton>
      </PopupWrapper>
    </Overlay>
  );
};

export default RequestPopup;

export const Overlay = styled.div`
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const PopupWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 660px;
  height: 352px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.1);
`;

const InformWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px 0 40px;

  > p {
    color: #1e1e1e;
    font-family: NanumSquareRound;
    font-size: 24px;
    font-weight: 700;
    line-height: 160%;
    text-transform: capitalize;
    margin-top: 12px;
  }
`;

const ConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 253px;
  height: 58px;
  border: none;
  border-radius: 12px;
  background: #000;
  cursor: pointer;

  > p {
    color: #fff;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-weight: 700;
    line-height: 160%;
    letter-spacing: 3.2px;
  }
`;
