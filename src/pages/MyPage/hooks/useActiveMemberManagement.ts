import {
  CotatoMemberEnrollInfoResponse,
  CotatoMemberEnrollInfoResponseRoleEnum,
} from 'cotato-openapi-clients';
import { useState } from 'react';

export const useActiveMemberManagement = () => {
  const [activeMembers, setActiveMembers] = useState<CotatoMemberEnrollInfoResponse[]>([]);
  return {
    activeMembers: dummyMemberData,
    updateMemberRole: (memberId: number, newRole: CotatoMemberEnrollInfoResponseRoleEnum) => {},
    transferToOM: (memberId: number) => {},
  };
};

const dummyMemberData: CotatoMemberEnrollInfoResponse[] = [
  {
    memberId: 1,
    name: '김코타',
    position: 'FE',
    generationNumber: 3,
    role: 'ADMIN',
  },
  {
    memberId: 2,
    name: '이토타',
    position: 'BE',
    generationNumber: 3,
    role: 'MEMBER',
  },
  {
    memberId: 3,
    name: '박개발',
    position: 'BE',
    generationNumber: 2,
    role: 'MANAGER',
  },
  {
    memberId: 4,
    name: '정디자',
    position: 'PM',
    generationNumber: 2,
    role: 'MEMBER',
  },
  {
    memberId: 5,
    name: '최코딩',
    position: 'NONE',
    generationNumber: 3,
    role: 'DEV',
  },
  {
    memberId: 6,
    name: '황기획',
    position: 'FE',
    generationNumber: 2,
    role: 'MEMBER',
  },
];
