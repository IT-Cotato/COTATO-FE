import { IEnrollMember } from '@/typing/db';

/**
 * sort enrolled members by generation number and member name
 * @param members
 * @returns IEnrollMember[] | undefined
 */
const sortEnrollMembers = (members?: IEnrollMember[]): IEnrollMember[] | undefined => {
  members?.sort((left, right) => {
    if (left.generationNumber !== right.generationNumber) {
      return left.generationNumber - right.generationNumber;
    }
    return left.name.localeCompare(right.name);
  });
  return members;
};

export default sortEnrollMembers;
