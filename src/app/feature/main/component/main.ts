import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { CommonModule } from '@angular/common';
import { IndustryService } from '../../../shared/services/industry-service';

@Component({
  selector: 'app-main',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  constructor(public industryService: IndustryService) {}

  public totalCount: any;

  ngOnInit() {
    this.chartData();
    this.categoryCountDetails();
    this.firstSectionDetsils();
  }

  chartData(){
    this.industryService.getDashboardDetails().subscribe((res) => {
      const chartData = this.extractChartData(res.data);
     this.barChartData = {
      labels: [...chartData.stateList],
      datasets: [
        { label: 'Connected', data: [...chartData.totalCountList], backgroundColor: '#2e7d32' },
        { label: 'Order Placed', data: [...chartData.connectedList], backgroundColor: '#fb8c00' },
        { label: 'Direction Issued', data: [...chartData.orderPlacedList], backgroundColor: '#d32f2f' },
      ],
    };
    });
  }
  extractChartData(data: any) {
    const stateList: string[] = [];
    const totalCountList: number[] = [];
    const connectedList: number[] = [];
    const orderPlacedList: number[] = [];

    data.forEach((item: any) => {
      stateList.push(item.state);
      totalCountList.push(Number(item.total_count));
      connectedList.push(Number(item.connected));
      orderPlacedList.push(Number(item.order_placed));
    });

    return {
      stateList,
      totalCountList,
      connectedList,
      orderPlacedList,
    };
  }

  categoryCountDetails() {
    this.industryService.getCategoryCountDetails().subscribe((res) => {
      let rawData = res.data;
      this.doughnutChartData = {
        labels: [...rawData.map((x: any) => x.sector_category)],
        datasets: [
          {
            data: [...rawData.map((x: any) => x.category_count)],
            backgroundColor: ['#1565c0', '#2e7d32', '#607d8b', '#c62828', '#ffa000'],
            borderWidth: 0,
          },
        ],
      }
    });
  }

  firstSectionDetsils() {
    this.industryService.getFirstSectionTotalCount().subscribe((res) => {
      this.totalCount = res.data[0];
    });
  }
  /* ================= BAR CHART ================= */
  barChartType: 'bar' = 'bar';
  barChartData: any;
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  //==========donaught chart==================
  doughnutChartType: 'doughnut' = 'doughnut';
  doughnutChartData: any;

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };
  //==========================================

  exportExcel(): void {
    console.log('Export Excel clicked');
  }

  ngAfterViewInit() {}
}
