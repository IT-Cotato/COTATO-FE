import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import cotato from '@assets/cotato_icon.png';
import { ReactComponent as ButtonIcon } from '@assets/button_icon.svg';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import useSWRImmutable from 'swr/immutable';
import { IMyPageInfo } from '@/typing/db';
import { logout } from '@utils/logout';

const MyInfo = () => {
  const { data: user } = useSWR('/v1/api/member/info', fetcher);
  const { data: myInfo } = useSWRImmutable<IMyPageInfo>(
    `/v1/api/member/${user?.memberId}/mypage`,
    fetcher,
  );

  const onClickLogout = useCallback(() => {
    logout();
  }, []);

  return (
    <FlexBox>
      <MyPageWrapper>
        <MyPageHeader>
          <h1>마이페이지</h1>
          <p>여기서 계정 정보를 관리하세요</p>
        </MyPageHeader>
        <MyDataHeader>
          <h3>내 정보</h3>
        </MyDataHeader>
        {user?.role !== 'GENERAL' && (
          <DataBox>
            <IDWrapper>
              <ProfileImage />
              <InfoWrapper>
                <p>아이디</p>
                <TextContainer>
                  <p>{myInfo?.email}</p>
                </TextContainer>
              </InfoWrapper>
            </IDWrapper>
            <InfoWrapper>
              <p>비밀번호</p>
              <TextContainer>
                <p>********</p>
                <Button color="#000" to="/findpw">
                  <p>변경</p>
                </Button>
              </TextContainer>
            </InfoWrapper>
            <InfoWrapper>
              <p>이름</p>
              <TextContainer>
                <p>{myInfo?.name}</p>
              </TextContainer>
            </InfoWrapper>
            <InfoWrapper>
              <p>합격기수</p>
              <TextContainer>
                <p>{myInfo?.generationNumber}기</p>
              </TextContainer>
            </InfoWrapper>
            <InfoWrapper>
              <p>포지션</p>
              <TextContainer>
                <p>{myInfo?.position}</p>
              </TextContainer>
            </InfoWrapper>
            <InfoWrapper>
              <p>전화번호</p>
              <TextContainer>
                <p>{myInfo?.phoneNumber}</p>
              </TextContainer>
            </InfoWrapper>
          </DataBox>
        )}
        {user?.role !== 'GENERAL' && (
          <ButtonContainer>
            <p>내가 풀어본 CS 문제풀이</p>
            <Link to="cs-record">
              <ButtonIcon />
            </Link>
          </ButtonContainer>
        )}
        {user?.role === 'ADMIN' && (
          <ButtonContainer>
            <p>신입 감자 가입요청 확인/승인 </p>
            <Link to="request">
              <ButtonIcon />
            </Link>
          </ButtonContainer>
        )}{' '}
        {user?.role === 'ADMIN' && (
          <ButtonContainer>
            <p>관리자 권한 설정 </p>
            <Link to="role-grant">
              <ButtonIcon />
            </Link>
          </ButtonContainer>
        )}
        <ButtonContainer>
          <p>시스템 설정</p>
          <Link to="setting">
            <ButtonIcon />
          </Link>
        </ButtonContainer>
        <LogoutButtonWrapper>
          <button onClick={onClickLogout}>
            <p>로그아웃</p>
          </button>
        </LogoutButtonWrapper>
      </MyPageWrapper>
    </FlexBox>
  );
};

export default MyInfo;

export const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const MyPageWrapper = styled.div`
  max-width: 920px;
  width: 80%;
  min-height: 100vh;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

const fontStyle = css`
  color: ${({ theme }) => theme.colors.common.black};
  font-family: NanumSquareRound;
  font-size: 16px;
  font-weight: 400;
  line-height: 160%;
  margin: 0;
`;

export const MyPageHeader = styled.div`
  margin: 120px 0 48px;

  @media screen and (max-width: 768px) {
    margin: 72px 0 40px;
  }

  > h1 {
    ${fontStyle};
    color: ${({ theme }) => theme.colors.common.black};
    font-size: 28px;
    font-weight: 800;
  }

  > p {
    ${fontStyle};
    margin-top: 8px;
  }
`;

const MyDataHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  > h3 {
    ${fontStyle};
    color: ${({ theme }) => theme.colors.common.black};
    font-size: 24px;
    font-weight: 700;
  }
`;

const Button = styled(Link)`
  padding: 8px 24px;
  box-sizing: border-box;
  background: #f3f3f3;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    padding: 4px 16px;
  }

  > p {
    ${fontStyle};
    color: ${(props) => props.color} !important;
  }
`;

const DataBox = styled.div`
  width: 100%;
  padding: 12px 36px;
  box-sizing: border-box;
  margin-bottom: 50px;
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: 16px;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.05);

  p {
    ${fontStyle}
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0 20px;

  @media screen and (max-width: 768px) {
    margin: 12px 0 12px;
  }

  > p {
    ${fontStyle};
    color: ${({ theme }) => theme.colors.common.black};
    margin-bottom: 8px;

    @media screen and (max-width: 768px) {
      margin-bottom: 4px;
    }
  }
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding: 12px 16px;
  box-sizing: border-box;
  border: ${({ theme }) => `1px solid ${theme.colors.primary100_1}}`};
  border-radius: 12px;

  @media screen and (max-width: 768px) {
    padding: 8px 12px;
  }

  > p {
    ${fontStyle};
  }
`;

const IDWrapper = styled.div`
  display: flex;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProfileImage = styled.div`
  width: 90px;
  height: 100px;
  border-radius: 50%;
  margin-right: 32px;
  background-image: url(${cotato});
  background-size: cover;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 28px 36px;
  box-sizing: border-box;
  margin: 10px 0;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.common.white};
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.05);

  @media screen and (max-width: 768px) {
    padding: 16px 24px;
  }

  > p {
    color: ${({ theme }) => theme.colors.common.black};
    font-family: NanumSquareRound;
    font-size: 20px;
    font-weight: 400;
    line-height: 160%;
    margin: 0;
  }
`;

const LogoutButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin: 28px 0 80px;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 24px;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1.5px solid #e8e8e8;
    background: ${({ theme }) => theme.colors.common.white};
    cursor: pointer;

    > p {
      ${fontStyle};
      color: ${({ theme }) => theme.colors.common.black};
    }
  }
`;
