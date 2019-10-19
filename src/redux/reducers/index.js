import { combineReducers } from "redux";
import {
  ADD_EVENT,
  TOGGLE_EVENT,
  EDIT_EVENT,
  TOGGLE_PLAYBACK,
  REMOVE_EVENT
} from "../actions";

const initState = {
  isPlaying: false,
  events: []
}

const events = (state = [], action) => {
  switch (action.type) {
    case ADD_EVENT:
      return [
        ...state,
        {
          id: action.id,
          content: action.content, // make sure content is not undefined
          isArmed: true,
        }
      ];
    case REMOVE_EVENT:
      return [...state.slice(0, -1).concat()];
    case TOGGLE_EVENT:
      return state.map(event =>
        event.id === action.id ? { ...event, isArmed: !event.isArmed } : event
      );
    case EDIT_EVENT:
      return state.map(event =>
        event.id === action.id ? { ...event, content: action.content } : event
      );
    default:
      return state;
  }
}

const isPlaying = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_PLAYBACK:
      return !isPlaying
    default:
      return state;
  } 
} 

const rootReducer = combineReducers({
  initState,
  events,
  isPlaying
});

export default rootReducer;
