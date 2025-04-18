import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime'
})
export class SecondsToTimePipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value) || value < 0) {
      return 'Error'; // Return default if input is invalid
    }

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;
    
    //if seconds is 0 then we know to return TBD
    if(seconds == 0){
      return 'TBD';
    }

    if (hours > 0){
        return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    }
    else {
        return `${this.pad(minutes)}:${this.pad(seconds)}`
    }
    
  }

  // Helper function to ensure 2-digit format
  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}