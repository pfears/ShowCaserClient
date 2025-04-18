import { Component, Input, OnInit } from '@angular/core';
import { StravaService } from '../StravaService/strava.service';
import { AllTimeStats, AthleteStats, YtdStats } from './athlete-stats.model';

@Component({
  selector: 'app-athlete-stats',
  templateUrl: './athlete-stats.component.html',
  styleUrl: './athlete-stats.component.css'
})
export class AthleteStatsComponent implements OnInit{

  @Input() athleteStats!: AthleteStats

  constructor() {}

  ngOnInit(): void {
    
  }

}
