import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  showButtonSpinner = false;
  countSearch = 0;
  searchResults: any;

  constructor(
    private formBuilder: FormBuilder,
    private queryService: QueryService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }

  search(): void {
    this.showButtonSpinner = true;

    this.queryService.query(
      'POST',
      '/api/search',
      this.searchForm.value
    ).subscribe(
      resp => {
        this.showButtonSpinner = false;
        this.countSearch = resp.length;
        this.searchResults = resp;
      },
      error => {
        this.showButtonSpinner = false;
      }
    );
  }
}
