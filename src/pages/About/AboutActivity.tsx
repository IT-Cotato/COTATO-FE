import React from 'react';
import { styled } from 'styled-components';
import project from '@assets/about_us_project.png';
import study from '@assets/about_us_study.png';
import itEvent from '@assets/about_us_it_event.png';
import amusement from '@assets/about_us_amusement.png';
import { media } from '@theme/media';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import CotatoTooltip from '@components/CotatoTooltip';

//
//
//

const AboutActivity = () => {
  const { isTabletOrSmaller } = useBreakpoints();

  const activityList = [
    {
      image: project,
      title: '프로젝트',
      content: '각 파트별 감자들과 팀을 이루어 한 기수동안 프로젝트를 진행해요.',
    },
    {
      image: study,
      title: '스터디',
      content: '개인이 원하는 주제로 스터디를개설하고 팀원을 모아 공부해요.',
    },
    {
      image: itEvent,
      title: 'IT행사 참여',
      content: '관심있는 감자들과 함께 외부 공모전, IT 관련 박람회 등에 참여해요.',
    },
    {
      image: amusement,
      title: '번개모임',
      content: '한강번개, 모각코, 스키장번개 등 다양한 친목활동도 함께해요.',
    },
  ];

  return (
    <Wrapper>
      <CotatoTooltip
        arrow
        open={true}
        title="감자들과 함께 다양한 활동을 할 수 있어요!"
        fontSize={isTabletOrSmaller ? '1rem' : '1.5rem'}
        padding={isTabletOrSmaller ? '0.5rem 1.25rem' : '0.75rem 1.5rem'}
        borderWidth="2px"
        placement="top"
        PopperProps={{
          disablePortal: true,
          modifiers: [
            {
              name: 'flip',
              enabled: false,
            },
          ],
        }}
      >
        <div></div>
      </CotatoTooltip>
      <CardContainer>
        {activityList.map((activity, index) => (
          <ActivityCard key={index}>
            <img src={activity.image} />
            <CardDescription>
              <CardTitle>{activity.title}</CardTitle>
              <CardContent>{activity.content}</CardContent>
            </CardDescription>
          </ActivityCard>
        ))}
      </CardContainer>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  width: 100%;

  ${media.desktop`
    width: 37rem;
    row-gap: 3rem;
    column-gap: 0rem;
  `}

  ${media.tablet`
    width: 26rem;
    justify-content: center;
  `}

  ${media.landscape`
    width: 12rem;
  `}
`;

const ActivityCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0.5rem 0.9rem 1.5rem;
  border: 2.5px solid ${({ theme }) => theme.colors.primary100_2};
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.const.white};

  > img {
    width: 14rem;

    ${media.tablet`
      width: 11rem;
    `}
  }

  ${media.landscape`
    padding: 0.375rem 0.375rem 1rem;
  `}
`;

const CardDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardTitle = styled.span`
  color: ${({ theme }) => theme.colors.gray100};
  font-family: Pretendard;
  font-size: 1.5rem;
  font-weight: 700;

  ${media.tablet`
    font-size: 1.25rem;
  `}
`;

const CardContent = styled.span`
  width: 14rem;
  color: ${({ theme }) => theme.colors.gray70};
  font-family: Pretendard;
  font-size: 0.875rem;

  ${media.tablet`
    width: 11rem;
    font-size: 0.75rem;
  `}
`;

export default AboutActivity;
