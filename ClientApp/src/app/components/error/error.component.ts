import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  errorMessage$: Observable<string>;

  constructor(private errorService: ErrorService) {
    this.errorMessage$ = this.errorService.errors$;
  }
}