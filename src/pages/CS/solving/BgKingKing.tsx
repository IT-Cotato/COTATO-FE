import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import background from '@assets/bg_kingking.svg';
import mobile from '@assets/bg_kingking_mobile.svg';
import api from '@/api/api';
import BgWaiting from './BgWaiting';
import { CotatoKingMemberInfo } from 'cotato-openapi-clients';
import { LoadingIndicator } from '@components/LoadingIndicator';
import { media } from '@theme/media';

interface BgKingKingProps {
  educationId: number;
}

const BgKingKing: React.FC<BgKingKingProps> = ({ educationId }) => {
  const [kingMembers, setKingMembers] = useState<CotatoKingMemberInfo[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showWaiting, setShowWaiting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchKing = async (educationId: number) => {
    setIsLoading(true);

    await api
      .get('/v1/api/education/kings', {
        params: {
          educationId: educationId,
        },
      })
      .then((res) => {
        console.log(res);
        setKingMembers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //
  //
  //
  useEffect(() => {
    fetchKing(educationId);
  }, []);

  //
  //
  //

  if (isLoading) {
    return <LoadingIndicator isLoading={isLoading} />;
  }

  return (
    <Wrapper>
      <h3>최다 득점자</h3>
      {kingMembers.length > 1 ? (
        <p>킹킹 문제를 풀어주세요!</p>
      ) : (
        <p>킹킹 문제는 보너스! &nbsp;다 함께 풀어봐요~</p>
      )}
      <div className="box">
        {kingMembers.map((member) => (
          <div key={member.memberId}>
            {member.name}({member.backFourNumber})
          </div>
        ))}
      </div>
      {showWaiting && <BgWaiting />}
    </Wrapper>
  );
};

export default BgKingKing;

const Wrapper = styled.div`
  background: url(${background});
  background-size: cover;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  h3 {
    color: #000;
    font-family: NanumSquareRound;
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
  }
  p {
    color: #222;
    font-family: NanumSquareRound;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
  }
  .box {
    background-color: #fff;
    width: 380px;
    margin-top: 20px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: #000;
    font-size: 1.6rem;
    font-weight: 600;
  }
  div {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
  animation: scale_up 1s ease-in-out;
  @keyframes scale_up {
    0% {
      transform: scale(0);
    }
    90% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  ${media.tablet`
    background: url(${mobile});
    /* padding-top: 180px; */
    .box {
      width: 300px;
      font-size: 1.4rem;
    }
  `}
`;
