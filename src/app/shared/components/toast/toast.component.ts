import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  title = '';
  type: string;
  message: string;
  icon: string;
  isActive = false;

  constructor(
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.toastService.type.subscribe(type => { this.type = type; });
    this.toastService.message.subscribe(message => { this.message = message; this.setToast(); });
    this.toastService.isActive.subscribe(isActive => { this.isActive = isActive; });
  }

  close(): void {
    this.isActive = false;
  }

  setToast(): void {
    if (this.type === 'error') {
      this.title = 'Erreur';
      this.icon = 'bi bi-x-circle-fill';
    }
  }
}
