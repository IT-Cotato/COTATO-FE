import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as HeartIcon } from '@assets/heart_icon_dotted.svg';
import ready_image from '@assets/potato_ready.svg';
import Skeleton from '@mui/material/Skeleton';
import { CotatoSessionListResponse, CotatoSessionContents } from 'cotato-openapi-clients';
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

const IMAGE_HEIGHT = '20rem';

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
        <Skeleton animation="wave" variant="circular" width="2.5rem" height="2.5rem" />
        <Skeleton variant="text" width="70%" height="2rem" />
      </>
    );

    const getHeaderElement = () => (
      <>
        <SessionIcon Icon={<HeartIcon />} size="2.5rem" padding="0.5rem" />
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
      <Skeleton animation="wave" variant="rectangular" width="100%" height={IMAGE_HEIGHT} />
    );

    const getImageElement = () => {
      if (!session) {
        return null;
      }

      return (
        <CardImage
          src={session.photoUrl || ready_image}
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
  width: 20rem;
  border: 3px solid ${({ theme }) => theme.colors.primary100_1};
  background: ${({ theme }) => theme.colors.common.white};
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.size.lg};
  padding: ${({ theme }) => theme.size.md} ${({ theme }) => theme.size.lg};
  font-family: Ycomputer;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const CardImage = styled.img<{ $display: string }>`
  display: ${({ $display }) => $display};
  width: 100%;
  height: ${IMAGE_HEIGHT};
`;

const SessionContentsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.size.sm};
  padding: ${({ theme }) => theme.size.lg};
`;

export default SessionCard;
