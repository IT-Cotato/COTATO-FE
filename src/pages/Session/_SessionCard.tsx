import React, { useState } from 'react';
import styled from 'styled-components';
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

//
//
//

interface SessionCardProps {
  session?: CotatoSessionListResponse;
}

//
//
//

export const IMAGE_WIDTH = '16rem';

//
//
//

const SessionCard = ({ session }: SessionCardProps) => {
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
        <SessionIcon Icon={<HeartIcon />} size="lg" />
        {session?.title}
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
        <SessionContents contents={session.sessionContents as CotatoSessionContents} size="md" />
      ) : (
        <Skeleton animation="wave" variant="rounded" width="100%" height="1.6rem" />
      )}
    </SessionContentsWrapper>
  );

  return (
    <Container>
      {renderCardHeader()}
      {renderCardImage()}
      {renderSessionContents()}
    </Container>
  );
};

//
//
//

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid ${({ theme }) => theme.colors.primary100_1};
  background: ${({ theme }) => theme.colors.common.white};
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
  border-radius: 0.6rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.size.md};
  padding: ${({ theme }) => theme.size.md} ${({ theme }) => theme.size.lg};
  padding: 0.6rem 0.8rem;
  font-family: Ycomputer;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const CardImage = styled.img<{ $display: string }>`
  display: ${({ $display }) => $display};
  width: ${IMAGE_WIDTH};
  aspect-ratio: 4 / 3;
  object-fit: cover;
`;

const SessionContentsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.size.sm};
  padding: ${({ theme }) => theme.size.md};
`;

export default SessionCard;
