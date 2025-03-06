import React from 'react';
import CotatoIcon from '@components/CotatoIcon';
import { Box, IconButton, TextField, TextFieldProps } from '@mui/material';
import { useTheme } from 'styled-components';

//
//
//

const CotatoTextField = ({ ...props }: TextFieldProps) => {
  const theme = useTheme();

  /**
   *
   */
  const handleClear = () => {
    const event = {
      target: {
        value: '',
      },
    } as React.ChangeEvent<HTMLInputElement>;
    props.onChange?.(event);
  };

  //
  //
  //

  return (
    <TextField
      variant="standard"
      slotProps={{
        input: {
          startAdornment: (
            <Box width="1.25rem" display="flex" justifyContent="center" alignItems="center">
              <CotatoIcon
                icon="search"
                color={(theme) => theme.colors.common.black}
                size="1.25rem"
              />
            </Box>
          ),
          endAdornment: props.value ? (
            <IconButton onClick={handleClear}>
              <CotatoIcon icon="times" color={(theme) => theme.colors.common.black} size="1rem" />
            </IconButton>
          ) : null,
        },
      }}
      sx={{
        '& .MuiInputBase-input': {
          color: theme.colors.common.black,
          fontSize: '1rem',
          fontFamily: 'Prentendard',
        },
        gap: '0.5rem',
        '& .MuiInputBase-root': {
          gap: '0.5rem',
        },
        '& .MuiInput-underline:before': {
          borderBottomColor: theme.colors.common.black,
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottomColor: theme.colors.primary60,
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: theme.colors.primary100,
        },
      }}
      {...props}
    />
  );
};

export default CotatoTextField;
