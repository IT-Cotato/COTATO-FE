/**
 * Member's role for page.
 *
 * - **NOTHING** (`0`) - Not a member.
 * - **MEMBER** (`10`) - Current user.
 * - **MANAGER** (`20`) - Can Manage CS Quiz, attendance
 * - **ADMIN** (`30`) - Admin.
 * - **DEV** (`40`) - FOR COTATO DEVELOPERS
 */
export enum MemberRole {
  /** Not a member. */
  NOTHING = 0,
  /** Common user. */
  MEMBER = 10,
  /** Can Manage CS Quiz, attendance */
  MANAGER = 20,
  /** Admin. */
  ADMIN = 30,
  /** FOR COTATO DEVELOPERS */
  DEV = 40,
}
