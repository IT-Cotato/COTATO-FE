import React from 'react';
import { Checkbox, MenuItem, Select, Stack } from '@mui/material';
import TableLayout from '@components/Table/TableLayout';
import TableRenderer from '@components/Table/TableRenderer';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { MemberRole } from '@/enums';
import { useTheme } from 'styled-components';

//
//
//

//
//
//

const TableCell = TableLayout.TableCell;

const getRoleEnum = (role: string): MemberRole => {
  switch (role.toUpperCase()) {
    case 'MANAGER':
      return MemberRole.MANAGER;
    case 'ADMIN':
      return MemberRole.ADMIN;
    case 'DEV':
      return MemberRole.DEV;
    default:
      return MemberRole.MEMBER;
  }
};

//
//
//

const MypageMemberManagementContentMemberInfo = () => {
  const { isLandScapeOrSmaller } = useBreakpoints();

  const sampleHead = ['이름', '역할'];
  const sampleData = [
    {
      name: '동현',
      role: '기자',
    },
    {
      name: '에릭',
      role: 'MANAGER',
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
