import { combineReducers } from "redux";
import {
  ADD_EVENT,
  TOGGLE_EVENT,
  EDIT_EVENT,
  TOGGLE_PLAYBACK,
  REMOVE_EVENT,
  POP_EVENT
} from "../actions";

const initState = {
  playback: true,
  events: [
    { id: 0, content: "F4", isArmed: true },
    { id: 1, content: "", isArmed: true },
    { id: 2, content: "D4", isArmed: true },
    { id: 3, content: "C5", isArmed: true },
    { id: 4, content: "A#3", isArmed: true },
    { id: 5, content: "F5", isArmed: true },
    { id: 6, content: "", isArmed: true },
    { id: 7, content: "C3", isArmed: true }
  ]
};

const increment = () => {
  n += 1;
  return n;
};

let n = -1;

const events = (events = initState.events, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return [
        ...events,
        {
          id: action.id,
          content: action.content, 
          isArmed: action.isArmed
        }
      ];

    case REMOVE_EVENT:
      return [...events.slice(0, -1).concat()];

    case POP_EVENT:
      n = -1;
      return events
        .filter(event => {
          return event.id !== action.id;
        })
        .map(event => {
          return {
            ...event,
            id: increment()
          };
          /* 
          Increment ensures that event.id is always equal to the events array index, 
           helping keep scheduling and event handling correct during sequencing
        */
        });

    case TOGGLE_EVENT:
      return events.map(event =>
        event.id === action.id ? { ...event, isArmed: !event.isArmed } : event
      );

    case EDIT_EVENT:
      return events.map(event =>
        event.id === action.id ? { ...event, content: action.content } : event
      );

    default:
      return events;
  }
};

const playback = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_PLAYBACK:
      return { playback: !state.playback };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  initState,
  events,
  playback
});

export default rootReducer;
