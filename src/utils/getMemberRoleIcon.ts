import AdminIcon from '@/assets/role_admin_icon.svg';
import GeneralIcon from '@/assets/role_general_icon.svg';
import MemberIcon from '@/assets/role_member_icon.svg';
import OldMemberIcon from '@/assets/role_oldMember_icon.svg';
import { MemberRole } from '@/enums';
import {
  CotatoMemberInfoResponseRoleEnum,
  CotatoMemberInfoResponseStatusEnum,
} from 'cotato-openapi-clients';

//
//
//

export const getMemberRoleIcon = (
  roleOrStatus?: MemberRole | CotatoMemberInfoResponseRoleEnum | CotatoMemberInfoResponseStatusEnum,
) => {
  if (!roleOrStatus) {
    return GeneralIcon;
  }
  switch (roleOrStatus) {
    case CotatoMemberInfoResponseStatusEnum.Retired:
      return OldMemberIcon;

    case CotatoMemberInfoResponseStatusEnum.Requested:
      return GeneralIcon;
  }

  switch (MemberRole[roleOrStatus as keyof typeof MemberRole]) {
    case MemberRole.MEMBER:
      return MemberIcon;

    case MemberRole.MANAGER:
      return AdminIcon;

    case MemberRole.ADMIN:
      return AdminIcon;

    default:
      return GeneralIcon;
  }
};
