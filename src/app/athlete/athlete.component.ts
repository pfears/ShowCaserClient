import { Component, OnInit } from '@angular/core';
import { StravaService } from '../StravaService/strava.service';
import { Router } from '@angular/router';
import { Athlete } from './athlete.model';
import { WeatherForecastComponent } from "../weather-forecast/weather-forecast.component";

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrl: './athlete.component.css',
  imports: [WeatherForecastComponent]
})
export class AthleteComponent implements OnInit {

  athlete!: Athlete;

  constructor(
    private stravaService: StravaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Fetch athlete data once the component is initialized
    this.stravaService.getAthlete().subscribe({
      next: (data) => {
        this.athlete = data;
      },
      error: (err) => {
        console.error('Error fetching athlete data:', err);
        this.router.navigate(['/login']);  // Redirect if failed
      }
    });
  }

}
