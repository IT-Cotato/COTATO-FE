import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ready_image from '@assets/potato_ready.svg';
import Skeleton from '@mui/material/Skeleton';
import {
  CotatoSessionListResponse,
  CotatoSessionContents,
  CotatoSessionListImageInfoResponse,
} from 'cotato-openapi-clients';
import SessionIcon from '@components/Session/SessionIcon';
import SessionContents from '@components/Session/SessionContents';
import CotatoIcon from '@components/CotatoIcon';
import imageSortByOrder from '@utils/imageSortByOrder';

//
//
//

interface SessionCardProps {
  session?: CotatoSessionListResponse | null;
  isActive?: boolean;
  handleSessionClick?: (session: CotatoSessionListResponse) => void;
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

const SessionCard = ({ session, isActive, handleSessionClick }: SessionCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);

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
        <SessionIcon
          Icon={<CotatoIcon icon="heart-solid" color={(theme) => theme.colors.common.white} />}
          size="lg"
          isActive={isActive}
        />
        <h3>{session?.title}</h3>
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

      const firstSessionImageInfo = imageSortByOrder(
        session.imageInfos as CotatoSessionListImageInfoResponse[],
      )[0];

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
    <Container
      $isActive={isActive}
      onClick={() => session && handleSessionClick && handleSessionClick(session)}
    >
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
  border: 2px solid
    ${({ $isActive, theme }) =>
      $isActive !== false ? theme.colors.primary100_1 : theme.colors.gray30};
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.colors.common.white};
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
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
