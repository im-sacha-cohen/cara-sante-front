import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: JwtHelperService;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  setToken(token: string): void {
    this.localStorageService.setToken(token);
  }

  getToken(): string {
    return this.localStorageService.getToken();
  }

  getDecodedToken(token: string): string {
    return this.jwtHelper.decodeToken(token);
  }

  setEmail(token: string): void {
    const decodedToken = this.getDecodedToken(token);
    // tslint:disable-next-line: no-string-literal
    this.localStorageService.setMail(decodedToken['username']);
  }

  getMail(): string {
    return this.localStorageService.getMail();
  }

  isConnected(): boolean {
    const token = this.localStorageService.getToken();

    if (!this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    return false;
  }

  logout(): void {
    this.localStorageService.removeToken();
    this.router.navigate(['/login']);
  }
}
