// src/app/counter/counter.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

import { BehaviorSubject, of, tap } from 'rxjs';
import { CounterService } from 'src/app/services/counter.service';
describe('CounterComponent (stubbed service)', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let component: CounterComponent;
  let counterSpy: jasmine.SpyObj<CounterService>;
  let value$: BehaviorSubject<number>;

  beforeEach(async () => {
    // New subject for each spec:
    value$ = new BehaviorSubject<number>(0);
    counterSpy = jasmine.createSpyObj(
      'CounterService',
      ['increment'],
      { value$ }
    );

    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
      providers: [
        { provide: CounterService, useValue: counterSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should start with 0, then increment to 1 when clicked', () => {
    let displayed!: number;
    component.count$.subscribe(v => displayed = v);

    // Initial should be zero
    expect(displayed).toBe(0);

    // Stub increment() to push 1 into the subject
    counterSpy.increment.and.callFake(() => {
      value$.next(1);
      return of(1);
    });

    component.incrementCounter();  // calls stubbed increment()
    expect(counterSpy.increment).toHaveBeenCalled();
    expect(displayed).toBe(1);
  });
});
