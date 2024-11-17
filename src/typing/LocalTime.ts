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
   * @param {string | Date} [input] - "HH:MM:SS" 형식의 시간 문자열 또는 Date 객체 (옵션)
   */
  constructor(input?: string | Date) {
    if (typeof input === 'string') {
      const [hour, minute, second] = input.split(':').map(Number);

      if (
        isNaN(hour) ||
        isNaN(minute) ||
        isNaN(second) ||
        hour < 0 ||
        hour > 23 ||
        minute < 0 ||
        minute > 59 ||
        second < 0 ||
        second > 59
      ) {
        throw new Error("Invalid time format. Expected 'HH:MM:SS'");
      }

      this.hour = hour;
      this.minute = minute;
      this.second = second;
    } else if (input instanceof Date) {
      this.hour = input.getHours();
      this.minute = input.getMinutes();
      this.second = input.getSeconds();
    } else {
      const now = new Date();

      this.hour = now.getHours();
      this.minute = now.getMinutes();
      this.second = now.getSeconds();
    }

    this.nano = 0;
  }

  /**
   *
   * @returns {string}
   */
  getTimeString(): string {
    const numToString = (num: number) => {
      return num.toString().padStart(2, '0');
    };

    return `${numToString(this.hour)}:${numToString(this.minute)}:${numToString(this.second)}`;
  }

  /**
   *
   * @returns {Date}
   */
  getDate(): Date {
    const now = new Date();

    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      this.hour,
      this.minute,
      this.second,
    );
  }
}
