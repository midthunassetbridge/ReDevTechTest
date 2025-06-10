// src/app/toast/toast.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { ToastMessage, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit, OnDestroy {
  currentMsg: ToastMessage | null = null;
  private sub!: Subscription;

  constructor(private toast: ToastService) {}

  ngOnInit() {
    this.sub = this.toast.messages$.subscribe(msg => {
      this.currentMsg = msg;
      // auto-dismiss after 3s
      setTimeout(() => this.currentMsg = null, 3000);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
