import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  isCardInfoHidden = false;

  constructor(
    private formBuilder: FormBuilder,
    private queryService: QueryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.activatedRoute.fragment.subscribe(fragment => {
      if (fragment) {
        this.searchForm.patchValue({ search: fragment });
        this.search();
      }
    });
  }

  buildForm(): void {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }

  search(): void {
    this.showButtonSpinner = true;
    this.router.navigate(['/search'], {fragment: this.searchForm.value.search});

    this.queryService.query(
      'POST',
      '/api/search',
      this.searchForm.value
    ).subscribe(
      resp => {
        this.showButtonSpinner = false;
        this.countSearch = resp.results.length;
        this.searchResults = resp.results;
      },
      error => {
        this.showButtonSpinner = false;
      }
    );
  }

  closeCardInfo(): void {
    this.isCardInfoHidden = true;
  }

  onClick(result: any[]): void {
    this.router.navigate(['/take-patient/' + result['ref']]);
  }
}
