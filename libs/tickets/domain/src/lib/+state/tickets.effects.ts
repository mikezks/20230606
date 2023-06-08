import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { FlightService } from "../infrastructure/flight.service";
import { ticketsActions } from "./tickets.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TicketsEffects {
  private actions$ = inject(Actions);
  private flightService = inject(FlightService);

  loadFlights = createEffect(
    /**
     * Stream 1: Redux State Management Action
     *  - Trigger
     *  - Data Provider
     */
    () => this.actions$.pipe(
      // Filtering
      ofType(ticketsActions.flightsLoad),
      /**
       * Stream 2: HTTP Call -> Flights
       */
      switchMap(action => this.flightService.find(
        action.from,
        action.to
      ).pipe(
        // Transformation: Flights -> pack them into an Action
        map(flights => ticketsActions.flightsLoadedSuccess({ flights })),
        // Error Handling
        catchError(err => of(ticketsActions.flightsLoadedError({ error: err })))
      ))
    )
  );
}
