import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as EyeClose } from '@assets/character_eye_close.svg';

//
//
//

interface ReviewCardProps {
  $top: number;
  $left: number;
  $zIndex: number;
  $opacity: number;
}

//
//
//

const AboutReview = () => {
  const reviewList = [
    {
      name: '8기 전민재',
      content:
        '팀원들과 함께 성장하는 방법을 많이 배웠습니다!! 의지 가득한 감자들과 함께하고 싶다면 코테이토에 지원하세요 :)',
      top: 100,
      left: 40,
      zIndex: 3,
      opacity: 1,
    },
    {
      name: '9기 오지연',
      content:
        '함께하는 열정감자들의 프로젝트를 보면서 한 수 배우기도 하고 전우애도 생겨 많이 성장하게 되었어요!',
      top: 10,
      left: 95,
      zIndex: 3,
      opacity: 1,
    },
    {
      name: '9기 이주영',
      content:
        '각자 분야에 진심인 열정감자들을 보며 저도 많이 배울 수 있었습니다! 한 기수 동안 알차게 성장할 수 있어요. 추천합니다!',
      top: 5,
      left: 20,
      zIndex: 3,
      opacity: 1,
    },
    {
      name: '6기 박윤하',
      content:
        '좋은 사람들과 함께 성장할 수 있어서 좋았습니다! 코테이토와 함께 대학시절에 낭만을 채울 수 있었어요',
      top: 53,
      left: 0,
      zIndex: 2,
      opacity: 0.9,
    },
    {
      name: '9기 강다형',
      content:
        '동아리에 들어오기 전보다 실력이 꽤 향상된 것 같아요! 개발 외적으로도 좋은 사람들을 많이 만나게 되어 코테이토에 들어오길 정말 잘했다고 생각합니다~',
      top: 55,
      left: 50,
      zIndex: 2,
      opacity: 0.9,
    },
    {
      name: '6기 남기훈',
      content:
        '프로젝트 기획부터 배포에 더해 실제 운영까지 경험할 수 있는 동아리였습니다. 열정적인 감자들이 많아 서비스를 더 발전시키고 싶은 욕구가 생겨요.',
      top: 65,
      left: 100,
      zIndex: 1,
      opacity: 0.8,
    },
  ];

  return (
    <ReviewContainer>
      {reviewList.map((review, index) => (
        <ReviewCard
          key={index}
          $top={review.top}
          $left={review.left}
          $zIndex={review.zIndex}
          $opacity={review.opacity}
        >
          <CardContent>{review.content}</CardContent>
          <CardName>
            <EyeClose />
            {review.name}
          </CardName>
        </ReviewCard>
      ))}
    </ReviewContainer>
  );
};

//
//
//

const ReviewContainer = styled.div`
  position: relative;
  width: 58rem;
  height: 35rem;

  &::before {
    content: '“';
    position: absolute;
    top: -10%;
    left: 0;
    font-size: 15rem;
    color: ${({ theme }) => theme.colors.primary100_2};
    font-family: Ycomputer;
  }

  &::after {
    content: '”';
    position: absolute;
    bottom: -30%;
    right: 10%;
    font-size: 15rem;
    color: ${({ theme }) => theme.colors.primary100_2};
    font-family: Ycomputer;
  }
`;

const ReviewCard = styled.div<ReviewCardProps>`
  position: absolute;
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  transform: translate(${({ $left }) => -$left}%, ${({ $top }) => -$top}%);
  z-index: ${({ $zIndex }) => $zIndex};
  opacity: ${({ $opacity }) => $opacity};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 20rem;
  padding: 1rem 1.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary100_2};
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.colors.const.white};
`;

const CardContent = styled.span`
  color: ${({ theme }) => theme.colors.gray100};
  font-family: Pretendard;
  font-size: 1.25rem;
`;

const CardName = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.gray100};
  font-family: Ycomputer;
  font-size: 1rem;

  > svg {
    width: 2rem;
  }
`;

export default AboutReview;
