import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ErrorMobileComponent } from 'src/app/shared/components/modal/error-mobile/error-mobile.component';
import { MainToggleService } from 'src/app/shared/services/main-toggle/main-toggle.service';

@Component({
  selector: 'app-main-private',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainPrivateComponent implements OnInit {
  isDark = false;
  bsModalRef: BsModalRef;

  constructor(
    private mainToggleService: MainToggleService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.toggleModalMobile();
    this.mainToggleService.isDark.subscribe(
      toggle => {
        this.isDark = toggle;
      }
    );
  }

  toggleModalMobile(): void {
    if (window.innerWidth <= 800) {
      const config = {
        backdrop: true,
        ignoreBackdropClick: true,
        keyboard: false
      };

      this.bsModalRef = this.modalService.show(ErrorMobileComponent, config);
    }
  }
}
