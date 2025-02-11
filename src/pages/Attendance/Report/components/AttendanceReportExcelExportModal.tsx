import useGetAttendances from '@/hooks/useGetAttendances';
import CotatoIcon from '@components/CotatoIcon';
import { Modal, Box, Typography, Button } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import CheckBox from '@mui/material/Checkbox';
import {
  CotatoAttendanceWithSessionResponse,
  CotatoAttendanceWithSessionResponseOpenStatusEnum,
  CotatoAttendanceWithSessionResponseSessionTypeEnum,
} from 'cotato-openapi-clients';
import api from '@/api/api';

//
//
//

interface AttendanceReportExcelExportModalProps {
  open: boolean;
  generationId: number;
  onClose: () => void;
}

const ALL_SESSION_ID = 0;

//
//
//

const AttendanceReportExcelExportModal = ({
  open,
  generationId,
  onClose,
}: AttendanceReportExcelExportModalProps) => {
  const [checkedAttendances, setCheckedAttendances] = React.useState<
    CotatoAttendanceWithSessionResponse[]
  >([]);
  const [isExcelExportLoading, setIsExcelExportLoading] = React.useState(false);

  const { attendances } = useGetAttendances({ generationId: generationId });

  const attendancesWithAll: CotatoAttendanceWithSessionResponse[] = [
    {
      sessionId: 0,
      attendanceId: 0,
      sessionTitle: '전체',
      sessionType: CotatoAttendanceWithSessionResponseSessionTypeEnum.NoAttend,
      openStatus: CotatoAttendanceWithSessionResponseOpenStatusEnum.Closed,
    } as CotatoAttendanceWithSessionResponse,
  ].concat([...(attendances?.attendances || [])].reverse() || []);

  const theme = useTheme();

  /**
   *
   */
  const isDisableExportAttendance = (attendance: CotatoAttendanceWithSessionResponse) => {
    return attendance.openStatus !== CotatoAttendanceWithSessionResponseOpenStatusEnum.Closed;
  };

  /**
   *
   */
  const handleCheckboxChange = (attendance: CotatoAttendanceWithSessionResponse) => {
    if (attendance.sessionId === ALL_SESSION_ID) {
      if (checkedAttendances.some((a) => a.sessionId === ALL_SESSION_ID)) {
        setCheckedAttendances([]);
      } else {
        // setCheckedAttendances([...attendancesWithAll]);
        setCheckedAttendances(
          attendancesWithAll.filter(
            (a) => a.openStatus === CotatoAttendanceWithSessionResponseOpenStatusEnum.Closed,
          ),
        );
      }
    } else {
      if (checkedAttendances.some((a) => a.sessionId === ALL_SESSION_ID)) {
        setCheckedAttendances(
          checkedAttendances.filter(
            (a) => a.sessionId !== ALL_SESSION_ID && a.sessionId !== attendance.sessionId,
          ),
        );
      } else {
        if (checkedAttendances.some((a) => a.sessionId === attendance.sessionId)) {
          setCheckedAttendances(
            checkedAttendances.filter((a) => a.sessionId !== attendance.sessionId),
          );
        } else {
          setCheckedAttendances([...checkedAttendances, attendance]);
        }
      }
    }
  };

  /**
   *
   */
  const handleExportButtonClick = async () => {
    if (checkedAttendances.length === 0 || isExcelExportLoading) {
      return;
    }

    let searchQuery = '';
    if (checkedAttendances.some((a) => a.sessionId === ALL_SESSION_ID)) {
      searchQuery = `?generationId=${generationId}`;
    } else {
      searchQuery = `?attendanceIds=${checkedAttendances.map((a) => a.attendanceId).join(',')}`;
    }

    setIsExcelExportLoading(true);

    try {
      const res = await api.get('v2/api/attendances/records/excel' + searchQuery, {
        responseType: 'blob',
      });

      const contentDisposition = res.headers['content-disposition'];
      const filename = contentDisposition
        ? decodeURIComponent(contentDisposition.split('filename=')[1]).trim().replace(/^"|"$/g, '')
        : 'download.xlsx';

      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsExcelExportLoading(false);
    }
  };

  /**
   *
   */
  const renderExcelExportHeader = () => {
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '0.75rem 1rem',
        }}
      >
        <CotatoIcon icon="grid-solid" />
        <Typography
          sx={{
            fontFamily: 'Ycomputer',
            fontSize: '1.5rem',
            color: theme.colors.common.black,
          }}
        >
          회차 선택
        </Typography>
      </Box>
    );
  };

  /**
   *
   */
  const renderExcelExportBody = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem',
          height: '27rem',
          width: '20rem',
          overflowY: 'auto',
        }}
      >
        {attendancesWithAll.map((attendance) => (
          <Button
            key={attendance.sessionId}
            onClick={() => handleCheckboxChange(attendance)}
            disabled={isDisableExportAttendance(attendance)}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '0.5rem',
                width: '100%',
              }}
            >
              <CheckBox
                checked={checkedAttendances.some((a) => a.sessionId === attendance.sessionId)}
                disabled={isDisableExportAttendance(attendance)}
                sx={{
                  padding: 0,

                  '&.Mui-checked': {
                    color: theme.colors.common.black,
                  },

                  '&.Mui-disabled': {
                    color: theme.colors.gray20,
                  },
                }}
              />
              <Typography
                sx={{
                  fontFamily: 'Ycomputer',
                  fontSize: '1rem',
                  color: isDisableExportAttendance(attendance)
                    ? theme.colors.gray30
                    : theme.colors.common.black,
                }}
              >
                {attendance.sessionTitle}&nbsp;
                {attendance?.sessionDateTime &&
                  `(${dayjs(attendance.sessionDateTime).format('YY.MM.DD')})`}
              </Typography>
            </Box>
          </Button>
        ))}
      </Box>
    );
  };

  const renderExportButton = () => {
    return (
      <Box
        sx={{
          padding: '1.25rem',
        }}
      >
        <Button
          onClick={handleExportButtonClick}
          sx={{
            padding: '0.5rem 1.5rem',
            borderRadius: '6.35rem',
            background: theme.colors.primary100_1,
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Ycomputer',
              fontSize: '0.875rem',
              color: theme.colors.common.white,
            }}
          >
            내보내기
          </Typography>
        </Button>
      </Box>
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '0.5rem',
          background: theme.colors.common.white,
        }}
      >
        {renderExcelExportHeader()}
        <StyledHr />
        {renderExcelExportBody()}
        {renderExportButton()}
      </Box>
    </Modal>
  );
};

export default AttendanceReportExcelExportModal;

//
//
//

const StyledHr = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.colors.gray30};
`;
