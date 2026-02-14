import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ isOpen, onClose }) {
    const location = useLocation();
    const { user, isAdmin, isOrganizer, logout } = useAuth();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { label: "Overview", path: "/dashboard", icon: "📊" },
        { label: "My Events", path: "/dashboard/my-events", icon: "📅" },
        { label: "My Registrations", path: "/dashboard/registrations", icon: "🎟️" },
    ];

    const organizerItems = [
        { label: "Create Event", path: "/dashboard/create-event", icon: "✨" },
    ];

    const adminItems = [
        { label: "All Events", path: "/dashboard/manage-events", icon: "📋" },
        { label: "Users", path: "/dashboard/users", icon: "👥" },
        { label: "Approvals", path: "/dashboard/approvals", icon: "✅" },
    ];

    return (
        <aside className={`sidebar ${isOpen ? "open" : ""}`} id="dashboard-sidebar">
            <div className="sidebar-logo">
                <span className="logo-icon">🐝</span>
                EventHive
            </div>

            <nav className="sidebar-nav">
                <span className="sidebar-section-title">Menu</span>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`sidebar-link ${isActive(item.path) ? "active" : ""}`}
                        onClick={onClose}
                    >
                        <span>{item.icon}</span>
                        {item.label}
                    </Link>
                ))}

                {isOrganizer && (
                    <>
                        <span className="sidebar-section-title">Organizer</span>
                        {organizerItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`sidebar-link ${isActive(item.path) ? "active" : ""}`}
                                onClick={onClose}
                            >
                                <span>{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </>
                )}

                {isAdmin && (
                    <>
                        <span className="sidebar-section-title">Admin</span>
                        {adminItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`sidebar-link ${isActive(item.path) ? "active" : ""}`}
                                onClick={onClose}
                            >
                                <span>{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </>
                )}
            </nav>

            <div style={{ marginTop: "auto", paddingTop: "24px" }}>
                <div
                    style={{
                        padding: "16px",
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "var(--radius-md)",
                        marginBottom: "12px",
                    }}
                >
                    <div
                        style={{
                            fontSize: "0.9rem",
                            fontWeight: "600",
                            color: "white",
                            marginBottom: "4px",
                        }}
                    >
                        {user?.firstName} {user?.lastName}
                    </div>
                    <div
                        style={{ fontSize: "0.8rem", color: "var(--dark-400)" }}
                    >
                        {user?.email}
                    </div>
                    <span
                        className={`badge badge-${user?.role === "admin" ? "error" : user?.role === "organizer" ? "accent" : "primary"}`}
                        style={{ marginTop: "8px" }}
                    >
                        {user?.role}
                    </span>
                </div>

                <Link
                    to="/"
                    className="sidebar-link"
                    style={{ marginBottom: "4px" }}
                >
                    <span>🏠</span>
                    Back to Home
                </Link>
                <button
                    className="sidebar-link"
                    onClick={logout}
                    style={{
                        width: "100%",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--error)",
                    }}
                >
                    <span>🚪</span>
                    Logout
                </button>
            </div>
        </aside>
    );
}
