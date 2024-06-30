import React from 'react';
import styled, { useTheme } from 'styled-components';
import { ReactComponent as HeartIcon } from '@assets/heart_icon_dotted.svg';
import ready_image from '@assets/potato_ready.svg';

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

const SessionCard = ({ session }: SessionCardProps) => {
  const theme = useTheme();

  const renderCardHeader = () => (
    <CardHeader>
      <Circle>
        <HeartIcon />
      </Circle>
      {session.sessionNumber}주차 세션
    </CardHeader>
  );

  const renderCardImage = () => <CardImage src={session.photoUrl || ready_image} />;

  const renderSessionContents = () => {
    const { csEducation, itIssue, networking, devTalk } = session.sessionContents;

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

const CardImage = styled.img`
  width: 100%;
  height: 20rem;
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
