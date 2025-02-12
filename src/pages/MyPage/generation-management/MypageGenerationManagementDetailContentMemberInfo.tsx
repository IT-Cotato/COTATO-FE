import React from 'react';
import { Stack, Typography } from '@mui/material';
import TableLayout from '@components/Table/TableLayout';
import TableRenderer from '@components/Table/TableRenderer';
import { useBreakpoints } from '@/hooks/useBreakpoints';

//
//
//

//
//
//

const TableCell = TableLayout.TableCell;

//
//
//

const MypageGenerationManagementDetailContentMemberInfo = () => {
  const { isLandScapeOrSmaller } = useBreakpoints();

  /**
   *
   */
  const renderHeader = () => {
    return (
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">멤버 정보</Typography>
      </Stack>
    );
  };

  const sampleHead = ['이름', '역할'];
  const sampleData = [
    {
      name: '동현',
      role: '기자',
    },
    {
      name: '에릭',
      role: '개발자',
    },
    {
      name: '치지',
      role: '기획자',
    },
    {
      name: '영훈',
      role: '기획자',
    },
    {
      name: '제훈',
      role: '기획자',
    },
    {
      name: '제니',
      role: '디자이너',
    },
  ];

  const renderTableRenderer = () => {
    return (
      <TableRenderer
        data={sampleData}
        head={sampleHead}
        repeatCount={isLandScapeOrSmaller ? 1 : 2}
        render={(item) => {
          return (
            <>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.role}</TableCell>
            </>
          );
        }}
      />
    );
  };

  //
  //
  //

  return (
    <Stack>
      {renderHeader()}
      {renderTableRenderer()}
    </Stack>
  );
};

export default MypageGenerationManagementDetailContentMemberInfo;
