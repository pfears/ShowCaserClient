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
    TrainingMachine: boolean;
    Map: {
      id: string;
      summary_polyline: string;
      resource_state: number;
    };
    Splits: any[]; //Returned from DetailedActivity
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
    TrainingMachine: boolean;
    Map: { id: string; summary_polyline: string; resource_state: number; };
    DecodedMap: { xCord: number; yCord: number }[];
    Splits: any[];
  
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
      this.TrainingMachine = data.trainer === 1 ? true : false;
      this.Map = data.map;
      this.DecodedMap = data.trainer == 0 ? this.decodePolyline(data.map.summary_polyline) : [];
      this.Splits = data.splits_metric;
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

    decodePolyline(encoded: string): { xCord: number; yCord: number }[] {
      let index = 0;
      const len = encoded.length;
      let lat = 0;
      let lng = 0;
      const coordinates: { xCord: number; yCord: number }[] = [];
    
      while (index < len) {
        let result = 0;
        let shift = 0;
        let b: number;
    
        // Decode latitude
        do {
          b = encoded.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);
        const deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += deltaLat;
    
        // Decode longitude
        result = 0;
        shift = 0;
        do {
          b = encoded.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);
        const deltaLng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += deltaLng;
    
        coordinates.push({
          xCord: lat / 1e5,
          yCord: lng / 1e5
        });
      }
    
      return coordinates;
    }

  }