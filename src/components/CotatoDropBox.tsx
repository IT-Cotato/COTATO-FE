import React, { useEffect, useRef, useState } from 'react';
import { styled, useTheme } from 'styled-components';
import { ReactComponent as CheckIcon } from '@assets/check_icon_dotted.svg';
import { CotatoGenerationInfoResponse, CotatoSessionListResponse } from 'cotato-openapi-clients';
import drop_box_background_blue from '@assets/drop_box_background_blue.svg';
import drop_box_background_yellow from '@assets/drop_box_background_yellow.svg';
import CotatoIcon from './CotatoIcon';

//
//
//

type CotatoDropBoxType = CotatoGenerationInfoResponse | CotatoSessionListResponse;

interface CotatoDropBoxProps<T extends CotatoDropBoxType> {
  list: T[];
  onChange: (item: T) => void;
  reversed?: boolean;
  defaultItemId?: number;
  color?: string;
  width?: string;
  height?: string;
  disableQueryParams?: boolean;
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
const CotatoDropBox = <T extends CotatoDropBoxType>({
  list,
  onChange,
  reversed = true,
  defaultItemId,
  color = 'blue',
  width = '8rem',
  height = '3.2rem',
}: CotatoDropBoxProps<T>) => {
  const theme = useTheme();

  const [isDropBoxOpen, setIsDropBoxOpen] = useState(false);
  const [dropBoxList, setDropBoxList] = useState<T[]>([]);
  const [selectedItem, setSelecedItem] = useState<T | null>(null);

  const dropBoxRef = useRef<HTMLDivElement>(null);

  const isInProduction = process.env.NODE_ENV === 'production';

  /**
   *
   */
  const isTypeGeneration = (
    generation: CotatoGenerationInfoResponse,
  ): generation is CotatoGenerationInfoResponse => {
    return (generation as CotatoGenerationInfoResponse).generationNumber !== undefined;
  };

  /**
   *
   */
  const isTypeSession = (
    session: CotatoSessionListResponse,
  ): session is CotatoSessionListResponse => {
    return (session as CotatoSessionListResponse).sessionNumber !== undefined;
  };

  /**
   *
   */
  const StringFormatter = (item: T | null) => {
    if (!item) {
      return '';
    }

    if (isTypeGeneration(item)) {
      return `${item.generationNumber}기`;
    }

    if (isTypeSession(item)) {
      return `${item.title}`;
    }

    return '';
  };

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

    if (color === 'yellow') {
      return {
        background: `url(${drop_box_background_yellow})`,
        arrowColor: theme.colors.primary40,
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
  const handleItemClick = (generation: T) => {
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
        <SelectText>{StringFormatter(selectedItem)}</SelectText>
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
          {dropBoxList.map((item, index) => (
            <li
              key={index}
              className={item === selectedItem ? 'selected' : ''}
              onClick={() => handleItemClick(item)}
            >
              {item === selectedItem && <StyledCheckIcon />}
              {StringFormatter(item)}
            </li>
          ))}
        </ul>
      </DropDownList>
    );
  };

  /**
   *
   */
  useEffect(() => {
    let newList = [...list];
    if (isInProduction && isTypeGeneration(list[0])) {
      newList = newList.filter(
        (generation: CotatoGenerationInfoResponse) => generation.generationNumber! >= 8,
      );
    }

    if (reversed) {
      newList = [...newList].reverse();
    }

    setDropBoxList(newList);

    if (defaultItemId) {
      const defaultItem = newList.find((item) => {
        if (isTypeGeneration(item)) {
          return item.generationId === defaultItemId;
        }

        if (isTypeSession(item)) {
          return item.sessionId === defaultItemId;
        }

        return false;
      });

      setSelecedItem(defaultItem ?? newList[0]);
    } else {
      setSelecedItem(newList[0]);
    }
  }, [list, defaultItemId]);

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

const StyledCheckIcon = styled(CotatoIcon)`
  position: absolute;
  left: 0.5rem;
  top: 0.75rem;
`;

export default CotatoDropBox;
