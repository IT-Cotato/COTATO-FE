import { IconButton, InputBase, Paper, useMediaQuery } from '@mui/material';
import { ReactComponent as Search } from '@/pages/MyPage/tempAsssets/search.svg';
import React, { Dispatch, SetStateAction } from 'react';
import { device } from '@theme/media';
import { useTheme } from 'styled-components';

//
//
//

interface SearchBarProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

//
//
//

export default function SearchBar({ value, setValue }: SearchBarProps) {
  const isTablet = useMediaQuery(`(max-width:${device.tablet})`);
  const theme = useTheme();

  //
  //
  //

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: isTablet ? 200 : 400,
        height: '2.25rem',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderBottom: '2px solid',
        borderColor: theme.colors.gray100,
        borderRadius: 0,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: theme.fontSize.lg, fontWeight: 600 }}
        placeholder="이름/기수/파트 검색"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></InputBase>
      <IconButton type="button">
        <Search />
      </IconButton>
    </Paper>
  );
}
