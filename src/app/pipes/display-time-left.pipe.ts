import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayTimeLeft'
})
export class DisplayTimeLeftPipe implements PipeTransform {
  pad(timeUnit: number) { 
    return timeUnit < 10 ? '0' + timeUnit : timeUnit; 
  };


  convertToDaysHoursMinutesFormat(milliseconds: number): string {
    const daysInMs = 24 * 60 * 60 * 1000,
        hoursInMs = 60 * 60 * 1000
    let days = Math.floor(milliseconds / daysInMs),
        hours = Math.floor( (milliseconds - days * daysInMs) / hoursInMs),
        minutes = Math.floor( (milliseconds - days * daysInMs - hours * hoursInMs) / 60000)
    if( minutes === 60 ){
      hours++;
      minutes = 0;
    }
    if( hours === 24 ){
      days++;
      hours = 0;
    }
    return `${days}d ${this.pad(hours)}h  ${this.pad(minutes)}m`
  }

  convertToMinutesSecondsFormat(milliseconds: number): string {
    const minutesInMs = 60 * 1000
    let minutes = Math.floor( (milliseconds) / 60000),
        seconds = Math.floor( (milliseconds - minutes * minutesInMs) / 1000)
    return `${this.pad(minutes)}m ${this.pad(seconds)}s`;
  }

  transform(value: number, ...args: unknown[]): unknown {
    if(value >= (60 * 60 * 1000 - 999)){
      return this.convertToDaysHoursMinutesFormat(value);
    } else if (value > 0) {
      return this.convertToMinutesSecondsFormat(value)
    } else {
      return '00m 00s'
    }
  }
}
