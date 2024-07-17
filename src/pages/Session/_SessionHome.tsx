import React, { useState } from 'react';
import { styled } from 'styled-components';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import SessoinUploadModal from './_SessionUploadModal';

//
//
//

interface SessionInfo {
  sessionId: number;
  sessionNumber: number;
  photoUrl: string;
  description: string;
  generationId: number;
  sessionContents: {
    itIssue: 'IT_ON' | 'IT_OFF';
    networking: 'NW_ON' | 'NW_OFF';
    csEducation: 'CS_ON' | 'CS_OFF';
    devTalk: 'DEVTALK_ON' | 'DEVTALK_OFF';
  };
}

const SessionHome = () => {
  const { data: sessions } = useSWR(`/v1/api/session?generationId=${1}`, fetcher);

  const [isAddModalOpen, setIsAddModalOpen] = useState(true);

  const handelModalClose = () => setIsAddModalOpen(false);

  const renderSessionCards = () => (
    <SessionCardWrapper>{sessions?.map((session: SessionInfo) => <></>)}</SessionCardWrapper>
  );

  return (
    <>
      <Wrapper>{renderSessionCards()}</Wrapper>
      <SessoinUploadModal
        open={isAddModalOpen}
        handleClose={handelModalClose}
        headerText="세션 추가"
      />
    </>
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
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(auto, 1fr));
  gap: 3.8rem 2.5rem;
  place-items: center;
  width: 100%;
  padding: 3.2rem 2.5rem;
`;

export default SessionHome;
