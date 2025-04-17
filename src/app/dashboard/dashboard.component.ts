// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { StravaService } from '../StravaService/strava.service';
import { Router } from '@angular/router';
import { AthleteComponent } from '../athlete/athlete.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [AthleteComponent],
})
export class DashboardComponent implements OnInit {

  athlete: any;

  constructor(
    private stravaService: StravaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("Dashboard Loaded, Authentication Complete");
  }

}