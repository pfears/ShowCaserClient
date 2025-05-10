import { Component, Input, OnInit } from '@angular/core';
import { Activity } from './activity.model';
import { NgIf } from '@angular/common';
import { SecondsToTimePipe } from "../pipes/seconds-to-time.pipe";
import { PrettyFullDatePipe } from "../pipes/pretty-date.pipe";
import { Gear } from '../gear/gear.model';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  imports: [NgIf, SecondsToTimePipe, PrettyFullDatePipe]
})
export class ActivityComponent implements OnInit {
  @Input() activity!: Activity;
  @Input() gearData!: Gear[];

  constructor() {}
  
  ngOnInit(): void {
    if (this.activity.DecodedMap.length > 0){
      console.log("Map Detected, Starting Plotting");
    }
    else {
      console.log("No Map Detected, Ignoring Map Plotting");
    }
  }

  gearLookup(gearId: string): string {
    if (!!gearId){
      const Brand = this.gearData.find(gearItem => gearItem.GearId == gearId)!.BrandName;
      const Model = this.gearData.find(gearItem => gearItem.GearId == gearId)!.ModelName;
      return Brand + " " + Model;
    }
    else {
      return "Unlisted"
    }
  }

}