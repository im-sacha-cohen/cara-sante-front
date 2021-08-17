import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class UsersDetailComponent implements OnInit {
  id: any;
  user: any;
  showSpinner = true;

  constructor(
    private route: ActivatedRoute,
    private queryService: QueryService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
  }

  getUser(): void {
    this.showSpinner = true;

    this.queryService.query(
      'GET',
      '/api/user/' + this.id
    ).subscribe(
      //
    );
  }
}
