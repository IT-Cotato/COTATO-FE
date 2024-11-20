/**
 * Member's role for page.
 *
 * - **REFUSED** (`0`) - Refused user.
 * - **GENERAL** (`30`) - Enrolled but not valid authorized user.
 * - **OLD_MEMBER** (`50`) - Previous user.
 * - **MEMBER** (`60`) - Current user.
 * - **OPERATION** (`70`) - 운영지원팀
 * - **EDUCATION** (`90`) - Editable for cs quiz.
 * - **ADMIN** (`120`) - Admin.
 */
export enum MemberRole {
  /** Refused user. */
  REFUSED = 0,
  /** Enrolled but not valid authorized user. */
  GENERAL = 30,
  /** Previous user. */
  OLD_MEMBER = 50,
  /** Current user. */
  MEMBER = 60,
  /** 운영지원팀 */
  OPERATION = 70,
  /** Editable for cs quiz. */
  EDUCATION = 90,
  /** Admin. */
  ADMIN = 120,
}
