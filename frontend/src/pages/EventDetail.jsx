import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { format } from "date-fns";

export default function EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchEvent();
    }, [id]);

    const fetchEvent = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/events/${id}`);
            setEvent(res.data);
        } catch (err) {
            // Use demo data
            setEvent({
                id,
                title: "Annual Hackathon 2024",
                description:
                    "Join the biggest coding competition on campus! This 48-hour hackathon brings together the brightest minds to solve real-world problems through technology.\n\nWhat to expect:\n- Mentorship from industry experts\n- $10,000 in prizes\n- Free food and drinks\n- Networking opportunities\n- Workshops and talks\n\nOpen to all students regardless of experience level.",
                category: "technical",
                venue: "Innovation Hub, Building A",
                startDate: "2024-04-15T09:00:00",
                endDate: "2024-04-17T17:00:00",
                maxParticipants: 200,
                currentParticipants: 145,
                status: "approved",
                isFeatured: true,
                contactEmail: "tech.club@university.edu",
                organizer: { id: "1", firstName: "Tech", lastName: "Club", email: "tech@uni.edu" },
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        setRegistering(true);
        try {
            await api.post("/registrations", { eventId: event.id });
            setRegistered(true);
            setMessage("Successfully registered! 🎉");
        } catch (err) {
            setMessage(err.response?.data?.message || "Registration failed");
        } finally {
            setRegistering(false);
        }
    };

    const formatDate = (dateStr) => {
        try {
            return format(new Date(dateStr), "EEEE, MMMM dd, yyyy 'at' hh:mm a");
        } catch {
            return dateStr;
        }
    };

    const getCapacityPercentage = () => {
        if (!event) return 0;
        return Math.round((event.currentParticipants / event.maxParticipants) * 100);
    };

    if (loading) {
        return (
            <div id="event-detail-page">
                <Navbar />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                    }}
                >
                    <div className="loading-spinner"></div>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div id="event-detail-page">
                <Navbar />
                <div className="container" style={{ paddingTop: "120px" }}>
                    <div className="empty-state">
                        <div className="empty-state-icon">🔍</div>
                        <h3 className="empty-state-title">Event Not Found</h3>
                        <p className="empty-state-text">This event may have been removed or doesn't exist.</p>
                        <Link to="/events" className="btn btn-primary">
                            Browse Events
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const categoryIcons = {
        academic: "📚",
        cultural: "🎭",
        sports: "⚽",
        technical: "💻",
        workshop: "🔧",
        seminar: "🎤",
        social: "🎉",
        other: "📌",
    };

    return (
        <div id="event-detail-page">
            <Navbar />

            <div className="event-detail">
                <div className="container">
                    {/* Breadcrumb */}
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                            marginBottom: "24px",
                            fontSize: "0.9rem",
                            color: "var(--dark-400)",
                        }}
                    >
                        <Link to="/events" style={{ color: "var(--primary-400)" }}>
                            Events
                        </Link>
                        <span>→</span>
                        <span>{event.title}</span>
                    </div>

                    {/* Hero Image */}
                    <div className="event-detail-hero">
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "6rem",
                                background: "linear-gradient(135deg, var(--dark-800), var(--dark-700))",
                            }}
                        >
                            {categoryIcons[event.category] || "📌"}
                        </div>
                        <div className="event-detail-hero-overlay"></div>
                    </div>

                    {/* Content Grid */}
                    <div className="event-detail-content">
                        <div className="event-detail-main">
                            <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                                <span className="badge badge-accent">{event.category}</span>
                                {event.isFeatured && (
                                    <span className="badge badge-primary">⭐ Featured</span>
                                )}
                                <span
                                    className={`badge badge-${event.status === "approved" ? "success" : event.status === "pending" ? "warning" : "error"}`}
                                >
                                    {event.status}
                                </span>
                            </div>

                            <h1>{event.title}</h1>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "16px",
                                    alignItems: "center",
                                    margin: "16px 0 24px",
                                }}
                            >
                                {event.organizer && (
                                    <div className="event-card-organizer">
                                        <div className="event-card-avatar">
                                            {event.organizer.firstName?.[0]}
                                            {event.organizer.lastName?.[0]}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "white" }}>
                                                {event.organizer.firstName} {event.organizer.lastName}
                                            </div>
                                            <div style={{ fontSize: "0.8rem", color: "var(--dark-400)" }}>
                                                Organizer
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div
                                style={{
                                    fontSize: "1rem",
                                    color: "var(--dark-300)",
                                    lineHeight: "1.8",
                                    whiteSpace: "pre-line",
                                }}
                            >
                                {event.description}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="event-detail-sidebar">
                            <div className="event-detail-info-card">
                                <h3
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "1.1rem",
                                        fontWeight: "700",
                                        color: "white",
                                        marginBottom: "16px",
                                    }}
                                >
                                    Event Details
                                </h3>

                                <div className="event-detail-info-row">
                                    <span>📅</span>
                                    <div>
                                        <div style={{ fontSize: "0.8rem", color: "var(--dark-500)" }}>Start</div>
                                        <span>{formatDate(event.startDate)}</span>
                                    </div>
                                </div>

                                <div className="event-detail-info-row">
                                    <span>📅</span>
                                    <div>
                                        <div style={{ fontSize: "0.8rem", color: "var(--dark-500)" }}>End</div>
                                        <span>{formatDate(event.endDate)}</span>
                                    </div>
                                </div>

                                <div className="event-detail-info-row">
                                    <span>📍</span>
                                    <span>{event.venue}</span>
                                </div>

                                {event.contactEmail && (
                                    <div className="event-detail-info-row">
                                        <span>📧</span>
                                        <span>{event.contactEmail}</span>
                                    </div>
                                )}

                                {/* Capacity Bar */}
                                <div style={{ margin: "20px 0" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            fontSize: "0.85rem",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        <span style={{ color: "var(--dark-400)" }}>Capacity</span>
                                        <span style={{ color: "white", fontWeight: "600" }}>
                                            {event.currentParticipants}/{event.maxParticipants}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "8px",
                                            background: "rgba(255,255,255,0.1)",
                                            borderRadius: "var(--radius-full)",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: `${getCapacityPercentage()}%`,
                                                height: "100%",
                                                background:
                                                    getCapacityPercentage() > 80
                                                        ? "var(--error)"
                                                        : "var(--gradient-primary)",
                                                borderRadius: "var(--radius-full)",
                                                transition: "width 0.5s ease",
                                            }}
                                        ></div>
                                    </div>
                                    <div style={{ fontSize: "0.8rem", color: "var(--dark-500)", marginTop: "4px" }}>
                                        {event.maxParticipants - event.currentParticipants} spots remaining
                                    </div>
                                </div>

                                {/* Register Button */}
                                {message && (
                                    <div
                                        style={{
                                            padding: "12px",
                                            background: registered
                                                ? "rgba(16, 185, 129, 0.1)"
                                                : "rgba(239, 68, 68, 0.1)",
                                            border: `1px solid ${registered ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
                                            borderRadius: "var(--radius-md)",
                                            color: registered ? "var(--success)" : "var(--error)",
                                            fontSize: "0.85rem",
                                            marginBottom: "16px",
                                            textAlign: "center",
                                        }}
                                    >
                                        {message}
                                    </div>
                                )}

                                <button
                                    className={`btn ${registered ? "btn-success" : "btn-primary"}`}
                                    style={{ width: "100%" }}
                                    onClick={handleRegister}
                                    disabled={registering || registered}
                                    id="event-register-btn"
                                >
                                    {registered
                                        ? "✓ Registered"
                                        : registering
                                            ? "Registering..."
                                            : isAuthenticated
                                                ? "Register Now"
                                                : "Sign In to Register"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
