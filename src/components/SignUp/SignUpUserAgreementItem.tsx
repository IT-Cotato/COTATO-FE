import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Box } from '@mui/material';
import { ReactComponent as CheckIcon } from '@assets/sign_up_check_icon.svg';
import { ReactComponent as ArrowDown } from '@assets/pixel_arrow_down.svg';
import { ReactComponent as ArrowUp } from '@assets/pixel_arrow_up.svg';
import { produce, enableMapSet } from 'immer';

//
//
//

interface SignUpUserAgreementItemProps {
  id: number;
  name: string;
  isRequired: boolean;
  content: string;
  fillColor: string;
  isChecked: Map<number, boolean>;
  setIsChecked: React.Dispatch<React.SetStateAction<Map<number, boolean>>>;
}

//
//
//

const SignUpUserAgreementItem: React.FC<SignUpUserAgreementItemProps> = ({
  id,
  name,
  isRequired,
  content,
  fillColor,
  isChecked,
  setIsChecked,
}) => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const necessaryOrOptional = isRequired ? '필수' : '선택';

  enableMapSet();

  /**
   *
   */
  const handleCheck = () => {
    setIsChecked(
      produce(isChecked, (draft) => {
        draft.set(id, !isChecked.get(id));
      }),
    );
  };

  /**
   *
   */
  const getCheckButtonColor = () => {
    if (isChecked.get(id)) {
      return theme.colors.sub3[60];
    } else {
      return fillColor;
    }
  };

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
          <CheckIcon fill={getCheckButtonColor()} onClick={handleCheck} />
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
