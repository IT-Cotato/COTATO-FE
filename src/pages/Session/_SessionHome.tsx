import React, { useState } from 'react';
import { styled } from 'styled-components';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import SessoinUploadModal from './_SessionUploadModal';
import { SessionListInfo } from '@/typing/session';
import { SessionContentsItIssue } from '@/enums/SessionContents';
import api from '@/api/api';

//
//
//

const SessionHome = () => {
  const { data: sessions } = useSWR<SessionListInfo[]>(
    `/v1/api/session?generationId=${1}`,
    fetcher,
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(true);

  const handelModalClose = () => setIsAddModalOpen(false);

  const handleSessoinAdd = (session: SessionListInfo) => {
    const formData = new FormData();
    formData.append('generationId', '1');
    formData.append('title', session.title || '');
    formData.append('description', session.description || '');
    formData.append('itIssue', session.sessionContents?.itIssue || SessionContentsItIssue.OFF);
    formData.append(
      'csEducation',
      session.sessionContents?.csEducation || SessionContentsItIssue.OFF,
    );
    formData.append(
      'networking',
      session.sessionContents?.networking || SessionContentsItIssue.OFF,
    );
    formData.append('devTalk', session.sessionContents?.devTalk || SessionContentsItIssue.OFF);

    session.imageInfos.forEach((imageInfo) => {
      if (imageInfo.imageFile) {
        formData.append('images', imageInfo.imageFile);
      }
    });

    api
      .post('/v1/api/session/add', formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  console.log('sessions', sessions);
  const renderSessionCards = () => (
    <SessionCardWrapper>{sessions?.map((session: SessionListInfo) => <></>)}</SessionCardWrapper>
  );

  return (
    <>
      <Wrapper>{renderSessionCards()}</Wrapper>
      <SessoinUploadModal
        open={isAddModalOpen}
        handleClose={handelModalClose}
        headerText="세션 추가"
        handleUpload={handleSessoinAdd}
        lastSessionNumber={sessions?.length}
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
