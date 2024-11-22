import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PanelShort } from '@assets/cotato_panel_short.svg';
import { ReactComponent as PanelDefault } from '@assets/cotato_panel_default.svg';
import { ReactComponent as PanelLong } from '@assets/cotato_panel_long.svg';

//
//
//

type SizeStateType = 'short' | 'default' | 'long';

interface CotatoPanelProps {
  size: SizeStateType;
  textImgSrc: string;
}

//
//
//

const CotatoPanel: React.FC<CotatoPanelProps> = ({ size, textImgSrc }) => {
  /**
   *
   */
  const getPanelBackground = (size: SizeStateType) => {
    switch (size) {
      case 'short':
        return <PanelShort />;
      case 'default':
        return <PanelDefault />;
      case 'long':
        return <PanelLong />;
      default:
        return <PanelDefault />;
    }
  };

  /**
   *
   */
  const renderPanelText = () => {
    return <img src={textImgSrc} />;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BackgroundDiv = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
`;

const TextDiv = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-bottom: 0.6rem;
`;

export default CotatoPanel;
