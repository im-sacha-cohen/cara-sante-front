import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/services/auth/service/auth-service.service';

@Component({
  selector: 'app-error-mobile',
  templateUrl: './error-mobile.component.html',
  styleUrls: ['./error-mobile.component.scss']
})
export class ErrorMobileComponent implements OnInit {
  bsModalRef: BsModalRef;
  constructor(
    private authService: AuthService,
    private modal: BsModalService
  ) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.authService.logout();
    this.modal.hide();
  }
}
