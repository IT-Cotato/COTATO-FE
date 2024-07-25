import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import SessoinUploadModal from './_SessionUploadModal';
import { SessionListInfo } from '@/typing/session';
import { SessionContentsItIssue } from '@/enums/SessionContents';
import api from '@/api/api';
import SessionUploadModal from './_SessionUploadModal';

//
//
//

const SessionHome = () => {
  const { data: sessions } = useSWR<SessionListInfo[]>(
    `/v1/api/session?generationId=${1}`,
    fetcher,
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(true);
  const [updateSessoin, setUpdateSessoin] = useState<SessionListInfo | null>(null);

  /**
   *
   */
  const requestImageAdd = (imageFile: File): Promise<any> => {
    const formData = new FormData();
    formData.append('sessionId', updateSessoin?.sessionId?.toString() || '');
    formData.append('image', imageFile);

    return api.post('v1/api/session/image', formData);
  };

  /**
   *
   */
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

  /**
   *
   */
  const handleSessionUpdate = (session: SessionListInfo) => {};

  console.log('sessions', sessions);
  const renderSessionCards = () => (
    <SessionCardWrapper>{sessions?.map((session: SessionListInfo) => <></>)}</SessionCardWrapper>
  );

  useEffect(() => {
    if (sessions) {
      setUpdateSessoin(sessions[0]);
    }
  }, [sessions]);

  return (
    <>
      <Wrapper>{renderSessionCards()}</Wrapper>
      <SessoinUploadModal
        open={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
        headerText="세션 추가"
        handleUpload={handleSessoinAdd}
        lastSessionNumber={sessions?.length}
      />
      <SessionUploadModal
        open={isUpdateModalOpen}
        handleClose={() => setIsUpdateModalOpen(false)}
        headerText="세션 수정"
        handleUpload={handleSessionUpdate}
        sessionInfo={updateSessoin}
        requestImageAdd={requestImageAdd}
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
