import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import { FaMicrophone, FaCode, FaLaptopCode, FaBrain, FaShieldAlt, FaNetworkWired, FaRegCalendar, FaRegClock, FaMapMarkerAlt } from "react-icons/fa";

const EventModal = ({ event, onClose }) => {
  const [isRegistrationVisible, setRegistrationVisible] = useState(false);
  const iconMap = {
    "fa-microphone": <FaMicrophone />,
    "fa-code": <FaCode />,
    "fa-laptop-code": <FaLaptopCode />,
    "fa-brain": <FaBrain />,
    "fa-shield-alt": <FaShieldAlt />,
    "fa-network-wired": <FaNetworkWired />,
  };

  const handleRegisterClick = () => {
    setRegistrationVisible(true);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-header">
          <div className="modal-icon">{iconMap[event.icon]}</div>
          <h2 className="modal-title">{event.title}</h2>
        </div>
        <div className="modal-details">
          <div className="modal-detail-box">
            <div className="modal-detail-label">Date</div>
            <div className="modal-detail-value">
              <FaRegCalendar className="event-icon-small" /> {event.date}
            </div>
          </div>
          <div className="modal-detail-box">
            <div className="modal-detail-label">Time</div>
            <div className="modal-detail-value">
              <FaRegClock className="event-icon-small" /> {event.time}
            </div>
          </div>
          <div className="modal-detail-box">
            <div className="modal-detail-label">Venue</div>
            <div className="modal-detail-value">
              <FaMapMarkerAlt className="event-icon-small" /> {event.venue}
            </div>
          </div>
        </div>
        <div className="info-box">
          <div className="info-heading">Event Information</div>
          <ul className="event-description">
            {event.info.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>

        {!isRegistrationVisible ? (
          <button className="register-button" onClick={handleRegisterClick}>
            Register
          </button>
        ) : (
          <RegistrationForm />
        )}
      </div>
    </div>
  );
};

export default EventModal;