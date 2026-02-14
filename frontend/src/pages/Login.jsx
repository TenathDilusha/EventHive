import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const result = await login(email, password);
        if (result.success) {
            navigate("/dashboard");
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="auth-page" id="login-page">
            <div className="grid-pattern"></div>

            <div className="auth-left">
                <div className="auth-left-content">
                    <div style={{ fontSize: "3rem", marginBottom: "24px" }}>🐝</div>
                    <h2>
                        Welcome back to
                        <br />
                        <span style={{ color: "var(--primary-400)" }}>EventHive</span>
                    </h2>
                    <p style={{ marginTop: "16px" }}>
                        Sign in to manage your events, track registrations, and stay connected
                        with your campus community.
                    </p>

                    <div style={{ marginTop: "48px" }}>
                        <div
                            className="glass-card"
                            style={{ padding: "20px", marginBottom: "12px" }}
                        >
                            <div style={{ fontWeight: "600", color: "white", marginBottom: "4px" }}>
                                🎓 For Students
                            </div>
                            <div style={{ fontSize: "0.85rem", color: "var(--dark-400)" }}>
                                Discover and register for exciting campus events
                            </div>
                        </div>
                        <div
                            className="glass-card"
                            style={{ padding: "20px", marginBottom: "12px" }}
                        >
                            <div style={{ fontWeight: "600", color: "white", marginBottom: "4px" }}>
                                📋 For Organizers
                            </div>
                            <div style={{ fontSize: "0.85rem", color: "var(--dark-400)" }}>
                                Create, manage, and track your events effortlessly
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: "20px" }}>
                            <div style={{ fontWeight: "600", color: "white", marginBottom: "4px" }}>
                                ⚙️ For Admins
                            </div>
                            <div style={{ fontSize: "0.85rem", color: "var(--dark-400)" }}>
                                Oversee all campus events and approve requests
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-card">
                    <h2 className="auth-card-title">Sign In</h2>
                    <p className="auth-card-subtitle">
                        Enter your credentials to access your account
                    </p>

                    {error && (
                        <div
                            style={{
                                padding: "12px 16px",
                                background: "rgba(239, 68, 68, 0.1)",
                                border: "1px solid rgba(239, 68, 68, 0.2)",
                                borderRadius: "var(--radius-md)",
                                color: "var(--error)",
                                fontSize: "0.9rem",
                                marginBottom: "20px",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="login-email">Email</label>
                            <input
                                id="login-email"
                                type="email"
                                className="form-input"
                                placeholder="you@university.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="login-password">Password</label>
                            <input
                                id="login-password"
                                type="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ width: "100%", marginTop: "8px" }}
                            id="login-submit-btn"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Don't have an account?{" "}
                        <Link to="/register">Create one</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
