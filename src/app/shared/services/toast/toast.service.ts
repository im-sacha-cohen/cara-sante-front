import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  type = new Subject<'success'|'error'|'warning'|'info'>();
  message = new Subject<string>();
  isActive = new Subject<boolean>();
  timeout: any;

  constructor() { }

  public set(type: 'success'|'error'|'warning'|'info', message: string): void {
    this.type.next(type);
    this.message.next(message);
    this.isActive.next(true);
    this.timeoutActive();
  }

  timeoutActive(): void {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.isActive.next(false);
    }, 6000);
  }
}
