import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ForgotPasswordService } from 'src/app/shared/services/forgot-password/forgot-password.service';
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
    private toast: ToastService,
    private title: Title,
    private forgotPasswordService: ForgotPasswordService
  ) {
    this.title.setTitle('Liora | Cara Santé - Mot de passe oublié');
  }

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

  async onSubmit(): Promise<any> {
    this.showSpinner = true;
    await this.forgotPasswordService.forgotPassword(this.formForgotPassword.value.email);

    this.showSpinner = false;
    this.showAlert = true;
    this.alertType = 'info';
    this.alertMessage = 'Si un compte existe à cette adresse, un lien de réinitialisation sera envoyé. Pensez à vérifier les spams !';
    this.formForgotPassword.setValue({ email: '' });
  }
}
