// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { StravaService } from '../StravaService/strava.service';
import { Router } from '@angular/router';
import { AthleteComponent } from '../athlete/athlete.component';
import { AthleteStatsComponent } from "../athlete-stats/athlete-stats.component";
import { NgIf } from '@angular/common';
import { Athlete } from '../athlete/athlete.model';
import { forkJoin } from 'rxjs';
import { Weather } from '../weather-forecast/weather.model';
import { WeatherForecastService } from '../weather-forecast/weather-forecast.service';
import { AllTimeStats, AthleteStats, YtdStats } from '../athlete-stats/athlete-stats.model';
import { TopPerformancesComponent } from "../top-performances/top-performances.component";
import { Activity } from '../activity/activity.model';
import { mapListToClass } from '../Helpers/map-to-class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [AthleteComponent, AthleteStatsComponent, NgIf, TopPerformancesComponent],
})
export class DashboardComponent implements OnInit {

  athlete!: Athlete
  weatherData!: Weather;
  athleteStats!: AthleteStats;
  activities!: Activity[];

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

        // Now that athlete is available, get stats
        this.stravaService.getAthleteStats(athlete.id).subscribe({
          next: (athleteStats: { all_run_totals: any; ytd_run_totals: any }) => {
            this.athleteStats = new AthleteStats({
              AllTimeStats: new AllTimeStats(athleteStats.all_run_totals),
              YtdStats: new YtdStats(athleteStats.ytd_run_totals),
            });
  
            // Now everything is ready
            this.init = true;
            console.log(this.athlete);
            console.log(this.weatherData);
            console.log(this.activities);
            console.log(this.athleteStats);
          },
          error: (err: any) => {
            console.error('Error loading stats', err);
          }
        });
      },
      error: (err: any) => {
        console.error('Failed loading athlete or weather data', err);
      }
    });
  }
}