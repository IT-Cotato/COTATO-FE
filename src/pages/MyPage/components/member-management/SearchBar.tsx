import { Box, MenuItem, Select, Stack } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import CotatoSearchTextField from '@components/CotatoSearchTextField/CotatoSearchTextField';
import { CotatoMemberInfoResponsePositionEnum } from 'cotato-openapi-clients';
import { useGeneration } from '@/hooks/useGeneration';
import { getMemberPostionText } from '@utils/member';
import { styled } from 'styled-components';

interface SearchParams {
  generationNumber: number | null;
  position: CotatoMemberInfoResponsePositionEnum | null;
  name: string;
}

interface SearchBarProps {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
}

export default function SearchBar({ searchParams, setSearchParams }: SearchBarProps) {
  const { generations } = useGeneration();

  const handlePositionSelect = (position: CotatoMemberInfoResponsePositionEnum) => {
    if (position === CotatoMemberInfoResponsePositionEnum.None) {
      setSearchParams((prev) => ({ ...prev, position: null }));
      return;
    }

    setSearchParams((prev) => ({ ...prev, position }));
  };

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
          displayEmpty
          value={searchParams.generationNumber || ''}
          onChange={(e) =>
            setSearchParams((prev) => ({
              ...prev,
              generationNumber: e.target.value === 'clear' ? null : (e.target.value as number),
            }))
          }
          renderValue={(selected) => {
            if (!selected || selected === 'clear') {
              return <em style={{ fontFamily: 'YComputer', opacity: 0.7 }}>기수</em>;
            }
            const selectedGeneration = generations?.find((g) => g.generationId === selected);
            return `${selectedGeneration?.generationNumber}기`;
          }}
        >
          <MenuItem value="clear">
            <em>기수</em>
          </MenuItem>
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
          displayEmpty
          value={searchParams.position === null ? '' : searchParams.position}
          onChange={(e) =>
            handlePositionSelect(
              e.target.value === ''
                ? CotatoMemberInfoResponsePositionEnum.None
                : (e.target.value as CotatoMemberInfoResponsePositionEnum),
            )
          }
          renderValue={(selected) => {
            if (!selected || selected === CotatoMemberInfoResponsePositionEnum.None) {
              return <em style={{ fontFamily: 'YComputer', opacity: 0.7 }}>포지션</em>;
            }
            return getMemberPostionText(selected as CotatoMemberInfoResponsePositionEnum);
          }}
        >
          <MenuItem value={CotatoMemberInfoResponsePositionEnum.None}>
            <em>포지션</em>
          </MenuItem>
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
  height: 2.5rem;
`;
