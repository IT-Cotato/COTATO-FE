import React, { useCallback } from 'react';
import { styled, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import background from '@assets/cs_content_background.svg';
import { IEducation } from '@/typing/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { CotatoGenerationInfoResponse } from 'cotato-openapi-clients';
import CotatoIcon from '@components/CotatoIcon';
import { IconButton } from '@mui/material';
import { checkIsAtLeastAdmin } from '@utils/role';

interface Props {
  education: IEducation;
  handleModifyButton: (education: IEducation) => void;
  generation?: CotatoGenerationInfoResponse;
}

const CSContent = ({ education, handleModifyButton, generation }: Props) => {
  const { data: user } = useSWR('/v1/api/member/info', fetcher);

  const navigate = useNavigate();

  const onclickContent = useCallback(() => {
    navigate(`/cs/start/generation/${generation?.generationId}/education/${education.educationId}`);
  }, [generation?.generationId, education.educationNumber]);

  const onClickModifyButton = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleModifyButton(education);
  }, []);

  return (
    <Content onClick={onclickContent}>
      <ContentWeek>{`${education.educationNumber}차시 문제`}</ContentWeek>
      <ContentTitle>{education.subject}</ContentTitle>
      {checkIsAtLeastAdmin(user?.role) && (
        <StyledIconButton
          onClick={(e) => {
            onClickModifyButton(e);
          }}
        >
          <CotatoIcon icon="pen-solid" color={(theme) => theme.colors.sub2[40]} />
        </StyledIconButton>
      )}
    </Content>
  );
};

export default CSContent;

const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 240px;
  border-radius: 10px;
  background: #fff;
  background-image: url(${background});
  background-size: cover;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.07))
    drop-shadow(-4px -4px 4px rgba(0, 0, 0, 0.07));
  margin: 20px 4px;
  padding: 20px;
  box-sizing: border-box;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 220px;
    height: 220px;
  }
`;

const fontStyle = css`
  color: #1f1f1f;
  font-family: NanumSquareRound;
  font-style: normal;
  line-height: normal;
`;

const ContentWeek = styled.p`
  position: absolute;
  top: 16px;
  left: 28px;
  ${fontStyle}
  font-size: 16px;
  font-weight: 800;
`;

const ContentTitle = styled.p`
  ${fontStyle}
  font-size: 32px;
  font-weight: 600;

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

const StyledIconButton = styled(IconButton)`
  position: absolute !important;
  background: transparent;
  bottom: 1rem;
  right: 1rem;

  @media screen and  {
    bottom: 12px;
    right: 12px;
  }
`;
