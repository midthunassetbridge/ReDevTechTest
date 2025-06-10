import { Component } from '@angular/core';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  count$ = this.counter.value$;
  constructor(private counter: CounterService) {

  }
  public incrementCounter() {
    this.counter.increment();
  }
}
