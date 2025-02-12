import React from 'react';
import { Button, Stack } from '@mui/material';
import TableLayout from '@components/Table/TableLayout';
import TableRenderer from '@components/Table/TableRenderer';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useTheme } from 'styled-components';

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

const MypageMemberManagementContentOMInfo = () => {
  const { isLandScapeOrSmaller } = useBreakpoints();

  const sampleHead = ['이름', '역할'];
  const sampleData = [
    {
      name: 'OM1',
      role: '기자',
    },
    {
      name: 'OM2',
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
    const theme = useTheme();
    return (
      <TableRenderer
        data={sampleData}
        head={sampleHead}
        repeatCount={isLandScapeOrSmaller ? 1 : 2}
        render={(item) => {
          return (
            <>
              <TableCell>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    padding: '1rem 0.75rem',
                    fontSize: theme.fontSize.lg,
                  }}
                >
                  {item?.name}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  sx={{
                    color: theme.colors.common.black,
                    fontFamily: 'YComputer',
                    fontSize: theme.fontSize.lg,
                    backgroundColor: theme.colors.primary20,
                    maxWidth: '8rem',
                  }}
                >
                  부원으로 전환
                </Button>
              </TableCell>
            </>
          );
        }}
      />
    );
  };

  //
  //
  //

  return <Stack>{renderTableRenderer()}</Stack>;
};

export default MypageMemberManagementContentOMInfo;
