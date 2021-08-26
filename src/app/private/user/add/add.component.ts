import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  showSpinner = false;
  isError = false;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private queryService: QueryService
  ) { }

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
      },
      error => {
        this.showSpinner = false;
        this.isError = true;
        this.errorMessage = error.error.message;
        console.log(error);
      }
    );
  }
}
