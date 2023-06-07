import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, share, tap, timer } from 'rxjs';

@Component({
  selector: 'tickets-flight-typeahead',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css'],
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$ = timer(0, 1_000).pipe(
    tap(num => console.log('Observable produces value', num)),
    // share()
  );
  subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.timer$.subscribe(console.log)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
