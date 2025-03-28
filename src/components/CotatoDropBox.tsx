import React, { useEffect, useRef, useState } from 'react';
import { styled, useTheme } from 'styled-components';
import {
  CotatoAttendanceWithSessionResponse,
  CotatoGenerationInfoResponse,
  CotatoSessionListResponse,
} from 'cotato-openapi-clients';
import drop_box_background_blue from '@assets/drop_box_background_blue.svg';
import drop_box_background_yellow from '@assets/drop_box_background_yellow.svg';
import drop_box_background_yellow_lg from '@assets/drop_box_background_yellow_lg.svg';
import CotatoIcon from './CotatoIcon';

//
//
//

type CotatoDropBoxType =
  | CotatoGenerationInfoResponse
  | CotatoSessionListResponse
  | CotatoAttendanceWithSessionResponse;

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

  // const isInProduction = process.env.NODE_ENV === 'production';

  /**
   *
   */
  const isTypeGeneration = (item: CotatoDropBoxType): item is CotatoGenerationInfoResponse => {
    return (item as CotatoGenerationInfoResponse).generationNumber !== undefined;
  };

  /**
   *
   */
  const isTypeSession = (item: CotatoDropBoxType): item is CotatoSessionListResponse => {
    return (item as CotatoSessionListResponse).sessionNumber !== undefined;
  };

  /**
   *
   */
  const isTypeAttendance = (
    item: CotatoDropBoxType,
  ): item is CotatoAttendanceWithSessionResponse => {
    return (item as CotatoAttendanceWithSessionResponse).attendanceId !== undefined;
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

    if (isTypeAttendance(item)) {
      return `${item.sessionTitle}`;
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
        background: `url(${width === '12rem' ? drop_box_background_yellow_lg : drop_box_background_yellow})`,
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
              {item === selectedItem && (
                <StyledCheckIcon icon="check-solid" color={theme.colors.sub3[40]} />
              )}
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

        if (isTypeAttendance(item)) {
          return item.attendanceId === defaultItemId;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
    background-color: ${({ theme }) => theme.colors.const.white};
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

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
