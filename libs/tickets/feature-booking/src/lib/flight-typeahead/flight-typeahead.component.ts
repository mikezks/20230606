import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Flight, FlightService } from '@flight-demo/tickets/domain';
import { Observable, catchError, debounceTime, delay, distinctUntilChanged, filter, iif, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'tickets-flight-typeahead',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css'],
})
export class FlightTypeaheadComponent {
  private flightService = inject(FlightService);
  control = new FormControl('', { nonNullable: true });
  flights$ = this.initFlights();
  loading = false;

  private initFlights(): Observable<Flight[]> {
    /**
     * Stream 1: Input User Text Change
     *  - Trigger
     *  - Data Provider
     */
    return this.control.valueChanges.pipe(
      // Filtering STARTS
      filter(airport => airport.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      // Filtering ENDS,
      // Side-Effect: Loading
      tap(() => this.loading = true),
      /**
       * Stream 2: HTTP Call -> Flight Data
       *  - Data Provider
       */
      switchMap(airport =>
        iif(
          () => airport.length > 2,
          this.flightService.find(airport, '').pipe(
            catchError(()=> of([]))
          ),
          of([])
        )
      ),
      // Side-Effect: Loading
      tap(() => this.loading = false),
    );
  }
}
