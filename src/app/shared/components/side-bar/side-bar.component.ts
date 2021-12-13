import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/service/auth-service.service';
import { MainToggleService } from '../../services/main-toggle/main-toggle.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  firstName: string;
  lastName: string;
  isActive = false;
  center = 'Non identifié';

  constructor(
    private authService: AuthService,
    private mainToggleService: MainToggleService
  ) { }

  ngOnInit(): void {
    this.firstName = this.authService.getFirstName();
    this.lastName = this.authService.getLastName();
    this.checkCenterLocation();
  }

  checkCenterLocation(): void {
    const host = window.location.host;
    console.log(host, host.indexOf('belsunce') > -1);
    if (host.indexOf('canebiere') > -1) {
      this.center = 'Centre Canebière';
    } else if (host.indexOf('belsunce') > -1 || host.indexOf('liora.carasante.io') > -1) {
      this.center = 'Centre Belsunce';
    } else {
      this.center = 'Non identifié';
    }
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

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  toggleActive(): void {
    if (window.innerWidth <= 800) {
      this.isActive = !this.isActive;

      if (!this.isActive) {
        this.leave();
      }
    }
  }
}
