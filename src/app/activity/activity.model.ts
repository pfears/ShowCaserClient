export interface IActivity {
    ActivityId: number;
    ActivityName: string;
    ActivityType: string;
    StartDateTimeLocal: string;
    Timezone: string;
    Distance: number; // In Miles
    MovingTime: number; // In seconds
    AverageSpeed: number; // in MPH
    MaxSpeed: number; // In MPH
    AveragePace: string; // Time Per Mile (Calculated)
    MaxPace: string; // Time Per Mile (Calculated)
    ElevationGain: number; // In feet
    Map: {
      id: string;
      summary_polyline: string;
      resource_state: number;
    };
    //Splits: any[]; //This may contain what I need to top performances
  }

export class Activity implements IActivity {
   
    ActivityId: number;
    ActivityName: string;
    ActivityType: string;
    StartDateTimeLocal: string;
    Timezone: string;
    Distance: number;
    MovingTime: number;
    AverageSpeed: number;
    MaxSpeed: number;
    AveragePace: string; // Time Per Mile (Calculated)
    MaxPace: string;
    ElevationGain: number;
    Map: { id: string; summary_polyline: string; resource_state: number; };
    //Splits: any[];
  
    constructor(data: any) {
      this.ActivityId = data.id;
      this.ActivityName = data.name;
      this.ActivityType = data.type;
      this.StartDateTimeLocal = data.start_date_local;
      this.Timezone = data.timezone;
      this.Distance = this.getMilesFromMeters(data.distance);
      this.MovingTime = data.moving_time;
      this.AverageSpeed = this.getSpeedMph(data.average_speed);
      this.MaxSpeed = this.getSpeedMph(data.max_speed);
      this.AveragePace = this.convertSpeedToMileTime(data.average_speed); // Time Per Mile (Calculated)
      this.MaxPace = this.convertSpeedToMileTime(data.max_speed);
      this.ElevationGain = this.getFeetFromMeters(data.total_elevation_gain);
      this.Map = data.map;
      //this.Splits = data.splits_metric;
    }

    convertSpeedToMileTime(metersPerSecond: number): string {
      const metersInMile = 1609.34;
      const seconds = metersInMile / metersPerSecond;
    
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.round(seconds % 60);
    
      const paddedSeconds = remainingSeconds.toString().padStart(2, '0');
      return `${minutes}:${paddedSeconds}`;
    }

    getFeetFromMeters(meters: number): number{
      return Math.round(meters*3.281)
    }

    getMilesFromMeters(meters: number): number {
      return Math.round(meters/1609 * 100)/100; // Convert from Meters to Miles (2 decimal Places)
    }
  
    // Convert average speed to miles per hour (mph)
    getSpeedMph(speed: number): number {
      return Math.round(speed * 2.23694 * 100) / 100;; // Convert meters/second to miles per hour (2 decimal places)
    }
  }