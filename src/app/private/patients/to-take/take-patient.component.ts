import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-take-patient',
  templateUrl: './take-patient.component.html',
  styleUrls: ['./take-patient.component.scss']
})
export class TakePatientComponent implements OnInit {
  showSpinner = true;
  detectionTests: any[];

  constructor(
    private queryService: QueryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPatientsToTake();
  }

  getPatientsToTake(): void {
    this.showSpinner = true;

    this.queryService.query(
      'GET',
      '/api/patient/to-take'
    ).subscribe(
      (resp: any[]) => {
        this.showSpinner = false;
        console.log(resp);
        this.detectionTests = resp;
      },
      error => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }

  onClick(detectionTest: any): void {
    if (!detectionTest.isUpdating) {
      this.router.navigate(['/take-patient/' + detectionTest.id]);
    }
  }
}
