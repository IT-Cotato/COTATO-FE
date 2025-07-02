import { TableRenderer } from '@components/Table';
import { Box, TableCell, Typography } from '@mui/material';
import fetcher from '@utils/fetcher';
import { CotatoRecruitmentNotificationLogResponse } from 'cotato-openapi-clients';
import dayjs from 'dayjs';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import useSWR from 'swr';

//
//
//

const TABLE_HEADS = ['전송시간', '전송자', '전송 수', '전송 상태'];

//
//
//

const MypageRecruitmentManagementContentSendRecord = () => {
  const { data: recruitmentNotificationLogs } = useSWR(
    '/v2/api/recruitments/notifications/logs',
    fetcher,
  );

  const theme = useTheme();

  const sendLogs = (recruitmentNotificationLogs?.notificationLogs ||
    []) as CotatoRecruitmentNotificationLogResponse[];

  /**
   *
   */
  const tableHeadRender = (head: string) => {
    return (
      <Typography
        variant="subtitle2"
        sx={{
          fontFamily: 'Ycomputer',
          fontWeight: 400,
        }}
      >
        {head}
      </Typography>
    );
  };

  /**
   *
   */
  const tableRender = (data: CotatoRecruitmentNotificationLogResponse) => {
    return (
      <>
        <TableCell>
          <TableCellTypography variant="body1">
            {dayjs(data.sendTime).format('YYYY.MM.DD. HH:mm')}
          </TableCellTypography>
        </TableCell>
        <TableCell>
          <TableCellTypography variant="body1">{data.senderName}</TableCellTypography>
        </TableCell>
        <TableCell>
          <TableCellTypography variant="body1">{data.sendCount}</TableCellTypography>
        </TableCell>
        <TableCell>
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
            }}
          >
            <StatusBox
              sx={{
                borderColor: theme.colors.sub3[80],
                backgroundColor: theme.colors.sub3[60],
              }}
            >
              <TableCellTypography variant="body1">성공: {data.sendSuccess}</TableCellTypography>
            </StatusBox>
            <StatusBox
              sx={{
                borderColor: theme.colors.secondary100,
                backgroundColor: theme.colors.secondary80,
              }}
            >
              <TableCellTypography variant="body1">실패: {data.sendFail}</TableCellTypography>
            </StatusBox>
          </Box>
        </TableCell>
      </>
    );
  };

  return (
    <TableRenderer
      repeatCount={1}
      data={sendLogs}
      head={TABLE_HEADS.map(tableHeadRender)}
      render={tableRender}
      slotProps={{
        emptyResult: {
          text: '전송 기록이 없습니다.',
        },
      }}
    />
  );
};

//
//
//

const StatusBox = styled(Box)`
  padding: 1rem 0.75rem;
  border-radius: 0.25rem;
  border-width: 1px;
  border-style: solid;
  width: 7rem;
  color: ${({ theme }) => theme.colors.common.white};
`;

const TableCellTypography = styled(Typography)`
  font-family: 'Ycomputer';
  text-align: center;
`;

export default MypageRecruitmentManagementContentSendRecord;
