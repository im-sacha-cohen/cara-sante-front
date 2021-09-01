import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  formForgotPassword: FormGroup;
  showAlert = false;
  showSpinner = false;
  alertMessage: string;
  alertType: string;

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private httpClient: HttpClient,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.formForgotPassword = this.formBuilder.group({
      email: [this.getMail(), Validators.required]
    });
  }

  getMail(): string {
    return this.localStorageService.getMail();
  }

  onSubmit(): void {
    this.showSpinner = true;

    this.httpClient.request(
      'POST',
      environment.apiUrl + '/user/forgot-password',
      this.formForgotPassword.value
    ).subscribe(
      resp => {
        this.showSpinner = false;
        this.showAlert = true;
        this.alertType = 'info';
        this.alertMessage = 'Si un compte existe à cette adresse, un lien de réinitialisation sera envoyé. Pensez à vérifier les spams !';
        this.formForgotPassword.setValue({ email: '' });
      },
      err => {
        this.showSpinner = false;
        this.toast.set('error', 'Une erreur s\'est produite');
      }
    );
  }
}
