import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const categories = [
    { value: "academic", label: "Academic" },
    { value: "cultural", label: "Cultural" },
    { value: "sports", label: "Sports" },
    { value: "technical", label: "Technical" },
    { value: "workshop", label: "Workshop" },
    { value: "seminar", label: "Seminar" },
    { value: "social", label: "Social" },
    { value: "other", label: "Other" },
];

export default function CreateEvent() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "other",
        venue: "",
        startDate: "",
        endDate: "",
        maxParticipants: 100,
        contactEmail: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post("/events", formData);
            setSuccess(true);
            setTimeout(() => navigate("/dashboard/my-events"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create event");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div id="create-event-page">
                <div
                    className="empty-state"
                    style={{ paddingTop: "80px" }}
                >
                    <div className="empty-state-icon">🎉</div>
                    <h3 className="empty-state-title">Event Created Successfully!</h3>
                    <p className="empty-state-text">
                        Your event has been submitted for approval. You'll be redirected
                        shortly...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div id="create-event-page">
            <div className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">Create Event</h1>
                    <p className="dashboard-subtitle">
                        Fill in the details to create a new campus event
                    </p>
                </div>
            </div>

            <div
                style={{
                    maxWidth: "720px",
                }}
            >
                <div className="data-table-container" style={{ padding: "32px" }}>
                    {error && (
                        <div
                            style={{
                                padding: "12px 16px",
                                background: "rgba(239, 68, 68, 0.1)",
                                border: "1px solid rgba(239, 68, 68, 0.2)",
                                borderRadius: "var(--radius-md)",
                                color: "var(--error)",
                                fontSize: "0.9rem",
                                marginBottom: "24px",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="event-title">
                                Event Title *
                            </label>
                            <input
                                id="event-title"
                                name="title"
                                className="form-input"
                                placeholder="Enter event title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="event-description">
                                Description *
                            </label>
                            <textarea
                                id="event-description"
                                name="description"
                                className="form-textarea"
                                placeholder="Describe your event in detail..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={5}
                            />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="event-category">
                                    Category
                                </label>
                                <select
                                    id="event-category"
                                    name="category"
                                    className="form-select"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="event-venue">
                                    Venue *
                                </label>
                                <input
                                    id="event-venue"
                                    name="venue"
                                    className="form-input"
                                    placeholder="Event location"
                                    value={formData.venue}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="event-startDate">
                                    Start Date & Time *
                                </label>
                                <input
                                    id="event-startDate"
                                    name="startDate"
                                    type="datetime-local"
                                    className="form-input"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="event-endDate">
                                    End Date & Time *
                                </label>
                                <input
                                    id="event-endDate"
                                    name="endDate"
                                    type="datetime-local"
                                    className="form-input"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="event-maxParticipants">
                                    Max Participants
                                </label>
                                <input
                                    id="event-maxParticipants"
                                    name="maxParticipants"
                                    type="number"
                                    className="form-input"
                                    value={formData.maxParticipants}
                                    onChange={handleChange}
                                    min="1"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="event-contactEmail">
                                    Contact Email
                                </label>
                                <input
                                    id="event-contactEmail"
                                    name="contactEmail"
                                    type="email"
                                    className="form-input"
                                    placeholder="organizer@university.edu"
                                    value={formData.contactEmail}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                                id="create-event-submit"
                            >
                                {loading ? "Creating..." : "🚀 Create Event"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() => navigate("/dashboard")}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
