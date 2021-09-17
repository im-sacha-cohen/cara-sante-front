import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/service/auth-service.service';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-take-patient',
  templateUrl: './take-patient.component.html',
  styleUrls: ['./take-patient.component.scss']
})
export class TakePatientComponent implements OnInit {
  showSpinner = true;
  detectionTests: any[];
  userTokenRef: string;
  intervalCount = 15000;
  countBeforeReloadPatient = 15;
  intervalCountBeforeReload: any;

  constructor(
    private queryService: QueryService,
    private router: Router,
    private authService: AuthService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Liora | Cara Santé - Liste patients');
  }

  ngOnInit(): void {
    this.getPatientsToTake();
    this.setIntervalGetPatient();
    this.userTokenRef = this.authService.getRef();
  }

  setIntervalGetPatient(): void {
    setInterval(() => {
      this.getPatientsToTake();
    }, this.intervalCount);
  }

  setIntervalCountBeforeReload(): void {
    this.intervalCountBeforeReload = setInterval(() => {
      this.countBeforeReloadPatient = this.countBeforeReloadPatient - 1;
    }, 1000);
  }

  getPatientsToTake(): void {
    this.showSpinner = true;
    this.countBeforeReloadPatient = 15;
    clearInterval(this.intervalCountBeforeReload);

    this.queryService.query(
      'GET',
      '/api/patient/to-take'
    ).subscribe(
      (resp: any[]) => {
        this.showSpinner = false;
        this.detectionTests = resp;
        this.setIntervalCountBeforeReload();
      },
      error => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }

  onClick(detectionTest: any): void {
    if (
      !detectionTest.isUpdating ||
      detectionTest.updatingBy.ref === this.userTokenRef
    ) {
      this.router.navigate(['/take-patient/' + detectionTest.ref]);
    }
  }
}
