import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Box } from '@mui/material';
import { ReactComponent as CheckIcon } from '@assets/sign_up_check_icon.svg';
import { ReactComponent as ArrowDown } from '@assets/pixel_arrow_down.svg';
import { ReactComponent as ArrowUp } from '@assets/pixel_arrow_up.svg';
import { produce, enableMapSet } from 'immer';
import { CotatoPolicyInfoResponse, CotatoPolicyInfoResponseTypeEnum } from 'cotato-openapi-clients';

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
    return isOpen ? (
      <ArrowUp fill={theme.colors.gray80_2} />
    ) : (
      <ArrowDown fill={theme.colors.gray80_2} />
    );
  };

  /**
   *
   */
  const renderContent = () => {
    if (!isOpen) {
      return null;
    }

    return (
      <Box sx={{ padding: '0.6rem 1.5rem' }}>
        <ContentText>{content}</ContentText>
      </Box>
    );
  };

  return (
    <Wrapper>
      <ItemDiv>
        <CheckSection>
          <CheckIcon
            fill={isChecked.get(policyId) ? theme.colors.sub3[60] : theme.colors.gray80_2}
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

const ContentText = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.common.black};
  line-height: 1rem;
  word-break: keep-all;
  white-space: pre-wrap;
`;

export default SignUpUserAgreementItem;
