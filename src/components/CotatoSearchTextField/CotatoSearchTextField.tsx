import React from 'react';
import CotatoIcon from '@components/CotatoIcon';
import { Box, IconButton, TextField, TextFieldProps } from '@mui/material';
import { useTheme } from 'styled-components';

//
//
//

type CotatoSearchTextFieldProps = TextFieldProps & {
  isEndAdornment?: boolean;
};

//
//
//

const CotatoSearchTextField = ({
  isEndAdornment = false,
  ...props
}: CotatoSearchTextFieldProps) => {
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

  /**
   *
   */
  const renderAdornment = () => {
    return (
      <Box width="1.25rem" display="flex" justifyContent="center" alignItems="center">
        <CotatoIcon icon="search" color={(theme) => theme.colors.common.black} size="1.25rem" />
      </Box>
    );
  };

  /**
   *
   */
  const renderClearButton = () => {
    if (!props.value) {
      return null;
    }

    return (
      <IconButton onClick={handleClear}>
        <CotatoIcon icon="times" color={(theme) => theme.colors.common.black} size="1rem" />
      </IconButton>
    );
  };
  //
  //
  //

  return (
    <TextField
      variant="standard"
      slotProps={{
        input: {
          startAdornment: isEndAdornment ? null : renderAdornment(),
          endAdornment: isEndAdornment ? renderAdornment() : renderClearButton(),
        },
      }}
      sx={{
        '& .MuiInputBase-input': {
          color: theme.colors.common.black,
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

export default CotatoSearchTextField;
