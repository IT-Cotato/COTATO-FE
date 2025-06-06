import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PanelShort } from '@assets/cotato_panel_short.svg';
import { ReactComponent as PanelDefault } from '@assets/cotato_panel_default.svg';
import { ReactComponent as PanelLong } from '@assets/cotato_panel_long.svg';

//
//
//

export enum SizeStateEnum {
  SHORT = 'short',
  DEFAULT = 'default',
  LONG = 'long',
}

interface CotatoPanelProps {
  size: SizeStateEnum;
  textImgSrc: string;
}

/**
 * @param {SizeStateEnum} size panel size - short, default, long
 * @param {string} textImgSrc panel text image source
 */
const CotatoPanel: React.FC<CotatoPanelProps> = ({ size, textImgSrc }) => {
  /**
   *
   */
  const getPanelBackground = (size: SizeStateEnum) => {
    switch (size) {
      case SizeStateEnum.SHORT:
        return <PanelShort style={{ width: '10.25rem' }} />;
      case SizeStateEnum.DEFAULT:
        return <PanelDefault style={{ width: '14rem' }} />;
      case SizeStateEnum.LONG:
        return <PanelLong style={{ width: '17.5rem' }} />;
      default:
        return <PanelDefault style={{ width: '14rem' }} />;
    }
  };

  /**
   *
   */
  const renderPanelText = () => {
    return <img src={textImgSrc} style={{ width: '75%' }} />;
  };

  return (
    <Wrapper>
      <BackgroundDiv>{getPanelBackground(size)}</BackgroundDiv>
      <TextDiv>{renderPanelText()}</TextDiv>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BackgroundDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const TextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-bottom: 0.5rem;
`;

export default CotatoPanel;
