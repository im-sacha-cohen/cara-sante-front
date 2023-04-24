import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: UntypedFormGroup;
  showButtonSpinner = false;
  countSearch = 0;
  searchResults: any;
  modalRef: BsModalRef;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private queryService: QueryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
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

  onClick(result: any[]): void {
    this.router.navigate(['/take-patient/' + result['ref']]);
  }

  showModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  hideModal(): void {
    this.modalService.hide();
  }
}
