import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { AuthService } from 'src/app/shared/services/auth/service/auth-service.service';
import { QueryService } from 'src/app/shared/services/query/query.service';
import * as _ from 'lodash';
import { Title } from '@angular/platform-browser';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';

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
  showDetectionTestRemainingSpinner = false;
  detectionTestRemaining: any;
  firstName = '';
  isAdmin = false;
  earning: any;
  showEarningSpinner = true;
  showEarningChartSpinner = true;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ ],
        label: 'Gains en €',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#007b91',
        pointBackgroundColor: '#ffa4b7',
        pointBorderColor: 'green',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin'
      }
    ],
    labels: [ ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
        {
          position: 'left',
        },
      y1: {
        position: 'right',
        grid: {
          color: '#007b91',
        },
        ticks: {
          color: '#007b91'
        }
      }
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: '',
            borderColor: '#ffa4b7',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'white',
              backgroundColor: '#007b91',
              content: `Gains de ${this.authService.getFirstName()}`,
              font: {
                weight: 'bold'
              }
            }
          },
        ],
      }
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private authService: AuthService,
    private queryService: QueryService,
    private title: Title,
  ) {
    this.title.setTitle('Liora | Cara Santé - Accueil');
    Chart.register(Annotation)
  }

  ngOnInit(): void {
    this.firstName = this.authService.getFirstName();
    this.getUserStats();
    this.getTeamStats();
    this.getDetectionTestRemaining();
    this.getEarning();
    this.getEarningChart();
    this.isAdmin = this.authService.isAdmin();
  }

  getDetectionTestRemaining(): void {
    this.showDetectionTestRemainingSpinner = true;

    this.queryService.query(
      'GET',
      '/api/detection-test/remaining'
    ).subscribe(
      resp => {
        this.showDetectionTestRemainingSpinner = false;
        this.detectionTestRemaining = resp;
      }
    );
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

  getEarning(): void {
    this.showEarningSpinner = true;

    this.queryService.query(
      'GET',
      '/api/user/earning'
    ).subscribe(
      resp => {
        this.earning = resp;
        this.showEarningSpinner = false;
      },
      () => this.showEarningSpinner = false
    );
  }

  getEarningChart(): void {
    this.showEarningChartSpinner = true;

    this.queryService.query(
      'GET',
      '/api/user/earning-chart'
    ).subscribe(
      resp => {
        this.showEarningChartSpinner = false;
        this.lineChartData.datasets[0].data = resp.data;
        this.lineChartData.labels = resp.labels;
      },
      () => this.showEarningChartSpinner = false
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
      label: 'Nombre de patients que j\'ai saisi' }
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
      label: 'Nombre de patients saisis par l\'équipe' }
    ];

    this.barChartTeamLabels = chartLabels;
  }
}
