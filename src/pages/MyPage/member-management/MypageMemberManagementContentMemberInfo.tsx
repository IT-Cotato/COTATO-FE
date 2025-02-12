import React, { useState } from 'react';
import { Checkbox, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import TableLayout from '@components/Table/TableLayout';
import TableRenderer from '@components/Table/TableRenderer';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useTheme } from 'styled-components';
import { CotatoMemberInfoResponse, CotatoMemberInfoResponseRoleEnum } from 'cotato-openapi-clients';

//
//
//

interface MypageMemberManagementContentMemberInfoProps {
  data: CotatoMemberInfoResponse[];
  updateMemberRole: (memberId: number, newRole: CotatoMemberInfoResponseRoleEnum) => void;
}

//
//
//

const TableCell = TableLayout.TableCell;

//
//
//

const MypageMemberManagementContentMemberInfo = ({
  data,
  updateMemberRole,
}: MypageMemberManagementContentMemberInfoProps) => {
  const { isLandScapeOrSmaller } = useBreakpoints();
  const [memberIds, setMemberIds] = useState<number[]>([]);

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
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    fontSize: theme.fontSize.lg,
                  }}
                >
                  <Checkbox />
                  <span style={{ padding: '1rem 0.75rem' }}>{item.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={item.role}
                  size="small"
                  sx={{
                    fontFamily: 'YComputer',
                    fontSize: theme.fontSize.lg,
                    backgroundColor: theme.colors.primary20,
                    maxWidth: '8rem',
                  }}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                  fullWidth
                  onChange={(e: SelectChangeEvent) => {
                    updateMemberRole(
                      item.memberId,
                      e.target.value as CotatoMemberInfoResponseRoleEnum,
                    );
                  }}
                >
                  <MenuItem value={CotatoMemberInfoResponseRoleEnum.Dev}>개발팀</MenuItem>
                  <MenuItem value={CotatoMemberInfoResponseRoleEnum.Admin}>관리자</MenuItem>
                  <MenuItem value={CotatoMemberInfoResponseRoleEnum.Manager}>부관리자</MenuItem>
                  <MenuItem value={CotatoMemberInfoResponseRoleEnum.Member}>멤버</MenuItem>
                </Select>
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

export default MypageMemberManagementContentMemberInfo;
