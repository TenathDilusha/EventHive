import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: "🔍",
    iconClass: "primary",
    title: "Smart Discovery",
    description:
      "Find events that match your interests with intelligent search and category-based filtering across all campus activities.",
  },
  {
    icon: "📝",
    iconClass: "accent",
    title: "One-Click Registration",
    description:
      "Register for events instantly with a single click. Track your registrations and get real-time updates on event status.",
  },
  {
    icon: "✅",
    iconClass: "success",
    title: "Streamlined Approvals",
    description:
      "Admins can review, approve, or reject events through an intuitive approval workflow. No more manual email chains.",
  },
  {
    icon: "📊",
    iconClass: "info",
    title: "Analytics Dashboard",
    description:
      "Get insights into event participation, registration trends, and campus engagement through beautiful analytics dashboards.",
  },
  {
    icon: "🔐",
    iconClass: "accent",
    title: "Role-Based Access",
    description:
      "Students, organizers, and admins each get tailored interfaces with appropriate permissions and capabilities.",
  },
  {
    icon: "🚀",
    iconClass: "primary",
    title: "Real-Time Updates",
    description:
      "Stay informed with instant notifications about event approvals, registration confirmations, and schedule changes.",
  },
];

const categories = [
  { emoji: "📚", label: "Academic", count: "150+" },
  { emoji: "🎭", label: "Cultural", count: "80+" },
  { emoji: "⚽", label: "Sports", count: "120+" },
  { emoji: "💻", label: "Technical", count: "200+" },
  { emoji: "🔧", label: "Workshops", count: "90+" },
  { emoji: "🎤", label: "Seminars", count: "60+" },
];

export default function Home() {
  return (
    <div id="home-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="grid-pattern"></div>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "80px" }}>
          <div className="hero-content">
            <div className="hero-badge">
              <span>🐝</span>
              The Future of Campus Events
            </div>
            <h1>
              Discover & Manage
              <br />
              <span>University Events</span>
              <br />
              Effortlessly
            </h1>
            <p>
              EventHive centralizes event discovery, registration, and management
              for your entire campus. From hackathons to cultural fests — find it
              all in one place.
            </p>
            <div className="hero-buttons">
              <Link to="/events" className="btn btn-primary btn-lg">
                Explore Events
              </Link>
              <Link to="/register" className="btn btn-outline btn-lg">
                Join EventHive
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-value">500+</div>
                <div className="hero-stat-label">Events Hosted</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">10K+</div>
                <div className="hero-stat-label">Active Students</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">50+</div>
                <div className="hero-stat-label">Departments</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" id="features-section" style={{ background: "var(--dark-950)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">✨ Features</span>
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-subtitle">
              A complete platform designed to streamline every aspect of
              university event management
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`feature-icon ${feature.iconClass}`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section" id="categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">🏷️ Categories</span>
            <h2 className="section-title">Explore by Category</h2>
            <p className="section-subtitle">
              Browse events across different categories to find what interests you
              most
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "16px",
            }}
          >
            {categories.map((cat, index) => (
              <Link
                to={`/events?category=${cat.label.toLowerCase()}`}
                key={index}
                className="glass-card"
                style={{
                  padding: "28px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>
                  {cat.emoji}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    color: "white",
                    fontSize: "1rem",
                    marginBottom: "4px",
                  }}
                >
                  {cat.label}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--dark-400)" }}>
                  {cat.count} events
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="section"
        id="cta-section"
        style={{ background: "var(--dark-950)" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            className="section-title"
            style={{ marginBottom: "16px" }}
          >
            Ready to Transform Campus Events?
          </h2>
          <p
            className="section-subtitle"
            style={{ marginBottom: "40px" }}
          >
            Join thousands of students and organizers already using EventHive to
            create memorable campus experiences.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started Free
            </Link>
            <Link to="/events" className="btn btn-outline btn-lg">
              Browse Events
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
