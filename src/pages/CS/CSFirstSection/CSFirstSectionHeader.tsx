import React from 'react';
import { ReactComponent as C } from '@assets/C.svg';
import { ReactComponent as S } from '@assets/S.svg';
import { ReactComponent as Gyo } from '@assets/gyo.svg';
import { ReactComponent as Yook } from '@assets/yook.svg';
import { styled } from 'styled-components';
import { media } from '@theme/media';

//
//
//

const StyledC = styled(C)`
  width: 4.625rem;
  height: 5rem;
  margin-top: 1.5rem;
  margin-right: 0.5rem;

  ${media.tablet`
    margin-top: 1rem;
    margin-right: 0.25rem;
  `}
`;

const ICON_LIST = [StyledC, S, Gyo, Yook];

//
//
//

const CSFirstSectionHeader = () => {
  return (
    <IconContainer>
      {ICON_LIST.map((Icon, index) => (
        <IconWrapper key={index}>
          <Icon />
        </IconWrapper>
      ))}
    </IconContainer>
  );
};

export default CSFirstSectionHeader;

//
//
//

const IconContainer = styled.div`
  display: flex;
  justify-content: center;

  ${media.tablet`
    gap: 0.25rem;
    margin-bottom: -2rem;
  `}
`;

const IconWrapper = styled.div`
  ${media.tablet`
    > svg {
      width: 3rem;
    }
  `}
`;
