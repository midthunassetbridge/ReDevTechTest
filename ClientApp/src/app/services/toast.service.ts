// src/app/toast.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface ToastMessage {
  type: 'success' | 'error';
  text: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _messages = new Subject<ToastMessage>();
  readonly messages$: Observable<ToastMessage> = this._messages.asObservable();

  success(text: string) {
    this._messages.next({ type: 'success', text });
  }

  error(text: string) {
    this._messages.next({ type: 'error', text });
  }
}
