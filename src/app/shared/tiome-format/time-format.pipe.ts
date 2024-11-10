import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    let formattedDate: string;
    if (diff < 60000) {
      // Less than 1 minute ago
      formattedDate = '1s ago';
    } else if (diff < 3600000) {
      // Less than 1 hour ago
      const minutes = Math.floor(diff / 60000);
      formattedDate = `${minutes}m ago`;
    } else if (diff < 86400000) {
      // Less than 1 day ago
      const hours = Math.floor(diff / 3600000);
      formattedDate = `${hours}h ago`;
    } else if (diff < 2592000000) {
      // Less than 1 month ago
      const days = Math.floor(diff / 86400000);
      formattedDate = `${days}d ago`;
    } else {
      // More than 1 month ago
      const options: Intl.DateTimeFormatOptions = { 
        // weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric'
      };
      formattedDate = date.toLocaleDateString('en-US', options);
    }

    return formattedDate;
  }
}