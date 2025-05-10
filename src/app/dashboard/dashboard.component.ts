// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { StravaService } from '../StravaService/strava.service';
import { AthleteComponent } from '../athlete/athlete.component';
import { AthleteStatsComponent } from "../athlete-stats/athlete-stats.component";
import { NgFor, NgIf } from '@angular/common';
import { Athlete } from '../athlete/athlete.model';
import { filter, forkJoin } from 'rxjs';
import { Weather } from '../weather-forecast/weather.model';
import { WeatherForecastService } from '../weather-forecast/weather-forecast.service';
import { AllTimeStats, AthleteStats, YtdStats } from '../athlete-stats/athlete-stats.model';
import { TopPerformancesComponent } from "../top-performances/top-performances.component";
import { Activity } from '../activity/activity.model';
import { mapListToClass } from '../Helpers/map-to-class';
import { ActivityComponent } from '../activity/activity.component';
import { Gear } from '../gear/gear.model';
import { GearComponent } from "../gear/gear.component";
import { MonthlyStatsComponent } from "../monthly-stats/monthly-stats.component";
import { MonthlyStats, mapToMonthlyStats } from '../monthly-stats/monthly-stats.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [AthleteComponent, AthleteStatsComponent, NgIf, TopPerformancesComponent, ActivityComponent, NgFor, GearComponent, MonthlyStatsComponent],
})
export class DashboardComponent implements OnInit {

  athlete!: Athlete
  weatherData!: Weather;
  athleteStats!: AthleteStats;
  activities!: Activity[];
  tenMostRecentRuns!: Activity[];
  PastYearMonthlyStats!: MonthlyStats[];
  gear!: Gear[];

  init: boolean = false;

  constructor(
    private stravaService: StravaService,
    private weatherService: WeatherForecastService,
  ) {}

  ngOnInit(): void {
    console.log("Dashboard Loaded, Authentication Complete");
    this.LoadInitialData();
  }

  LoadInitialData() {
    forkJoin({
      athlete: this.stravaService.getAthlete(),
      weatherData: this.weatherService.getWeatherWithLocation(),
      activities: this.stravaService.getAllActivities()
    }).subscribe({
      next: ({ athlete, weatherData, activities }: { athlete: Athlete; weatherData: Weather; activities: Activity[] }) => {
        this.athlete = athlete;
        this.weatherData = weatherData;
        this.activities = mapListToClass(Activity, activities);
        this.PastYearMonthlyStats = mapToMonthlyStats(this.activities);
        const distinctGearIds = [...new Set(this.activities.map(item => item.GearId).filter((id): id is string => id != null))];
        forkJoin({
          gearData: this.stravaService.getGearList(distinctGearIds),
          athleteStats: this.stravaService.getAthleteStats(athlete.id)
        }).subscribe({
          next: ({ gearData, athleteStats }) => {
            this.gear = mapListToClass(Gear, gearData);
            this.athleteStats = new AthleteStats({
              AllTimeStats: new AllTimeStats(athleteStats.all_run_totals),
              YtdStats: new YtdStats(athleteStats.ytd_run_totals),
            });
            this.tenMostRecentRuns = mapListToClass(Activity, activities.slice(0, 10));
            this.init = true;
            console.log(this.athlete);
            console.log(this.weatherData);
            console.log(this.activities);
            console.log(this.athleteStats);
            console.log(this.tenMostRecentRuns);
            console.log(this.PastYearMonthlyStats);
            console.log(this.gear);
            
          },
          error: (err: any) => {
            console.error('Error loading data', err);
          }
        });
      },
      error: (err: any) => {
        console.error('Failed loading athlete or weather data', err);
      }
    });
  }
}