import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Box } from '@mui/material';
import { produce, enableMapSet } from 'immer';
import { CotatoPolicyInfoResponse, CotatoPolicyInfoResponseTypeEnum } from 'cotato-openapi-clients';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import CotatoIcon from '@components/CotatoIcon';

//
//
//

interface SignUpUserAgreementItemProps extends CotatoPolicyInfoResponse {
  isChecked: Map<number, boolean>;
  setIsChecked: React.Dispatch<React.SetStateAction<Map<number, boolean>>>;
}

//
//
//

const SignUpUserAgreementItem: React.FC<SignUpUserAgreementItemProps> = ({
  policyId,
  title,
  content,
  type,
  isChecked,
  setIsChecked,
}) => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const necessaryOrOptional = type === CotatoPolicyInfoResponseTypeEnum.Essential ? '필수' : '선택';

  enableMapSet();

  // TODO: fix after type is fixed
  if (!policyId || !title || !content || !type) {
    return null;
  }

  /**
   *
   */
  const handleCheck = () => {
    setIsChecked(
      produce(isChecked, (draft) => {
        draft.set(policyId, !isChecked.get(policyId));
      }),
    );
  };

  /**
   *
   */
  const ArrowButton = () => {
    return (
      <CotatoIcon
        icon={isOpen ? 'angle-up-solid' : 'angle-down-solid'}
        color={(theme) => theme.colors.gray80_2}
      />
    );
  };

  /**
   *
   */
  const renderContent = () => {
    if (!isOpen) {
      return null;
    }

    const parsedHtml = marked.parse(content) as string;

    return (
      <Box sx={{ padding: '0.5rem 1.5rem' }}>
        <div
          style={{
            fontSize: theme.fontSize.xs,
            color: theme.colors.common.black,
            lineHeight: '1rem',
            wordBreak: 'keep-all',
            whiteSpace: 'pre-wrap',
          }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parsedHtml) }}
        />
      </Box>
    );
  };

  return (
    <Wrapper>
      <ItemDiv>
        <CheckSection>
          <CotatoIcon
            style={{ cursor: 'pointer' }}
            icon="check-box-solid"
            color={isChecked.get(policyId) ? theme.colors.sub3[60] : theme.colors.gray80_2}
            onClick={handleCheck}
          />
          <p>
            {title} ({necessaryOrOptional})
          </p>
        </CheckSection>
        <ContentSection onClick={() => setIsOpen(!isOpen)}>
          <p>내용보기</p>
          <ArrowButton />
        </ContentSection>
      </ItemDiv>
      {renderContent()}
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  * {
    font-family: Pretendard !important;
  }
`;

const ItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CheckSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    margin-left: 0.3rem;
    color: ${({ theme }) => theme.colors.gray80_2};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-family: Pretendard;
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  p {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.gray80_2};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-family: Pretendard;
  }
`;

export default SignUpUserAgreementItem;
