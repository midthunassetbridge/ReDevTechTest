import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler,
  HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { SpinnerService } from './services/spinner.service';
import { ErrorService } from './services/error.service';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private spinner: SpinnerService,
    private errorService: ErrorService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Show spinner on request start
    this.spinner.show();
   console.log('HTTP Request started:', req.url);
    return next.handle(req).pipe(
      // Catch and report errors
      catchError((err: HttpErrorResponse) => {
        const msg = err.error?.message || err.statusText || 'Server Error';
        this.errorService.report(msg);
        return throwError(() => err);
      }),
      // Hide spinner on both success and error
      finalize(() => this.spinner.hide())
    );
  }
}