import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as HeartIcon } from '@assets/heart_icon_dotted.svg';
import ready_image from '@assets/potato_ready.svg';
import Skeleton from '@mui/material/Skeleton';
import {
  CotatoSessionListResponse,
  CotatoSessionContents,
  CotatoSessionListImageInfoResponse,
} from 'cotato-openapi-clients';
import SessionIcon from '@components/Session/SessionIcon';
import SessionContents from '@components/Session/SessionContents';

import { ReactComponent as PencilIcon } from '@assets/pencil.svg';
import fetchUserData from '@utils/fetchUserData';
import { useMediaQuery } from '@mui/material';
import { device } from '@theme/media';

//
//
//

interface SessionCardProps {
  session?: CotatoSessionListResponse;
  isActive?: boolean;
  handleChangeUpdateSession?: (Session?: CotatoSessionListResponse) => void;
}

interface CardImageProps {
  $display: string;
  $isActive?: boolean;
}

//
//
//

export const IMAGE_WIDTH = '16rem';

//
//
//

const SessionCard = ({ session, isActive, handleChangeUpdateSession }: SessionCardProps) => {
  const { data: userData } = fetchUserData();

  const [imageLoading, setImageLoading] = useState(true);

  const isTabletOrSmaller = useMediaQuery(`(max-width:${device.tablet})`);

  /**
   *
   */
  const renderCardHeader = () => {
    const getHeaderSkeleton = () => (
      <>
        <Skeleton animation="wave" variant="circular" width="2.2rem" height="2.2rem" />
        <Skeleton variant="text" width="70%" height="2rem" />
      </>
    );

    const getHeaderElement = () => (
      <>
        <SessionIcon Icon={<HeartIcon />} size="lg" />
        <h3>{session?.title}</h3>
        {userData?.role === 'ADMIN' && !isTabletOrSmaller && (
          <PencilIcon
            onClick={() => handleChangeUpdateSession && handleChangeUpdateSession(session)}
          />
        )}
      </>
    );

    return <CardHeader>{session ? getHeaderElement() : getHeaderSkeleton()}</CardHeader>;
  };

  /**
   *
   */
  const renderCardImage = () => {
    const getImageSkeleton = () => (
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{ width: IMAGE_WIDTH, height: 'auto', aspectRatio: 4 / 3 }}
      />
    );

    const getImageElement = () => {
      if (!session) {
        return null;
      }

      const firstSessionImageInfo = session?.imageInfos?.at(
        0,
      ) as CotatoSessionListImageInfoResponse;

      return (
        <CardImage
          src={firstSessionImageInfo?.imageUrl || ready_image}
          alt="session"
          onLoad={() => setImageLoading(false)}
          $display={imageLoading ? 'none' : 'block'}
          $isActive={isActive}
        />
      );
    };

    return (
      <>
        {imageLoading && getImageSkeleton()} {getImageElement()}
      </>
    );
  };

  /**
   *
   */
  const renderSessionContents = () => (
    <SessionContentsWrapper>
      {session ? (
        <SessionContents
          contents={session.sessionContents as CotatoSessionContents}
          size="md"
          isActive={isActive}
        />
      ) : (
        <Skeleton animation="wave" variant="rounded" width="100%" height="1.6rem" />
      )}
    </SessionContentsWrapper>
  );

  return (
    <Container $isActive={isActive}>
      {renderCardHeader()}
      {renderCardImage()}
      {renderSessionContents()}
    </Container>
  );
};

//
//
//

const Container = styled.div<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  width: calc(${IMAGE_WIDTH} + (3px * 2));
  border: 3px solid
    ${({ $isActive, theme }) =>
      $isActive !== false ? theme.colors.primary100_1 : theme.colors.gray30};
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.colors.common.white};
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
`;

const CardHeader = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.size.md};
  padding: 0.6rem 0.8rem;

  > h3 {
    margin: 0;
    color: ${({ theme }) => theme.colors.gray80_1};
    font-family: Ycomputer;
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > svg {
    margin-left: auto;
    width: 1.25rem;
    cursor: pointer;

    > path {
      fill: ${({ theme }) => theme.colors.sub2[401]};
    }
  }
`;

const CardImage = styled.img<CardImageProps>`
  display: ${({ $display }) => $display};
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  ${({ $isActive }) =>
    $isActive === false &&
    css`
      filter: grayscale(50%);
    `}
`;

const SessionContentsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.size.sm};
  padding: ${({ theme }) => theme.size.md};
  height: 3.4rem;
`;

export default SessionCard;
