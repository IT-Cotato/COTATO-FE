import React, { useEffect, useRef, useState } from 'react';
import { keyframes, styled, useTheme } from 'styled-components';
import { ReactComponent as ArrowDown } from '@assets/arrow_down_dotted.svg';
import { ReactComponent as CheckIcon } from '@assets/check_icon_dotted.svg';
import { v4 as uuid } from 'uuid';
import generationSort from '@utils/newGenerationSort';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { CotatoGenerationInfoResponse } from 'cotato-openapi-clients';
import { DropBoxColorEnum } from '@/enums/DropBoxColor';
import drop_box_background_blue from '@assets/drop_box_background_blue.svg';
import { useSearchParams } from 'react-router-dom';

//
//
//

interface GenerationDropBoxProps {
  /**
   * generation change event
   * @param generation selected generation
   */
  handleGenerationChange: (generation: CotatoGenerationInfoResponse) => void;
  color: DropBoxColorEnum;
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

const DEALY_TIME = 100;

//
//
//

/**
 * generation drop box component
 * @param handleGenerationChange generation change event
 * @param color drop box color
 * @param width drop box width (default: 8rem)
 * @param height drop box height (default: 3.2rem)
 */
const GenerationDropBox = ({
  handleGenerationChange,
  color,
  width = '8rem',
  height = '3.2rem',
}: GenerationDropBoxProps) => {
  const { data: unsortedGenerations } = useSWR<CotatoGenerationInfoResponse[]>(
    '/v1/api/generation',
    fetcher,
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const [isDropBoxOpen, setIsDropBoxOpen] = useState(false);
  const [isDropBoxVisible, setIsDropBoxVisible] = useState(false);
  const [generations, setGenerations] = useState<CotatoGenerationInfoResponse[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState<CotatoGenerationInfoResponse | null>(
    null,
  );

  const generationDropBoxRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();

  /**
   * get drop box style of color
   * @returns drop box style { background: url of drop box background, arrowColor: color code of arrow button}
   * @throws invalid color type
   */
  const getDropBoxStyle = () => {
    if (color === DropBoxColorEnum.BLUE) {
      return {
        background: `url(${drop_box_background_blue})`,
        arrowColor: theme.colors.sub2[80],
      };
    }

    throw new TypeError('invalid color type');
  };

  /**
   *
   */
  const setGenerationSearchParam = (generation: CotatoGenerationInfoResponse) => {
    if (generation?.generationId) {
      setSearchParams({ generation: generation.generationId.toString() });
    }
  };

  /**
   *
   */
  const handleDropDownChange = () => {
    if (isDropBoxVisible) {
      setTimeout(() => {
        setIsDropBoxOpen(false);
      }, DEALY_TIME - 10);
    } else {
      setIsDropBoxOpen(true);
    }

    setIsDropBoxVisible(!isDropBoxVisible);
  };

  /**
   *
   */
  const handleGenerationClick = (generation: CotatoGenerationInfoResponse) => {
    handleDropDownChange();
    handleGenerationChange(generation);
    setGenerationSearchParam(generation);
    setTimeout(() => {
      setSelectedGeneration(generation);
    }, DEALY_TIME);
  };

  /**
   *
   */
  useEffect(() => {
    window.addEventListener('mousedown', (e) => {
      if (
        generationDropBoxRef.current &&
        !generationDropBoxRef.current.contains(e.target as Node) &&
        isDropBoxOpen
      ) {
        handleDropDownChange();
      }
    });
    return () => window.removeEventListener('mousedown', () => {});
  }, [generationDropBoxRef, isDropBoxOpen]);

  /**
   *
   */
  useEffect(() => {
    if (!unsortedGenerations) {
      return;
    }

    const sortedGenerations = generationSort(unsortedGenerations);
    setGenerations(sortedGenerations);
    setSelectedGeneration(sortedGenerations[0]);
  }, [unsortedGenerations]);

  /**
   *
   */
  const renderDropBox = () => {
    const { background, arrowColor } = getDropBoxStyle();

    return (
      <DropBox onClick={handleDropDownChange} $height={height} $background={background}>
        <SelectText>
          {selectedGeneration?.generationNumber}
          {selectedGeneration && '기'}
        </SelectText>
        {isDropBoxVisible ? <UpButton $fill={arrowColor} /> : <DownButton $fill={arrowColor} />}
      </DropBox>
    );
  };

  /**
   *
   */
  const renderDropDownList = () => {
    if (!isDropBoxOpen) {
      return null;
    }

    return (
      <DropDownList $visible={isDropBoxVisible}>
        <ul>
          {generations.map((generation) => (
            <li
              key={uuid()}
              className={generation === selectedGeneration ? 'selected' : ''}
              onClick={() => handleGenerationClick(generation)}
            >
              {generation === selectedGeneration && <StyledCheckIcon />}
              {generation.generationNumber}기
            </li>
          ))}
        </ul>
      </DropDownList>
    );
  };

  return (
    <Wrapper ref={generationDropBoxRef} $width={width}>
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
  background-image: ${({ $background }) => $background};
  background-size: 100% 100%;
`;

const SelectText = styled.span`
  font-family: Ycomputer;
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.size.lg};
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const DownButton = styled(ArrowDown)<{ $fill: string }>`
  animation: ${fadeIn} ${DEALY_TIME}ms linear;

  > path {
    fill: ${({ $fill }) => $fill};
  }
`;

const UpButton = styled(ArrowDown)<{ $fill: string }>`
  transform: rotate(180deg);
  animation: ${fadeIn} ${DEALY_TIME}ms linear;

  > path {
    fill: ${({ $fill }) => $fill};
  }
`;

const DropDownList = styled.div<{ $visible: boolean }>`
  position: absolute;
  animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} ${DEALY_TIME}ms ease-out;
  width: 100%;
  z-index: 10;

  > ul {
    background-color: ${({ theme }) => theme.colors.common.white};
    padding: ${({ theme }) => theme.size.lg} 0;
    margin: ${({ theme }) => theme.size.sm} 0;

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

export default GenerationDropBox;
