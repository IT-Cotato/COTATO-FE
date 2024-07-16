import React from 'react';
import { styled } from 'styled-components';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import SessionCard from '@pages/Session/_SessionCard';
import { v4 as uuidv4 } from 'uuid';
import { CotatoSessionListResponse } from 'cotato-openapi-clients';

//
//
//

const SessionHome = () => {
  const { data: sessions } = useSWR(`/v1/api/session?generationId=${1}`, fetcher);

  /**
   *
   */
  const renderSessionCards = () => (
    <SessionCardWrapper>
      {sessions
        ? sessions?.map((session: CotatoSessionListResponse) => (
            <SessionCard key={uuidv4()} session={session} />
          ))
        : new Array(6).fill(null).map(() => <SessionCard key={uuidv4()} />)}
    </SessionCardWrapper>
  );

  return <Wrapper>{renderSessionCards()}</Wrapper>;
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
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(auto, 1fr));
  gap: 3.5rem 2.5rem;
  place-items: center;
  width: 100%;
  padding: 3.2rem 2.5rem;
`;

export default SessionHome;
