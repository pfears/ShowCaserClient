import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyFullDate',
  standalone: true
})
export class PrettyFullDatePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const date = new Date(value);

    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    const getOrdinalSuffix = (n: number): string => {
      if (n >= 11 && n <= 13) return 'th';
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const formattedDay = `${day}${getOrdinalSuffix(day)}`;

    const tzAbbrev = date.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ').pop();

    return `${month} ${formattedDay}, ${year} (${tzAbbrev})`;
  }
}