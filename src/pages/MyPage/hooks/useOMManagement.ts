import { CotatoMemberEnrollInfoResponse } from 'cotato-openapi-clients';
import { useState } from 'react';

export const useOMManagement = () => {
  const [OMMembers, setOMMembers] = useState<CotatoMemberEnrollInfoResponse[]>([]);

  return {
    OMMembers: dummyMemberData,
    searchOM: (keyword: string) => {},
    transferToActive: (memberId: number) => {},
  };
};

const dummyMemberData: CotatoMemberEnrollInfoResponse[] = [
  {
    memberId: 1,
    name: '김코타OM',
    position: 'NONE',
    generationNumber: 3,
    role: 'MEMBER',
  },
  {
    memberId: 2,
    name: '이토타OM',
    position: 'NONE',
    generationNumber: 3,
    role: 'MEMBER',
  },
  {
    memberId: 3,
    name: '박개발OM',
    position: 'NONE',
    generationNumber: 2,
    role: 'MEMBER',
  },
  {
    memberId: 4,
    name: '정디자',
    position: 'NONE',
    generationNumber: 2,
    role: 'MEMBER',
  },
  {
    memberId: 5,
    name: '최코딩',
    position: 'NONE',
    generationNumber: 3,
    role: 'MEMBER',
  },
  {
    memberId: 6,
    name: '황기획',
    position: 'NONE',
    generationNumber: 2,
    role: 'MEMBER',
  },
];
