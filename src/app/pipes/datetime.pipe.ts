import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  public static readonly MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  transform(date: Date | string): string {
    date = this.ensureDate(date);

    let dateString;
    if (this.isToday(date)) {
      dateString = "Today";
    } else if (this.isTomorrow(date)) {
      dateString = "Tomorrow";
    } else {
      dateString = `${date.getDate()}. ${this.getMonthName(date)}`;
    }

    return `${date.getHours()}:${date.getMinutes()}, ${dateString}`;
  }

  protected isToday(date: Date) {
    return this.isSameDay(new Date(), date);
  }

  protected isTomorrow(date: Date) {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return this.isSameDay(tomorrow, date);
  }

  protected isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  protected getMonthName(date: Date): string {
    return DatetimePipe.MONTH_NAMES[date.getMonth()];
  }

  protected getShortMonthName(date: Date) {
    return this.getMonthName(date).substr(0, 3);
  }

  protected ensureDate(date: Date|string): Date {
    date = date ?? new Date();
    return typeof date === "string" ? new Date(date) : date;
  }
}
