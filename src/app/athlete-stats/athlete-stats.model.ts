export interface IStatsTotal {
    Count: number,
    Distance: number,
    Time: number,
    Elevation: number
  }
  
  class Stats implements IStatsTotal {
    Count: number;
    Distance: number;
    Time: number;
    Elevation: number;
  
    constructor(data: any) { 
      this.Count = data.count;
      this.Distance = this.KilometersToMiles(this.MetersToKiloMeters(data.distance)); // If you want KM remove the outer method
      this.Time = this.CleanTime(data.moving_time);
      this.Elevation = this.MetersToFeet(data.elevation_gain)
    }
    // returns the the hours from the seconds
    private CleanTime(seconds: number): number {
        return Math.round(seconds/3600);
    }
    private MetersToKiloMeters(meters: number): number{
        return Math.round(meters/1000);
    }
    private KilometersToMiles(km: number): number{
        return Math.round(km/1.609);
    }
    private MetersToFeet(meters: number): number{
        return Math.round(meters*3.281);
    }
}

export class AllTimeStats extends Stats {
    constructor(data: any) {
        super(data);
    }
}

export class YtdStats extends Stats {
    constructor(data: any) {
        super(data);
    }
}

export interface IAthleteStats {
    AllTimeStats: AllTimeStats,
    YtdStats: YtdStats
  }
  
export class AthleteStats implements IAthleteStats {
    AllTimeStats: AllTimeStats;
    YtdStats: YtdStats;

    constructor(data: any) { 
        this.AllTimeStats = data.AllTimeStats;
        this.YtdStats = data.YtdStats;
    }
}