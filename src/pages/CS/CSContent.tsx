import React, { useCallback, useState } from 'react';
import { styled, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ModifyIcon } from '@assets/modify_icon.svg';
import background from '@assets/cs_content_background.svg';
import { IEducation } from '@/typing/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { CotatoGenerationInfoResponse } from 'cotato-openapi-clients';

interface Props {
  education: IEducation;
  handleModifyButton: (education: IEducation) => void;
  generation?: CotatoGenerationInfoResponse;
}

const CSContent = ({ education, handleModifyButton, generation }: Props) => {
  const { data: user } = useSWR('/v1/api/member/info', fetcher);
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  const onclickContent = useCallback(() => {
    navigate(`/cs/start/generation/${generation?.generationId}/education/${education.educationId}`);
  }, [generation?.generationId, education.educationNumber]);

  const onClickModifyButton = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    handleModifyButton(education);
  }, []);

  return (
    <Content
      onClick={onclickContent}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <ContentWeek>{`${education.educationNumber}차시 문제`}</ContentWeek>
      <ContentTitle>{education.subject}</ContentTitle>
      {user?.role === 'ADMIN' && isHover && (
        <HoverContent>
          <ModifyIcon onClick={onClickModifyButton} />
        </HoverContent>
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

const HoverContent = styled.div`
  position: absolute;
  inset: 0;
  width: 240px;
  height: 240px;
  border-radius: 10px;
  background: transparent;
  opacity: 0.8;

  > svg {
    position: absolute;
    bottom: 16px;
    right: 16px;
    cursor: pointer;
    fill: #477feb;
  }

  @media screen and (max-width: 768px) {
    width: 220px;
    height: 220px;

    > svg {
      bottom: 12px;
      right: 12px;
    }
  }
`;
