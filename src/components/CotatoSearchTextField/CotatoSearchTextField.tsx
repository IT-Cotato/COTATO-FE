import React from 'react';
import CotatoIcon, { CotatoIconProps } from '@components/CotatoIcon';
import { Box, IconButton, TextField, TextFieldProps } from '@mui/material';
import { useTheme } from 'styled-components';

//
//
//

type CotatoSearchTextFieldProps = TextFieldProps & {
  isEndAdornment?: boolean;
  iconColor?: CotatoIconProps['color'];
};

//
//
//

const CotatoSearchTextField = ({
  isEndAdornment = false,
  iconColor = (theme) => theme.colors.common.black,
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
        <CotatoIcon icon="search" color={iconColor} size="1.25rem" />
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
        <CotatoIcon icon="times" color={iconColor} size="1rem" />
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
          color: theme.colors.const.black,
          fontSize: '1rem',
          fontFamily: 'Prentendard',
        },
        gap: '0.5rem',
        '& .MuiInputBase-root': {
          gap: '0.5rem',
        },
        '& .MuiInput-underline:before': {
          borderBottomColor: theme.colors.const.black,
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottomColor: theme.colors.const.primary60,
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: theme.colors.const.primary100,
        },
      }}
      {...props}
    />
  );
};

export default CotatoSearchTextField;
