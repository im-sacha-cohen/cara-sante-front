import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  showSpinner = false;
  contactForm: UntypedFormGroup;
  subject: string;

  constructor(
    private queryService: QueryService,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToastService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['subject']) {
        this.subject = params['subject'] + ' ' + params['ref'];
      }
    });
  }

  ngOnInit(): void {
    this.buildContactForm();
  }

  buildContactForm(): void {
    this.contactForm = this.formBuilder.group({
      subject: [this.subject, Validators.required],
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
