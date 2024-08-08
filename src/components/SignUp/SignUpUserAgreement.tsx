import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Divider, Stack } from '@mui/material';
import { ReactComponent as CheckIcon } from '@assets/sign_up_check_icon.svg';
import SignUpUserAgreementItem from '@components/SignUp/SignUpUserAgreementItem';
import { v4 as uuid } from 'uuid';
import { th } from 'date-fns/locale';
import { set } from 'date-fns';

//
//
//

const AGREEMENT_ITEMS = [
  {
    name: '개인정보 수집 및 이용',
    isRequired: true,
    content:
      '개인정보보호법에 따라 코테이토에 회원가입을 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용 목적, 개인정보의 보유 및 이용 기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내해 드리니 확인 후 동의하여 주시기를 바랍니다.\n회원 가입을 위해서는 아래와 같이 개인정보를 수집·이용합니다\n\n1. 개인정보 수집 항목: 이름, 아이디(이메일), 비밀번호, 전화번호\n2. 개인정보 수집 목적: 회원 관리\n3. 보유 및 이용 기간: 회원 탈퇴 시까지\n\n이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있으나 동의 거부 시 서비스 이용이 제한됩니다.',
  },
  {
    name: '개인위치정보 수집 및 이용',
    isRequired: true,
    content:
      '코테이토 페이지에서 서비스 제공을 위해 이용자의 현재 위치 정보를 수집합니다. 이에 따라 위치기반서비스와 관련하여 정보 수집 동의에 관한 사항을 안내해 드리니 확인 후 동의하여 주시기를 바랍니다.\n\n1. 수집 정보 : 현재 GPS 위치 정보\n2. 개인위치정보 수집 목적 : 출석 확인\n3. 개인위치정보 사용 방법 : 출석 체크 시에만 사용되며, 다른 목적으로 사용되지 않습니다. 출석 확인 후 정보가 저장되지 않으며, 즉시 삭제됩니다.\n4. 보유 및 이용 기간: 회원 탈퇴 시까지\n\n이용자는 언제든지 개인위치정보 수집 동의를 철회할 수 있으며, 이 경우 서비스 이용에 일부 제한이 있을 수 있습니다.\n\n수집된 정보는 동아리 활동 종료 시 폐기 됩니다. ',
  },
];

//
//
//

const SignUpUserAgreement = () => {
  const theme = useTheme();

  const [color, setColor] = useState(theme.colors.gray100);

  const mode = localStorage.getItem('theme');

  /**
   *
   */
  const renderTotalAgreement = () => {
    return (
      <TotalDiv>
        <CheckIcon fill={color} />
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
        {AGREEMENT_ITEMS.map((item) => (
          <SignUpUserAgreementItem
            key={uuid()}
            name={item.name}
            isRequired={item.isRequired}
            content={item.content}
            fillColor={color}
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

  return (
    <Wrapper>
      {renderTotalAgreement()}
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
  width: 28rem;
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
  }
`;

export default SignUpUserAgreement;
