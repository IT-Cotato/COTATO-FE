import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import useSWR from 'swr';
import fetcherWithParams from '@utils/fetcherWithParams';
import { SessionListImageInfo, SessionListInfo } from '@/typing/session';
import {
  SessionContentsCsEducation,
  SessionContentsDevTalk,
  SessionContentsItIssue,
  SessionContentsNetworking,
} from '@/enums/SessionContents';
import api from '@/api/api';
import SessionUploadModal from './_SessionUploadModal';
import {
  CotatoGenerationInfoResponse,
  CotatoSessionListResponse,
  CotatoUpdateSessionRequest,
} from 'cotato-openapi-clients';
import SessionCard, { IMAGE_WIDTH } from './_SessionCard';
import { v4 as uuid } from 'uuid';
import GenerationDropBox from '@components/_GenerationDropBox';
import { useMediaQuery } from '@mui/material';
import { device } from '@theme/media';
import { DropBoxColorEnum } from '@/enums/DropBoxColor';
import fetchUserData from '@utils/fetchUserData';
import { ReactComponent as AddCircleIcon } from '@assets/add_circle_dotted.svg';

//
//
//

const SessionHome = () => {
  const [selectedGeneration, setSelectedGeneration] = useState<CotatoGenerationInfoResponse>();

  const { data: sessionList, mutate: mutateSessionList } = useSWR<SessionListInfo[]>(
    '/v1/api/session',
    (url: string) => fetcherWithParams(url, { generationId: selectedGeneration?.generationId }),
  );
  const { data: userData } = fetchUserData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateSession, setUpdateSession] = useState<SessionListInfo | null>(null);

  const isTabletOrSmaller = useMediaQuery(`(max-width:${device.tablet})`);

  /**
   *
   */
  const handleGenerationChange = (generation: CotatoGenerationInfoResponse) => {
    setSelectedGeneration(generation);
  };

  /**
   *
   */
  const handleChaneUpdateSession = (session?: CotatoSessionListResponse) => {
    if (!session) {
      return;
    }

    const updateSession: SessionListInfo = JSON.parse(JSON.stringify(session));
    setUpdateSession(updateSession);
    setIsUpdateModalOpen(true);
  };

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
  const renderSettingTab = () => {
    return (
      <SettingTab>
        <GenerationDropBox
          color={DropBoxColorEnum.BLUE}
          handleGenerationChange={handleGenerationChange}
          width={isTabletOrSmaller ? '7.2rem' : '8rem'}
          height={isTabletOrSmaller ? '2.8rem' : '3.2rem'}
        />
        {userData?.role === 'ADMIN' && <AddCircleIcon onClick={() => setIsAddModalOpen(true)} />}
      </SettingTab>
    );
  };

  /**
   *
   */
  const renderSessionCards = () => (
    <SessionCardWrapper>
      {sessionList
        ? sessionList?.map((session: CotatoSessionListResponse) => (
            <SessionCard
              key={uuid()}
              session={session}
              handleChangeUpdateSession={handleChaneUpdateSession}
            />
          ))
        : new Array(12).fill(null).map(() => <SessionCard key={uuid()} />)}
    </SessionCardWrapper>
  );

  /**
   *
   */
  useEffect(() => {
    if (selectedGeneration) {
      mutateSessionList();
    }
  }, [selectedGeneration]);

  return (
    <>
      <Wrapper>
        {renderSettingTab()}
        {renderSessionCards()}
      </Wrapper>
      <SessionUploadModal
        open={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
        headerText="세션 추가"
        handleUpload={handleSessionAdd}
        lastSessionNumber={sessionList?.length}
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

const SettingTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;

  > svg {
    position: absolute;
    right: 0;
    width: 2.75rem;
    cursor: pointer;
  }
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
