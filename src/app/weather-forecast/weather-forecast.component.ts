import { Component, Input, OnInit } from '@angular/core';
import { WeatherForecastService } from './weather-forecast.service';
import { CommonModule, NgIf } from '@angular/common';
import { Weather } from './weather.model';

@Component({
  selector: 'app-weather-forecast',
  providers: [WeatherForecastService],
  templateUrl: './weather-forecast.component.html',
  imports: [CommonModule, NgIf],
  styleUrl: './weather-forecast.component.css'
})
export class WeatherForecastComponent implements OnInit {
  @Input() weatherData!: Weather;

  constructor() {}
  
  ngOnInit(): void {
    
  }

}
