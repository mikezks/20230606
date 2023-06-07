import { createFeature, createReducer, on } from "@ngrx/store";
import { Flight } from "../entities/flight";
import { ticketsActions } from "./tickets.actions";


export interface TicketsState {
  flights: Flight[];
  basket: unknown;
  tickets: unknown;
}

export const initialTicketsState: TicketsState = {
  flights: [],
  basket: {},
  tickets: {}
};


export const ticketsFeature = createFeature({
  name: 'tickets',
  reducer: createReducer(
    initialTicketsState,

    on(ticketsActions.flightsLoadedSuccess, (state, action) => ({
      ...state,
      flights: action.flights
    })),
  )
});
