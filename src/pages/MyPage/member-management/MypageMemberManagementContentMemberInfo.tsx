import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Checkbox, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import TableLayout from '@components/Table/TableLayout';
import TableRenderer from '@components/Table/TableRenderer';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useTheme } from 'styled-components';
import { CotatoMemberResponse, CotatoMemberInfoResponseRoleEnum } from 'cotato-openapi-clients';

//
//
//

interface MypageMemberManagementContentMemberInfoProps {
  data: CotatoMemberResponse[];
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

/**
 *
 */
const getPosition = (position?: string) => {
  switch (position) {
    case '포지션':
      return null;
    case 'PM':
      return '기획자';
    case 'DESIGN':
      return '디자이너';
    case 'BE':
      return '백엔드';
    case 'FE':
      return '프론트엔드';
  }
};

const MypageMemberManagementContentMemberInfo = ({
  data,
  updateMemberRole,
  memberIds,
  setMemberIds,
}: MypageMemberManagementContentMemberInfoProps) => {
  const { isLandScapeOrSmaller } = useBreakpoints();
  const [localRoles, setLocalRoles] = useState<{ [key: number]: CotatoMemberInfoResponseRoleEnum }>(
    {},
  );

  /**
   *
   */
  useEffect(() => {
    const roles: { [key: number]: CotatoMemberInfoResponseRoleEnum } = {};
    data.forEach((item) => {
      if (item.role) {
        roles[item.memberId] = item.role as CotatoMemberInfoResponseRoleEnum;
      }
    });
    setLocalRoles(roles);
  }, [data]);

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
                    disabled={item.role === CotatoMemberInfoResponseRoleEnum.Dev}
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
                  <span style={{ padding: '1rem 0.75rem' }}>
                    {item.passedGenerationNumber + '기 '}
                    {item.name + ' '}
                    {getPosition(item.position)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Select
                  disabled={item.role === CotatoMemberInfoResponseRoleEnum.Dev}
                  value={
                    localRoles[item.memberId] || (item.role as CotatoMemberInfoResponseRoleEnum)
                  }
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
                    const newRole = e.target.value as CotatoMemberInfoResponseRoleEnum;
                    setLocalRoles((prev) => ({
                      ...prev,
                      [item.memberId]: newRole,
                    }));

                    if (newRole === CotatoMemberInfoResponseRoleEnum.Dev) {
                      if (window.confirm('정말 개발팀으로 변경하시겠습니까?')) {
                        updateMemberRole(item.memberId, newRole);
                      } else {
                        // 취소시 원래 값으로 되돌리기
                        setLocalRoles((prev) => ({
                          ...prev,
                          [item.memberId]: item.role as CotatoMemberInfoResponseRoleEnum,
                        }));
                      }
                    } else {
                      updateMemberRole(item.memberId, newRole);
                    }
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
