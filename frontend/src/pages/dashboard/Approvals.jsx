import { useEffect, useState } from "react";
import api from "../../services/api";
import { format } from "date-fns";

const demoPending = [
    {
        id: "p1",
        title: "Spring Music Festival",
        description: "An outdoor music festival featuring student bands and solo artists. Food trucks and art installations.",
        category: "cultural",
        venue: "University Lawn",
        startDate: "2024-05-01T16:00:00",
        endDate: "2024-05-01T22:00:00",
        maxParticipants: 500,
        status: "pending",
        organizer: { firstName: "Music", lastName: "Club" },
    },
    {
        id: "p2",
        title: "Cybersecurity Workshop",
        description: "Learn about ethical hacking, network security, and cyber defense strategies from industry professionals.",
        category: "workshop",
        venue: "Cyber Lab, IT Building",
        startDate: "2024-05-05T10:00:00",
        endDate: "2024-05-05T16:00:00",
        maxParticipants: 40,
        status: "pending",
        organizer: { firstName: "Security", lastName: "Team" },
    },
    {
        id: "p3",
        title: "Basketball Championship",
        description: "Inter-faculty basketball tournament. 8 teams competing for the university championship title.",
        category: "sports",
        venue: "Sports Complex, Court A",
        startDate: "2024-05-10T09:00:00",
        endDate: "2024-05-12T18:00:00",
        maxParticipants: 200,
        status: "pending",
        organizer: { firstName: "Sports", lastName: "Council" },
    },
];

export default function Approvals() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingEvents();
    }, []);

    const fetchPendingEvents = async () => {
        try {
            const res = await api.get("/events", { params: { status: "pending" } });
            setEvents(res.data.length > 0 ? res.data : demoPending);
        } catch {
            setEvents(demoPending);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, status) => {
        try {
            await api.patch(`/events/${id}/status`, { status });
        } catch {
            // Demo mode
        }
        setEvents((prev) => prev.filter((e) => e.id !== id));
    };

    return (
        <div id="approvals-page">
            <div className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">Pending Approvals</h1>
                    <p className="dashboard-subtitle">
                        Review and approve event submissions
                    </p>
                </div>
                <div className="badge badge-warning" style={{ fontSize: "0.9rem", padding: "8px 16px" }}>
                    {events.length} pending
                </div>
            </div>

            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
                    <div className="loading-spinner"></div>
                </div>
            ) : events.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">✅</div>
                    <h3 className="empty-state-title">All Caught Up!</h3>
                    <p className="empty-state-text">
                        No events are waiting for approval right now.
                    </p>
                </div>
            ) : (
                <div style={{ display: "grid", gap: "20px" }}>
                    {events.map((event) => (
                        <div key={event.id} className="glass-card" style={{ padding: "28px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                                        <span className="badge badge-warning">Pending Review</span>
                                        <span className="badge badge-accent">{event.category}</span>
                                    </div>

                                    <h3
                                        style={{
                                            fontFamily: "var(--font-display)",
                                            fontSize: "1.3rem",
                                            fontWeight: "700",
                                            color: "white",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        {event.title}
                                    </h3>

                                    <p style={{ fontSize: "0.9rem", color: "var(--dark-400)", marginBottom: "16px", lineHeight: "1.6" }}>
                                        {event.description}
                                    </p>

                                    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                                        <div style={{ display: "flex", gap: "6px", fontSize: "0.85rem", color: "var(--dark-300)" }}>
                                            <span>📅</span>
                                            {(() => {
                                                try {
                                                    return format(new Date(event.startDate), "MMM dd, yyyy • hh:mm a");
                                                } catch {
                                                    return event.startDate;
                                                }
                                            })()}
                                        </div>
                                        <div style={{ display: "flex", gap: "6px", fontSize: "0.85rem", color: "var(--dark-300)" }}>
                                            <span>📍</span>
                                            {event.venue}
                                        </div>
                                        <div style={{ display: "flex", gap: "6px", fontSize: "0.85rem", color: "var(--dark-300)" }}>
                                            <span>👥</span>
                                            Max {event.maxParticipants} participants
                                        </div>
                                        {event.organizer && (
                                            <div style={{ display: "flex", gap: "6px", fontSize: "0.85rem", color: "var(--dark-300)" }}>
                                                <span>👤</span>
                                                {event.organizer.firstName} {event.organizer.lastName}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleAction(event.id, "approved")}
                                    >
                                        ✓ Approve
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleAction(event.id, "rejected")}
                                    >
                                        ✕ Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
