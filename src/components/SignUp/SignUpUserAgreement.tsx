import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { Divider, Stack } from '@mui/material';
import SignUpUserAgreementItem from '@components/SignUp/SignUpUserAgreementItem';

import { produce } from 'immer';
import { CotatoPolicyInfoResponse } from 'cotato-openapi-clients';
import CotatoIcon from '@components/CotatoIcon';

//
//
//

interface SignUpUserAgreementItemProps {
  isCheckedAll: boolean;
  isChecked: Map<number, boolean>;
  policies?: CotatoPolicyInfoResponse[];
  setIsCheckedAll: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChecked: React.Dispatch<React.SetStateAction<Map<number, boolean>>>;
}

//
//
//

const SignUpUserAgreement: React.FC<SignUpUserAgreementItemProps> = ({
  policies,
  isCheckedAll,
  setIsCheckedAll,
  isChecked,
  setIsChecked,
}) => {
  const theme = useTheme();

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
  };

  /**
   *
   */
  const renderEntireAgreement = () => {
    return (
      <TotalDiv>
        <CotatoIcon
          icon="check-box-solid"
          size="1.5rem"
          color={(theme) => (isCheckedAll ? theme.colors.sub3[60] : theme.colors.gray60)}
          onClick={handleEntireClick}
        />
        <p>이용약관 전체 동의</p>
      </TotalDiv>
    );
  };

  /**
   *
   */
  const renderAgreementItems = () => {
    if (!policies) {
      return null;
    }

    return (
      <Stack>
        {policies?.map((policy) => {
          if (!policy) {
            return null;
          }

          return (
            <SignUpUserAgreementItem
              key={policy.policyId}
              {...policy}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          );
        })}
      </Stack>
    );
  };

  useEffect(() => {
    handleCheckAll();
  }, [isChecked]);

  return (
    <Wrapper>
      {renderEntireAgreement()}
      <Divider sx={{ bgcolor: theme.colors.gray80_2 }} />
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
    color: ${({ theme }) => theme.colors.gray80_2};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-family: Pretendard;
  }
`;

export default SignUpUserAgreement;
