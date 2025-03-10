import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import TableLayout from '@components/Table/TableLayout';
import TableRenderer from '@components/Table/TableRenderer';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import CotatoMuiButton from '@components/CotatoMuiButton';
import CotatoIcon from '@components/CotatoIcon';
import MypageGenerationManagementMemberAddDialog from './MypageGenerationManagementMemberAddDialog';
import { useGenerationMembers } from '../hooks/useGenerationMembers';
import { useNumberParams } from '@/hooks/useNumberParams';
import {
  CotatoGenerationMemberInfo,
  CotatoGenerationMemberInfoPositionEnum,
  CotatoGenerationMemberInfoRoleEnum,
} from 'cotato-openapi-clients';
import MypageGenerationManagementMemberRoleActions from './MypageGenerationManagementMemberRoleActions';
import { useGenerationMembersMutation } from '../hooks/useGenerationMembersMutation';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

//
//
//

const TableCell = TableLayout.TableCell;
const TABLE_HEADS = ['이름', '역할'];

//
//
//

const MypageGenerationManagementDetailContentMemberInfo = () => {
  const theme = useTheme();

  const { generationId } = useNumberParams();
  const { isLandScapeOrSmaller } = useBreakpoints();

  const [isOpenMemberAddDialog, setIsOpenMemberAddDialog] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  //
  const { mutateGenerationMemberInfos } = useGenerationMembers({
    generationId,
  });

  const { delete: deleteGenerationMember, patch: patchGenerationMemberRole } =
    useGenerationMembersMutation({
      onSuccessDelete: () => {
        mutateGenerationMemberInfos();
        toast.success('부원 제거 완료');
      },
      onErrorDelete: () => {
        toast.error('부원 제거 실패');
      },
      onSuccessPatch: () => {
        mutateGenerationMemberInfos();
        toast.success('부원 역할 수정 완료');
      },
      onErrorPatch: () => {
        toast.error('부원 역할 수정 실패');
      },
    });

  const sampleData: CotatoGenerationMemberInfo[] = [
    {
      generationMemberId: 1,
      name: '홍길동',
      position: CotatoGenerationMemberInfoPositionEnum.Be,
      role: CotatoGenerationMemberInfoRoleEnum.EducationTeam,
    },
    {
      name: '홍길동',
      position: CotatoGenerationMemberInfoPositionEnum.Be,
      generationMemberId: 2,
      role: CotatoGenerationMemberInfoRoleEnum.EducationTeam,
    },
    {
      name: '홍길동',
      position: CotatoGenerationMemberInfoPositionEnum.Be,
      generationMemberId: 3,
      role: CotatoGenerationMemberInfoRoleEnum.EducationTeam,
    },
  ];

  /**
   *
   */
  const renderHeader = () => {
    return (
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap="1rem">
        <Typography variant="h6" color={theme.colors.common.black}>
          부원 정보
        </Typography>
        <Box display="flex" gap="1rem">
          <CotatoMuiButton
            startIcon={
              <CotatoIcon
                icon="plus-solid"
                size="1.25rem"
                color={(theme) => theme.colors.const.white}
              />
            }
            fontFamily="YComputer"
            onClick={() => setIsOpenMemberAddDialog(true)}
          >
            <Typography fontFamily="YComputer" variant="body2">
              인원 추가하기
            </Typography>
          </CotatoMuiButton>
          <CotatoMuiButton
            startIcon={
              !isEditable ? (
                <CotatoIcon
                  icon="pencil-solid"
                  size="1.25rem"
                  color={(theme) => theme.colors.const.white}
                />
              ) : undefined
            }
            fontFamily="YComputer"
            onClick={() => setIsEditable(!isEditable)}
          >
            <Typography fontFamily="YComputer" variant="body1">
              {isEditable ? '수정 완료' : '역할 수정 / 기수에서 제외하기'}
            </Typography>
          </CotatoMuiButton>
        </Box>
      </Stack>
    );
  };

  /**
   *
   */
  const renderTableRenderer = () => {
    return (
      <TableRenderer
        data={sampleData}
        head={TABLE_HEADS}
        repeatCount={isLandScapeOrSmaller ? 1 : 2}
        render={(info) => {
          return (
            <>
              <TableCell
                sx={{
                  backgroundColor: theme.colors.const.white,
                }}
              >
                {info?.name}
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.colors.const.white,
                }}
              >
                <MypageGenerationManagementMemberRoleActions
                  memberInfo={info}
                  onChange={(id, role) =>
                    patchGenerationMemberRole({ generationMemberId: id, role })
                  }
                  onDelete={(id) => deleteGenerationMember({ generationMemberId: id })}
                />
              </TableCell>
            </>
          );
        }}
      />
    );
  };

  //
  //
  //

  return (
    <Stack gap="1.5rem">
      {renderHeader()}
      {renderTableRenderer()}
      <MypageGenerationManagementMemberAddDialog
        open={isOpenMemberAddDialog}
        onClose={() => setIsOpenMemberAddDialog(false)}
      />
    </Stack>
  );
};

export default MypageGenerationManagementDetailContentMemberInfo;
