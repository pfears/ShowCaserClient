import { Activity } from "../activity/activity.model";

export interface ICurrentMonthProgress {
    DayOfMonth: number,
    TotalMilageAtDay: number,
    TotalActivityCountAtDay: number,
}

export class CurrentMonthProgress implements ICurrentMonthProgress {
    
    DayOfMonth: number;
    TotalMilageAtDay: number;
    TotalActivityCountAtDay: number;
  
    constructor(data: ICurrentMonthProgress) {
      this.DayOfMonth = data.DayOfMonth;
      this.TotalMilageAtDay = data.TotalMilageAtDay;
      this.TotalActivityCountAtDay = data.TotalActivityCountAtDay;
    }
    
}
export function buildCurrentMonthProgress(activities: Activity[]): CurrentMonthProgress[] {
  if (activities.length === 0) return [];

  const now = new Date();
  const currentMonth = now.getMonth(); // 0-based
  const currentYear = now.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const dailyMileage: number[] = Array(daysInMonth).fill(0);
  const dailyActivityCount: number[] = Array(daysInMonth).fill(0);

  // Filter and collect daily data for current month
  activities.forEach(activity => {
    const activityDate = new Date(activity.StartDateTimeLocal);
    if (
      activityDate.getFullYear() === currentYear &&
      activityDate.getMonth() === currentMonth
    ) {
      const dayIndex = activityDate.getDate() - 1; // 0-based
      dailyMileage[dayIndex] += activity.Distance;
      dailyActivityCount[dayIndex]++;
    }
  });

  // Build cumulative progress
  const result: CurrentMonthProgress[] = [];
  let runningMileage = 0;
  let runningActivityCount = 0;

  for (let i = 0; i < daysInMonth; i++) {
    runningMileage += dailyMileage[i];
    runningActivityCount += dailyActivityCount[i];

    result.push(new CurrentMonthProgress({
      DayOfMonth: i + 1,
      TotalMilageAtDay: runningMileage,
      TotalActivityCountAtDay: runningActivityCount,
    }));
  }

  return result;
}