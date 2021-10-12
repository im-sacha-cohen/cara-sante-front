import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { faVirusSlash, faNotesMedical, faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth/service/auth-service.service';
import { Title } from '@angular/platform-browser';
import { ModalFillTestComponent } from './modal-fill-test/modal-fill-test.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detail-to-take-patient',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailToTakePatientComponent implements OnInit, OnDestroy {
  patientRef: any;
  ref: any;
  showSpinner = true;
  showButtonSpinner = false;
  patient: any;
  today = new Date().toISOString();
  faVirusSlash = faVirusSlash;
  faHandHoldingMedical = faHandHoldingMedical;
  nir = faNotesMedical;
  errorUpdatingBy = false;
  bsModalRef: BsModalRef;

  constructor(
    private route: ActivatedRoute,
    private queryService: QueryService,
    private authService: AuthService,
    private title: Title,
    private modalService: BsModalService
  ) {
    this.title.setTitle('Liora | Cara Santé - Saisit patient');
  }

  ngOnInit(): void {
    this.patientRef = this.route.snapshot.paramMap.get('patientRef');
    this.getDetailToTakePatient();
  }

  ngOnDestroy(): void {
    this.editUpdating(false);
  }

  getDetailToTakePatient(): void {
    this.showSpinner = true;

    this.queryService.query(
      'GET',
      '/api/patient/' + this.patientRef
    ).subscribe(
      resp => {
        this.showSpinner = false;
        this.patient = resp;
        const isAlreadyUpdating = this.isAlreadyUpdating();
        this.toggleUpdating(isAlreadyUpdating);
      },
      error => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }

  isAlreadyUpdating(): boolean {
    let isUpdating = false;

    this.patient.detectionTest.forEach(detectionTest => {
      if (detectionTest.isUpdating && detectionTest.updatingBy.ref !== this.authService.getRef()) {
        isUpdating = true;
      }
    });

    return isUpdating;
  }

  toggleUpdating(isAlreadyUpdating: boolean): void {
    if (isAlreadyUpdating) {
      this.errorUpdatingBy = true;
    } else {
      this.editUpdating(true);
    }
  }

  editUpdating(updating: boolean): void {
    this.patient.detectionTest.forEach((detectionTest, index) => {
      if (!detectionTest.isUpdating && !detectionTest.isInvoiced) {
        this.ref = detectionTest.ref;
      } else if ((this.patient.detectionTest.length - 1) === index) {
        this.ref = detectionTest.ref;
      }
    });

    this.queryService.query(
      'PUT',
      '/api/detection-test/updating',
      {
        isUpdating: updating,
        ref: this.ref
      }
    ).subscribe(
      resp => {
        console.log(resp);
      },
      err => {
        console.log(err);
      }
    );
  }

  openModal(test: any[]): void {
    this.bsModalRef = this.modalService.show(ModalFillTestComponent, {
      initialState: {
        detectionTest: test
      },
      animated: true
    });
    this.bsModalRef.content.onClose = () => {
      this.getDetailToTakePatient();
      this.bsModalRef.hide();
    };
  }
}
