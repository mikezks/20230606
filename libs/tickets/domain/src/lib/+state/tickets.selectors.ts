import { createSelector } from "@ngrx/store";
import { ticketsFeature } from "./tickets.reducer";

export const selectActiveUserFlights = createSelector(
  // Selectors
  ticketsFeature.selectFlights,
  ticketsFeature.selectBookings,
  ticketsFeature.selectUser,
  // Projector
  (flights, bookings, user) => {
    const activeUserPassengerId = user.passengerId;
    const activeUserFlightIds = bookings
      .filter(booking => booking.passengerId === activeUserPassengerId)
      .map(booking => booking.flightId);
    const activeUserFlights = flights
      .filter(flight => activeUserFlightIds.includes(flight.id));

    return activeUserFlights;
  }
)
