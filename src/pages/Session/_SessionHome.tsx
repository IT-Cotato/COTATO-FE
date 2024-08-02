import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { SessionListImageInfo, SessionListInfo } from '@/typing/session';
import {
  SessionContentsCsEducation,
  SessionContentsDevTalk,
  SessionContentsItIssue,
  SessionContentsNetworking,
} from '@/enums/SessionContents';
import api from '@/api/api';
import SessionUploadModal from './_SessionUploadModal';
import { CotatoUpdateSessionRequest } from 'cotato-openapi-clients';

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
  const [updateSession, setUpdateSession] = useState<SessionListInfo | null>(null);

  /**
   * 
   */ 
  const handleGenerationChange = (generation: CotatoGenerationInfoResponse) => {
    setSelectedGeneration(generation);

  /**
   *
   */
  const requestImageAdd = (image: SessionListImageInfo): Promise<any> => {
    if (!image.imageFile) {
      return Promise.reject('No image file');
    }

    const formData = new FormData();
    formData.append('sessionId', updateSession?.sessionId?.toString() || '');
    formData.append('image', image.imageFile);

    return api.post('v1/api/session/image', formData);
  };

  /**
   *
   */
  const requestImageReorder = (imageList: SessionListImageInfo[]): Promise<any> => {
    const reorderedImageList = imageList.map((image) => {
      return {
        imageId: image.imageId,
        order: image.order,
      };
    });

    return api.patch('/v1/api/session/image/order', {
      sessionId: updateSession?.sessionId,
      orderInfos: reorderedImageList,
    });
  };

  /**
   *
   */
  const requestImageRemove = (image: SessionListImageInfo): Promise<any> => {
    if (!image.imageId) {
      return Promise.reject('No image id');
    }

    return api.delete('/v1/api/session/image', {
      data: {
        imageId: image.imageId,
      },
    });
  };

  /**
   *
   */
  const handleSessionAdd = (session: SessionListInfo) => {
    const formData = new FormData();
    formData.append('generationId', '1');
    formData.append('title', session.title || '');
    formData.append('description', session.description || '');
    formData.append('itIssue', session.sessionContents?.itIssue || SessionContentsItIssue.OFF);
    formData.append(
      'csEducation',
      session.sessionContents?.csEducation || SessionContentsCsEducation.OFF,
    );
    formData.append(
      'networking',
      session.sessionContents?.networking || SessionContentsNetworking.OFF,
    );
    formData.append('devTalk', session.sessionContents?.devTalk || SessionContentsDevTalk.OFF);

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
  const handleSessionUpdate = (session: SessionListInfo) => {
    if (!session.sessionId) {
      return;
    }

    const updatedSessoinInfo: CotatoUpdateSessionRequest = {
      sessionId: session.sessionId,
      title: session.title,
      description: session.description,
      itIssue: session.sessionContents?.itIssue || SessionContentsItIssue.OFF,
      csEducation: session.sessionContents?.csEducation || SessionContentsCsEducation.OFF,
      networking: session.sessionContents?.networking || SessionContentsNetworking.OFF,
      devTalk: session.sessionContents?.devTalk || SessionContentsDevTalk.OFF,
    };

    api
      .patch('/v1/api/session/update', updatedSessoinInfo)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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

  useEffect(() => {
    if (sessions) {
      setUpdateSession(sessions[0]);
    }
  }, [sessions]);

  return (
    <>
      <Wrapper>{renderSessionCards()}</Wrapper>
      <SessionUploadModal
        open={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
        headerText="세션 추가"
        handleUpload={handleSessionAdd}
        lastSessionNumber={sessions?.length}
      />
      <SessionUploadModal
        open={isUpdateModalOpen}
        handleClose={() => setIsUpdateModalOpen(false)}
        headerText="세션 수정"
        handleUpload={handleSessionUpdate}
        sessionInfo={updateSession}
        requestImageAdd={requestImageAdd}
        requestImageReorder={requestImageReorder}
        requestImageRemove={requestImageRemove}
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
  grid-template-columns: repeat(auto-fit, minmax(${IMAGE_WIDTH}, 1fr));
  gap: 4rem 2rem;
  place-items: center;
  width: 100%;
  padding: 3rem 0 1.6rem;
`;

export default SessionHome;
