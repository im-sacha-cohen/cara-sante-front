import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-taken',
  templateUrl: './taken.component.html',
  styleUrls: ['./taken.component.scss']
})
export class TakenPatientComponent implements OnInit {
  showSpinner = true;
  patients: any;

  constructor(
    private queryService: QueryService
  ) { }

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
        console.log(this.patients);
        this.showSpinner = false;
      },
      error => {
        //
        this.showSpinner = false;
      }
    );
  }
}
