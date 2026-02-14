import { useEffect, useState } from "react";
import api from "../../services/api";
import { format } from "date-fns";

const demoEvents = [
    {
        id: "1",
        title: "Annual Hackathon 2024",
        category: "technical",
        venue: "Innovation Hub",
        startDate: "2024-04-15T09:00:00",
        status: "approved",
        currentParticipants: 145,
        maxParticipants: 200,
        organizer: { firstName: "Tech", lastName: "Club" },
    },
    {
        id: "2",
        title: "Cultural Night",
        category: "cultural",
        venue: "Auditorium",
        startDate: "2024-04-20T18:00:00",
        status: "pending",
        currentParticipants: 0,
        maxParticipants: 500,
        organizer: { firstName: "Cultural", lastName: "Society" },
    },
    {
        id: "3",
        title: "AI Workshop",
        category: "workshop",
        venue: "Lab 3",
        startDate: "2024-04-22T10:00:00",
        status: "approved",
        currentParticipants: 42,
        maxParticipants: 50,
        organizer: { firstName: "AI", lastName: "Lab" },
    },
];

export default function ManageEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await api.get("/events");
            setEvents(res.data.length > 0 ? res.data : demoEvents);
        } catch {
            setEvents(demoEvents);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await api.patch(`/events/${id}/status`, { status });
            setEvents((prev) =>
                prev.map((e) => (e.id === id ? { ...e, status } : e))
            );
        } catch (err) {
            // Demo mode - just update locally
            setEvents((prev) =>
                prev.map((e) => (e.id === id ? { ...e, status } : e))
            );
        }
    };

    const getStatusBadge = (status) => {
        const map = {
            approved: "success",
            pending: "warning",
            rejected: "error",
            draft: "info",
            cancelled: "error",
            completed: "accent",
        };
        return map[status] || "primary";
    };

    return (
        <div id="manage-events-page">
            <div className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">Manage Events</h1>
                    <p className="dashboard-subtitle">
                        Admin panel for managing all campus events
                    </p>
                </div>
            </div>

            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <div className="data-table-container">
                    <div className="data-table-header">
                        <h3 className="data-table-title">
                            All Events ({events.length})
                        </h3>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Organizer</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Participants</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event.id}>
                                    <td style={{ fontWeight: "600", color: "white" }}>
                                        {event.title}
                                    </td>
                                    <td>
                                        {event.organizer
                                            ? `${event.organizer.firstName} ${event.organizer.lastName}`
                                            : "N/A"}
                                    </td>
                                    <td>
                                        <span className="badge badge-accent">{event.category}</span>
                                    </td>
                                    <td>
                                        {(() => {
                                            try {
                                                return format(new Date(event.startDate), "MMM dd, yyyy");
                                            } catch {
                                                return event.startDate;
                                            }
                                        })()}
                                    </td>
                                    <td>
                                        <span className={`badge badge-${getStatusBadge(event.status)}`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td>
                                        {event.currentParticipants}/{event.maxParticipants}
                                    </td>
                                    <td>
                                        <div style={{ display: "flex", gap: "6px" }}>
                                            {event.status === "pending" && (
                                                <>
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() =>
                                                            handleStatusChange(event.id, "approved")
                                                        }
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            handleStatusChange(event.id, "rejected")
                                                        }
                                                    >
                                                        ✕
                                                    </button>
                                                </>
                                            )}
                                            {event.status === "approved" && (
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        handleStatusChange(event.id, "cancelled")
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
