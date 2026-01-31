const API_BASE = "http://localhost:3000/api";

export async function getEvents() {
  const res = await fetch(`${API_BASE}/events`);
  return res.json();
}
