import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from './weather-forecast.service';
import { CommonModule } from '@angular/common';
import { Weather } from './weather.model';

@Component({
  selector: 'app-weather-forecast',
  providers: [WeatherForecastService],
  templateUrl: './weather-forecast.component.html',
  imports: [CommonModule],
  styleUrl: './weather-forecast.component.css'
})
export class WeatherForecastComponent implements OnInit {
  weatherData!: Weather;

  constructor(
    private weatherSvc: WeatherForecastService,
  ) {}
  
  ngOnInit(): void {
    this.weatherSvc.getWeatherWithLocation().subscribe(data => {
      this.weatherData = data;
    });
    console.log(this.weatherData);
  }

}
