import React, { useEffect, useRef, useState } from 'react';
import { styled, useTheme } from 'styled-components';
import { ReactComponent as CheckIcon } from '@assets/check_icon_dotted.svg';
import { CotatoGenerationInfoResponse } from 'cotato-openapi-clients';
import drop_box_background_blue from '@assets/drop_box_background_blue.svg';
import CotatoIcon from './CotatoIcon';

//
//
//

interface CotatoDropBoxProps {
  list: CotatoGenerationInfoResponse[];
  onChange: (generation: CotatoGenerationInfoResponse) => void;
  reversed?: boolean;
  color?: string;
  width?: string;
  height?: string;
}

interface DropBoxProps {
  $height: string;
  $background: string;
}

//
//
//

const FADE_DURATION = 300;

//
//
//

/**
 * cotato drop box component
 * @param list drop box list
 * @param onChange list value change event
 * @param reversed drop box list reversed (default: true)
 * @param color drop box color (default: blue)
 * @param width drop box width (default: 8rem)
 * @param height drop box height (default: 3.2rem)
 */
const CotatoDropBox = ({
  list,
  onChange,
  reversed = true,
  color = 'blue',
  width = '8rem',
  height = '3.2rem',
}: CotatoDropBoxProps) => {
  const theme = useTheme();

  const [isDropBoxOpen, setIsDropBoxOpen] = useState(false);
  const [dropBoxList, setDropBoxList] = useState<CotatoGenerationInfoResponse[]>([]);
  const [selectedItem, setSelecedItem] = useState<CotatoGenerationInfoResponse | null>();

  const dropBoxRef = useRef<HTMLDivElement>(null);

  const isInProduction = process.env.NODE_ENV === 'production';

  /**
   * get drop box style of color
   * @returns drop box style { background: url of drop box background, arrowColor: color code of arrow button}
   */
  const getDropBoxStyle = () => {
    if (color === 'blue') {
      return {
        background: `url(${drop_box_background_blue})`,
        arrowColor: theme.colors.sub2[80],
      };
    }

    return {
      background: `url(${drop_box_background_blue})`,
      arrowColor: theme.colors.sub2[80],
    };
  };

  /**
   *
   */
  const handleDropDownChange = () => {
    setIsDropBoxOpen(!isDropBoxOpen);
  };

  /**
   *
   */
  const handleItemClick = (generation: CotatoGenerationInfoResponse) => {
    handleDropDownChange();
    setSelecedItem(generation);
    onChange(generation);
  };

  /**
   *
   */
  const renderDropBox = () => {
    const { background, arrowColor } = getDropBoxStyle();

    return (
      <DropBox onClick={handleDropDownChange} $height={height} $background={background}>
        <SelectText>
          {selectedItem?.generationNumber}
          {selectedItem && '기'}
        </SelectText>
        {isDropBoxOpen ? (
          <StyledCotatoIcon icon="angle-up-solid" color={arrowColor} />
        ) : (
          <StyledCotatoIcon icon="angle-down-solid" color={arrowColor} />
        )}
      </DropBox>
    );
  };

  /**
   *
   */
  const renderDropDownList = () => {
    return (
      <DropDownList className={isDropBoxOpen ? 'fade-in' : 'fade-out'}>
        <ul>
          {dropBoxList.map((item) => (
            <li
              key={item.generationId}
              className={item === selectedItem ? 'selected' : ''}
              onClick={() => handleItemClick(item)}
            >
              {item === selectedItem && <StyledCheckIcon />}
              {item.generationNumber}기
            </li>
          ))}
          {/* {generations
            .filter(
              (generation) =>
                !isInProduction ||
                (generation?.generationNumber && generation.generationNumber >= 8),
            )
            .map((generation) => (
              <li
                key={generation.generationId}
                className={generation === selectedGeneration ? 'selected' : ''}
                onClick={() => handleGenerationClick(generation)}
              >
                {generation === selectedGeneration && <StyledCheckIcon />}
                {generation.generationNumber}기
              </li>
            ))} */}
        </ul>
      </DropDownList>
    );
  };

  /**
   *
   */
  useEffect(() => {
    if (reversed) {
      const reversedList = [...list].reverse();
      setDropBoxList(reversedList);
      setSelecedItem(reversedList[0]);
    } else {
      setDropBoxList(list);
      setSelecedItem(list[0]);
    }
  }, [list]);

  /**
   *
   */
  useEffect(() => {
    window.addEventListener('mousedown', (e) => {
      if (dropBoxRef.current && !dropBoxRef.current.contains(e.target as Node) && isDropBoxOpen) {
        handleDropDownChange();
      }
    });
    return () => window.removeEventListener('mousedown', () => {});
  }, [dropBoxRef, isDropBoxOpen]);

  // /**
  //  *
  //  */
  // useEffect(() => {
  //   if (!rawGenerations || isGenerationLoading) {
  //     return;
  //   }

  //   const sortedGenerations = generationSort(rawGenerations);
  //   setGenerations(sortedGenerations);

  //   handleGenerationSelect(sortedGenerations[0]);
  // }, [rawGenerations, isGenerationLoading]);

  return (
    <Wrapper ref={dropBoxRef} $width={width}>
      {renderDropBox()}
      {renderDropDownList()}
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div<{ $width: string }>`
  position: relative;
  margin: ${({ theme }) => theme.size.md};
  margin: 0.6rem;
  width: ${({ $width }) => $width};
`;

const DropBox = styled.div<DropBoxProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${({ $height }) => $height};
  padding: ${({ theme }) => theme.size.md};
  cursor: pointer;
  user-select: none;
  background-image: ${({ $background }) => $background};
  background-size: 100% 100%;
`;

const SelectText = styled.span`
  font-family: Ycomputer;
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.size.lg};
`;

const StyledCotatoIcon = styled(CotatoIcon)`
  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  animation: fade-in ${FADE_DURATION}ms linear;
`;

const DropDownList = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  max-height: 20rem;
  overflow-y: scroll;

  // hide scrollbar except safari
  scrollbar-width: none;
  // hide scrollbar in safari
  &::-webkit-scrollbar {
    display: none;
  }

  &.fade-in {
    visibility: visible;
    opacity: 1;
  }

  &.fade-out {
    visibility: hidden;
    opacity: 0;
  }

  transition:
    opacity ${FADE_DURATION}ms ease-out,
    visibility ${FADE_DURATION}ms;

  > ul {
    background-color: ${({ theme }) => theme.colors.common.white_const};
    padding: 0;
    margin: 0.25rem 0;

    > li {
      list-style-type: none;
      position: relative;
      cursor: pointer;
      height: 3rem;
      text-align: center;
      font-family: Ycomputer;
      font-size: ${({ theme }) => theme.size.lg};
      line-height: 3rem;

      &.selected {
        background-color: ${({ theme }) => theme.colors.gray10};
      }
    }
  }
`;

const StyledCheckIcon = styled(CheckIcon)`
  position: absolute;
  left: 0.5rem;
  top: 0.75rem;
`;

export default CotatoDropBox;
