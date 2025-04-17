import { getWeatherDescription } from "./weather-codes.model";

export interface IWeatherApiResponse {
    current: {
      temperature_2m: number;
      precipitation: number;
      weather_code: number;
      uv_index: number;
    };
    daily: {
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      precipitation_probability_max: number[];
      uv_index_max: number[];
    };
  }

export interface ICurrentWeather {
    Temperature: number,
    Precipitation: number,
    WeatherCode: string,
    Uv: number,
}

export class CurrentWeather implements ICurrentWeather {
    Temperature: number;
    Precipitation: number;
    WeatherCode: string;
    Uv: number;

  constructor(data: any) { 
    this.Temperature = data.temperature_2m;
    this.Precipitation = data.precipitation;
    this.WeatherCode = getWeatherDescription(data.weather_code);
    this.Uv = data.uv_index;
  }
}

export interface IDailyWeather {
    MaxTemperature: number,
    MinTemperature: number,
    PrecipitationProbability: number,
    UvMax: number,
}

export class DailyWeather implements IDailyWeather {
    MaxTemperature: number;
    MinTemperature: number;
    PrecipitationProbability: number;
    UvMax: number;

  constructor(data: any) { 
    this.MaxTemperature = data.temperature_2m_max;
    this.MinTemperature = data.temperature_2m_min;
    this.PrecipitationProbability = data.precipitation_probability_max;
    this.UvMax = data.uv_index_max;
  }
}

export interface IWeather {
    CurrentWeather: CurrentWeather,
    DailyWeather: DailyWeather
  }
  
  export class Weather implements IWeather {
    CurrentWeather: CurrentWeather;
    DailyWeather: DailyWeather;

    constructor(data: any) { 
      this.CurrentWeather = data.current;
      this.DailyWeather = data.daily;
    }
}