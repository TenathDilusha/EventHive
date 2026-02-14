import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import DashboardOverview from "./dashboard/DashboardOverview";
import MyEvents from "./dashboard/MyEvents";
import MyRegistrations from "./dashboard/MyRegistrations";
import CreateEvent from "./dashboard/CreateEvent";
import ManageEvents from "./dashboard/ManageEvents";
import Approvals from "./dashboard/Approvals";

export default function Dashboard() {
  const { isAuthenticated, isAdmin, isOrganizer } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-layout" id="dashboard-page">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="dashboard-main">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            display: "none",
            position: "fixed",
            top: "16px",
            left: "16px",
            zIndex: "200",
            background: "var(--dark-800)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "var(--radius-md)",
            padding: "8px 12px",
            color: "white",
            fontSize: "1.2rem",
          }}
          className="mobile-sidebar-toggle"
          id="sidebar-toggle"
        >
          ☰
        </button>

        <Routes>
          <Route index element={<DashboardOverview />} />
          <Route path="my-events" element={<MyEvents />} />
          <Route path="registrations" element={<MyRegistrations />} />
          {isOrganizer && (
            <Route path="create-event" element={<CreateEvent />} />
          )}
          {isAdmin && (
            <>
              <Route path="manage-events" element={<ManageEvents />} />
              <Route path="approvals" element={<Approvals />} />
              <Route path="users" element={<DashboardOverview />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}
