import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(endDate: Date|string, startDate?: Date|string): string {
    startDate = this.ensureDate(startDate);
    endDate = this.ensureDate(endDate);
    const difference = Math.abs(endDate.getTime() - startDate.getTime());
    return difference.toString();
  }

  protected ensureDate(date: Date|string): Date {
    date = date ?? new Date();
    return typeof date === "string" ? new Date(date) : date;
  }
}
