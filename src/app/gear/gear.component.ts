import { Component, Input, OnInit } from '@angular/core';
import { Gear } from './gear.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-gear',
  templateUrl: './gear.component.html',
  styleUrl: './gear.component.css',
  imports: [NgFor]
})
export class GearComponent implements OnInit{
  
  @Input() gearList!: Gear[];
  
  ngOnInit(): void {
    
  }

}
