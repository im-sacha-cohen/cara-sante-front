import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-taken',
  templateUrl: './taken.component.html',
  styleUrls: ['./taken.component.scss']
})
export class TakenPatientComponent implements OnInit {
  showSpinner = true;
  patients: any;
  patientsLength = 0;

  constructor(
    private queryService: QueryService,
    private title: Title
  ) {
    this.title.setTitle('Liora | Cara Santé - Patients saisit');
  }

  ngOnInit(): void {
    this.getTakenPatient();
  }

  getTakenPatient(): void {
    this.queryService.query(
      'GET',
      '/api/patient/taken'
    ).subscribe(
      patients => {
        this.patients = patients;
        this.patientsLength = patients.length;
        this.showSpinner = false;
      },
      error => {
        //
        this.showSpinner = false;
      }
    );
  }
}
