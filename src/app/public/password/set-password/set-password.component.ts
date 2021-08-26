import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  showSpinner = true;
  token: string;

  constructor(
    private httpClient: HttpClient,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.token = this.router.snapshot.paramMap.get('token');
    this.getUserByToken();
  }

  getUserByToken(): void {
    this.httpClient.get(
      environment.apiUrl + '/user/' + this.token
    ).subscribe(
      resp => {
        console.log('resp->', resp);
        //this.token = resp.token;
      },
      error => {
        console.log('error->', error);
      }
    );
  }
}
