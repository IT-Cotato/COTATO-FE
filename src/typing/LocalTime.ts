import { CotatoLocalTime } from 'cotato-openapi-clients';

/**
 *
 */
export default class LocalTime implements CotatoLocalTime {
  hour: number;
  minute: number;
  second: number;
  nano: number;

  /**
   * @param {string} timeString
   */
  constructor(timeString: string) {
    const [hour, minute, second] = timeString.split(':').map(Number);

    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.nano = 0;
  }

  /**
   * @returns {string}
   */
  getTimeString() {
    const numToString = (num: number) => {
      return num.toString().padStart(2, '0');
    };

    return `${numToString(this.hour)}:${numToString(this.minute)}:${numToString(this.second)}`;
  }
}
