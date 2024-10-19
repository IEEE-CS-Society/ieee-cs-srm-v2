import React from 'react';
import EventCard from './EventCard';

const EventGrid = ({ events, setSelectedEvent }) => {
  return (
    <div className="events-grid">
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          event={event} 
          onClick={() => setSelectedEvent(event)}
        />
      ))}
    </div>
  );
};

export default EventGrid;