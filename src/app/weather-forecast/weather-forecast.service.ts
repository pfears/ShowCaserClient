import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, switchMap } from 'rxjs';
import { mapToClass } from '../Helpers/map-to-class';
import { CurrentWeather, DailyWeather, IWeatherApiResponse, Weather } from './weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  constructor(private http: HttpClient) {

   }

   // Main method to fetch weather data based on location
  getWeatherWithLocation() {
    return from(this.getGeoLocation()).pipe(
      switchMap(({ lat, lon }) => {
        const url = this.buildWeatherUrl(lat, lon);

        return this.http.get<IWeatherApiResponse>(url).pipe( // <-- Specify the type here
          // Map the response object to class instances
          map(response => {
            if (response && response.current && response.daily) {
              // Set the current temp to F instead of C
              const currentWeatherData = mapToClass(CurrentWeather, { ...response.current, temperature_2m: this.celsiusToFahrenheit(response.current.temperature_2m) });
              const dailyWeatherData = mapToClass(DailyWeather, {
                temperature_2m_max: this.celsiusToFahrenheit(response.daily.temperature_2m_max[0]), // First element for max temperature
                temperature_2m_min: this.celsiusToFahrenheit(response.daily.temperature_2m_min[0]), // First element for min temperature
                precipitation_probability_max: response.daily.precipitation_probability_max[0], // First element for precip probability
                uv_index_max: response.daily.uv_index_max[0] // First element for UV index max
              });
              console.log(currentWeatherData);
              console.log(dailyWeatherData);
              return mapToClass(Weather, {
                current: currentWeatherData,
                daily: dailyWeatherData
              });
            } else {
              throw new Error('Unexpected response format');
            }
          })
        );
      })
    );
  }

  //Get the Browser's Geographical Location
  private getGeoLocation(): Promise<{lat: number, lon: number}>{
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation){
        reject('Geolocation not supported by this browser.');
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          reject('Failed to get location: ' + error.message);
        }
      );
    });
  }

  // Using Meto, super flexible CORS enabled Free API
  private buildWeatherUrl(lat: number, lon: number): string{
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,weather_code,uv_index&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max&timezone=auto&unitGroup=us`
  }

  // Convert Celsius to Fahrenheit function
  private celsiusToFahrenheit(celsius: number): number {
    return Math.round((celsius * 9/5) + 32);
  }

}
