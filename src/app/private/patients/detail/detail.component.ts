import { Component, Input, OnInit, Query } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private queryService: QueryService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDetailToTakePatient();
  }

  getDetailToTakePatient(): void {
    this.showSpinner = true;

    this.queryService.query(
      'GET',
      'patient/' + this.id
    ).subscribe(
      resp => {
        this.showSpinner = false;
        console.log(resp);
      },
      error => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }
}
