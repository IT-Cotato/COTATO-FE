import React, { useState } from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { ReactComponent as CheckIcon } from '@assets/sign_up_check_icon.svg';
import { ReactComponent as ArrowDown } from '@assets/pixel_arrow_down.svg';
import { ReactComponent as ArrowUp } from '@assets/pixel_arrow_up.svg';

//
//
//

interface SignUpUserAgreementItemProps {
  name: string;
  isRequired: boolean;
  content: string;
  fillColor: string;
}

//
//
//

const SignUpUserAgreementItem: React.FC<SignUpUserAgreementItemProps> = ({
  name,
  isRequired,
  content,
  fillColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const necessaryOrOptional = isRequired ? '필수' : '선택';

  /**
   *
   */
  const ArrowButton = () => {
    return isOpen ? <ArrowUp fill={fillColor} /> : <ArrowDown fill={fillColor} />;
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
          <CheckIcon fill={fillColor} />
          <p>
            {name} ({necessaryOrOptional})
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
    color: ${({ theme }) => theme.colors.gray60};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  p {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.gray60};
    font-size: ${({ theme }) => theme.fontSize.sm};
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