import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { defineLocale, frLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-modal-fill-test',
  templateUrl: './modal-fill-test.component.html',
  styleUrls: ['./modal-fill-test.component.scss']
})
export class ModalFillTestComponent implements OnInit {
  detectionTest: any;
  bsModalRef: BsModalRef;
  dateForm: UntypedFormGroup;
  bsConfig: Partial<BsDatepickerConfig> = { containerClass: 'blue' };
  showSpinner = false;
  isDateActive = false;
  isError = false;
  errorMessage: string;
  maxDate = new Date();
  validateAll = false;

  yesClicked = false;
  noClicked = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private localeService: BsLocaleService,
    private queryService: QueryService,
    private toastService: ToastService
  ) {
    this.buildForm();
    defineLocale('fr', frLocale);
    this.localeService.use('fr');
  }

  ngOnInit(): void { }

  buildForm(): void {
    this.dateForm = this.formBuilder.group({
      isInvoiced: [''],
      filledAt: [''],
      validateAll: [false],
      isInvoicedOnAmelipro: [false]
    });
  }

  updateValidateAll(): void {
    this.validateAll = !this.validateAll;
    this.dateForm.patchValue({ validateAll: this.validateAll });
  }

  // onClose function into patient detail component
  onClose(): void { }

  onClick(btnClicked: string): void {
    if (btnClicked === 'yes') {
      this.noClicked = false;
      this.yesClicked = true;

      this.showDate();
      this.dateForm.patchValue({ isInvoiced: true });
    } else if (btnClicked === 'no') {
      this.noClicked = true;
      this.yesClicked = false;

      this.hideDate();
      this.dateForm.patchValue({ isInvoiced: false });
    }
  }

  showDate(): void {
    this.isDateActive = true;
  }

  hideDate(): void {
    this.isDateActive = false;
  }

  onSubmit(): void {
    this.isError = false;

    if (this.dateForm.value.isInvoiced !== '') {
      this.showSpinner = true;

      this.queryService.query(
        'PUT',
        '/api/detection-test/' + this.detectionTest.ref,
        this.dateForm.value
      ).subscribe(
        () => {
          this.toastService.set('success', 'Le test a bien été saisit !');
          this.showSpinner = false;
          this.onClose();
        },
        () => {
          this.showSpinner = false;
        }
      );
    } else {
      this.errorMessage = 'Vous devez indiquer si ce test a été facturé';
      this.isError = true;
    }
  }
}
