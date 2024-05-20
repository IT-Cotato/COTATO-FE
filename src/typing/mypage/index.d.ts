export interface HallOfFameInfo {
  memberId: number;
  name: string;
  count: number;
}

export interface MyHallOfFameInfo {
  memberId: number;
  scorerCount: number;
  answerCount: number;
}

/**
 * @api {get} /v1/api/mypage/hall-of-fame?generationNumber={generationNumber}
 */
export interface GetV1ApiMypageHallOfFameResponse {
  scorerInfo: HallOfFameInfo[];
  answerInfo: HallOfFameInfo[];
  myInfo: MyHallOfFameInfo;
}

/**
 * @api {get} /v1/mypage/info
 */
export interface GetV1ApiMypageInfo {
  memberId: number;
  memberName: string;
  phoneNumber: string;
  generationNumber: number;
  memberRole: string;
  memberPosition: string;
}
