import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Divider, Stack } from '@mui/material';
import { ReactComponent as CheckIcon } from '@assets/sign_up_check_icon.svg';
import SignUpUserAgreementItem from '@components/SignUp/SignUpUserAgreementItem';
import { v4 as uuid } from 'uuid';
import { produce } from 'immer';

//
//
//

type AgreementItemType = {
  id: number;
  name: string;
  isRequired: boolean;
  content: string;
};

interface SignUpUserAgreementItemProps {
  agreementItems: AgreementItemType[];
  isCheckedAll: boolean;
  setIsCheckedAll: React.Dispatch<React.SetStateAction<boolean>>;
  isChecked: Map<number, boolean>;
  setIsChecked: React.Dispatch<React.SetStateAction<Map<number, boolean>>>;
}

//
//
//

const SignUpUserAgreement: React.FC<SignUpUserAgreementItemProps> = ({
  agreementItems,
  isCheckedAll,
  setIsCheckedAll,
  isChecked,
  setIsChecked,
}) => {
  const theme = useTheme();

  const [color, setColor] = useState(theme.colors.gray100);

  const mode = localStorage.getItem('theme');

  /**
   * handler for the click event of the entire agreement button
   */
  const handleEntireClick = () => {
    if (isCheckedAll) {
      setIsChecked(
        produce(isChecked, (draft) => draft.forEach((value, id) => draft.set(id, false))),
      );
    } else {
      setIsChecked(
        produce(isChecked, (draft) => draft.forEach((value, id) => draft.set(id, true))),
      );
    }
    console.log(isChecked);
  };

  /**
   * Check the entire agreement button when all the agreement items are checked.
   */
  const handleCheckAll = () => {
    if (Array.from(isChecked.values()).every((value) => value === true)) {
      setIsCheckedAll(true);
    } else {
      setIsCheckedAll(false);
    }
    console.log(isCheckedAll);
  };

  /**
   *
   */
  const getEntireCheckButtonColor = () => {
    if (isCheckedAll) {
      return theme.colors.sub3[60];
    } else {
      return color;
    }
  };

  /**
   *
   */
  const renderEntireAgreement = () => {
    return (
      <TotalDiv>
        <CheckIcon fill={getEntireCheckButtonColor()} onClick={handleEntireClick} />
        <p>이용약관 전체 동의</p>
      </TotalDiv>
    );
  };

  /**
   *
   */
  const renderAgreementItems = () => {
    return (
      <Stack>
        {agreementItems.map((item) => (
          <SignUpUserAgreementItem
            key={uuid()}
            id={item.id}
            name={item.name}
            isRequired={item.isRequired}
            content={item.content}
            fillColor={color}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        ))}
      </Stack>
    );
  };

  //
  //
  //
  useEffect(() => {
    if (mode === 'dark') {
      setColor(theme.colors.gray30);
    } else {
      setColor(theme.colors.gray100);
    }
  }, [mode]);

  useEffect(() => {
    handleCheckAll();
  }, [isChecked]);

  return (
    <Wrapper>
      {renderEntireAgreement()}
      <Divider sx={{ bgcolor: color }} />
      {renderAgreementItems()}
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  padding: 0.75rem 0rem;
  width: 100%;
  height: fit-content;
`;

const TotalDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  p {
    margin-left: 0.3rem;
    color: ${({ theme }) => theme.colors.gray60};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-family: Pretendard;
  }
`;

export default SignUpUserAgreement;
