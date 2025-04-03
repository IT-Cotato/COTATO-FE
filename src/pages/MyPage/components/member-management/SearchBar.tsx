import { Box, MenuItem, Select, Stack } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import CotatoSearchTextField from '@components/CotatoSearchTextField/CotatoSearchTextField';
import { CotatoAddableMemberInfoPositionEnum } from 'cotato-openapi-clients';
import { useGeneration } from '@/hooks/useGeneration';
import { getMemberPostionText } from '@utils/member';
import { styled } from 'styled-components';

//
//
//

interface SearchParams {
  generationNumber: number | null;
  position: CotatoAddableMemberInfoPositionEnum | null;
  name: string;
}

interface SearchBarProps {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
}

//
//
//

export default function SearchBar({ searchParams, setSearchParams }: SearchBarProps) {
  const { generations } = useGeneration();

  /**
   *
   */
  const handlePositionSelect = (position: CotatoAddableMemberInfoPositionEnum) => {
    if (position === CotatoAddableMemberInfoPositionEnum.None) {
      setSearchParams((prev) => ({ ...prev, position: null }));
      return;
    }

    setSearchParams((prev) => ({ ...prev, position }));
  };

  //
  //
  //

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
        <StyledSelect
          slotProps={{
            input: {
              sx: {
                fontFamily: 'YComputer',
              },
            },
          }}
          value={searchParams.generationNumber}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, generationId: e.target.value as number }))
          }
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
          value={searchParams.position}
          onChange={(e) =>
            handlePositionSelect(e.target.value as CotatoAddableMemberInfoPositionEnum)
          }
        >
          <MenuItem value={null as any}>포지션</MenuItem>
          {Object.values(CotatoAddableMemberInfoPositionEnum)
            .filter((position) => position !== CotatoAddableMemberInfoPositionEnum.None)
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
          value={searchParams.name}
          onChange={(e) => setSearchParams((prev) => ({ ...prev, name: e.target.value }))}
          iconColor={(theme) => theme.colors.const.black}
        />
      </Box>
    </Stack>
  );
}

const StyledSelect = styled(Select)`
  background-color: ${({ theme }) => theme.colors.gray20};
  width: 8rem;
  height: 3.25rem;
`;
