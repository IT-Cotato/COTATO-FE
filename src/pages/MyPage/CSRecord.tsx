import React from 'react';
import fetcher from '@utils/fetcher';
import styled from 'styled-components';
import useSWR from 'swr';
import localeKr from '@/assets/locale/locale_kr.json';
import useUser from '@/hooks/useUser';
import { useGeneration } from '@/hooks/useGeneration';
import CotatoDropBox from '@components/CotatoDropBox';
import { useSearchParams } from 'react-router-dom';

//
//
//

const medalImgSrcs = [
  'https://velog.velcdn.com/images/ea_st_ring/post/c6984138-964f-48e7-8c66-62c817ce2d76/image.svg',
  'https://velog.velcdn.com/images/ea_st_ring/post/62560df6-8a97-478b-a483-f5ae79768c6e/image.svg',
  'https://velog.velcdn.com/images/ea_st_ring/post/0bf409e2-36e8-4103-bc85-56a91072b21e/image.svg',
  'https://velog.velcdn.com/images/ea_st_ring/post/5e6fc3c3-18af-4dc4-bdfa-98557c9b1d10/image.svg',
  'https://velog.velcdn.com/images/ea_st_ring/post/80026402-2707-4ff9-9503-223c6fbb7396/image.svg',
];

//
//
//

const CSRecord = () => {
  const { user } = useUser();
  const [params] = useSearchParams();
  const { generations } = useGeneration();
  const generationId = params.get('generationId');

  const [selectedGenerationId, setSelectedGenerationId] = React.useState<string | undefined>(
    generationId || undefined,
  );

  const { targetGeneration } = useGeneration({ generationId: selectedGenerationId });

  const { data: hallOfFameData } = useSWR(
    '/v1/api/mypage/hall-of-fame?generationId=' + targetGeneration?.generationId,
    fetcher,
  );

  //
  //
  //

  return (
    <Wrapper>
      <Title>내가 풀어본 CS 문제풀이</Title>
      <SelectGenerationDiv>
        {generations && (
          <CotatoDropBox
            list={generations}
            onChange={(generation) => {
              setSelectedGenerationId(generation?.generationId?.toString());
            }}
          />
        )}
        {/* </select> */}
      </SelectGenerationDiv>
      <MyInfoBox>
        <InfoDiv>
          <BadgeDiv>
            <Badge backgroundcolor="rgba(37, 156, 46, 0.52)">
              {targetGeneration?.generationNumber}기
            </Badge>
            <Badge backgroundcolor="rgba(235, 83, 83, 0.51)">
              {localeKr[(user?.position as keyof typeof localeKr) || 'NONE']}
            </Badge>
            <Badge backgroundcolor="#93C6FE">
              {localeKr[(user?.role as keyof typeof localeKr) || 'NONE']}
            </Badge>
          </BadgeDiv>
          <h2>감자 {user?.name}님 반갑습니다.</h2>
          <RecordDiv>
            <img
              src="https://velog.velcdn.com/images/ea_st_ring/post/bc09a715-202b-41ee-acee-1c3f22be4644/image.svg"
              alt="record"
            />
            <p>
              득점 횟수 <span>{hallOfFameData?.myInfo.scorerCount}EA</span>
            </p>
            <div style={{ width: '1px', height: '30px', background: 'black' }}></div>
            <img
              src="https://velog.velcdn.com/images/ea_st_ring/post/2ec91ab2-db18-4fc1-b4f4-f420d582cf24/image.svg"
              alt="score"
            />
            <p>
              정답 횟수 <span>{hallOfFameData?.myInfo.answerCount}EA</span>
            </p>
          </RecordDiv>
        </InfoDiv>
      </MyInfoBox>
      <HallOfFameBox>
        <h1>득점자 명예의 전당</h1>
        {hallOfFameData?.scorerInfo.map((answerer: any, idx: number) => (
          <HallOfFameListDiv key={idx}>
            <OrderImageDiv>
              <img src={medalImgSrcs[idx]} alt="gold-medal" />
            </OrderImageDiv>
            <FameInfoDiv>
              <div>
                <p>{answerer.name}</p>
                <p>{answerer.count}EA</p>
              </div>
              <ProgressBar />
            </FameInfoDiv>
          </HallOfFameListDiv>
        ))}
      </HallOfFameBox>
      <HallOfFameBox>
        <h1>정답자 명예의 전당</h1>
        {hallOfFameData?.answerInfo.map((answerer: any, idx: number) => (
          <HallOfFameListDiv key={idx}>
            <OrderImageDiv>
              <img src={medalImgSrcs[idx]} alt="gold-medal" />
            </OrderImageDiv>
            <FameInfoDiv>
              <div>
                <p>{answerer.name}</p>
                <p>{answerer.count}EA</p>
              </div>
              <ProgressBar />
            </FameInfoDiv>
          </HallOfFameListDiv>
        ))}
      </HallOfFameBox>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 140px 200px;
  @media screen and (max-width: 768px) {
    padding: 100px 20px;
  }
`;

const Title = styled.h1`
  width: 100%;
  color: ${({ theme }) => theme.colors.common.black};
  font-family: NanumSquareRound;
  font-size: 28px;
  font-style: normal;
  text-align: center;
  font-weight: 800;
  line-height: 160%; /* 44.8px */
  text-transform: capitalize;
  margin-bottom: 0;
`;

const MyInfoBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 40px;
  width: 695px;
  height: fit-content;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.common.black};
  background-color: ${({ theme }) => theme.colors.common.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 20px 10px;
  }
`;

const SelectGenerationDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 695px;
  height: 100%;
  select {
    width: 80px;
    height: 40px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding: 10px;
    margin-right: 20px;
    &:focus {
      outline: none;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const InfoDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 20px;
  @media screen and (max-width: 768px) {
    margin-left: 0;
    h2 {
      font-size: 16px;
    }
  }
`;

const BadgeDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.common.white};
`;

const Badge = styled.div<{ backgroundcolor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 5px 10px;
  color: ${({ theme }) => theme.colors.common.white};
  background: ${(props) => props.backgroundcolor};

  & + & {
    margin-left: 10px;
  }
  @media screen and (max-width: 768px) {
    width: fit-content;
    font-size: 12px;
  }
`;

const RecordDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.common.black};
  font-family: NanumSquareRound;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  div {
    margin: 0 12px 0 0;
  }
  p {
    margin: 0 12px;
  }
  span {
    margin: 0 0 0 12px;
    font-weight: 900;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
    div {
      margin: 0 4px 0 4px;
    }
    h2 {
      font-size: 16px;
    }
    p {
      margin: 0 4px;
    }
    span {
      margin: 0 0 0 4px;
    }
  }
`;

const HallOfFameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: 695px;
  height: fit-content;
  background: ${({ theme }) => theme.colors.common.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  h1 {
    color: #bfc21b;
    font-family: NanumSquareRound;
    font-size: 24px;
    font-weight: 800;
  }
  & + & {
    margin-top: 20px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    h1 {
      font-size: 16px;
    }
  }
`;

const HallOfFameListDiv = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  & + & {
    margin-top: 20px;
  }
`;

const OrderImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  img {
    width: 64px;
    height: 64px;
  }
  @media screen and (max-width: 768px) {
    width: 48px;
    height: 48px;
    img {
      width: 48px;
      height: 48px;
    }
  }
`;

const FameInfoDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 20px;
  height: 100%;
  div:first-child {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 5px;
    p {
      margin: 0;
      color: ${({ theme }) => theme.colors.common.black};
      font-family: NanumSquareRound;
      font-size: 20px;
      font-weight: 700;
    }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 14px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #85c88a;
  @media screen and (max-width: 768px) {
    min-width: 270px;
  }
`;
export default CSRecord;
