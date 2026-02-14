import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { format } from "date-fns";

const demoEvents = [
    {
        id: "1",
        title: "Tech Workshop",
        category: "technical",
        venue: "Lab 3",
        startDate: "2024-04-15T09:00:00",
        status: "approved",
        currentParticipants: 30,
        maxParticipants: 50,
    },
    {
        id: "2",
        title: "Cultural Night",
        category: "cultural",
        venue: "Auditorium",
        startDate: "2024-04-20T18:00:00",
        status: "pending",
        currentParticipants: 0,
        maxParticipants: 200,
    },
];

export default function MyEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyEvents();
    }, []);

    const fetchMyEvents = async () => {
        try {
            const res = await api.get("/events/my-events");
            setEvents(res.data.length > 0 ? res.data : demoEvents);
        } catch {
            setEvents(demoEvents);
        } finally {
            setLoading(false);
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
        <div id="my-events-page">
            <div className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">My Events</h1>
                    <p className="dashboard-subtitle">Events you've created and organized</p>
                </div>
                <Link to="/dashboard/create-event" className="btn btn-primary">
                    ✨ Create Event
                </Link>
            </div>

            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
                    <div className="loading-spinner"></div>
                </div>
            ) : events.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📋</div>
                    <h3 className="empty-state-title">No Events Yet</h3>
                    <p className="empty-state-text">
                        Create your first event and start organizing!
                    </p>
                    <Link to="/dashboard/create-event" className="btn btn-primary">
                        Create Event
                    </Link>
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
                                <th>Category</th>
                                <th>Date</th>
                                <th>Venue</th>
                                <th>Status</th>
                                <th>Participants</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event.id}>
                                    <td>
                                        <Link
                                            to={`/events/${event.id}`}
                                            style={{ color: "var(--primary-400)", fontWeight: "600" }}
                                        >
                                            {event.title}
                                        </Link>
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
                                    <td>{event.venue}</td>
                                    <td>
                                        <span className={`badge badge-${getStatusBadge(event.status)}`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td>
                                        {event.currentParticipants}/{event.maxParticipants}
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
