import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { format } from "date-fns";

const demoRegistrations = [
    {
        id: "r1",
        status: "registered",
        registeredAt: "2024-04-01T10:00:00",
        event: {
            id: "1",
            title: "Annual Hackathon 2024",
            category: "technical",
            venue: "Innovation Hub",
            startDate: "2024-04-15T09:00:00",
        },
    },
    {
        id: "r2",
        status: "registered",
        registeredAt: "2024-04-02T14:00:00",
        event: {
            id: "2",
            title: "Cultural Night Festival",
            category: "cultural",
            venue: "Auditorium",
            startDate: "2024-04-20T18:00:00",
        },
    },
    {
        id: "r3",
        status: "waitlisted",
        registeredAt: "2024-04-03T09:00:00",
        event: {
            id: "3",
            title: "AI Workshop",
            category: "workshop",
            venue: "Lab 3",
            startDate: "2024-04-22T10:00:00",
        },
    },
];

export default function MyRegistrations() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const res = await api.get("/registrations/my-registrations");
            setRegistrations(res.data.length > 0 ? res.data : demoRegistrations);
        } catch {
            setRegistrations(demoRegistrations);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        try {
            await api.patch(`/registrations/${id}/cancel`);
            setRegistrations((prev) =>
                prev.map((r) => (r.id === id ? { ...r, status: "cancelled" } : r))
            );
        } catch (err) {
            alert("Failed to cancel registration");
        }
    };

    const getStatusBadge = (status) => {
        const map = {
            registered: "success",
            waitlisted: "warning",
            cancelled: "error",
            attended: "accent",
        };
        return map[status] || "primary";
    };

    return (
        <div id="my-registrations-page">
            <div className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">My Registrations</h1>
                    <p className="dashboard-subtitle">Events you've registered for</p>
                </div>
                <Link to="/events" className="btn btn-outline">
                    🔍 Browse Events
                </Link>
            </div>

            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
                    <div className="loading-spinner"></div>
                </div>
            ) : registrations.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">🎟️</div>
                    <h3 className="empty-state-title">No Registrations Yet</h3>
                    <p className="empty-state-text">
                        Browse events and register for ones that interest you!
                    </p>
                    <Link to="/events" className="btn btn-primary">
                        Explore Events
                    </Link>
                </div>
            ) : (
                <div style={{ display: "grid", gap: "16px" }}>
                    {registrations.map((reg) => (
                        <div key={reg.id} className="glass-card" style={{ padding: "24px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    flexWrap: "wrap",
                                    gap: "16px",
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                                        <span className={`badge badge-${getStatusBadge(reg.status)}`}>
                                            {reg.status}
                                        </span>
                                        {reg.event && (
                                            <span className="badge badge-accent">
                                                {reg.event.category}
                                            </span>
                                        )}
                                    </div>

                                    <h3
                                        style={{
                                            fontFamily: "var(--font-display)",
                                            fontSize: "1.15rem",
                                            fontWeight: "700",
                                            color: "white",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        {reg.event?.title || "Event"}
                                    </h3>

                                    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                                        {reg.event?.startDate && (
                                            <div style={{ display: "flex", gap: "6px", fontSize: "0.85rem", color: "var(--dark-400)" }}>
                                                <span>📅</span>
                                                {(() => {
                                                    try {
                                                        return format(new Date(reg.event.startDate), "MMM dd, yyyy • hh:mm a");
                                                    } catch {
                                                        return reg.event.startDate;
                                                    }
                                                })()}
                                            </div>
                                        )}
                                        {reg.event?.venue && (
                                            <div style={{ display: "flex", gap: "6px", fontSize: "0.85rem", color: "var(--dark-400)" }}>
                                                <span>📍</span>
                                                {reg.event.venue}
                                            </div>
                                        )}
                                        <div style={{ display: "flex", gap: "6px", fontSize: "0.85rem", color: "var(--dark-400)" }}>
                                            <span>🕐</span>
                                            Registered{" "}
                                            {(() => {
                                                try {
                                                    return format(new Date(reg.registeredAt), "MMM dd, yyyy");
                                                } catch {
                                                    return "";
                                                }
                                            })()}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: "flex", gap: "8px" }}>
                                    {reg.event && (
                                        <Link
                                            to={`/events/${reg.event.id}`}
                                            className="btn btn-outline btn-sm"
                                        >
                                            View Event
                                        </Link>
                                    )}
                                    {reg.status === "registered" && (
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleCancel(reg.id)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
