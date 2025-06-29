import {
  CotatoMemberInfoResponsePositionEnum,
  CotatoGenerationMemberInfoRoleEnum,
} from 'cotato-openapi-clients';

/**
 *
 */
export const getMemberPostionText = (position?: CotatoMemberInfoResponsePositionEnum) => {
  switch (position) {
    case CotatoMemberInfoResponsePositionEnum.Fe:
      return '프론트엔드';
    case CotatoMemberInfoResponsePositionEnum.Be:
      return '백엔드';
    case CotatoMemberInfoResponsePositionEnum.Design:
      return '디자인';
    case CotatoMemberInfoResponsePositionEnum.Pm:
      return '기획자';
    case CotatoMemberInfoResponsePositionEnum.None:
      return '없음';
  }
};

/**
 *
 */
export const getMemberRoleText = (role: CotatoGenerationMemberInfoRoleEnum) => {
  switch (role) {
    case CotatoGenerationMemberInfoRoleEnum.EducationTeam:
      return '교육팀';

    case CotatoGenerationMemberInfoRoleEnum.LeaderTeam:
      return '회장단';

    case CotatoGenerationMemberInfoRoleEnum.MarketingTeam:
      return '홍보팀';

    case CotatoGenerationMemberInfoRoleEnum.Member:
      return '일반부원';

    case CotatoGenerationMemberInfoRoleEnum.OperationSupportTeam:
      return '운영지원팀';

    case CotatoGenerationMemberInfoRoleEnum.PlanningTeam:
      return '기획팀';
  }
};
