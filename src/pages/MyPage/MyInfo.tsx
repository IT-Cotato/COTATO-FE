import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import fetcher from '@utils/fetcher';
import useSWRImmutable from 'swr/immutable';
import { IMyPageInfo } from '@/typing/db';
import { logout } from '@utils/logout';
import { Stack } from '@mui/material';
import cotatoCharacterFront from '@assets/cotato_character_front.svg';
import cotatoCharacterBack from '@assets/cotato_character_back.svg';
import cotatoCharacterPM from '@assets/cotato_character_pm.svg';
import cotatoCharacterDesign from '@assets/cotato_character_design.svg';
import cotatoCharacter from '@assets/crown_character.svg';
import useUser from '@/hooks/useUser';
import { CotatoMemberInfoResponsePositionEnum } from 'cotato-openapi-clients';
import CotatoIcon from '@components/CotatoIcon';

import { checkIsAtLeastMember, checkIsUnderAdmin } from '@utils/role';

//
//
//

interface CotatoCharacterProps {
  imgSrc: string;
}

const COTATO_CHARCTER_SVG_MAP: Partial<
  Record<CotatoMemberInfoResponsePositionEnum, CotatoCharacterProps>
> = {
  FE: {
    imgSrc: cotatoCharacterFront,
  },
  BE: { imgSrc: cotatoCharacterBack },
  PM: { imgSrc: cotatoCharacterPM },
  DESIGN: { imgSrc: cotatoCharacterDesign },
  NONE: { imgSrc: cotatoCharacter },
};

//
//
//

const MyInfo = () => {
  const { user } = useUser();
  const { data: myInfo } = useSWRImmutable<IMyPageInfo>(
    `/v1/api/member/${user?.memberId}/mypage`,
    fetcher,
  );

  const onClickLogout = useCallback(() => {
    logout();
  }, []);

  /**
   *
   */
  const renderMemberMenus = () => {
    if (!checkIsAtLeastMember(user?.role)) {
      return null;
    }

    return (
      <>
        <DataBox>
          <IDWrapper>
            <Stack justifyContent="center" alignItems="center">
              <ProfileImage
                src={
                  COTATO_CHARCTER_SVG_MAP[
                    user?.position ?? CotatoMemberInfoResponsePositionEnum.None
                  ]?.imgSrc as string
                }
              />
            </Stack>
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

        <StyledLink to="cs-record">
          <ButtonContainer>
            <p>내가 풀어본 CS 문제풀이</p>
            <CotatoIcon icon="angle-right-solid" size="2rem" />
          </ButtonContainer>
        </StyledLink>
      </>
    );
  };

  /**
   *
   */
  const renderAdminMenus = () => {
    if (checkIsUnderAdmin(user?.role)) {
      return null;
    }

    return (
      <>
        <StyledLink to="request">
          <ButtonContainer>
            <p>신입 감자 가입요청 확인/승인 </p>
            <CotatoIcon icon="angle-right-solid" size="2rem" />
          </ButtonContainer>
        </StyledLink>

        <StyledLink to="role-grant">
          <ButtonContainer>
            <p>관리자 권한 설정 </p>
            <CotatoIcon icon="angle-right-solid" size="2rem" />
          </ButtonContainer>
        </StyledLink>

        <StyledLink to="setting">
          <ButtonContainer>
            <p>시스템 설정</p>
            <CotatoIcon icon="angle-right-solid" size="2rem" />
          </ButtonContainer>
        </StyledLink>
      </>
    );
  };

  //
  //
  //

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
        {renderMemberMenus()}
        {renderAdminMenus()}
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

const ProfileImage = styled.div<{ src: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 32px;
  background-image: url(${(props) => props.src});
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.common.black};
`;
