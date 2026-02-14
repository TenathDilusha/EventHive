import { Link } from "react-router-dom";
import { format } from "date-fns";

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

const categoryColors = {
    academic: "info",
    cultural: "accent",
    sports: "success",
    technical: "primary",
    workshop: "warning",
    seminar: "info",
    social: "accent",
    other: "primary",
};

export default function EventCard({ event }) {
    const icon = categoryIcons[event.category] || "📌";
    const colorClass = categoryColors[event.category] || "primary";

    const formatDate = (dateStr) => {
        try {
            return format(new Date(dateStr), "MMM dd, yyyy • hh:mm a");
        } catch {
            return dateStr;
        }
    };

    const getInitials = (organizer) => {
        if (!organizer) return "EH";
        return `${organizer.firstName?.[0] || ""}${organizer.lastName?.[0] || ""}`;
    };

    return (
        <Link
            to={`/events/${event.id}`}
            className="event-card"
            id={`event-card-${event.id}`}
        >
            <div className="event-card-image-placeholder">
                <span>{icon}</span>
            </div>

            <div className="event-card-body">
                <div className="event-card-meta">
                    <span className={`badge badge-${colorClass}`}>
                        {event.category || "event"}
                    </span>
                    {event.isFeatured && (
                        <span className="badge badge-primary">⭐ Featured</span>
                    )}
                </div>

                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-description">{event.description}</p>

                <div className="event-card-info">
                    <div className="event-card-info-item">
                        <span>📅</span>
                        <span>{formatDate(event.startDate)}</span>
                    </div>
                    <div className="event-card-info-item">
                        <span>📍</span>
                        <span>{event.venue}</span>
                    </div>
                    <div className="event-card-info-item">
                        <span>👥</span>
                        <span>
                            {event.currentParticipants || 0}/{event.maxParticipants} spots
                        </span>
                    </div>
                </div>

                <div className="event-card-footer">
                    <div className="event-card-organizer">
                        <div className="event-card-avatar">
                            {getInitials(event.organizer)}
                        </div>
                        <span className="event-card-organizer-name">
                            {event.organizer
                                ? `${event.organizer.firstName} ${event.organizer.lastName}`
                                : "EventHive"}
                        </span>
                    </div>
                    <span className="btn btn-ghost btn-sm">View →</span>
                </div>
            </div>
        </Link>
    );
}
