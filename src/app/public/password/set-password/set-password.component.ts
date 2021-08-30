import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_ASYNC_VALIDATORS, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { environment } from 'src/environments/environment';
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons'

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
  errorMessage: string;
  showForm = false;
  setPasswordForm: FormGroup;
  password = faUnlockAlt;

  progressBarPercentage = 0;
  passwordBiggerThan8 = false;
  passwordHas2Numeric = false;
  passwordHas1SpecialChar = false;
  // tslint:disable-next-line: max-line-length
  acceptedSpecialCharacters = ['@', '&', '#', '(', ')', '!', '.', '?', ',', ';', '+', '$', '*', '^', '<', '>', '§', '°', '-', '_', '=', ':'];

  constructor(
    private httpClient: HttpClient,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

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
      resp => {
        this.showSpinner = false;
        this.showForm = true;
      },
      error => {
        console.log('error->', error);
        /*this.showSpinner = false;
        this.isError = true;
        this.errorMessage = error.error.message;*/
      }
    );
    this.showSpinner = false;
    this.showForm = true;
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

  onClick(): void {
    //if 
  }
}
