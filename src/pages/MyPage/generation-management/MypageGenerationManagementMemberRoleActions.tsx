import React, { useState } from 'react';
import CotatoIcon from '@components/CotatoIcon';
import { IconButton, MenuItem, Select, SelectProps, Stack } from '@mui/material';
import { getMemberRoleText } from '@utils/member';
import {
  CotatoGenerationMemberInfo,
  CotatoGenerationMemberInfoRoleEnum,
  CotatoUpdateGenerationMemberRoleRequestRoleEnum,
} from 'cotato-openapi-clients';
import { styled } from 'styled-components';
import MypageGenerationManagementMemberDeleteDialog from './MypageGenerationManagementMemberDeleteDialog';

//
//
//

type MypageGenerationManagementMemberRoleActionsProps = Omit<SelectProps, 'onChange'> & {
  isEditable: boolean;
  memberInfo: CotatoGenerationMemberInfo;
  onDelete?: (generationMemberId: number) => void;
  onChange: (
    generationMemberId: number,
    role: CotatoUpdateGenerationMemberRoleRequestRoleEnum,
  ) => void;
};

//
//
//

const MypageGenerationManagementMemberRoleActions = ({
  isEditable,
  memberInfo,
  onDelete,
  onChange,
  ...selectProps
}: MypageGenerationManagementMemberRoleActionsProps) => {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  /**
   *
   */
  const handleDelete = (generationMemberId?: number) => {
    if (!generationMemberId) {
      return;
    }

    onDelete?.(generationMemberId);
  };

  /**
   *
   */
  const handleRoleChange = ({
    generationMemberId,
    role,
  }: {
    generationMemberId?: number;
    role: CotatoUpdateGenerationMemberRoleRequestRoleEnum;
  }) => {
    if (!generationMemberId) {
      return;
    }

    onChange?.(generationMemberId, role);
  };
  //
  //
  //

  return (
    <Stack direction="row" alignItems="center" gap="0.5rem">
      <StyledSelect
        disabled={!isEditable}
        value={memberInfo.role}
        slotProps={{
          input: {
            sx: {
              textAlign: 'start',
              fontFamily: 'YComputer',
            },
          },
        }}
        onChange={(e) =>
          handleRoleChange({
            generationMemberId: memberInfo.generationMemberId,
            role: e.target.value as CotatoUpdateGenerationMemberRoleRequestRoleEnum,
          })
        }
        {...selectProps}
      >
        {Object.values(CotatoGenerationMemberInfoRoleEnum).map((role) => (
          <MenuItem key={role} value={role}>
            {getMemberRoleText(role)}
          </MenuItem>
        ))}
      </StyledSelect>
      {isEditable && (
        <IconButton onClick={() => setIsOpenDeleteDialog(true)}>
          <CotatoIcon
            icon="trash-alt-solid"
            size="1.25rem"
            color={(theme) => theme.colors.const.black}
          />
        </IconButton>
      )}
      <MypageGenerationManagementMemberDeleteDialog
        open={isOpenDeleteDialog}
        onClose={() => setIsOpenDeleteDialog(false)}
        onDelete={() => handleDelete(memberInfo.generationMemberId)}
      />
    </Stack>
  );
};

export default MypageGenerationManagementMemberRoleActions;

const StyledSelect = styled(Select)`
  background-color: ${({ theme }) => theme.colors.primary20};
  width: 8rem;
  height: 3.25rem;
`;
