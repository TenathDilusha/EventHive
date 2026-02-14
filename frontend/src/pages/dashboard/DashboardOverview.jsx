import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function DashboardOverview() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalEvents: 0,
        totalUsers: 0,
        totalRegistrations: 0,
        upcomingEvents: 0,
        pendingApprovals: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get("/analytics/dashboard");
            setStats(res.data);
        } catch (err) {
            // Demo stats
            setStats({
                totalEvents: 42,
                totalUsers: 1250,
                totalRegistrations: 3840,
                upcomingEvents: 12,
                pendingApprovals: 5,
            });
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            label: "Total Events",
            value: stats.totalEvents,
            icon: "📅",
            iconClass: "primary",
            trend: "+12%",
            trendDir: "up",
        },
        {
            label: "Active Users",
            value: stats.totalUsers,
            icon: "👥",
            iconClass: "accent",
            trend: "+8%",
            trendDir: "up",
        },
        {
            label: "Registrations",
            value: stats.totalRegistrations,
            icon: "🎟️",
            iconClass: "success",
            trend: "+23%",
            trendDir: "up",
        },
        {
            label: "Upcoming",
            value: stats.upcomingEvents,
            icon: "🚀",
            iconClass: "info",
            trend: "+5%",
            trendDir: "up",
        },
    ];

    const recentActivities = [
        { icon: "🎉", text: "New event 'AI Workshop' was approved", time: "2 min ago" },
        { icon: "👤", text: "John Doe registered for Hackathon 2024", time: "15 min ago" },
        { icon: "📝", text: "Cultural Night event was created", time: "1 hour ago" },
        { icon: "✅", text: "Sports Tournament approved by admin", time: "2 hours ago" },
        { icon: "🎟️", text: "50 new registrations for Tech Fest", time: "3 hours ago" },
    ];

    return (
        <div id="dashboard-overview">
            <div className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">
                        Welcome back, {user?.firstName}! 👋
                    </h1>
                    <p className="dashboard-subtitle">
                        Here's what's happening with your events today.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="stat-card animate-fadeInUp"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="stat-card-header">
                            <div className={`stat-card-icon ${stat.iconClass}`}>
                                {stat.icon}
                            </div>
                            <span className={`stat-card-trend ${stat.trendDir}`}>
                                {stat.trendDir === "up" ? "↑" : "↓"} {stat.trend}
                            </span>
                        </div>
                        <div className="stat-card-value">
                            {loading ? "..." : stat.value.toLocaleString()}
                        </div>
                        <div className="stat-card-label">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
                {/* Quick Actions */}
                <div className="data-table-container">
                    <div className="data-table-header">
                        <h3 className="data-table-title">Quick Actions</h3>
                    </div>
                    <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <a
                            href="/events"
                            className="glass-card"
                            style={{
                                padding: "24px",
                                textAlign: "center",
                                display: "block",
                            }}
                        >
                            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🔍</div>
                            <div style={{ fontWeight: "600", color: "white", marginBottom: "4px" }}>
                                Browse Events
                            </div>
                            <div style={{ fontSize: "0.8rem", color: "var(--dark-400)" }}>
                                Discover new events
                            </div>
                        </a>
                        <a
                            href="/dashboard/registrations"
                            className="glass-card"
                            style={{
                                padding: "24px",
                                textAlign: "center",
                                display: "block",
                            }}
                        >
                            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🎟️</div>
                            <div style={{ fontWeight: "600", color: "white", marginBottom: "4px" }}>
                                My Registrations
                            </div>
                            <div style={{ fontSize: "0.8rem", color: "var(--dark-400)" }}>
                                View your tickets
                            </div>
                        </a>
                        <a
                            href="/dashboard/create-event"
                            className="glass-card"
                            style={{
                                padding: "24px",
                                textAlign: "center",
                                display: "block",
                            }}
                        >
                            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>✨</div>
                            <div style={{ fontWeight: "600", color: "white", marginBottom: "4px" }}>
                                Create Event
                            </div>
                            <div style={{ fontSize: "0.8rem", color: "var(--dark-400)" }}>
                                Host a new event
                            </div>
                        </a>
                        <a
                            href="/dashboard/my-events"
                            className="glass-card"
                            style={{
                                padding: "24px",
                                textAlign: "center",
                                display: "block",
                            }}
                        >
                            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📋</div>
                            <div style={{ fontWeight: "600", color: "white", marginBottom: "4px" }}>
                                My Events
                            </div>
                            <div style={{ fontSize: "0.8rem", color: "var(--dark-400)" }}>
                                Manage your events
                            </div>
                        </a>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="data-table-container">
                    <div className="data-table-header">
                        <h3 className="data-table-title">Recent Activity</h3>
                    </div>
                    <div style={{ padding: "8px 0" }}>
                        {recentActivities.map((activity, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "12px",
                                    padding: "12px 24px",
                                    borderBottom: index < recentActivities.length - 1
                                        ? "1px solid rgba(255,255,255,0.03)"
                                        : "none",
                                }}
                            >
                                <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>
                                    {activity.icon}
                                </span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: "0.85rem", color: "var(--dark-200)" }}>
                                        {activity.text}
                                    </div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--dark-500)", marginTop: "4px" }}>
                                        {activity.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
