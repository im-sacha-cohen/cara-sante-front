import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm: UntypedFormGroup;
  showSpinner = false;
  isError = false;
  errorMessage: string;
  errorType: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private queryService: QueryService,
    private toastService: ToastService,
    private title: Title
  ) {
    this.title.setTitle('Liora | Cara Santé - Ajout utilisateur');
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.addUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onClick(): void {
    this.showSpinner = true;
    this.isError = false;

    this.queryService.query(
      'POST',
      '/api/user',
      this.addUserForm.value
    ).subscribe(
      resp => {
        this.showSpinner = false;

        if (resp.status === 200) {
          this.isError = true;
          this.errorMessage = resp.message;
          this.errorType = 'warning';
        }

        this.toastService.set('success', 'L\'utilisateur a bien été ajouté !');
        this.buildForm();
      },
      error => {
        this.showSpinner = false;
        this.isError = true;
        this.errorMessage = error.error.message ? error.error.message : error.statusText;
        this.errorType = 'danger';
        console.log(error);
      }
    );
  }
}
