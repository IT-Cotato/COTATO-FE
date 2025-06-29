import React from 'react';
import { useNumberParams } from '@/hooks/useNumberParams';
import {
  CotatoDialog,
  CotatoDialogActions,
  CotatoDialogContent,
  CotatoDialogTitle,
} from '@components/CotatoDialog';
import CotatoMuiButton from '@components/CotatoMuiButton';
import CotatoSearchTextField from '@components/CotatoSearchTextField/CotatoSearchTextField';
import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { Stack } from '@mui/system';
import { getMemberPostionText } from '@utils/member';
import { CotatoMemberInfoResponsePositionEnum } from 'cotato-openapi-clients';
import { useDebounce } from 'react-use';
import { styled, useTheme } from 'styled-components';
import { xor } from 'lodash';

import { useGeneration } from '@/hooks/useGeneration';
import { useGenerationMembersMutation } from '../hooks/useGenerationMembersMutation';
import { toast } from 'react-toastify';
import { useMemberAddable } from '../hooks/useMemberAddable';

//
//
//

interface MypageGenerationManagementMemberAddDialogProps {
  open: boolean;
  onClose: () => void;
}

//
//
//

const DEBOUNCE_TIME = 500;

//
//
//

const MypageGenerationManagementMemberAddDialog: React.FC<
  MypageGenerationManagementMemberAddDialogProps
> = ({ open, onClose }: MypageGenerationManagementMemberAddDialogProps) => {
  const { generationId } = useNumberParams();
  const theme = useTheme();

  //
  const [searchName, setSearchName] = React.useState('');
  const [debouncedSearchName, setDebouncedSearchName] = React.useState(searchName);
  const [selectedMembers, setSelectedMembers] = React.useState<number[]>([]);
  const [selectedGeneration, setSelectedGeneration] = React.useState<number>(generationId ?? 0);
  const [selectedPosition, setSelectedPosition] =
    React.useState<CotatoMemberInfoResponsePositionEnum>(null as any);

  //
  const { targetGeneration } = useGeneration({ generationId: selectedGeneration.toString() });

  //
  const { addableMembers } = useMemberAddable({
    generationId,
    name: debouncedSearchName,
    passedGenerationNumber: targetGeneration?.generationNumber,
    position: selectedPosition,
  });
  const { generations } = useGeneration();
  const { post: postGenerationMembers } = useGenerationMembersMutation({
    onSuccessPost: () => {
      toast.success('부원 추가 완료');
    },
    onErrorPost: () => {
      toast.error('부원 추가 실패');
    },
  });

  /**
   *
   */
  const handleSelectMember = (memberId: number) => {
    setSelectedMembers(xor(selectedMembers, [memberId]));
  };
  console.log(addableMembers?.memberInfos);
  const isAllSelected = selectedMembers.length === addableMembers?.memberInfos.length;

  /**
   *
   */
  const handleToggleAllMembers = () => {
    setSelectedMembers(
      isAllSelected ? [] : (addableMembers?.memberInfos.map((member) => member.memberId) ?? []),
    );
  };

  /**
   *
   */
  const handlePositionSelect = (position: CotatoMemberInfoResponsePositionEnum) => {
    if (position === CotatoMemberInfoResponsePositionEnum.None) {
      setSelectedPosition(null as any);
      return;
    }

    setSelectedPosition(position);
  };

  /**
   *
   */
  const renderFilters = () => {
    return (
      <Stack
        direction="row"
        padding="1.25rem 1.5rem 1rem"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="flex-end"
        position="sticky"
        top="0"
        gap="1.5rem"
      >
        <Stack direction="row" alignItems="center" gap="0.5rem">
          <Checkbox checked={isAllSelected} onChange={handleToggleAllMembers} />
          <StyledSelect
            slotProps={{
              input: {
                sx: {
                  fontFamily: 'YComputer',
                },
              },
            }}
            value={selectedGeneration}
            onChange={(e) => setSelectedGeneration(e.target.value as number)}
          >
            {generations?.map((generation) => (
              <MenuItem
                key={generation.generationId}
                value={generation.generationId}
                sx={{
                  fontFamily: 'YComputer !important',
                }}
              >
                {generation.generationNumber}기
              </MenuItem>
            ))}
          </StyledSelect>
          <StyledSelect
            slotProps={{
              input: {
                placeholder: '포지션',
                sx: {
                  fontFamily: 'YComputer',
                },
              },
            }}
            displayEmpty={true}
            value={selectedPosition}
            onChange={(e) =>
              handlePositionSelect(e.target.value as CotatoMemberInfoResponsePositionEnum)
            }
          >
            <MenuItem value={null as any}>포지션</MenuItem>
            {Object.values(CotatoMemberInfoResponsePositionEnum)
              .filter((position) => position !== CotatoMemberInfoResponsePositionEnum.None)
              .map((position) => (
                <MenuItem key={position} value={position}>
                  {getMemberPostionText(position)}
                </MenuItem>
              ))}
          </StyledSelect>
        </Stack>
        <Box maxWidth="10rem">
          <CotatoSearchTextField
            fullWidth
            isEndAdornment
            placeholder="이름 검색"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            iconColor={(theme) => theme.colors.const.black}
          />
        </Box>
      </Stack>
    );
  };

  /**
   *
   */
  const renderMemberList = () => {
    return (
      <StyledList disablePadding>
        {addableMembers?.memberInfos.map((member) => {
          return (
            <StyledListItem key={member.memberId}>
              <Checkbox
                checked={selectedMembers.includes(member.memberId)}
                onChange={() => handleSelectMember(member.memberId)}
              />
              <ListItemText primary={member.name + ' ' + getMemberPostionText(member.position)} />
            </StyledListItem>
          );
        })}
      </StyledList>
    );
  };

  //
  //
  //
  useDebounce(() => setDebouncedSearchName(searchName), DEBOUNCE_TIME, [searchName]);

  //
  //
  //

  return (
    <CotatoDialog open={open} onClose={onClose}>
      <CotatoDialogTitle alignCenter>부원 추가하기</CotatoDialogTitle>
      {renderFilters()}
      <Divider sx={{ margin: '0 1.5rem' }} />
      <CotatoDialogContent sx={{ overflow: 'hidden' }}>{renderMemberList()}</CotatoDialogContent>
      <CotatoDialogActions>
        <CotatoMuiButton
          sx={{
            backgroundColor: `${theme.colors.const.gray100} !important`,
            color: `${theme.colors.const.white} !important`,
          }}
          fontFamily="YComputer"
          onClick={onClose}
        >
          취소하기
        </CotatoMuiButton>
        <CotatoMuiButton
          fontFamily="YComputer"
          disabled={selectedMembers.length === 0}
          onClick={() => {
            postGenerationMembers({ generationId: generationId, memberIds: selectedMembers });
            onClose();
          }}
        >
          부원 추가 완료
        </CotatoMuiButton>
      </CotatoDialogActions>
    </CotatoDialog>
  );
};

export default MypageGenerationManagementMemberAddDialog;

const StyledList = styled(List)`
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  }
  overflow-y: auto;
  height: 450px;
  border: 1px solid ${({ theme }) => theme.colors.gray30};
`;

const StyledListItem = styled(ListItem)`
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray30};
  }
`;

const StyledSelect = styled(Select)`
  background-color: ${({ theme }) => theme.colors.gray20};
  width: 8rem;
  height: 3.25rem;
`;
