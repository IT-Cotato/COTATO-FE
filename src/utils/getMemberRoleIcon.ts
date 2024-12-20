import { MemberData } from '@/typing/db';
import AdminIcon from '@/assets/role_admin_icon.svg';
import GeneralIcon from '@/assets/role_general_icon.svg';
import MemberIcon from '@/assets/role_member_icon.svg';
import OldMemberIcon from '@/assets/role_oldMember_icon.svg';

//
//
//

export type memberRoleType = Pick<MemberData, 'role'>;

//
//
//

export const getMemberRoleIcon = (role?: memberRoleType['role']) => {
  switch (role) {
    case 'REFUSED':
      return GeneralIcon;
    case 'GENERAL':
      return GeneralIcon;
    case 'OLD_MEMBER':
      return OldMemberIcon;
    case 'MEMBER':
      return MemberIcon;
    case 'OPERATION':
      return AdminIcon;
    case 'EDUCATION':
      return AdminIcon;
    case 'ADMIN':
      return AdminIcon;
    case undefined:
      return GeneralIcon;
    default:
      return GeneralIcon;
  }
};
