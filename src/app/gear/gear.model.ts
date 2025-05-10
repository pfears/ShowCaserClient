export interface IGear {
    GearId: string,
    BrandName: string,
    ModelName: string,
    Description: string,
    Distance: number
  }
  
  export class Gear implements IGear {
    GearId: string;
    BrandName: string;
    ModelName: string;
    Description: string;
    Distance: number;
  
    constructor(data: any) {
      this.GearId = data.id;
      this.BrandName = data.brand_name;
      this.ModelName = data.model_name;
      this.Description = data.description;
      this.Distance = this.getMilesFromMeters(data.distance);
    }

    getMilesFromMeters(meters: number): number {
        return Math.round(meters/1609 * 100)/100; // Convert from Meters to Miles (2 decimal Places)
      }
}