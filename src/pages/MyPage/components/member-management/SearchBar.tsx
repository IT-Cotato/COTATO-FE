import { IconButton, InputBase, Paper } from '@mui/material';
import { ReactComponent as Search } from '@/pages/MyPage/tempAsssets/search.svg';
import React, { Dispatch, SetStateAction } from 'react';

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
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        height: '2.25rem',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
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
