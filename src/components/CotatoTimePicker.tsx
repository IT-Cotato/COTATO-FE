import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { useTheme } from 'styled-components';

//
//
//

interface CotatoTimePickerProps {
  readonly?: boolean;
  date: Date;
  onDateChange?: (date: Date) => void;
}

//
//
//

const CotatoTimePicker: React.FC<CotatoTimePickerProps> = ({
  readonly = false,
  date,
  onDateChange,
}) => {
  const theme = useTheme();

  const handleDateChange = (newDate: Dayjs | null) => {
    if (readonly || !onDateChange) {
      return;
    }

    onDateChange(newDate?.toDate() || date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <TimePicker
        readOnly={readonly}
        value={dayjs(date)}
        onChange={handleDateChange}
        sx={{
          ['& .MuiFormControl-root']: {
            width: '10rem',
          },
          ['& .MuiInputBase-root']: {
            border: `1px solid ${theme.colors.gray60}`,
            borderRadius: '0.5rem',
            background: readonly ? theme.colors.gray20 : theme.colors.const.white,
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
        }}
        slotProps={{
          inputAdornment: {
            sx: {
              ['& .MuiSvgIcon-root']: {
                fill: readonly ? theme.colors.gray40 : theme.colors.gray60,
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
