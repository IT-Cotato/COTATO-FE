import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import CSContent from '@pages/CS/CSContent';
import CotatoDropBox from '@components/CotatoDropBox';
import CSModal from '@pages/CS/CSModal';
import { IEducation } from '@/typing/db';
import api from '@/api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { CotatoGenerationInfoResponse } from 'cotato-openapi-clients';
import { useGeneration } from '@/hooks/useGeneration';
import useUser from '@/hooks/useUser';
import CotatoIcon from '@components/CotatoIcon';
import { IconButton } from '@mui/material';
import { checkIsAtLeastManager } from '@utils/role';

const CSHome = () => {
  const { generationId } = useParams();
  const { generations } = useGeneration();
  const { user } = useUser();

  const [educations, setEducations] = useState<undefined | IEducation[]>();
  const [isCSModalOpen, setIsCSModalOpen] = useState(false);
  const [modifyEducation, setModifyEducation] = useState<undefined | IEducation>();
  const [selectedGeneration, setSelectedGeneration] = useState<
    undefined | CotatoGenerationInfoResponse
  >();

  const navigate = useNavigate();

  const onChangeGeneration = useCallback(
    (generation?: CotatoGenerationInfoResponse) => {
      setSelectedGeneration(generation);

      if (generation) {
        fetchEducations(generation.generationId);
      }

      navigate(`/cs/${generation?.generationId}`);
    },
    [selectedGeneration],
  );

  const fetchEducations = useCallback((generationId?: number) => {
    api
      .get('/v1/api/education', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          generationId: generationId,
        },
      })
      .then((res) => setEducations(res.data))
      .catch((err) => console.error(err));
  }, []);

  const onClickAddButton = useCallback(() => {
    setModifyEducation(undefined);
    setIsCSModalOpen(true);
  }, []);

  const handleModifyButton = useCallback((session: IEducation) => {
    setModifyEducation(session);
    setIsCSModalOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsCSModalOpen(false);
  }, []);

  useEffect(() => {
    if (!generationId || !generations) {
      return;
    }

    const generation = generations?.find(
      (generation) => generation.generationId === Number(generationId),
    );
    setSelectedGeneration(generation);
    fetchEducations(Number(generationId));
  }, [generations, generationId]);

  return (
    <>
      <FlexBox>
        <CSWrapper>
          <CSHeader>CS 문제풀이</CSHeader>
          <CSSetting>
            {generations && (
              <CotatoDropBox
                list={generations}
                title={(generation) => generation?.generationNumber + '기'}
                onChange={onChangeGeneration}
              />
            )}
            {checkIsAtLeastManager(user?.role) && (
              <ButtonWrapper>
                <IconButton onClick={onClickAddButton}>
                  <CotatoIcon icon="plus" color={(theme) => theme.colors.sub2[40]} />
                </IconButton>
              </ButtonWrapper>
            )}
          </CSSetting>
          <CSContentsContainer education={educations?.length.toString()}>
            {educations?.length === 0 ? (
              <CSReady>
                <CotatoIcon icon="cog-solid" size="4rem" color={(theme) => theme.colors.gray40} />
                <p>CS 문제풀이 준비중입니다.</p>
              </CSReady>
            ) : (
              educations?.map((education) => (
                <CSContent
                  key={education.educationId}
                  education={education}
                  handleModifyButton={handleModifyButton}
                  generation={selectedGeneration}
                />
              ))
            )}
          </CSContentsContainer>
        </CSWrapper>
      </FlexBox>
      <CSModal
        isOpen={isCSModalOpen}
        onCloseModal={onCloseModal}
        educatoin={modifyEducation}
        generationId={selectedGeneration?.generationId}
        fetchEducations={fetchEducations}
        sessionCount={selectedGeneration?.sessionCount}
      />
    </>
  );
};

export default CSHome;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CSWrapper = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  min-height: 100vh;

  @media screen and (max-width: 768px) {
    width: 300px;
  }
`;

const CSHeader = styled.h1`
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

const CSSetting = styled.div`
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

interface CSContentContainerProps {
  education?: string;
}

const CSContentsContainer = styled.div<CSContentContainerProps>`
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(240px, 1fr));
  grid-template-columns: ${(props) =>
    props.education === '0' ? '1fr' : 'repeat(auto-fill, minmax(240px, 1fr))'};
  gap: 20px;
  place-items: center;

  width: 100%;
  min-height: 30vh;
  margin: 28px 0 120px;

  @media screen and (max-width: 768px) {
    grid-template-rows: repeat(auto-fill, minmax(220px, 1fr));
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
`;

const CSReady = styled.div`
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
