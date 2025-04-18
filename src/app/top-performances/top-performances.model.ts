import { Activity } from "../activity/activity.model";

export interface ITopRunPerformances {
    FiveK: Activity | undefined,
    TenK: Activity | undefined,
    HalfMarathon: Activity | undefined,
    Marathon: Activity | undefined
  }
  
  export class TopRunPerformances implements ITopRunPerformances {

    FiveK: Activity | undefined;
    TenK: Activity | undefined;
    HalfMarathon: Activity | undefined;
    Marathon: Activity | undefined;
    
    constructor(data: ITopRunPerformances) {
      this.FiveK = data.FiveK;
      this.TenK = data.TenK;
      this.HalfMarathon = data.HalfMarathon;
      this.Marathon = data.Marathon;
    }
  }