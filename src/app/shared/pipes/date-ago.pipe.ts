import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateAgo' })
export class DateAgoPipe implements PipeTransform {

  transform(date: Date | number): number | Date | string {
    if (date) {
      const seconds = Math.floor((+new Date() - +new Date(date)) / 1000);
      if (seconds < 29) return 'Just now'; // less than 30 seconds ago
      const intervals: {[key: string]: number} = {
        'year': 31536000,
        'month': 2592000,
        'week': 604800,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) return counter + ' ' + i + ' ago'; // singular (1 day ago)
          else return counter + ' ' + i + 's ago'; // plural (2 days ago)
        }
      }
    }
    return date;
  }

}
