import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { marked } from 'marked';
import styled, { useTheme } from 'styled-components';
import DOMPurify from 'dompurify';
import { produce } from 'immer';
import { LoadingButton } from '@mui/lab';
import { logout } from '@utils/logout';
import api from '@/api/api';
import { CotatoCheckPolicyRequest } from 'cotato-openapi-clients';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import fetchUserData from '@utils/fetchUserData';
import { MemberRole } from '@/enums';
import { useGetPoliciesUnchecked } from '@/hooks/useGetPoliciesUnchecked';

//
//
//

const AgreementConfirmDialog = () => {
  const theme = useTheme();
  const { isMobileOrSmaller } = useBreakpoints();

  const { data: user, isLoading: isUserLoading, mutate } = fetchUserData();
  const { uncheckedPolicies } = useGetPoliciesUnchecked();
  const essentialPolicies = uncheckedPolicies?.essentialPolicies;
  const policies = [...(essentialPolicies ?? []), ...(uncheckedPolicies?.optionalPolicies ?? [])];

  const [checkedPolicies, setCheckedPolicies] = useState<Record<string, boolean>>({});
  const [checkAll, setCheckAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isMember = MemberRole[user?.role ?? MemberRole.NOTHING] >= MemberRole.MEMBER;
  const alreadyAgreed = localStorage.getItem('agreement') === 'true';

  /**
   *
   */
  const handlePolicyCheck = (policyId: number) => {
    setCheckedPolicies(
      produce((draft) => {
        draft[policyId] = !draft[policyId];
      }),
    );
  };

  /**
   *
   */
  const handleCheckAll = () => {
    setCheckAll((prevCheckAll) => !prevCheckAll);

    setCheckedPolicies(
      produce((draft) => {
        policies?.forEach((policy) => {
          if (policy && policy.policyId) {
            draft[policy.policyId] = !checkAll;
          }
        });
      }),
    );
  };

  /**
   *
   */
  const handleClose = async () => {
    const confirmed = window.confirm(
      '정말로 취소하시겠습니까? 이용 약관 미동의 시 회원 이용이 제한되며 자동으로 로그아웃됩니다.',
    );

    if (confirmed) {
      await logout();
    }
  };

  /**
   *
   */
  const handleSubmit = async () => {
    // 약관 동의되지 않은 것이 있는지 확인
    const isNotChecked = Object.values(checkedPolicies).some((value) => !value);

    if (isNotChecked) {
      alert('모든 약관에 동의해주세요.');
      return;
    }

    setIsLoading(true);

    api
      .post('v2/api/policies/check', {
        policies: policies?.map((policy) => {
          // TODO: fix after type is fixed
          if (!policy.policyId) {
            return null;
          }

          return {
            policyId: policy.policyId,
            isChecked: checkedPolicies[policy.policyId],
          } as CotatoCheckPolicyRequest;
        }),
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        // TODO: add error code
        if (error.response.data.code === 'P-301') {
          localStorage.setItem('agreement', 'true');
          return;
        }

        alert(
          '약관 동의에 실패했습니다. 네트워크 상태를 확인해주세요. 현상이 지속될 경우 운영진 문의 부탁드립니다.',
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /**
   *
   */
  const renderTitle = () => {
    return (
      <Stack gap="1rem" marginBottom="2rem">
        <Typography variant="h5" fontWeight="bold">
          ❗이용 약관 동의에 관한 알림
        </Typography>
        <Typography
          variant="body2"
          sx={{
            wordBreak: 'keep-all',
          }}
        >
          개인정보 및 위치정보 수집에 관한 새로운 이용 약관이 추가되었습니다. 기존 회원도 해당
          약관에 대한 동의가 필요하며, 동의하지 않을 경우 서비스 이용이 제한될 수 있습니다. 약관의
          세부 내용은 아래를 참조하십시오.
        </Typography>
      </Stack>
    );
  };

  /**
   *
   */

  const renderCheckBox = (policyId: number) => {
    return (
      <Stack direction="row" alignItems="center">
        <Checkbox
          checked={checkedPolicies[policyId] || false}
          onChange={() => handlePolicyCheck(policyId)}
        />
        <Typography>위의 내용을 모두 확인하였으며, 이에 동의합니다.</Typography>
      </Stack>
    );
  };

  /**
   *
   */
  const renderCheckAll = () => {
    return (
      <Stack direction="row" alignItems="center" alignSelf="flex-start">
        <Checkbox checked={checkAll} onChange={handleCheckAll} />
        <Typography
          fontSize={isMobileOrSmaller ? '0.75rem' : '0.875rem'}
          sx={{
            wordBreak: 'keep-all',
          }}
        >
          이용 약관의 내용을 모두 확인하였으며, 전체 동의합니다.
        </Typography>
      </Stack>
    );
  };

  /**
   *
   */
  const renderPolicies = () => {
    return policies?.map((policy, index) => {
      if (!policy || !policy.content || !policy.title || !policy.policyId) {
        return null;
      }

      const parsedHtml = marked.parse(policy.content) as string;

      return (
        <Stack key={policy.policyId} gap="0.5rem">
          <Typography variant="h6">
            {index + 1}. {policy.title}
          </Typography>
          <StyledDiv
            style={{
              fontSize: theme.fontSize.xs,
              color: theme.colors.const.black,
              lineHeight: '1rem',
              wordBreak: 'keep-all',
              whiteSpace: 'pre-wrap',
              border: `1px solid ${theme.colors.gray80_2}`,
              padding: '0.5rem 1.5rem',
            }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parsedHtml) }}
          />
          {renderCheckBox(policy.policyId)}
        </Stack>
      );
    });
  };

  //
  //
  //
  React.useEffect(() => {
    if (isUserLoading) {
      return;
    }
  }, [isUserLoading]);

  //
  //
  //
  React.useLayoutEffect(() => {
    mutate();
  }, []);

  //
  //
  //

  return (
    <StyledDialog open={Boolean(policies?.length && isMember && !alreadyAgreed)}>
      <DialogTitle>{renderTitle()}</DialogTitle>
      <DialogContent>
        <Stack gap="1rem">{renderPolicies()}</Stack>
      </DialogContent>
      <DialogActions>
        {renderCheckAll()}
        <Box flexGrow={1} />
        <Button color="error" onClick={handleClose}>
          취소
        </Button>
        <LoadingButton variant="contained" loading={isLoading} onClick={handleSubmit}>
          확인
        </LoadingButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default AgreementConfirmDialog;

//
//
//

const StyledDialog = styled(Dialog)`
  * {
    font-family: Pretendard;
  }
`;

const StyledDiv = styled.div`
  * {
    margin: 0rem;
  }
`;
