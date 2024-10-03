import React from 'react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import styled, { useTheme } from 'styled-components';
import { Modal } from '@mui/material';
import dayjs from 'dayjs';

//
//
//

interface CotatoDatePickerProps {
  open: boolean;
  date?: Date;
  onDateChange: (date: Date) => void;
  onClose: () => void;
}

//
//
//

const CotatoDatePicker: React.FC<CotatoDatePickerProps> = ({
  open,
  date,
  onDateChange,
  onClose,
}) => {
  const theme = useTheme();

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date);

  /**
   *
   */
  const handleCancelClick = () => {
    setSelectedDate(date);
    onClose();
  };

  /**
   *
   */
  const handleConfirmlClick = () => {
    selectedDate && onDateChange(selectedDate);
    onClose();
  };

  /**
   *
   */
  const renderPickerFooter = () => {
    return (
      <PickerFotter>
        <SessionDate>{selectedDate && dayjs(selectedDate).format('YYYY년 MM월 DD일')}</SessionDate>
        <ButtwonWrapper>
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

  //
  //
  //

  return (
    <Modal open={open}>
      <StyledDayPicker
        mode="single"
        selected={selectedDate}
        onDayClick={setSelectedDate}
        locale={ko}
        footer={renderPickerFooter()}
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

const SessionDate = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray100};
`;

const ButtwonWrapper = styled.span`
  display: flex;
  gap: 0.5rem;
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
