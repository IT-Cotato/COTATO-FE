import React, { Dispatch, SetStateAction } from 'react';
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
  memberIds: number[];
  setMemberIds: Dispatch<SetStateAction<number[]>>;
}

//
//
//

const TableCell = TableLayout.TableCell;

const sampleHead = ['이름', '역할'];

//
//
//

const MypageMemberManagementContentMemberInfo = ({
  data,
  updateMemberRole,
  memberIds,
  setMemberIds,
}: MypageMemberManagementContentMemberInfoProps) => {
  const { isLandScapeOrSmaller } = useBreakpoints();

  /**
   *
   */
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
                  <Checkbox
                    checked={memberIds.includes(item.memberId)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setMemberIds((prev) => [...prev, item.memberId]);
                      } else {
                        setMemberIds((prev) =>
                          prev.filter((memberId) => memberId !== item.memberId),
                        );
                      }
                    }}
                  />
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
