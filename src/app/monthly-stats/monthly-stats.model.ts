import { Activity } from "../activity/activity.model";

export interface IMonthlyStats {
    Month: number,
    Year: number,
    ActivityCount: number,
    MileageCount: number
}

export class MonthlyStats implements IMonthlyStats {
    Month: number;
    Year: number;
    ActivityCount: number;
    MileageCount: number;
  
    constructor(data: IMonthlyStats) {
      this.Month = data.Month;
      this.Year = data.Year;
      this.ActivityCount = data.ActivityCount;
      this.MileageCount = data.MileageCount;
    }
}
export function mapToMonthlyStats(activities: Activity[]): MonthlyStats[] {
  const now = new Date();
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOf12MonthsAgo = new Date(
    startOfCurrentMonth.getFullYear(),
    startOfCurrentMonth.getMonth() - 11,
    1
  );

  const filtered = activities.filter(activity => {
    const activityDate = new Date(activity.StartDateTimeLocal);
    return activityDate >= startOf12MonthsAgo && activityDate <= now;
  });
  const statsMap = new Map<string, MonthlyStats>();

  filtered.forEach(activity => {
    const date = new Date(activity.StartDateTimeLocal);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // JS months are 0-based

    const key = `${year}-${month}`;

    if (!statsMap.has(key)) {
      statsMap.set(key, {
        Year: year,
        Month: month,
        ActivityCount: 0,
        MileageCount: 0
      });
    }

    const entry = statsMap.get(key)!;
    entry.ActivityCount += 1;
    entry.MileageCount += activity.Distance ?? 0;
  });
  return Array.from(statsMap.values())
    .sort((a, b) =>
      a.Year !== b.Year ? a.Year - b.Year : a.Month - b.Month
    )
    .map(stat => new MonthlyStats(stat));
}