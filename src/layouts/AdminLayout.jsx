import React, { useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { useAdmin } from '../context/AdminContext';
import { ShieldAlert, X } from 'lucide-react';

export default function AdminLayout() {
  const { sidebarCollapsed } = useAdmin();
  const location = useLocation();
  const [showSecurityNotice, setShowSecurityNotice] = React.useState(true);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="admin-layout">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content body */}
      <div
        className={`admin-main-wrapper ${
          sidebarCollapsed ? 'sidebar-collapsed' : ''
        }`}
      >
        <Header />

        <main className="admin-page-container">
          {/* Production Integration Architecture Callout Banner */}
          {showSecurityNotice && (
            <div className="security-note-banner">
              <div className="security-note-left">
                <div className="security-icon-badge">
                  <ShieldAlert size={18} />
                </div>
                <div>
                  <h4>Frontend Demonstration Mode • Slate Security Architecture</h4>
                  <p>
                    All operations run locally with realistic state mutations. For production, connect your Node.js/Go API, configure JWT/OAuth2 session tokens, and enforce server-side RBAC.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link
                  to="/admin/settings"
                  className="security-banner-btn"
                  style={{ textDecoration: 'none' }}
                >
                  Configure Endpoints
                </Link>
                <button
                  type="button"
                  onClick={() => setShowSecurityNotice(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.7)',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                  title="Dismiss notice"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Child pages render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
