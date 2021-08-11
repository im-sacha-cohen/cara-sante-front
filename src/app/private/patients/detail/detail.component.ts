import { Component, Input, OnInit, Query } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from 'src/app/shared/services/query/query.service';

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

  constructor(
    private route: ActivatedRoute,
    private queryService: QueryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDetailToTakePatient();

    this.dateForm = this.formBuilder.group({
      date: null
    });
  }

  getDetailToTakePatient(): void {
    this.showSpinner = true;

    this.queryService.query(
      'GET',
      '/api/patient/' + this.id
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
    console.log('here');
    this.isDateActive = true;
  }
}
