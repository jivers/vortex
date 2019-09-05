import { combineReducers } from "redux";
import {
  ADD_EVENT,
  TOGGLE_EVENT,
  EDIT_EVENT,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
  REMOVE_EVENT
} from "../actions";

const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function events(state = [], action) {
  switch (action.type) {
    case ADD_EVENT:
      return [
        ...state,
        {
          id: action.id,
          content: action.content, // make sure content is not undefined
          selected: false
        }
      ];
    case REMOVE_EVENT:
      return [...state.slice(0, -1).concat()];
    case EDIT_EVENT:
      return state.map(event =>
        event.id === action.id ? { ...event, content: action.content } : event
      );
    case TOGGLE_EVENT:
      return state.map(event =>
        event.id === action.id ? { ...event, selected: !event.selected } : event
      );
    default:
      return state;
  }
}

const vortexApp = combineReducers({
  visibilityFilter,
  events
});

export default vortexApp;
