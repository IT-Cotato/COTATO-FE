import React from 'react';
import { DayPicker, DayPickerBase } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import styled, { useTheme } from 'styled-components';
import { Modal } from '@mui/material';
import CotatoTimePicker from './CotatoTimePicker';

//
//
//

interface CotatoDatePickerProps extends DayPickerBase {
  open: boolean;
  date: Date;
  isAttendancePicker?: boolean;
  disableTimePicker?: boolean;
  onDateChange: (date: Date) => void;
  onClose: () => void;
}

//
//
//

const CotatoDatePicker: React.FC<CotatoDatePickerProps> = ({
  open,
  date,
  isAttendancePicker,
  disableTimePicker,
  onDateChange,
  onClose,
  ...dayPickerProps
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(date);

  const theme = useTheme();

  const handleDateClick = (date: Date) => {
    if (isAttendancePicker) {
      date.setHours(19, 0, 0, 0);
    }
    setSelectedDate(date);
  };

  const handleCancelClick = () => {
    setSelectedDate(date);
    onClose();
  };

  /**
   *
   */
  const handleConfirmlClick = () => {
    onDateChange(selectedDate);
    onClose();
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const renderTimePicker = () => {
    return (
      <PickerFotter>
        {disableTimePicker ? null : (
          <CotatoTimePicker date={selectedDate} onDateChange={handleDateChange} />
        )}
        <ButtwonWrapper $disableTimePicker={disableTimePicker ?? false}>
          <StyledButton $color={theme.colors.gray50} onClick={handleCancelClick}>
            취소
          </StyledButton>
          <StyledButton $color={theme.colors.primary100_2} onClick={handleConfirmlClick}>
            확인
          </StyledButton>
        </ButtwonWrapper>
      </PickerFotter>
    );
  };

  React.useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  return (
    <Modal open={open} onClose={onClose}>
      <StyledDayPicker
        {...dayPickerProps}
        mode="single"
        selected={selectedDate}
        defaultMonth={selectedDate}
        onDayClick={handleDateClick}
        locale={ko}
        footer={renderTimePicker()}
      />
    </Modal>
  );
};

//
//
//

const StyledDayPicker = styled(DayPicker)`
  position: absolute;
  top: 50%;
  left: calc(50% - 24px);
  transform: translate(-50%, -50%);
  padding: 1rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.common.white_const};

  * {
    font-family: Roboto;
    --rdp-accent-color: ${({ theme }) => theme.colors.primary100_2};
    --rdp-background-color: ${({ theme }) => theme.colors.primary40};
  }

  .rdp-head_cell {
    font-size: 0.875rem;
  }

  .rdp-day_today {
    font-weight: normal;
  }

  .rdp-cell {
    padding: 1px;
  }
`;

const PickerFotter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.5rem 0.5rem;
`;

const ButtwonWrapper = styled.span<{ $disableTimePicker: boolean }>`
  display: flex;
  gap: 0.5rem;
  justify-content: ${({ $disableTimePicker }) => ($disableTimePicker ? 'flex-end' : 'auto')};
  width: ${({ $disableTimePicker }) => ($disableTimePicker ? '100%' : 'auto')};
`;

const StyledButton = styled.button<{ $color: string }>`
  font-family: Prentard;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $color }) => $color};
  border: none;
  background: none;
  cursor: pointer;
`;

export default CotatoDatePicker;
