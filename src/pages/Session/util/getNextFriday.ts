/**
 * Function: getNextFriday
 * Generates the date that represents the next Friday.
 * @param {numbner} hour - The hour of the day. Defaults to `19` if not provided.
 * @param {number} minute - The minute of the hour. Defaults to `0` if not provided.
 * @returns {date} The date that represents the next Friday.
 */
export const getNextFriday = (hour: number = 19, minute: number = 0): Date => {
  const today = new Date();
  const day = today.getDay();
  const diff = 5 - day;
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + diff);
  nextFriday.setHours(hour, minute, 0, 0);
  return nextFriday;
};
