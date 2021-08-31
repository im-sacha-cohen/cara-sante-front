import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class UsersDetailComponent implements OnInit {
  id: any;
  user: any;
  detectionTests: any;
  showSpinner = true;
  showSpinnerResendConfirmation = false;

  constructor(
    private route: ActivatedRoute,
    private queryService: QueryService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
  }

  getUser(): void {
    this.showSpinner = true;

    this.queryService.query(
      'GET',
      '/api/user/' + this.id
    ).subscribe(
      user => {
        this.user = user[0];
        this.detectionTests = user[0].detectionTests;
        this.showSpinner = false;
      },
      error => {
        this.showSpinner = false;
      }
    );
  }

  resendConfirmation(): void {
    this.showSpinnerResendConfirmation = true;

    this.queryService.query(
      'GET',
      '/api/user/resend-confirmation/' + this.id
    ).subscribe(
      user => {
        this.showSpinnerResendConfirmation = false;
        this.toastService.set('success', 'Le mail de confirmation a bien été renvoyé');
      },
      error => {
        this.showSpinnerResendConfirmation = false;
      }
    );
  }
}
