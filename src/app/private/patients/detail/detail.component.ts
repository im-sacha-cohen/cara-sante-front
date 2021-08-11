import { Component, Input, OnInit, Query } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { faVirusSlash, faNotesMedical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detail-to-take-patient',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailToTakePatientComponent implements OnInit {
  id: any;
  showSpinner = true;
  patient = [];
  dateForm: FormGroup;
  isDateActive = false;
  bsConfig: Partial<BsDatepickerConfig> = { containerClass: 'blue' };
  today = new Date().toISOString();
  faVirusSlash = faVirusSlash;
  nir = faNotesMedical;

  constructor(
    private route: ActivatedRoute,
    private queryService: QueryService,
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDetailToTakePatient();

    this.dateForm = this.formBuilder.group({
      date: null
    });

    defineLocale('fr', frLocale);
    this.localeService.use('fr');
  }

  getDetailToTakePatient(): void {
    this.showSpinner = true;

    this.queryService.query(
      'GET',
      '/api/detection-test/' + this.id
    ).subscribe(
      resp => {
        this.showSpinner = false;
        console.log(resp);
        this.patient = resp;
      },
      error => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }

  showDate(): void {
    this.isDateActive = true;
  }

  onSubmit(): void {
    console.log(this.dateForm.value);
  }
}
