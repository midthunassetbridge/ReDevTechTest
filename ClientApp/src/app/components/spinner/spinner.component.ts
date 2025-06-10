import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  loading$: Observable<boolean>;

  constructor(private spinner: SpinnerService) {
    this.loading$ = this.spinner.loading$;
  }
}