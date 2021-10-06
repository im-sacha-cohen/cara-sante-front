import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  showSpinner = false;
  contactForm: FormGroup;

  constructor(
    private queryService: QueryService,
    private formBuilder: FormBuilder,
    private toastr: ToastService
  ) { }

  ngOnInit(): void {
    this.buildContactForm();
  }

  buildContactForm(): void {
    this.contactForm = this.formBuilder.group({
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onClick(): void {
    this.showSpinner = true;

    this.queryService.query(
      'POST',
      '/api/contact',
      this.contactForm.value
    ).subscribe(
      resp => {
        this.showSpinner = false;
        this.toastr.set('success', 'Le message a bien été envoyé !');
        this.buildContactForm();
      },
      error => {
        this.showSpinner = false;
      }
    );
  }
}
