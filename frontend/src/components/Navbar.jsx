import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="main-navbar">
            <div className="navbar-content">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🐝</span>
                    Event<span className="logo-highlight">Hive</span>
                </Link>

                <div className={`navbar-links ${mobileOpen ? "mobile-open" : ""}`}>
                    <Link
                        to="/"
                        className={`navbar-link ${isActive("/") ? "active" : ""}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/events"
                        className={`navbar-link ${isActive("/events") ? "active" : ""}`}
                    >
                        Events
                    </Link>
                    {isAuthenticated && (
                        <Link
                            to="/dashboard"
                            className={`navbar-link ${isActive("/dashboard") ? "active" : ""}`}
                        >
                            Dashboard
                        </Link>
                    )}
                </div>

                <div className="navbar-actions">
                    {isAuthenticated ? (
                        <>
                            <span style={{ fontSize: "0.85rem", color: "var(--dark-300)" }}>
                                Hi, {user?.firstName}
                            </span>
                            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost btn-sm">
                                Sign In
                            </Link>
                            <Link to="/register" className="btn btn-primary btn-sm">
                                Get Started
                            </Link>
                        </>
                    )}
                    <button
                        className="navbar-mobile-toggle"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>
        </nav>
    );
}
