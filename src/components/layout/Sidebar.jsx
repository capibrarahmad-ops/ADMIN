import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  UserCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Layers
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import ConfirmDialog from '../common/ConfirmDialog';

export default function Sidebar() {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    adminProfile
  } = useAdmin();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    toast.info('Session ended. In production, this would invalidate JWT/cookies.');
    navigate('/admin');
  };

  const navItems = [
    {
      to: '/admin',
      end: true,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      to: '/admin/users',
      label: 'Users',
      icon: Users,
    },
    {
      to: '/admin/content',
      label: 'Content Management',
      icon: FileText,
    },
    {
      to: '/admin/analytics',
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      to: '/admin/settings',
      label: 'Settings',
      icon: Settings,
    },
    {
      to: '/admin/profile',
      label: 'Admin Profile',
      icon: UserCheck,
    },
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      <div
        className={`sidebar-backdrop ${mobileSidebarOpen ? 'mobile-open' : ''}`}
        onClick={() => setMobileSidebarOpen(false)}
      />

      <aside
        className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${
          mobileSidebarOpen ? 'mobile-open' : ''
        }`}
      >
        {/* Brand header */}
        <div className="sidebar-brand">
          <NavLink
            to="/admin"
            className="brand-link"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <div className="brand-logo-badge">
              <Layers size={22} />
            </div>
            {!sidebarCollapsed && (
              <div className="brand-info">
                <span className="brand-title">Slate</span>
                <span className="brand-tag">Enterprise Admin</span>
              </div>
            )}
          </NavLink>

          <button
            type="button"
            className="sidebar-collapse-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation list */}
        <nav className="sidebar-nav">
          {!sidebarCollapsed && (
            <div className="nav-section-title">Navigation Menu</div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `sidebar-nav-item ${isActive ? 'active' : ''}`
                }
                onClick={() => setMobileSidebarOpen(false)}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <div className="nav-item-icon">
                  <Icon size={20} />
                </div>
                {!sidebarCollapsed && (
                  <>
                    <span className="nav-item-label">{item.label}</span>
                    {item.badge && (
                      <span className={`nav-item-badge ${item.badgeType || ''}`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer User Info & Logout */}
        <div className="sidebar-footer">
          <NavLink
            to="/admin/profile"
            className="sidebar-user-pill"
            title={sidebarCollapsed ? `${adminProfile.name} (Admin Profile)` : undefined}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <img
              src={adminProfile.avatar}
              alt={adminProfile.name}
              className="user-avatar"
            />
            {!sidebarCollapsed && (
              <div className="sidebar-user-meta">
                <div className="sidebar-user-name">{adminProfile.name}</div>
                <div className="sidebar-user-role">{adminProfile.role}</div>
              </div>
            )}
          </NavLink>

          <button
            type="button"
            className="sidebar-logout-btn"
            onClick={() => setShowLogoutModal(true)}
            title={sidebarCollapsed ? 'Logout' : undefined}
          >
            <LogOut size={18} />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        title="Confirm Administrative Logout"
        message="Are you sure you want to log out of Slate Admin? Your active sessions and security tokens will be terminated."
        confirmText="Log Out"
        cancelText="Stay Logged In"
        isDestructive={false}
      />
    </>
  );
}
