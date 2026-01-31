export default function EventCard({ event }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "1rem",
      marginBottom: "1rem",
      borderRadius: "8px"
    }}>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <small>{event.date}</small>
    </div>
  );
}
