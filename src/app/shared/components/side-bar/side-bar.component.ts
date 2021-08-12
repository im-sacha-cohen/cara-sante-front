import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/service/auth-service.service';
import { MainToggleService } from '../../services/main-toggle/main-toggle.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private mainToggleService: MainToggleService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

  enter(): void {
    this.mainToggleService.isDark.next(true);
  }

  leave(): void {
    this.mainToggleService.isDark.next(false);
  }
}
