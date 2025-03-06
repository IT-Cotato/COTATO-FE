import React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import CotatoIcon from './CotatoIcon';

//
//
//

interface CotatoMuiDatePickerProps extends DatePickerProps<any> {
  placeholder?: string;
}

//
//
//

const CotatoMuiDatePicker = ({ placeholder, ...DatePickerProps }: CotatoMuiDatePickerProps) => {
  return (
    <DatePicker
      slots={{
        openPickerIcon: () => <CotatoIcon icon="calender-solid" size="1.5rem" />,
      }}
      slotProps={{
        textField: {
          placeholder: placeholder,
        },
      }}
      format="YYYY.MM.DD"
      {...DatePickerProps}
    />
  );
};

export default CotatoMuiDatePicker;
