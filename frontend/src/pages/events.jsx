import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getEvents } from "../services/api";
import EventCard from "../components/EventCard";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        <h2>Upcoming Events</h2>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </main>
    </>
  );
}
