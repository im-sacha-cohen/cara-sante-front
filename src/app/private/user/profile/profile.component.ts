import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { faUserEdit, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

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

  profileForm: FormGroup;
  showProfileButtonSpinner = false;

  constructor(
    private queryService: QueryService,
    private formBuilder: FormBuilder,
    private title: Title
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

    this.queryService.query(
      'PUT',
      '/api/user/me',
      this.profileForm.value
    ).subscribe(
      resp => {
        this.showProfileButtonSpinner = false;
        this.user = resp;
      },
      error => {
        this.showProfileButtonSpinner = false;
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
