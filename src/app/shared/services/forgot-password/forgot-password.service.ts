import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QueryService } from '../query/query.service';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(
    private httpClient: HttpClient,
    private toastService: ToastService
  ) { }

  async requestPassword(mail: string): Promise<any> {
    return this.httpClient.post(
      environment.apiUrl + '/user/forgot-password',
      {
        email: mail
      }
    ).toPromise();
  }

  async forgotPassword(mail: string): Promise<any> {
    await this.requestPassword(mail);
    this.toastService.set('success', 'Le mail de rénitialisation a bien été envoyé !');
  }
}
