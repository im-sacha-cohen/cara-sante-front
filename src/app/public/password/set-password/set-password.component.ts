import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from '../../../shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  showSpinner = true;
  showButtonSpinner = false;
  token: string;
  isError: boolean;
  showAlert: boolean;
  alertMessage: string;
  showForm = false;
  setPasswordForm: FormGroup;
  password = faUnlockAlt;
  alertType: string;

  progressBarPercentage = 0;
  passwordBiggerThan8 = false;
  passwordHas2Numeric = false;
  passwordHas1SpecialChar = false;
  // tslint:disable-next-line: max-line-length
  acceptedSpecialCharacters = ['@', '&', '#', '(', ')', '!', '.', '?', ',', ';', '+', '$', '*', '^', '<', '>', '§', '°', '-', '_', '=', ':'];

  constructor(
    private httpClient: HttpClient,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private title: Title,
    private localStorageService: LocalStorageService
  ) {
    this.title.setTitle('Liora | Cara Santé - Création mot de passe');
  }

  ngOnInit(): void {
    this.token = this.router.snapshot.paramMap.get('token');
    this.getUserByToken();
    this.buildForm();
  }

  buildForm(): void {
    this.setPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  getUserByToken(): void {
    this.httpClient.get(
      environment.apiUrl + '/user/' + this.token
    ).subscribe(
      (resp: { token: string }) => {
        this.showSpinner = false;
        this.showForm = true;
        this.token = resp.token;
      },
      error => {
        this.showSpinner = false;
        this.isError = true;
        this.alertMessage = error.error.message;
      }
    );
  }

  verifyPassword(): void {
    const password = this.setPasswordForm.value.password;
    const passwordArray = password.split('');
    let passwordNumeric = 0;
    const numerics = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let passworsSpecialChar = 0;

    if (password.length >= 8) {
      this.passwordBiggerThan8 = true;
    } else {
      this.passwordBiggerThan8 = false;
    }

    passwordArray.forEach(el => {
      // tslint:disable-next-line: radix
      if (numerics.includes(parseInt(el))) {
        passwordNumeric += 1;
      }

      if (this.acceptedSpecialCharacters.includes(el)) {
        passworsSpecialChar += 1;
      }

      if (passwordNumeric >= 2) {
        this.passwordHas2Numeric = true;
      } else {
        this.passwordHas2Numeric = false;
      }

      if (passworsSpecialChar >= 1) {
        this.passwordHas1SpecialChar = true;
      } else {
        this.passwordHas1SpecialChar = false;
      }
    });
  }

  isBothPasswordMatches(password: string, passwordConfirm: string): boolean {
    if (password === passwordConfirm) {
      return true;
    }

    return false;
  }

  onClick(): void {
    const password = this.setPasswordForm.value.password;
    const passwordConfirm = this.setPasswordForm.value.confirmPassword;
    this.showAlert = false;

    if (this.isBothPasswordMatches(password, passwordConfirm)) {
      this.showButtonSpinner = true;

      this.httpClient.post(
        environment.apiUrl + '/user/set-password/' + this.token,
        this.setPasswordForm.value
      ).subscribe(
        resp => {
          this.showButtonSpinner = false;
          this.showAlert = true;
          this.alertType = 'success';
          this.alertMessage = 'Votre mot de passe a été créé ! Veuillez maintenant vous connecter';
          this.buildForm();

          this.passwordBiggerThan8 = false;
          this.passwordHas2Numeric = false;
          this.passwordHas1SpecialChar = false;
          this.localStorageService.removeToken();
        },
        error => {
          this.showButtonSpinner = false;
          this.toastService.set('error', error.statusText);
          this.alertType = 'danger';
        }
      );
    } else {
      this.showAlert = true;
      this.alertMessage = 'Les deux mots de passe ne correspondent pas';
      this.alertType = 'danger';
    }
  }
}
