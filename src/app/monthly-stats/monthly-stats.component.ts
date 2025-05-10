import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, LinearScale, CategoryScale, Title, Tooltip, Legend, BarController, BarElement } from 'chart.js';
import { MonthlyStats } from './monthly-stats.model';

@Component({
  selector: 'app-monthly-stats',
  templateUrl: './monthly-stats.component.html',
  styleUrls: ['./monthly-stats.component.css']
})
export class MonthlyStatsComponent implements OnInit {
  @Input() monthlyStats!: MonthlyStats[];

  ngOnInit(): void {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
    this.buildMonthlyChart();
  }

  buildMonthlyChart(){
    // Prepare chart data
    const labels = this.monthlyStats.map(stat => this.GetMonthName(stat.Month));
    const activityData = this.monthlyStats.map(stat => stat.ActivityCount);
    const milageData = this.monthlyStats.map(stat => stat.MileageCount);
    new Chart('monthlyChart', {
      type: 'bar', // Set chart type to bar
      
      data: {
        labels: labels, // Labels (months/year)
        datasets: [{
          label: 'Activity Count', // Label for the dataset
          data: activityData, // Data for the chart
          backgroundColor: 'rgb(75, 192, 192)', // Bar color
          borderColor: 'rgb(75, 192, 192)', // Border color for bars (optional)
          borderWidth: 1 // Bar border width (optional)
        },
        {
          label: 'Milage Amount', // Label for the dataset
          data: milageData, // Data for the chart
          backgroundColor: 'rgb(51, 221, 28)', // Bar color
          borderColor: 'rgb(51, 221, 28)', // Border color for bars (optional)
          borderWidth: 1 // Bar border width (optional)
        },
      ]
      },
      options: {
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Running Totals By Month' }
        },
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            stacked: false,
            title: {
              display: true,
              text: 'Months'
            }
          },
          y: {
            beginAtZero: true, // Ensures the y-axis starts at 0
          }
        }
      }
    });
  }

  public GetMonthName(monthNumber: number): string {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // Adjust for 0-based index
    if (monthNumber >= 1 && monthNumber <= 12) {
      return monthNames[monthNumber - 1];
    }
  
    // Return a fallback for invalid input
    return "Invalid month";
  }


}
