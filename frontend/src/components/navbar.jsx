import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#1e293b", color: "white", display: "flex", gap: "1rem" }}>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>EventHive</Link>
      <Link to="/events" style={{ color: "white", textDecoration: "none" }}>Events</Link>
      <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
    </nav>
  );
}
