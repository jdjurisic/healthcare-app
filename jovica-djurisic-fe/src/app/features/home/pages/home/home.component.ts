import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import {
  DashboardData,
  DashboardService,
} from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dashboardData?: DashboardData;

  noPractitioners: number = 0;
  noExaminations: number = 0;

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.getDashboardData().subscribe((response) => {
      this.dashboardData = response;
      this.initDashboards();
      this.initSums();
    });
  }

  ngOnInit(): void {}

  initDashboards() {
    Chart.defaults.font.size = 19;

    // practitioners by organization chart init
    const myChart = new Chart('practitionersChart', {
      type: 'bar',
      data: {
        labels: this.dashboardData?.Practitioners.map((pract) => pract[0]),
        datasets: [
          {
            data: this.dashboardData?.Practitioners.map((pract) => pract[1]),
            backgroundColor: this.dashboardData?.Practitioners.map((pract) =>
              this.getRandomColor()
            ),
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Practitioners per Organization',
          },
          legend: {
            display: false,
          },
        },
      },
    });

    // examinations by organization chart init
    const myChart2 = new Chart('examinationsChart', {
      type: 'bar',
      data: {
        labels: this.dashboardData?.Examinations.map((exam) => exam[0]),
        datasets: [
          {
            label: '',
            data: this.dashboardData?.Examinations.map((exam) => exam[1]),
            backgroundColor: this.dashboardData?.Examinations.map((exam) =>
              this.getRandomColor()
            ),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Running Examinations per Organization',
          },
          legend: {
            display: false,
          },
        },
      },
    });

    // qualifications chart init
    const myChart3 = new Chart('qualificationsChart', {
      type: 'doughnut',
      data: {
        labels: this.dashboardData?.Qualifications.map((qual) => qual[0]),
        datasets: [
          {
            label: '',
            data: this.dashboardData?.Qualifications.map((qual) => qual[1]),
            backgroundColor: this.dashboardData?.Qualifications.map((qual) =>
              this.getRandomColor()
            ),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive:true,
        scales: {},
        plugins: {
          title: {
            display: true,
            text: 'Practitioners Qualification Structure',
          },
        },
      },
    });
  }

  initSums() {
    this.noPractitioners = this.sumValues(this.dashboardData?.Practitioners);
    this.noExaminations = this.sumValues(this.dashboardData?.Examinations);
  }

  sumValues(param: any) {
    let sum = 0;
    param.map((pract: number[]) => (sum += pract[1]));
    return sum;
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
