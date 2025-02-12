import React from 'react';
import { Checkbox, MenuItem, Select, Stack } from '@mui/material';
import TableLayout from '@components/Table/TableLayout';
import TableRenderer from '@components/Table/TableRenderer';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { MemberRole } from '@/enums';
import { useTheme } from 'styled-components';
import {
  CotatoMemberEnrollInfoResponse,
  CotatoMemberEnrollInfoResponseRoleEnum,
} from 'cotato-openapi-clients';

//
//
//

interface MypageMemberManagementContentMemberInfoProps {
  data: CotatoMemberEnrollInfoResponse[];
}

//
//
//

const TableCell = TableLayout.TableCell;

const getRoleEnum = (role: CotatoMemberEnrollInfoResponseRoleEnum | undefined): MemberRole => {
  switch (role) {
    case 'MANAGER':
      return MemberRole.MANAGER;
    case 'ADMIN':
      return MemberRole.ADMIN;
    case 'DEV':
      return MemberRole.DEV;
    case 'MEMBER':
      return MemberRole.MEMBER;
    default:
      return MemberRole.NOTHING;
  }
};

//
//
//

const MypageMemberManagementContentMemberInfo = ({
  data,
}: MypageMemberManagementContentMemberInfoProps) => {
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
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    fontSize: theme.fontSize.lg,
                  }}
                >
                  <Checkbox />
                  <span style={{ padding: '1rem 0.75rem' }}>{item?.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={getRoleEnum(item?.role)}
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
                  onChange={() => {}}
                >
                  <MenuItem value={MemberRole.DEV}>개발팀</MenuItem>
                  <MenuItem value={MemberRole.ADMIN}>관리자</MenuItem>
                  <MenuItem value={MemberRole.MANAGER}>부관리자</MenuItem>
                  <MenuItem value={MemberRole.MEMBER}>멤버</MenuItem>
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
