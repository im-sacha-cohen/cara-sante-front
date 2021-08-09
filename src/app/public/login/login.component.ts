import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  showSpinner = false;
  isError = false;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.formLogin = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      username: [this.authService.getMail(), Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.showSpinner = true;
    this.isError = false;

    this.httpClient.post(
      environment.apiUrl + '/login',
      this.formLogin.value
    ).subscribe(
      response => {
        this.showSpinner = false;
        this.authService.setToken(response.token);
        this.authService.setEmail(response.token);
      },
      error => {
        this.showSpinner = false;
        this.isError = true;

        if (error.status === 401) {
          this.errorMessage = 'L\'adresse mail et/ou le mot de passe est erroné';
        } else {
          this.errorMessage = error.error?.message;
        }
      }
    );
  }
}
