import { MemberRole } from '@/enums';
import { CotatoMemberInfoResponseRoleEnum } from 'cotato-openapi-clients';

export const checkIsAtLeastAdmin = (role: CotatoMemberInfoResponseRoleEnum | undefined) => {
  if (!role) {
    return false;
  }

  return Number(MemberRole[role]) >= MemberRole.ADMIN;
};

export const checkIsAtLeastManager = (role: CotatoMemberInfoResponseRoleEnum | undefined) => {
  if (!role) {
    return false;
  }

  return Number(MemberRole[role]) >= MemberRole.MANAGER;
};

export const checkIsUnderAdmin = (role: CotatoMemberInfoResponseRoleEnum | undefined) => {
  if (!role) {
    return false;
  }

  return Number(MemberRole[role]) < MemberRole.ADMIN;
};

export const checkIsUnderManager = (role: CotatoMemberInfoResponseRoleEnum | undefined) => {
  if (!role) {
    return false;
  }

  return Number(MemberRole[role]) < MemberRole.MANAGER;
};

export const checkIsAtLeastMember = (role: CotatoMemberInfoResponseRoleEnum | undefined) => {
  if (!role) {
    return false;
  }

  return Number(MemberRole[role]) >= MemberRole.MEMBER;
};
