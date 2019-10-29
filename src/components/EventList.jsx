import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import Event from "./Event";
import PopEvent from "./PopEvent";
import updateNotePosition from "../utils/updateNotePosition";
import "../styles.css";
import uuid from "uuid";

let EventList = ({ events, toggleEvent, popEvent }) => {
  useLayoutEffect(() => {
    updateNotePosition();
  });

  const evenstList = events.map(event => {
    return (
      <ul>
        <div className="event">
          <Event
            key={uuid.v4()}
            {...event}
            onClick={() => toggleEvent(event.id)}
          />
          <PopEvent key={uuid.v4()} onClick={() => popEvent(event.id)} />
        </div>
      </ul>
    );
  });

  return <div className="outer-event-list">{evenstList}</div>;
};

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      isArmed: PropTypes.bool.isRequired,
      content: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleEvent: PropTypes.func.isRequired
};

export default EventList;