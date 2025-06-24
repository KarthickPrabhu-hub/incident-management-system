import { Component, OnInit} from '@angular/core';
import { DashboardService } from '../../services/dashboard';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData,ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [ CommonModule,NgChartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
total = 0;
  critical = 0;
  high = 0;
  low = 0;
  avgMTTR = 0;

  incidentTrendLabels: string[] = [];
  incidentTrendData = {
    labels: [],
    datasets: [
      {
        label: 'Incidents',
        data: [],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        fill: true,
        tension: 0.3
      }
    ]
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  incidentSeverityData: ChartData<'pie', number[], string> = {
  labels: ['Critical', 'High', 'Low'],
  datasets: [
    {
      label: 'Severity Breakdown',
      data: [],  // Now it knows it's number[]
      backgroundColor: ['#ef4444', '#f97316', '#facc15'],
      borderWidth: 1
    }
  ]
};

severityChartOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
};


  constructor(private dashboardService: DashboardService) {}

 ngOnInit(): void {
  this.dashboardService.getIncidentStats().subscribe((stats) => {
    this.total = stats.total;
    this.critical = stats.critical;
    this.high = stats.high;
    this.low = stats.low;
    this.avgMTTR = stats.avgMTTR;

    this.incidentTrendLabels = stats.trendLabels;
    this.incidentTrendData.labels = stats.trendLabels;
    this.incidentTrendData.datasets[0].data = stats.trendData;

    // ✅ Set pie chart data after values are fetched
    this.incidentSeverityData.datasets[0].data = [
      this.critical,
      this.high,
      this.low
    ];
  });
}
}
