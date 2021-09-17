import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { faVirusSlash, faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth/service/auth-service.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-to-take-patient',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailToTakePatientComponent implements OnInit, OnDestroy {
  ref: any;
  showSpinner = true;
  showButtonSpinner = false;
  patient: any;
  dateForm: FormGroup;
  isDateActive = false;
  bsConfig: Partial<BsDatepickerConfig> = { containerClass: 'blue' };
  today = new Date().toISOString();
  faVirusSlash = faVirusSlash;
  nir = faNotesMedical;
  errorUpdatingBy = false;

  constructor(
    private route: ActivatedRoute,
    private queryService: QueryService,
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private router: Router,
    private authService: AuthService,
    private title: Title
  ) {
    this.title.setTitle('Liora | Cara Santé - Saisit patient');
  }

  ngOnInit(): void {
    this.ref = this.route.snapshot.paramMap.get('ref');
    this.getDetailToTakePatient();
    this.buildForm();
    defineLocale('fr', frLocale);
    this.localeService.use('fr');
  }

  ngOnDestroy(): void {
    this.editUpdating(false);
  }

  buildForm(): void {
    this.dateForm = this.formBuilder.group({
      filledAt: ['']
    });
  }

  getDetailToTakePatient(): void {
    this.showSpinner = true;

    this.queryService.query(
      'GET',
      '/api/detection-test/' + this.ref
    ).subscribe(
      resp => {
        this.showSpinner = false;
        this.patient = resp;
        const isAlreadyUpdating = this.isAlreadyUpdating();
        this.toggleUpdating(isAlreadyUpdating);
      },
      error => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }

  isAlreadyUpdating(): boolean {
    if (
      this.patient.isUpdating &&
      this.patient.updatingBy.ref !== this.authService.getRef()
    ) {
      return true;
    } else {
      return false;
    }
  }

  toggleUpdating(isAlreadyUpdating: boolean): void {
    if (isAlreadyUpdating) {
      this.errorUpdatingBy = true;
    } else {
      this.editUpdating(true);
    }
  }

  editUpdating(updating: boolean): void {
    this.queryService.query(
      'PUT',
      '/api/detection-test/updating',
      {
        isUpdating: updating,
        ref: this.ref
      }
    ).subscribe(
      resp => {
        console.log(resp);
      },
      err => {
        console.log(err);
      }
    );
  }

  showDate(): void {
    this.isDateActive = true;
  }

  onSubmit(): void {
    this.showButtonSpinner = true;

    this.queryService.query(
      'PUT',
      '/api/detection-test/' + this.ref,
      this.dateForm.value
    ).subscribe(
      () => {
        this.router.navigate(['/take-patient']);
        this.showButtonSpinner = false;
      },
      () => {
        this.showButtonSpinner = true;
      }
    );
  }
}
