import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { faUserEdit, faLock } from '@fortawesome/free-solid-svg-icons';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth/service/auth-service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { ForgotPasswordService } from 'src/app/shared/services/forgot-password/forgot-password.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  showSpinner = true;
  user: any;
  update = faUserEdit;
  password = faLock;
  errorMessage: string;
  isError = false;
  showForgotPasswordSpinner = false;

  profileForm: UntypedFormGroup;
  showProfileButtonSpinner = false;

  exports: any;
  showExportListVariable = true;

  constructor(
    private queryService: QueryService,
    private formBuilder: UntypedFormBuilder,
    private title: Title,
    private authService: AuthService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private forgotPasswordService: ForgotPasswordService
  ) {
    this.title.setTitle('Liora | Cara Santé - Mon profile');
  }

  ngOnInit(): void {
    this.getProfile();
    this.buildProfileForm();
  }

  private buildProfileForm(): void {
    this.profileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      phone: [''],
      mail: ['']
    });
  }

  public setExports(exports: any): void {
    console.log('event', exports);
    this.exports = exports;
  }

  onSubmitProfile(): void {
    this.showProfileButtonSpinner = true;
    this.isError = false;

    this.queryService.query(
      'PUT',
      '/api/user/me',
      this.profileForm.value
    ).subscribe(
      resp => {
        this.showProfileButtonSpinner = false;
        this.user = resp;

        this.toastService.set('success', 'Votre profile a bien été modifié ! Veuillez vous reconnecter');
        this.authService.logout();

        if (this.profileForm.value.mail.length > 0) {
          this.localStorageService.setMail(this.profileForm.value.mail);
        }
      },
      error => {
        this.showProfileButtonSpinner = false;
        this.errorMessage = error.error.message;
        console.log(error);
        this.isError = true;
      }
    );
  }

  private getProfile(): void {
    this.showSpinner = true;

    this.queryService.query(
      'GET',
      '/api/user/me'
    ).subscribe(
      user => {
        this.showSpinner = false;
        this.user = user;
        this.profileForm.reset();
      },
      error => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }

  async forgotPassword(): Promise<any> {
    this.showForgotPasswordSpinner = true;
    await this.forgotPasswordService.forgotPassword(this.user.mail);
    this.showForgotPasswordSpinner = false;
  }
}
