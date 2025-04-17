import { Injectable } from '@angular/core';
import { StravaService } from '../StravaService/strava.service';
import { Athlete } from './athlete.model';
import { mapToClass } from '../Helpers/map-to-class';

@Injectable({
  providedIn: 'root'
})
export class AthleteServiceService {

  constructor(private stravaSvc: StravaService) { }

  getAthlete(): Athlete {
    return mapToClass(Athlete,this.stravaSvc.getAthlete().subscribe())    
  }
}
