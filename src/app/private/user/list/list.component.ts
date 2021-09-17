import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class UsersListComponent implements OnInit {
  showSpinner = true;
  users: any;

  constructor(
    private queryService: QueryService,
    private title: Title
  ) {
    this.title.setTitle('Liora | Cara Santé - Liste utilisateurs');
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.showSpinner = true;

    this.queryService.query(
      'GET',
      '/api/user'
    ).subscribe(
      users => {
        this.users = users;
        this.showSpinner = false;
      },
      error => {
        this.showSpinner = false;
      }
    );
  }
}
