import { Component, Input, OnInit } from '@angular/core';
import { Activity } from './activity.model';
import { NgIf } from '@angular/common';
import { SecondsToTimePipe } from "../pipes/seconds-to-time.pipe";
import { PrettyFullDatePipe } from "../pipes/pretty-date.pipe";


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  imports: [NgIf, SecondsToTimePipe, PrettyFullDatePipe]
})
export class ActivityComponent implements OnInit {
  @Input() activity!: Activity;

  constructor() {}
  
  ngOnInit(): void {
    if (this.activity.DecodedMap.length > 0){
      console.log("Map Detected, Starting Plotting");
    }
    else {
      console.log("No Map Detected, Ignoring Map Plotting");
      
    }
  }

}