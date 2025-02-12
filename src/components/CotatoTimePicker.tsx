import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { useTheme } from 'styled-components';
import { Box, Button } from '@mui/material';

//
//
//

interface CotatoTimePickerProps {
  readonly?: boolean;
  label?: string;
  date?: Date;
  onDateChange?: (date: Date) => void;
}

//
//
//

const CotatoTimePicker: React.FC<CotatoTimePickerProps> = ({
  readonly = false,
  label,
  date,
  onDateChange,
}) => {
  const theme = useTheme();

  const handleDateChange = (newDate: Dayjs | null) => {
    if (readonly || !onDateChange || !newDate) {
      return;
    }

    onDateChange(newDate?.toDate());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <TimePicker
        readOnly={readonly}
        label={label}
        value={date && dayjs(date)}
        onChange={handleDateChange}
        sx={{
          ['& .MuiFormControl-root']: {
            width: '10rem',
          },
          ['& .MuiInputBase-root']: {
            border: `1px solid ${theme.colors.gray60}`,
            borderRadius: '0.5rem',
            background: readonly ? theme.colors.gray20 : theme.colors.common.white_const,
            width: '9rem',
          },
          ['& .MuiInputBase-input']: {
            fontFamily: 'Pretendard',
            color: readonly ? theme.colors.gray40 : theme.colors.gray90,
            fontSize: '0.875rem',
            fontWeight: 300,
            padding: '0.5rem 0.75rem',
            lineHeight: '100%',
          },
          ['& .MuiOutlinedInput-notchedOutline']: {
            border: 'none',
          },
          ['& .Mui-disabled']: {
            '-webkit-text-fill-color': 'inherit',
          },
          ['& .MuiFormLabel-root']: {
            fontFamily: 'Pretendard',
            fontSize: '0.875rem',
            top: '-6px',
            left: '-4px',
          },
        }}
        slots={{
          actionBar: (props) => (
            <Box
              {...props}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '0.25rem',
              }}
            >
              <Button
                // eslint-disable-next-line react/prop-types
                onClick={props.onAccept}
                sx={{
                  color: theme.colors.primary100,
                }}
              >
                확인
              </Button>
            </Box>
          ),
        }}
        slotProps={{
          textField: {
            disabled: true,
          },
          inputAdornment: {
            sx: {
              ['& .MuiSvgIcon-root']: {
                fill: readonly ? theme.colors.gray40 : theme.colors.gray60,
              },
            },
          },
          desktopPaper: {
            sx: {
              ['& .Mui-selected']: {
                backgroundColor: theme.colors.primary100_2 + ' !important',

                '&:hover': {
                  backgroundColor: theme.colors.primary100_2 + ' !important',
                },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

//
//
//

export default CotatoTimePicker;
