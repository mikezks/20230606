import { createActionGroup, emptyProps, props} from '@ngrx/store';
import { Flight } from '../entities/flight';


export const ticketsActions = createActionGroup({
  source: 'tickets',
  events: {
    'flights load': props<{ from: string; to: string }>(),
    'flights loaded success': props<{ flights: Flight[] }>(),
    'flights loaded error': props<{ error: any }>(),
    'flight update': props<{ flight: Flight }>(),
    'flights clear': emptyProps()
  }
});
