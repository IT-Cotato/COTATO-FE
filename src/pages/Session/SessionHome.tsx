import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import SessionContent from '@pages/Session/SessionContent';
import SessionModal from '@pages/Session/SessionModal/SessionModal';
import { ReactComponent as AddIcon } from '@assets/add_icon.svg';
import { ReactComponent as SettingIcon } from '@assets/setting_icon.svg';
import GenerationSelect from '@components/GenerationSelect';
import { IGeneration, ISession } from '@/typing/db';
import api from '@/api/api';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useNavigate } from 'react-router-dom';

const SessionHome = () => {
  const { data: user, error } = useSWR('/v1/api/member/info', fetcher);

  const [sessions, setSessions] = useState<undefined | ISession[]>();
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [modifySession, setModifySession] = useState<undefined | ISession>();
  const [lastWeek, setLastWeek] = useState(-1);
  const [selectedGeneration, setSelectedGeneration] = useState<IGeneration | undefined>();

  const navigate = useNavigate();

  useEffect(() => {
    if (sessions && sessions.length > 0) {
      setLastWeek(sessions[sessions.length - 1].sessionNumber);
    } else {
      setLastWeek(-1);
    }
  }, [sessions]);

  const fetchSessions = useCallback((generationId?: number) => {
    api
      .get('/v1/api/session', {
        params: {
          generationId: generationId,
        },
      })
      .then((res) => setSessions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const onChangeGeneration = useCallback(
    (generation: IGeneration | undefined) => {
      setSelectedGeneration(generation);

      if (generation) {
        fetchSessions(generation.generationId);
      }
    },
    [selectedGeneration],
  );

  const onClickAddButton = useCallback(() => {
    setModifySession(undefined);
    setIsSessionModalOpen(true);
  }, []);

  const handleModifyButton = useCallback((session: ISession) => {
    setModifySession(session);
    setIsSessionModalOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsSessionModalOpen(false);
  }, []);

  if (error || user?.role === 'GENERAL') {
    navigate('/');
  }

  return (
    <>
      <FlexBox>
        <SessionWrapper>
          <SessionHeader>세션 기록</SessionHeader>
          <SessionSetting>
            <GenerationSelect
              onChangeGeneration={onChangeGeneration}
              selectedGeneration={selectedGeneration}
            />
            {user?.role === 'ADMIN' && (
              <ButtonWrapper>
                <AddIcon onClick={onClickAddButton} />
              </ButtonWrapper>
            )}
          </SessionSetting>
          <SessionContentsContainer session={sessions?.length.toString()}>
            {sessions?.length === 0 ? (
              <SessionReady>
                <SettingIcon />
                <p>세션 준비중입니다.</p>
              </SessionReady>
            ) : (
              sessions?.map((session) => (
                <SessionContent
                  key={session.sessionId}
                  session={session}
                  handleModifyButton={handleModifyButton}
                />
              ))
            )}
          </SessionContentsContainer>
        </SessionWrapper>
      </FlexBox>
      <SessionModal
        isOpen={isSessionModalOpen}
        onCloseModal={onCloseModal}
        session={modifySession}
        lastWeek={lastWeek}
        generationId={selectedGeneration?.generationId}
        fetchSessions={fetchSessions}
        sessionCount={selectedGeneration?.sessionCount}
      />
    </>
  );
};

export default SessionHome;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SessionWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 70%;
  min-height: 100vh;

  @media screen and (max-width: 768px) {
    width: 260px;
  }
`;

const SessionHeader = styled.h1`
  color: ${({ theme }) => theme.colors.common.black};
  font-family: NanumSquareRound;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;

  @media screen and (max-width: 768px) {
    margin: 92px 0 64px;
    font-size: 1.875rem;
  }
`;

const SessionSetting = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
`;

const ButtonWrapper = styled.div`
  > svg {
    margin-left: 8px;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
`;

interface SessionContentsContainerProps {
  session?: string;
}

const SessionContentsContainer = styled.div<SessionContentsContainerProps>`
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(260px, 1fr));
  grid-template-columns: ${(props) =>
    props.session === '0' ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))'};
  gap: 20px;
  place-items: center;

  width: 100%;
  min-height: 30vh;
  margin: 28px 0 120px;

  @media screen and (max-width: 768px) {
    grid-template-rows: repeat(auto-fill, minmax(240px, 1fr));
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
`;

const SessionReady = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 160px 0;

  p {
    color: #9a9a9a;
    font-family: NanumSquareRound;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
