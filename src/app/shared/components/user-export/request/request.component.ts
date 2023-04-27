import { Component, EventEmitter, Output } from '@angular/core';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-user-export-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class UserExportRequestComponent {
  exports: any;
  @Output() exportsEvent = new EventEmitter<any>();
  @Output() showExportListVariable = new EventEmitter<any>();

  availableMonths = [];
  selectedPeriod = null;
  showExportSpinner = true;
  showRequestExportSpinner = false;

  constructor(
    private queryService: QueryService
  ) { }

  ngOnInit(): void {
    this.getExports();
    this.getAvailableMonths();
  }

  private getExports(triggerSpinner?: boolean): void {
    this.showExportSpinner = triggerSpinner ? true : false;
    this.showExportListVariable.emit(true);

    this.queryService.query(
      'GET',
      '/api/user-export'
    ).subscribe(
      resp => {
        this.showExportSpinner = false;
        this.exports = resp.object;
        this.exportsEvent.emit(this.exports);
        this.showExportListVariable.emit(false);
      },
      error => {
        this.showExportSpinner = false;
        this.showExportListVariable.emit(false);
      }
    );
  }

  public requestExport(): void {
    this.showRequestExportSpinner = true;

    this.queryService.query(
      'POST',
      '/api/user-export/request',
      {
        month: this.selectedPeriod.month,
        year: this.selectedPeriod.year
      }
    ).subscribe(
      resp => {
        this.showRequestExportSpinner = false;
        this.getExports();
      },
      error => {
        this.showRequestExportSpinner = false;
      }
    );
  }

  public getAvailableMonths(): void {
    this.queryService.query(
      'GET',
      '/api/user-export/available-months'
    ).subscribe(
      resp => {
        this.availableMonths = resp.object;
      }
    );
  }

  toggleMonthValue($event): void {
    this.selectedPeriod = $event;
  }
}
