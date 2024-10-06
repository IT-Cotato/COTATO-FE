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
  isActive?: boolean;
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
 * session contents icons (IT issue, networking, CS education, dev talk)
 * @param contents session contents
 * @param size size of the icon (default : sm)
 */
const SessionContents = ({ contents, size = 'sm', isActive }: SessionContentsProps) => {
  const theme = useTheme();

  const itIssue = contents?.itIssue;
  const networking = contents?.networking;
  const csEducation = contents?.csEducation;
  const devTalk = contents?.devTalk;

  /**
   *
   */
  const getContentStyle = () => {
    if (size === 'sm') {
      return {
        fontSize: theme.fontSize.xs,
        padding: `0.2rem ${theme.size.lg}`,
        borderRadius: '5rem',
      };
    } else if (size === 'md') {
      return {
        fontSize: theme.fontSize.sm,
        padding: `0.4rem ${theme.size.lg}`,
        borderRadius: '6rem',
      };
    } else if (size === 'lg') {
      return {
        fontSize: theme.fontSize.md,
        padding: `0.5rem 1.25rem`,
        borderRadius: '7rem',
      };
    }

    return {
      fontSize: theme.fontSize.xs,
      padding: `${theme.size.sm} ${theme.size.xl}`,
      borderRadius: '5rem',
    };
  };

  /**
   *
   */
  const getContentColor = (color: string) => {
    if (isActive === false) {
      return theme.colors.gray30;
    }

    return color;
  };

  const { fontSize, padding, borderRadius } = getContentStyle();

  return (
    <>
      {csEducation === SessionContentsCsEducation.ON && (
        <Content
          $color={getContentColor(theme.colors.primary100_1)}
          $fontSize={fontSize}
          $padding={padding}
          $borderRadius={borderRadius}
        >
          #CS
        </Content>
      )}
      {itIssue === SessionContentsItIssue.ON && (
        <Content
          $color={getContentColor(theme.colors.sub2[80])}
          $fontSize={fontSize}
          $padding={padding}
          $borderRadius={borderRadius}
        >
          #IT
        </Content>
      )}
      {networking === SessionContentsNetworking.ON && (
        <Content
          $color={getContentColor(theme.colors.sub3[60])}
          $fontSize={fontSize}
          $padding={padding}
          $borderRadius={borderRadius}
        >
          #NET
        </Content>
      )}
      {devTalk === SessionContentsDevTalk.ON && (
        <Content
          $color={getContentColor(theme.colors.gray80)}
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
