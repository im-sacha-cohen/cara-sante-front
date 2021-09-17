import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { faUserEdit, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth/service/auth-service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

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

  profileForm: FormGroup;
  showProfileButtonSpinner = false;

  constructor(
    private queryService: QueryService,
    private formBuilder: FormBuilder,
    private title: Title,
    private authService: AuthService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService
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

  alert(): void {
    alert('Cette fonctionnalité n\'est pour le moment pas disponible');
  }
}
