import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { ReactComponent as HeartIcon } from '@assets/heart_icon_dotted.svg';
import ready_image from '@assets/potato_ready.svg';
import Skeleton from '@mui/material/Skeleton';

//
//
//

interface SessionInfo {
  sessionId: number;
  sessionNumber: number;
  title: string;
  photoUrl: string;
  description: string;
  generationId: number;
  sessionContents: {
    itIssue: 'IT_ON' | 'IT_OFF';
    networking: 'NW_ON' | 'NW_OFF';
    csEducation: 'CS_ON' | 'CS_OFF';
    devTalk: 'DEVTALK_ON' | 'DEVTALK_OFF';
  };
}

interface SessionCardProps {
  session: SessionInfo;
}

//
//
//

const SKELETON_ANIMATION = 'wave';
const IMAGE_HEIGHT = '20rem';

//
//
//

const SessionCard = ({ session }: SessionCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const theme = useTheme();

  /**
   *
   */
  const handelImageLoad = () => {
    setImageLoading(false);
  };

  /**
   *
   */
  const renderCardHeader = () => (
    <CardHeader>
      <Circle>
        <HeartIcon />
      </Circle>
      {session.title}
    </CardHeader>
  );

  /**
   *
   */
  const renderCardImage = () => {
    const getImageSkeleton = () => (
      <Skeleton
        animation={SKELETON_ANIMATION}
        variant="rectangular"
        width="100%"
        height={IMAGE_HEIGHT}
      />
    );

    const getImageContent = () => (
      <CardImage
        src={session.photoUrl || ready_image}
        alt="session"
        onLoad={handelImageLoad}
        $display={imageLoading ? 'none' : 'bolock'}
      />
    );

    return (
      <>
        {imageLoading && getImageSkeleton()} {getImageContent()}
      </>
    );
  };

  /**
   *
   */
  const renderSessionContents = () => {
    const { itIssue, networking, csEducation, devTalk } = session.sessionContents;

    return (
      <SessionContentsWrapper>
        {csEducation === 'CS_ON' && <Content $color={theme.colors.primary100_1}>#CS</Content>}
        {itIssue === 'IT_ON' && <Content $color={theme.colors.sub2[80]}>#IT</Content>}
        {networking === 'NW_ON' && <Content $color={theme.colors.sub3[60]}>#NW</Content>}
        {devTalk === 'DEVTALK_ON' && <Content $color={theme.colors.gray80}>#DEV</Content>}
      </SessionContentsWrapper>
    );
  };

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

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary100_1};
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

const Content = styled.div<{ $color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.size.sm} ${({ theme }) => theme.size.xl};
  border-radius: 6.2rem;
  background: ${({ $color }) => $color};
  font-family: Ycomputer;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.common.white};
`;

export default SessionCard;
