import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StravaService } from '../StravaService/strava.service';
import { Router } from '@angular/router';
import { Athlete } from './athlete.model';
import { WeatherForecastComponent } from "../weather-forecast/weather-forecast.component";
import { NgIf } from '@angular/common';
import { Weather } from '../weather-forecast/weather.model';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrl: './athlete.component.css',
  imports: [WeatherForecastComponent, NgIf]
})
export class AthleteComponent implements OnInit {

  @Input() athlete!: Athlete;
  @Input() weatherData!: Weather;

  constructor() {}

  ngOnInit(): void {
    
  }

}
