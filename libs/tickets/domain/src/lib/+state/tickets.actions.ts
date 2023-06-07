import { createActionGroup, emptyProps, props} from '@ngrx/store';
import { Flight } from '../entities/flight';


export const ticketsActions = createActionGroup({
  source: 'tickets',
  events: {
    'flights loaded success': props<{ flights: Flight[] }>(),
    'flight update': props<{ flight: Flight }>(),
    'flights clear': emptyProps()
  }
});
