import React from 'react';
import { CotatoSessionContents, CotatoSessionListResponse } from 'cotato-openapi-clients';
import { styled } from 'styled-components';
import SessionIcon from '@components/Session/SessionIcon';
import { ReactComponent as HeartIcon } from '@assets/heart_icon_dotted.svg';
import { ReactComponent as CloseIcon } from '@assets/close_dotted_circle.svg';
import { ReactComponent as CalendarIcon } from '@assets/calendar_icon_dotted.svg';
import { ReactComponent as HomeIcon } from '@assets/home_icon_dotted.svg';
import { ReactComponent as CheckIcon } from '@assets/check_icon_dotted_bg.svg';
import { ReactComponent as PencilIcon } from '@assets/pencil.svg';
import SessionContents from '@components/Session/SessionContents';
import { device, media } from '@theme/media';
import { useMediaQuery } from '@mui/material';
import fetchUserData from '@utils/fetchUserData';
import { useGeneration } from '@/hooks/useGeneration';
import dayjs from 'dayjs';

//
//
//

interface SessionDetailModalCardProps {
  session: CotatoSessionListResponse | null;
  handleClose: () => void;
  handleClickUpdateSession?: (session: CotatoSessionListResponse | null) => void;
}

//
//
//

const SessionDetailModalCard = ({
  session,
  handleClose,
  handleClickUpdateSession,
}: SessionDetailModalCardProps) => {
  const isTabletOrSmaller = useMediaQuery(`(max-width:${device.tablet})`);
  const { data: useData } = fetchUserData();
  const { generations } = useGeneration();

  /**
   *
   */
  const renderCardHeader = () => {
    return (
      <DetailCardHeader>
        <SessionIcon Icon={<HeartIcon />} size={isTabletOrSmaller ? 'md' : 'lg'} />
        <h3>{session?.title}</h3>
        {!isTabletOrSmaller && (
          <>
            {useData?.role === 'ADMIN' && (
              <UpdateButton
                type="button"
                onClick={() => handleClickUpdateSession && handleClickUpdateSession(session)}
              >
                <PencilIcon />
              </UpdateButton>
            )}
            <CloseButton type="button" onClick={handleClose}>
              <CloseIcon />
            </CloseButton>
          </>
        )}
      </DetailCardHeader>
    );
  };

  /**
   *
   */
  const renderCardInfo = () => {
    const infoList = [
      {
        icon: <CalendarIcon />,
        title: '일시',
        content: session?.sessionDateTime
          ? dayjs(session?.sessionDateTime).format('YYYY년 MM월 DD일')
          : '-',
      },
      { icon: <HomeIcon />, title: '장소', content: session?.placeName || '-' },
    ];

    return (
      <InfoWrapper>
        {infoList.map((info, index) => (
          <InfoItem key={index}>
            <SessionIcon Icon={info.icon} size="sm" />
            <span>
              {info.title} : {info.content}
            </span>
          </InfoItem>
        ))}
      </InfoWrapper>
    );
  };

  /**
   *
   */
  const renderCardTextDescription = () => {
    const generationNumber = generations?.find(
      (generation) => generation.generationId === session?.generationId,
    )?.generationNumber;

    return (
      <TextDescription>
        <p>
          {session?.title} <br /> COTATO {generationNumber || ''}기
        </p>
        <p>{session?.description}</p>
      </TextDescription>
    );
  };

  /**
   *
   */
  const renderSessionContents = () => {
    return (
      <ContentsWrapper>
        <SessionContents
          contents={session?.sessionContents as CotatoSessionContents}
          size={isTabletOrSmaller ? 'md' : 'lg'}
        />
      </ContentsWrapper>
    );
  };

  return (
    <DetailCard>
      {renderCardHeader()}
      {renderCardInfo()}
      {renderCardTextDescription()}
      {renderSessionContents()}
    </DetailCard>
  );
};

//
//
//

const DetailCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.common.white};
  padding: 0 0.5rem;
  width: 25rem;

  ${media.laptop`
    width: 20rem;
  `}

  ${media.tablet`
    width: 100%;
    padding: 0;
    justify-content: flex-start;
    flex-grow: 1;
    overflow: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `}
`;

const DetailCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray30};

  > h3 {
    margin: 0 0.5rem;
    width: 100%;
    color: ${({ theme }) => theme.colors.common.black};
    font-family: Pretendard;
    font-size: ${({ theme }) => theme.fontSize.xxl};
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${media.tablet`
      > h3 {
        font-size: ${({ theme }: { theme: any }) => theme.fontSize.xl};
      }
    `}
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  > svg {
    width: 2.25rem;
    height: 2.25rem;
  }
`;

const UpdateButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  > svg {
    width: 1.75rem;
    height: 1.75rem;

    > path {
      fill: ${({ theme }) => theme.colors.sub2[401]};
    }
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  gap: 0.5rem;
  width: 100%;

  ${media.tablet`
    padding: 1rem 1.25rem;
  `}
`;

const InfoItem = styled.span`
  display: flex;
  gap: 0.5rem;
  width: 100%;

  > span {
    color: ${({ theme }) => theme.colors.common.black};
    font-family: Pretendard;
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 700;
  }
`;

const TextDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
  padding: 1.5rem 1.75rem;
  width: 100%;
  height: 14rem;

  > p {
    color: ${({ theme }) => theme.colors.gray80_1};
    font-family: Pretendard;
    font-size: 0.875rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 400;
    line-height: 1.5rem;
  }

  ${media.tablet`
    padding: 1rem 1.25rem;
    justify-content: center;
    height: auto;
    flex-grow: 1;
  `}
`;

const ContentsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
  padding: 1.25rem;
`;

export default SessionDetailModalCard;
