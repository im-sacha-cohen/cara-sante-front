import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit {
  showSpinner = false;
  history: any;
  hasResult: boolean;

  constructor(
    private queryService: QueryService
  ) { }

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory(): void {
    this.showSpinner = true;

    this.queryService.query(
      'GET',
      '/api/search/history'
    ).subscribe(
      resp => {
        this.history = resp;
        this.showSpinner = false;

        if (resp.length > 0) {
          this.hasResult = true;
        } else {
          this.hasResult = false;
        }
      },
      err => {
        this.showSpinner = false;
      }
    );
  }

  onClick(el: any): void {
    this.showSpinner = true;

    const elToDelete = [];

    if (el === 'all') {
      this.history.forEach(element => {
        elToDelete.push(element.id);
      });
    } else {
      elToDelete.push(el);
    }

    this.queryService.query(
      'DELETE',
      '/api/search',
      {
        elToDelete
      }
    ).subscribe(
      resp => {
        this.showSpinner = false;
        this.getHistory();
      },
      err => {
        this.showSpinner = false;
      }
    );
  }
}
