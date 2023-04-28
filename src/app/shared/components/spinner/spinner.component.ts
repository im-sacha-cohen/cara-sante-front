import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() showSpinner: boolean;
  @Input() blueMedium = false;
  @Input() white = false;

  ngOnInit() {
    console.log(this.blueMedium);
    console.log(this.white);
  }
}
