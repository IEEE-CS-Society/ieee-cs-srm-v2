import React from 'react';
import { FaMicrophone, FaCode, FaLaptopCode, FaBrain, FaShieldAlt, FaNetworkWired, FaRegCalendar, FaRegClock, FaMapMarkerAlt } from "react-icons/fa";

const EventCard = ({ event, onClick }) => {
  const iconMap = {
    "fa-microphone": <FaMicrophone />,
    "fa-code": <FaCode />,
    "fa-laptop-code": <FaLaptopCode />,
    "fa-brain": <FaBrain />,
    "fa-shield-alt": <FaShieldAlt />,
    "fa-network-wired": <FaNetworkWired />,
  };

  return (
    <div className="event-card" onClick={() => onClick(event)}>
      <div className="event-image-container">
        <img src={event.image} alt={event.title} className="event-image" />
      </div>
      <div className="event-header">
        <div className="event-icon">{iconMap[event.icon]}</div>
        <h2 className="event-title">{event.title}</h2>
      </div>
      <div className="event-details">
        <div className="event-detail">
          <div className="event-detail-label">Date</div>
          <div className="event-detail-value">
            <FaRegCalendar className="event-icon-small" />  {event.date}
          </div>
        </div>
        <div className="event-detail">
          <div className="event-detail-label">Time</div>
          <div className="event-detail-value">
            <FaRegClock className="event-icon-small" /> {event.time}
          </div>
        </div>
        <div className="event-detail">
          <div className="event-detail-label">Venue</div>
          <div className="event-detail-value">
            <FaMapMarkerAlt className="event-icon-small" /> {event.venue}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;