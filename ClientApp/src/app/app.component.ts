import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorService } from './services/error.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  errorMessage$: Observable<string>;
  
  constructor(
  
    private errorSvc: ErrorService,
    private router: Router
  ) {
   
    this.errorMessage$ = this.errorSvc.errors$;

    
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationStart) {
        this.errorSvc.clear();
      }
    });
  }
}
