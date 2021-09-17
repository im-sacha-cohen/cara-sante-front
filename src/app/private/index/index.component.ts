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
  public barChartUserLabels: any[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartUserData: ChartDataset[];

  public barChartTeamLabels: any[];
  public barChartTeamData: ChartDataset[];

  showUserStatSpinner = false;
  showTeamStatSpinner = false;
  firstName = '';

  constructor(
    private authService: AuthService,
    private queryService: QueryService
  ) { }

  ngOnInit(): void {
    this.firstName = this.authService.getFirstName();
    this.getUserStats();
    this.getTeamStats();
  }

  getUserStats(): void {
    this.showUserStatSpinner = true;

    this.queryService.query(
      'GET',
      '/api/user/get-user-stats'
    ).subscribe(
      (resp: any[]) => {
        this.buildUserStat(resp);
        this.showUserStatSpinner = false;
      }
    );
  }

  getTeamStats(): void {
    this.showTeamStatSpinner = true;

    this.queryService.query(
      'GET',
      '/api/user/get-team-stats'
    ).subscribe(
      (resp: any[]) => {
        this.buildTeamStat(resp);
        this.showTeamStatSpinner = false;
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

    this.barChartUserData = [{
      data: chartData,
      label: 'Nombre de patients saisit par vous-même' }
    ];

    this.barChartUserLabels = chartLabels;
  }

  buildTeamStat(resp: any): void {
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

    this.barChartTeamData = [{
      data: chartData,
      label: 'Nombre de patients saisit par toute l\'équipe' }
    ];

    this.barChartTeamLabels = chartLabels;
  }
}
