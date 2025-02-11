import React, { useEffect, useState } from 'react';
import fetcher from '@utils/fetcher';
import { styled } from 'styled-components';
import useSWR from 'swr';
import GenerationModal from '@pages/MyPage/setting/GenerationModal';
import { checkIsAtLeastAdmin } from '@utils/role';
import { FlexBox } from '..';

//
//
//

const Setting = () => {
  const { data: user } = useSWR('/v1/api/member/info', fetcher);

  const [modalOpen, setModalOpen] = useState(false);

  //
  //
  //
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //
  //
  //

  return (
    <FlexBox>
      <MyPageWrapper>
        <MyPageHeader>
          <h1>시스템 설정</h1>
        </MyPageHeader>
        {checkIsAtLeastAdmin(user?.role) && (
          <ButtonContainer>
            <p>기수를 추가하기</p>
            <Button background="#477FEB" onClick={() => setModalOpen(true)}>
              <p>추가하기</p>
            </Button>
          </ButtonContainer>
        )}
      </MyPageWrapper>
      <GenerationModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </FlexBox>
  );
};

export default Setting;

export const MyPageWrapper = styled.div`
  max-width: 920px;
  width: 80%;
  min-height: 100vh;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

export const MyPageHeader = styled.div`
  margin: 120px 0 48px;

  @media screen and (max-width: 768px) {
    margin: 72px 0 40px;
  }

  > h1 {
    color: ${({ theme }) => theme.colors.common.black};
    font-size: 28px;
    font-weight: 800;
  }

  > p {
    margin-top: 8px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 28px 36px;
  box-sizing: border-box;
  margin: 0 0 40px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.05);

  @media screen and (max-width: 768px) {
    margin: 0 0 28px;
    padding: 12px;
  }

  > p {
    color: #1e1e1e;
    font-family: NanumSquareRound;
    font-size: 20px;
    font-weight: 400;
    line-height: 160%;
    margin: 0;

    @media screen and (max-width: 768px) {
      font-size: 16px;
      margin-left: 12px;
    }
  }
`;

const Button = styled.button<{ background: string }>`
  border-radius: 8px;
  border: 1.5px solid #e8e8e8;
  background: ${(props) => props.background};
  padding: 8px 24px;

  @media screen and (max-width: 768px) {
    padding: 8px 20px;
  }

  > p {
    color: #fff;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-weight: 400;
    line-height: 160%;
    margin: 0;

    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }
`;
