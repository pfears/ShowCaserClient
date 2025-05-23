import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StravaService } from './StravaService/strava.service';
import { ConfigService } from './Helpers/config.service';
import { HttpClientModule } from '@angular/common/http';
import { StravaAuthComponent } from './strava-auth/strava-auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StravaAuthCallbackComponent } from './strava-auth-callback/strava-auth-callback.component';
import { AthleteComponent } from './athlete/athlete.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { AthleteStatsComponent } from './athlete-stats/athlete-stats.component';
import { TopPerformancesComponent } from './top-performances/top-performances.component';
import { ActivityComponent } from './activity/activity.component';
import { GearComponent } from './gear/gear.component';
import { MonthlyStatsComponent } from './monthly-stats/monthly-stats.component';
import { Chart } from 'chart.js';
import { CurrentMonthProgressComponent } from './current-month-progress/current-month-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    StravaAuthComponent,
    StravaAuthCallbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    DashboardComponent,
    AthleteComponent,
    WeatherForecastComponent,
    AthleteStatsComponent,
    TopPerformancesComponent,
    ActivityComponent,
    GearComponent,
    MonthlyStatsComponent,
    CurrentMonthProgressComponent
  ],
  providers: [
    StravaService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadAppConfig,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function loadAppConfig(configService: ConfigService): () => Promise<any> {
  return () => configService.LoadConfig();
}
