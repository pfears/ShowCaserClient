import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  settings: any;

  constructor(private http: HttpClient) {}

  LoadConfig(): Promise<any> {
    return this.http.get('assets/config.json')
      .toPromise()
      .then(config => {
        this.settings = config;
      })
      .catch(err => {
        console.error('Config load failed', err);
        return Promise.reject(err);
      });
  }

  getStravaConfig() {
    return this.settings?.strava;
  }

  getConfig() {
    return this.settings;
  }
}