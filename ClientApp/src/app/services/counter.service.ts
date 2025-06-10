// src/app/counter.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CounterService {
 
  private _value = new BehaviorSubject<number>(0);

  readonly value$: Observable<number> = this._value.asObservable();


  increment(): void {
    const next = this._value.value + 1;
    this._value.next(next);
  }
}
