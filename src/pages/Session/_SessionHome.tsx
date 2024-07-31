import React, { useState } from 'react';
import { styled } from 'styled-components';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import SessionCard, { IMAGE_WIDTH } from '@pages/Session/_SessionCard';
import { v4 as uuidv4 } from 'uuid';
import { CotatoGenerationInfoResponse, CotatoSessionListResponse } from 'cotato-openapi-clients';
import GenerationDropBox from '@components/_GenerationDropBox';
import { DropBoxColorEnum } from '@/enums/DropBoxColor';

//
//
//

const SessionHome = () => {
  const [selectedGeneration, setSelectedGeneration] = useState<CotatoGenerationInfoResponse>();

  const { data: sessions } = useSWR(
    `/v1/api/session?generationId=${selectedGeneration?.generationId}`,
    fetcher,
  );

  const handleGenerationChange = (generation: CotatoGenerationInfoResponse) => {
    setSelectedGeneration(generation);
  };

  /**
   *
   */
  const renderSessionCards = () => (
    <SessionCardWrapper>
      {sessions
        ? sessions?.map((session: CotatoSessionListResponse) => (
            <SessionCard key={uuidv4()} session={session} />
          ))
        : new Array(12).fill(null).map(() => <SessionCard key={uuidv4()} />)}
    </SessionCardWrapper>
  );

  return (
    <Wrapper>
      <GenerationDropBox
        color={DropBoxColorEnum.BLUE}
        handleGenerationChange={handleGenerationChange}
      />
      {renderSessionCards()}
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
  width: 100%;
`;

const SessionCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${IMAGE_WIDTH}, 1fr));
  gap: 4rem 2rem;
  place-items: center;
  width: 100%;
  padding: 3rem 0 1.6rem;
`;

export default SessionHome;
