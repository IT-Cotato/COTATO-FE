import { TableRenderer } from '@components/Table';
import { Box, TableCell, Typography } from '@mui/material';
import React from 'react';
import styled, { useTheme } from 'styled-components';

//
//
//

const TABLE_HEADS = ['전송시간', '전송자', '전송 수', '전송 상태'];

//
//
//

const MypageRecruitmentManagementContentSendRecord = () => {
  const theme = useTheme();

  const mock = [
    {
      sendTime: 'YYYY.MM.DD. TT',
      senderName: '전송자',
      sendCount: 'NNN',
      sendSuccess: 9999,
      sendFail: 0,
    },
    {
      sendTime: 'YYYY.MM.DD. TT',
      senderName: '전송자',
      sendCount: 'NNN',
      sendSuccess: 0,
      sendFail: 0,
    },
  ];

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
  const tableRender = (data: (typeof mock)[0]) => {
    return (
      <>
        <TableCell>
          <TableCellTypography variant="body1">{data.sendTime}</TableCellTypography>
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
            </StatusBox>{' '}
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
      data={mock}
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
