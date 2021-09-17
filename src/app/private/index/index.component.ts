import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartType } from 'chart.js';
import { AuthService } from 'src/app/shared/services/auth/service/auth-service.service';
import { QueryService } from 'src/app/shared/services/query/query.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public barChartLabels: any[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataset[];

  showUserStatSpinner = false;
  firstName = '';

  constructor(
    private authService: AuthService,
    private queryService: QueryService
  ) { }

  ngOnInit(): void {
    this.firstName = this.authService.getFirstName();
    this.getStats();
  }

  getStats(): void {
    this.showUserStatSpinner = true;

    this.queryService.query(
      'GET',
      '/api/user/get-stats'
    ).subscribe(
      (resp: any[]) => {
        this.buildUserStat(resp);
        this.showUserStatSpinner = false;
      }
    );
  }

  buildUserStat(resp: any): void {
    const stats = _.values(resp);
    const chartData = [];
    const chartLabels = [];

    stats.forEach(element => {
      const el = _.values(element.object);
      chartData.push(el.length);
      chartLabels.push(element.dateText);
    });

    chartData.reverse();
    chartLabels.reverse();

    this.barChartData = [{
      data: chartData,
      label: 'Nombre de patients saisis' }
    ];

    this.barChartLabels = chartLabels;
  }
}
