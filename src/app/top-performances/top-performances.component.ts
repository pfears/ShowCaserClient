import { Component, Input, OnInit } from '@angular/core';
import { Activity } from '../activity/activity.model';
import { TopRunPerformances } from './top-performances.model';
import { SecondsToTimePipe } from "../pipes/seconds-to-time.pipe";

@Component({
  selector: 'app-top-performances',
  templateUrl: './top-performances.component.html',
  styleUrl: './top-performances.component.css',
  imports: [SecondsToTimePipe]
})
export class TopPerformancesComponent implements OnInit{

  @Input() Activities!: Activity[];
  AllTimeTopPerformances!: TopRunPerformances;
  YtdTopPerformances!: TopRunPerformances;

  constructor() {}

  ngOnInit(): void {
    this.AllTimeTopPerformances = this.GetTopPerformances(false);
    this.YtdTopPerformances = this.GetTopPerformances(true)
    console.log(this.AllTimeTopPerformances);
    console.log(this.YtdTopPerformances);

  }

  GetTopPerformances(isYtd: boolean): TopRunPerformances {
    let runs = this.Activities.filter(a => a.ActivityType === 'Run');
    if(isYtd == true){
      runs = runs.filter(item => new Date(item.StartDateTimeLocal).getFullYear() === new Date().getFullYear());
    }
    const findFastest = (targetDistance: number, tolerance: number = 0.3): Activity | undefined => {
      return runs
        .filter(run => Math.abs(run.Distance - targetDistance) <= tolerance)
        .sort((a, b) => a.MovingTime - b.MovingTime)[0];
    };

    return new TopRunPerformances({
      FiveK: findFastest(3.1),
      TenK: findFastest(6.2),
      HalfMarathon: findFastest(13.1),
      Marathon: findFastest(26.2)
    });
  }

}
