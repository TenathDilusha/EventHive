import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer" id="site-footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h3>🐝 EventHive</h3>
                        <p>
                            The heart of university events. Discover, organize, and manage
                            campus events with ease. Built for students, by students.
                        </p>
                    </div>

                    <div>
                        <h4 className="footer-title">Platform</h4>
                        <Link to="/events" className="footer-link">Browse Events</Link>
                        <Link to="/register" className="footer-link">Create Account</Link>
                        <Link to="/dashboard" className="footer-link">Dashboard</Link>
                    </div>

                    <div>
                        <h4 className="footer-title">Categories</h4>
                        <span className="footer-link">Academic</span>
                        <span className="footer-link">Cultural</span>
                        <span className="footer-link">Sports</span>
                        <span className="footer-link">Technical</span>
                    </div>

                    <div>
                        <h4 className="footer-title">Support</h4>
                        <span className="footer-link">Help Center</span>
                        <span className="footer-link">Contact Us</span>
                        <span className="footer-link">Privacy Policy</span>
                        <span className="footer-link">Terms of Service</span>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2024 EventHive. All rights reserved.</p>
                    <p>Made with ❤️ for university communities</p>
                </div>
            </div>
        </footer>
    );
}
