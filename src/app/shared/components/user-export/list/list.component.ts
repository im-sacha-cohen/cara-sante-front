import { Component, Input } from '@angular/core';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-user-export-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class UserExportListComponent {
  showExportSpinner = true;
  @Input() exports = [];
  @Input() showExportListVariable = true;

  ngOnInit(): void {
    console.log('on init exports', this.exports);
  }

  ngOnChanges(): void {
    console.log('received exports', this.exports);
  }

  constructor(
    private queryService: QueryService
  ) { }

  public deleteExport(ref: string, index: number): void {
    this.exports[index].showDeleteSpinner = true;

    this.queryService.query(
      'DELETE',
      '/api/user-export/' + ref
    ).subscribe(
      resp => {
        this.exports[index].showDeleteSpinner = false;
        this.exports.splice(index, 1);
        //this.getExports(false);
      },
      error => {
        this.exports[index].showDeleteSpinner = false;
      }
    );
  }

  public downloadExport(ref: string, index: number): void {
    this.exports[index].showDownloadSpinner = true;

    this.queryService.query(
      'GET',
      '/api/user-export/download/' + ref,
      {}, 'text/csv', 'text'
    ).subscribe(
      resp => {
        const blob = new Blob([resp], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        this.exports[index].showDownloadSpinner = false;
      },
      () => {
        this.exports[index].showDownloadSpinner = false;
      }
    );
  }
}
