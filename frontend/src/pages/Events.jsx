import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import api from "../services/api";

const categories = [
  { value: "", label: "All Categories" },
  { value: "academic", label: "📚 Academic" },
  { value: "cultural", label: "🎭 Cultural" },
  { value: "sports", label: "⚽ Sports" },
  { value: "technical", label: "💻 Technical" },
  { value: "workshop", label: "🔧 Workshop" },
  { value: "seminar", label: "🎤 Seminar" },
  { value: "social", label: "🎉 Social" },
];

// Demo events for when the backend is not available
const demoEvents = [
  {
    id: "demo-1",
    title: "Annual Hackathon 2024",
    description: "Join the biggest coding competition on campus. 48 hours of innovation, mentorship, and prizes! Open to all students.",
    category: "technical",
    venue: "Innovation Hub, Building A",
    startDate: "2024-04-15T09:00:00",
    endDate: "2024-04-17T17:00:00",
    maxParticipants: 200,
    currentParticipants: 145,
    status: "approved",
    isFeatured: true,
    organizer: { firstName: "Tech", lastName: "Club" },
  },
  {
    id: "demo-2",
    title: "Cultural Night Festival",
    description: "Celebrate diversity with performances, food, and art from cultures around the world. Live music, dance, and exhibitions.",
    category: "cultural",
    venue: "University Auditorium",
    startDate: "2024-04-20T18:00:00",
    endDate: "2024-04-20T23:00:00",
    maxParticipants: 500,
    currentParticipants: 320,
    status: "approved",
    isFeatured: true,
    organizer: { firstName: "Cultural", lastName: "Society" },
  },
  {
    id: "demo-3",
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop covering neural networks, deep learning, and practical AI applications. Bring your laptop!",
    category: "workshop",
    venue: "Computer Lab 3, IT Building",
    startDate: "2024-04-22T10:00:00",
    endDate: "2024-04-22T16:00:00",
    maxParticipants: 50,
    currentParticipants: 42,
    status: "approved",
    organizer: { firstName: "AI", lastName: "Lab" },
  },
  {
    id: "demo-4",
    title: "Inter-Department Football Tournament",
    description: "Annual football tournament between departments. Form your team and compete for the championship trophy!",
    category: "sports",
    venue: "University Sports Complex",
    startDate: "2024-05-01T08:00:00",
    endDate: "2024-05-03T18:00:00",
    maxParticipants: 300,
    currentParticipants: 180,
    status: "approved",
    organizer: { firstName: "Sports", lastName: "Council" },
  },
  {
    id: "demo-5",
    title: "Research Symposium 2024",
    description: "Present your research, network with professors, and explore cutting-edge academic work across disciplines.",
    category: "academic",
    venue: "Conference Hall, Main Building",
    startDate: "2024-05-10T09:00:00",
    endDate: "2024-05-10T17:00:00",
    maxParticipants: 100,
    currentParticipants: 67,
    status: "approved",
    organizer: { firstName: "Academic", lastName: "Council" },
  },
  {
    id: "demo-6",
    title: "Startup Pitch Night",
    description: "Pitch your startup ideas to a panel of investors and mentors. Win funding and mentorship for your venture!",
    category: "seminar",
    venue: "Business School Auditorium",
    startDate: "2024-05-15T18:00:00",
    endDate: "2024-05-15T21:00:00",
    maxParticipants: 150,
    currentParticipants: 98,
    status: "approved",
    isFeatured: true,
    organizer: { firstName: "Entrepreneurship", lastName: "Club" },
  },
];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      params.status = "approved";

      const res = await api.get("/events", { params });
      setEvents(res.data.length > 0 ? res.data : demoEvents);
    } catch (err) {
      console.log("Using demo events");
      setEvents(demoEvents);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div id="events-page">
      <Navbar />

      <div style={{ paddingTop: "100px", minHeight: "100vh" }}>
        <div className="container">
          {/* Page Header */}
          <div className="section-header" style={{ marginBottom: "40px" }}>
            <span className="section-label">📅 Events</span>
            <h1 className="section-title">Explore Campus Events</h1>
            <p className="section-subtitle">
              Discover upcoming events across all categories and departments
            </p>
          </div>

          {/* Search & Filters */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "40px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: "280px" }}>
              <input
                type="text"
                className="form-input"
                placeholder="🔍 Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="events-search"
              />
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  className={`btn btn-sm ${selectedCategory === cat.value ? "btn-primary" : "btn-outline"}`}
                  onClick={() => handleCategoryChange(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Info */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <p style={{ fontSize: "0.9rem", color: "var(--dark-400)" }}>
              Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Events Grid */}
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
              <div className="loading-spinner"></div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <h3 className="empty-state-title">No Events Found</h3>
              <p className="empty-state-text">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setSearchTerm("");
                  setSearchParams({});
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
