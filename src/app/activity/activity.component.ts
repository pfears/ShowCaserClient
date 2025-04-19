import { Component, Input, OnInit } from '@angular/core';
import { Activity } from './activity.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements OnInit{
  
  @Input() activity!: Activity
  
  constructor() { }

  ngOnInit(): void {

  }
}
