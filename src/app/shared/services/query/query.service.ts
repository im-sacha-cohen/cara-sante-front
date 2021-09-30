import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/service/auth-service.service';
import { catchError, tap } from 'rxjs/operators';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  public query(method: string, url: string, payload?: {}): Observable<any> {
    return this.httpClient.request(
      method,
      environment.apiUrl + url,
      {
        body: payload,
        headers: ({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.getToken()
        })
      }
    ).pipe(
      tap(
        data => {},
        error => {
          if (error.status) {
            if (error?.status === 0 || error?.status[0] === 5) {
              let message: string;

              error.error?.message ? message = error.error.message : message = 'Une erreur s\'est produite';

              this.toastService.set('error', message);
            } else if (error?.status === 401) {
              this.authService.logout();
              this.toastService.set('error', 'Vous avez été déconnecté(e)');
            }
          }
        }
      )
    );
  }
}
