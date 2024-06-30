import React, { useEffect, useRef, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import generation_background from '@assets/generation_background.svg';
import { ReactComponent as ArrowDown } from '@assets/arrow_down_dotted.svg';
import { ReactComponent as CheckIcon } from '@assets/check_icon_dotted.svg';
import { v4 as uuid } from 'uuid';
import api from '@/api/api';
import generationSort from '@utils/generationSort';

//
//
//

export interface GenerationInfo {
  generationId: number;
  generationNumber: number;
  sessionCount: number;
}

type GetV1ApiGenerationResponse = GenerationInfo[];

interface GenerationDropBoxProps {
  /**
   * generation change event
   * @param generation selected generation
   */
  handleGenerationChange: (generation: GenerationInfo) => void;
  backgroundColor?: string;
  width?: string;
  height?: string;
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
 * @param width drop box width (default: 8rem)
 * @param height drop box height (default: 3.2rem)
 */
const GenerationDropBox = ({
  handleGenerationChange,
  width = '8rem',
  height = '3.2rem',
}: GenerationDropBoxProps) => {
  const [isDropBoxOpen, setIsDropBoxOpen] = useState(false);
  const [isDropBoxVisible, setIsDropBoxVisible] = useState(false);
  const [generations, setGenerations] = useState<GetV1ApiGenerationResponse>([]);
  const [selectedGeneration, setSelectedGeneration] = useState<GenerationInfo | null>(null);

  const generationDropBoxRef = useRef<HTMLDivElement>(null);

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
  const handleGenerationClick = (generation: GenerationInfo) => {
    handleDropDownChange();
    handleGenerationChange(generation);
    setTimeout(() => {
      setSelectedGeneration(generation);
    }, DEALY_TIME);
  };

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

  // useEffect for fetch generation data
  // there whill be removed when zustand is applied
  useEffect(() => {
    api
      .get<GetV1ApiGenerationResponse>('/v1/api/generation')
      .then((res) => {
        const sortedGenerations = generationSort(res.data);
        setGenerations(sortedGenerations);
        setSelectedGeneration(sortedGenerations[0]);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  /**
   *
   */
  const renderDropBox = () => (
    <DropBox onClick={handleDropDownChange} $height={height}>
      <SelectText>
        {selectedGeneration?.generationNumber}
        {selectedGeneration && '기'}
      </SelectText>
      {isDropBoxVisible ? <UpButton /> : <DownButton />}
    </DropBox>
  );

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

const DropBox = styled.div<{ $height: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${({ $height }) => $height};
  padding: ${({ theme }) => theme.size.md};
  cursor: pointer;
  background-image: url(${generation_background});
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

const DownButton = styled(ArrowDown)`
  animation: ${fadeIn} ${DEALY_TIME} linear;
`;

const UpButton = styled(ArrowDown)`
  transform: rotate(180deg);
  animation: ${fadeIn} ${DEALY_TIME} linear;
`;

const DropDownList = styled.div<{ $visible: boolean }>`
  position: absolute;
  animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} ${DEALY_TIME} ease-out;
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
