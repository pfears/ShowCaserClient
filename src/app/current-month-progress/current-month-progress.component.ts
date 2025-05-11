import { Component, Input, OnInit } from '@angular/core';
import { CurrentMonthProgress } from './current-month-progress.model';
import { CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from 'chart.js';

@Component({
  selector: 'app-current-month-progress',
  templateUrl: './current-month-progress.component.html',
  styleUrl: './current-month-progress.component.css'
})
export class CurrentMonthProgressComponent implements OnInit {
  @Input() currentMonthProgress!: CurrentMonthProgress[];
  
  ngOnInit(): void {
    Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
    this.buildChart();
  }

  buildChart(): void {
    const labels = this.currentMonthProgress.map(p => p.DayOfMonth.toString());
    const mileageData = this.currentMonthProgress.map(p => p.TotalMilageAtDay);
    const activityData = this.currentMonthProgress.map(p => p.TotalActivityCountAtDay);

    new Chart('progressChart', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Total Mileage',
            data: mileageData,
            borderColor: 'blue',
            tension: 0.3,
            fill: false
          },
          {
            label: 'Total Activities',
            data: activityData,
            borderColor: 'green',
            tension: 0.3,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Current Month Progress'
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Day of Month' }
          },
          y: {
            title: { display: true, text: 'Count / Mileage' },
            beginAtZero: true
          }
        }
      }
    });
  }
}
