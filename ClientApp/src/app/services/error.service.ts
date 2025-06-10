import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private _errors = new Subject<string>();
  readonly errors$: Observable<string> = this._errors.asObservable();

  report(message: string): void {
    this._errors.next(message);
  }
   clear(): void {
    this._errors.next('');
  }
}