import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayTimeLeft'
})
export class DisplayTimeLeftPipe implements PipeTransform {

  public static readonly DAYS_IN_MS = 24 * 60 * 60 * 1000;
  public static readonly HOURS_IN_MS = 60 * 60 * 1000;
  public static readonly MINUTES_IN_MS = 60 * 1000;

  public pad(timeUnit: number): string {
    return timeUnit < 10 ? '0' + timeUnit : '' + timeUnit;
  }

  public getDays(milliseconds: number): number {
    return Math.floor(milliseconds / DisplayTimeLeftPipe.DAYS_IN_MS);
  }

  public getHours(milliseconds: number, days?: number): number {
    const daysMS = (days ?? this.getDays(milliseconds)) * DisplayTimeLeftPipe.DAYS_IN_MS;
    return Math.floor((milliseconds - daysMS) / DisplayTimeLeftPipe.HOURS_IN_MS);
  }

  public getMinutes(milliseconds: number, days?: number, hours?: number): number {
    const daysMS = (days ?? this.getDays(milliseconds)) * DisplayTimeLeftPipe.DAYS_IN_MS;
    const hoursMS = (hours ?? this.getHours(milliseconds, days)) * DisplayTimeLeftPipe.HOURS_IN_MS;
    return Math.floor((milliseconds - daysMS - hoursMS) / DisplayTimeLeftPipe.MINUTES_IN_MS);
  }

  public getSeconds(milliseconds: number, days?: number, hours?: number, minutes?: number): number {
    const daysMS = (days ?? this.getDays(milliseconds)) * DisplayTimeLeftPipe.DAYS_IN_MS;
    const hoursMS = (hours ?? this.getHours(milliseconds, days)) * DisplayTimeLeftPipe.HOURS_IN_MS;
    const minutesMS = (minutes ?? this.getMinutes(milliseconds, days, minutes)) * DisplayTimeLeftPipe.MINUTES_IN_MS;
    return Math.floor((milliseconds - daysMS - hoursMS - minutesMS) / 1000);
  }

  convert(milliseconds: number): string {
    const days = this.getDays(milliseconds);
    const hours = this.getHours(milliseconds, days);
    const minutes = this.getMinutes(milliseconds, days, hours);
    const seconds = this.getSeconds(milliseconds, days, hours, minutes);

    let result = '';
    if (days > 0) {
      result += ` ${days}d`;
    }
    if (hours > 0) {
      result += ` ${hours}h`;
    }
    if (minutes > 0) {
      result += ` ${minutes}m`;
    }
    if (days === 0 && hours === 0) {
      result += ` ${seconds}s`;
    }

    return result;
  }

  transform(value: number, ...args: unknown[]): string {
    return this.convert(value);
  }
}
