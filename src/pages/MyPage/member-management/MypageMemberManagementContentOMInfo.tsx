import React from 'react';
import { Button, Stack } from '@mui/material';
import TableLayout from '@components/Table/TableLayout';
import TableRenderer from '@components/Table/TableRenderer';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useTheme } from 'styled-components';
import { CotatoMemberInfoResponse } from 'cotato-openapi-clients';

//
//
//

interface MypageMemberManagementContentOMInfoProps {
  data: CotatoMemberInfoResponse[];
  transferMemberIdToActive: (memberId: number) => void;
}

//
//
//

const TableCell = TableLayout.TableCell;

//
//
//

const MypageMemberManagementContentOMInfo = ({
  data,
  transferMemberIdToActive,
}: MypageMemberManagementContentOMInfoProps) => {
  const { isLandScapeOrSmaller } = useBreakpoints();

  const sampleHead = ['이름', '역할'];

  const renderTableRenderer = () => {
    const theme = useTheme();
    return (
      <TableRenderer
        data={data}
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
                  onClick={() => transferMemberIdToActive(item.memberId)}
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
