import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
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
    );
  }
}
