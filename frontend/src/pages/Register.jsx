import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        department: "",
    });
    const [error, setError] = useState("");
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        const { confirmPassword, ...userData } = formData;
        const result = await register(userData);

        if (result.success) {
            navigate("/dashboard");
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="auth-page" id="register-page">
            <div className="grid-pattern"></div>

            <div className="auth-left">
                <div className="auth-left-content">
                    <div style={{ fontSize: "3rem", marginBottom: "24px" }}>🐝</div>
                    <h2>
                        Join the
                        <br />
                        <span style={{ color: "var(--primary-400)" }}>EventHive</span>
                        <br />
                        Community
                    </h2>
                    <p style={{ marginTop: "16px" }}>
                        Create your account and start discovering amazing campus events.
                        Connect with fellow students and never miss out on what's happening.
                    </p>

                    <div
                        style={{
                            marginTop: "40px",
                            display: "flex",
                            gap: "16px",
                            flexWrap: "wrap",
                        }}
                    >
                        {["500+ Events", "10K+ Students", "50+ Departments"].map(
                            (stat, i) => (
                                <div
                                    key={i}
                                    style={{
                                        padding: "12px 20px",
                                        background: "rgba(245, 158, 11, 0.1)",
                                        border: "1px solid rgba(245, 158, 11, 0.2)",
                                        borderRadius: "var(--radius-full)",
                                        fontSize: "0.85rem",
                                        fontWeight: "600",
                                        color: "var(--primary-400)",
                                    }}
                                >
                                    {stat}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-card">
                    <h2 className="auth-card-title">Create Account</h2>
                    <p className="auth-card-subtitle">
                        Fill in your details to get started
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
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="register-firstName">First Name</label>
                                <input
                                    id="register-firstName"
                                    name="firstName"
                                    className="form-input"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="register-lastName">Last Name</label>
                                <input
                                    id="register-lastName"
                                    name="lastName"
                                    className="form-input"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="register-email">Email</label>
                            <input
                                id="register-email"
                                name="email"
                                type="email"
                                className="form-input"
                                placeholder="you@university.edu"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="register-department">Department</label>
                            <input
                                id="register-department"
                                name="department"
                                className="form-input"
                                placeholder="Computer Science"
                                value={formData.department}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="register-password">Password</label>
                            <input
                                id="register-password"
                                name="password"
                                type="password"
                                className="form-input"
                                placeholder="Min. 6 characters"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="register-confirmPassword">Confirm Password</label>
                            <input
                                id="register-confirmPassword"
                                name="confirmPassword"
                                type="password"
                                className="form-input"
                                placeholder="Repeat your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ width: "100%", marginTop: "8px" }}
                            id="register-submit-btn"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Already have an account?{" "}
                        <Link to="/login">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
