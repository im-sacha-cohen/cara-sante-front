import { Component, OnInit } from '@angular/core';
import { MainToggleService } from 'src/app/shared/services/main-toggle/main-toggle.service';

@Component({
  selector: 'app-main-private',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainPrivateComponent implements OnInit {
  isDark = false;

  constructor(
    private mainToggleService: MainToggleService
  ) { }

  ngOnInit(): void {
    this.mainToggleService.isDark.subscribe(
      toggle => {
        this.isDark = toggle;
      }
    );
  }
}
