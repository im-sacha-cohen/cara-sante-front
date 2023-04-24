import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/service/auth-service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: UntypedFormGroup;
  showSpinner = false;
  isError = false;
  errorMessage: string;

  isAlreadyConnected = false;
  firstName: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastService,
    private title: Title
  ) {
    this.title.setTitle('Liora | Cara Santé - Connexion');
  }

  ngOnInit(): void {
    if (this.authService.isConnected()) {
      this.isAlreadyConnected = true;
      this.firstName = this.authService.getFirstName();
    } else {
      this.formLogin = this.buildForm();
    }
  }

  buildForm(): UntypedFormGroup {
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
      (response: { token: string })  => {
        this.showSpinner = false;
        this.authService.setToken(response.token);
        this.authService.setEmail(response.token);

        this.router.navigate(['/home']);
      },
      error => {
        this.showSpinner = false;

        if (error.status === 401) {
          this.isError = true;
          this.errorMessage = 'L\'adresse mail et/ou le mot de passe est erroné';
        } else if (error.status === 0 || error.status[0] === 5) {
          this.toastrService.set('error', 'Une erreur s\'est produite');
        } else {
          this.errorMessage = error.error?.message;
        }
      }
    );
  }
}
