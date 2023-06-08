import { createFeature, createReducer, on } from "@ngrx/store";
import { Flight } from "../entities/flight";
import { ticketsActions } from "./tickets.actions";


export interface TicketsState {
  flights: Flight[];
  basket: unknown;
  tickets: unknown;
  bookings: {
    flightId: number;
    passengerId: number;
  }[];
  passengers: Record<number, {
    id: number;
    name: string;
  }>;
  user: {
    username: string;
    passengerId: number;
  };
}

export const initialTicketsState: TicketsState = {
  flights: [],
  basket: {},
  tickets: {},
  bookings: [
    { passengerId: 1, flightId: 1286 },
    // { passengerId: 1, flightId: 1287 },
    { passengerId: 1, flightId: 1288 },
  ],
  passengers: {
    1: { id: 1, name: 'Michael Egger-Zikes' }
  },
  /* passengerIds: [
    2, 1, 5, 3, 7, 15
  ], */
  user: {
    username: 'michael.egger-zikes',
    passengerId: 1
  }
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
