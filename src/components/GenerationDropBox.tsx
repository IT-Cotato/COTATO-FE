import React, { useEffect, useRef, useState } from 'react';
import { styled, useTheme } from 'styled-components';
import { ReactComponent as ArrowDown } from '@assets/arrow_down_dotted.svg';
import { ReactComponent as CheckIcon } from '@assets/check_icon_dotted.svg';
import generationSort from '@utils/newGenerationSort';
import { CotatoGenerationInfoResponse } from 'cotato-openapi-clients';
import { DropBoxColorEnum } from '@/enums/DropBoxColor';
import drop_box_background_blue from '@assets/drop_box_background_blue.svg';
import { useSearchParams } from 'react-router-dom';
import { useGeneration } from '@/hooks/useGeneration';

//
//
//

interface GenerationDropBoxProps {
  /**
   * generation change event
   * @param generation selected generation
   */
  handleGenerationChange: (generation: CotatoGenerationInfoResponse) => void;
  color?: DropBoxColorEnum;
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
 * generation drop box component
 * @param handleGenerationChange generation change event
 * @param color drop box color (default: blue)
 * @param width drop box width (default: 8rem)
 * @param height drop box height (default: 3.2rem)
 */
const GenerationDropBox = ({
  handleGenerationChange,
  color = DropBoxColorEnum.BLUE,
  width = '8rem',
  height = '3.2rem',
}: GenerationDropBoxProps) => {
  const theme = useTheme();

  const [searchParams, setSearchParams] = useSearchParams();
  const { generations: rawGenerations, isGenerationLoading } = useGeneration();

  const [isDropBoxOpen, setIsDropBoxOpen] = useState(false);
  const [generations, setGenerations] = useState<CotatoGenerationInfoResponse[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState<CotatoGenerationInfoResponse | null>(
    null,
  );

  const generationDropBoxRef = useRef<HTMLDivElement>(null);

  const isInProduction = process.env.NODE_ENV === 'production';

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
      setSearchParams({ generationId: generation.generationId.toString() });
    }
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
  const handleGenerationSelect = (generation: CotatoGenerationInfoResponse) => {
    setSelectedGeneration(generation);
    handleGenerationChange(generation);
    setGenerationSearchParam(generation);
  };

  /**
   *
   */
  const handleGenerationClick = (generation: CotatoGenerationInfoResponse) => {
    handleDropDownChange();
    handleGenerationSelect(generation);
  };

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
        {isDropBoxOpen ? <UpButton $fill={arrowColor} /> : <DownButton $fill={arrowColor} />}
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
          {generations
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
            ))}
        </ul>
      </DropDownList>
    );
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
    if (!rawGenerations || isGenerationLoading) {
      return;
    }

    const sortedGenerations = generationSort(rawGenerations);
    // .filter(
    //   (generation) => generation.generationNumber && generation.generationNumber >= 8,
    // );
    setGenerations(sortedGenerations);

    const generationId = searchParams.get('generationId');
    const searchedGeneration = sortedGenerations.find(
      (generation) => generation.generationId === Number(generationId),
    );

    handleGenerationSelect(searchedGeneration || sortedGenerations[0]);
  }, [rawGenerations, isGenerationLoading]);

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

const DownButton = styled(ArrowDown)<{ $fill: string }>`
  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  animation: fade-in ${FADE_DURATION}ms linear;

  > path {
    fill: ${({ $fill }) => $fill};
  }
`;

const UpButton = styled(DownButton)`
  transform: rotate(180deg);
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

export default GenerationDropBox;
