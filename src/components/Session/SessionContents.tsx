import React from 'react';
import { CotatoSessionContents } from 'cotato-openapi-clients';
import { styled, useTheme } from 'styled-components';
import {
  SessionContentsCsEducation,
  SessionContentsDevTalk,
  SessionContentsItIssue,
  SessionContentsNetworking,
} from '@/enums/SessionContents';

//
//
//

interface SessionContentsProps {
  contents: CotatoSessionContents;
  /**
   * size of the icon
   * - **sm** : small
   * - **md** : medium
   */
  size: string;
}

interface ContentProps {
  $color: string;
  $fontSize: string;
  $padding: string;
  $borderRadius: string;
}

//
//
//

/**
 * session Contents icons (IT issue, networking, CS education, dev talk)
 * @param contents session contents
 * @param size size of the icon (default : sm)
 */
const SessionContents = ({ contents, size = 'sm' }: SessionContentsProps) => {
  const theme = useTheme();

  const { itIssue, networking, csEducation, devTalk } = contents;

  /**
   *
   */
  const getContentStyle = () => {
    if (size === 'sm') {
      return {
        fontSize: theme.fontSize.xs,
        padding: `${theme.size.sm} ${theme.size.xl}`,
        borderRadius: '5rem',
      };
    } else if (size === 'md') {
      return {
        fontSize: theme.fontSize.sm,
        padding: `${theme.size.md} ${theme.size.xxl}`,
        borderRadius: '6rem',
      };
    }

    return {
      fontSize: theme.fontSize.xs,
      padding: `${theme.size.sm} ${theme.size.xl}`,
      borderRadius: '5rem',
    };
  };

  const { fontSize, padding, borderRadius } = getContentStyle();

  return (
    <>
      {csEducation === SessionContentsCsEducation.ON && (
        <Content
          $color={theme.colors.primary100_1}
          $fontSize={fontSize}
          $padding={padding}
          $borderRadius={borderRadius}
        >
          #CS
        </Content>
      )}
      {itIssue === SessionContentsItIssue.ON && (
        <Content
          $color={theme.colors.sub2[80]}
          $fontSize={fontSize}
          $padding={padding}
          $borderRadius={borderRadius}
        >
          #IT
        </Content>
      )}
      {networking === SessionContentsNetworking.ON && (
        <Content
          $color={theme.colors.sub3[60]}
          $fontSize={fontSize}
          $padding={padding}
          $borderRadius={borderRadius}
        >
          #NET
        </Content>
      )}
      {devTalk === SessionContentsDevTalk.ON && (
        <Content
          $color={theme.colors.gray80}
          $fontSize={fontSize}
          $padding={padding}
          $borderRadius={borderRadius}
        >
          #DEV
        </Content>
      )}
    </>
  );
};

const Content = styled.span<ContentProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ $padding }) => $padding};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  background: ${({ $color }) => $color};
  font-family: Ycomputer;
  font-size: ${({ $fontSize }) => $fontSize};
  color: ${({ theme }) => theme.colors.common.white};
  user-select: none;
`;

export default SessionContents;
