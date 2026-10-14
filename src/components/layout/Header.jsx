import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Search,
  ChevronRight,
  User,
  Settings,
  RotateCcw,
  LogOut
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import ConfirmDialog from '../common/ConfirmDialog';

export default function Header() {
  const {
    mobileSidebarOpen,
    setMobileSidebarOpen,
    adminProfile,
    resetDemoData
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const profileRef = useRef(null);
  const searchInputRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  // Close profile menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global Ctrl+K / Cmd+K search shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute breadcrumbs from path
  const pathnames = location.pathname.split('/').filter((x) => x);
  const getBreadcrumbTitle = (part) => {
    switch (part) {
      case 'admin':
        return 'Admin';
      case 'users':
        return 'User Management';
      case 'content':
        return 'Content Management';
      case 'analytics':
        return 'Analytics & Telemetry';
      case 'reports':
        return 'System & Abuse Reports';
      case 'notifications':
        return 'Notifications';
      case 'settings':
        return 'Platform Settings';
      case 'profile':
        return 'Admin Profile';
      default:
        return part.charAt(0).toUpperCase() + part.slice(1);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.trim().toLowerCase();

    // Smart navigate based on query keywords
    if (query.includes('user') || query.includes('member') || query.includes('account')) {
      navigate('/admin/users');
    } else if (query.includes('content') || query.includes('post') || query.includes('article') || query.includes('guide')) {
      navigate('/admin/content');
    } else if (query.includes('analytic') || query.includes('metric') || query.includes('chart') || query.includes('traffic')) {
      navigate('/admin/analytics');
    } else if (query.includes('report') || query.includes('abuse') || query.includes('bug')) {
      navigate('/admin/reports');
    } else if (query.includes('setting') || query.includes('config') || query.includes('theme')) {
      navigate('/admin/settings');
    } else if (query.includes('notif')) {
      navigate('/admin/notifications');
    } else {
      // Default to users search
      navigate('/admin/users');
    }
    toast.info(`Searching for "${searchQuery}"...`);
  };

  const handleResetData = () => {
    resetDemoData();
    setShowProfileMenu(false);
    toast.success('Sample data restored to default initial state!');
  };

  return (
    <header className="admin-header">
      {/* Left side: Hamburger + Breadcrumbs */}
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-trigger"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="header-breadcrumbs">
          <Link to="/admin" style={{ color: 'var(--navy-500)' }}>
            Slate
          </Link>
          {pathnames.map((value, index) => {
            const isLast = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            return (
              <React.Fragment key={to}>
                <ChevronRight size={14} style={{ color: 'var(--navy-300)' }} />
                {isLast ? (
                  <span className="breadcrumb-active">{getBreadcrumbTitle(value)}</span>
                ) : (
                  <Link to={to} style={{ color: 'var(--navy-500)' }}>
                    {getBreadcrumbTitle(value)}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Center / Search bar */}
      <form onSubmit={handleSearchSubmit} className="header-search-container">
        <Search size={16} className="search-icon-prefix" />
        <input
          ref={searchInputRef}
          type="text"
          className="header-search-input"
          placeholder="Search users, docs, settings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <kbd className="search-shortcut-hint">⌘K</kbd>
      </form>

      {/* Right side: Admin Profile */}
      <div className="header-right">
        {/* Profile Dropdown */}
        <div ref={profileRef} className="header-profile-menu">
          <button
            type="button"
            className="profile-trigger-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="User profile menu"
          >
            <img
              src={adminProfile.avatar}
              alt={adminProfile.name}
              className="user-avatar"
              style={{ width: '32px', height: '32px' }}
            />
            <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy-900)' }}>
              {adminProfile.name.split(' ')[0]}
            </span>
          </button>

          {showProfileMenu && (
            <div className="profile-menu-dropdown">
              <div className="profile-menu-header">
                <div className="profile-menu-name">{adminProfile.name}</div>
                <div className="profile-menu-email">{adminProfile.email}</div>
              </div>

              <Link
                to="/admin/profile"
                className="profile-menu-item"
                onClick={() => setShowProfileMenu(false)}
              >
                <User size={16} />
                <span>Admin Profile</span>
              </Link>

              <Link
                to="/admin/settings"
                className="profile-menu-item"
                onClick={() => setShowProfileMenu(false)}
              >
                <Settings size={16} />
                <span>Settings</span>
              </Link>

              <button
                type="button"
                className="profile-menu-item"
                onClick={handleResetData}
              >
                <RotateCcw size={16} />
                <span>Reset Demo Data</span>
              </button>

              <hr style={{ border: 'none', borderTop: '1px solid var(--navy-100)', margin: '0.35rem 0' }} />

              <button
                type="button"
                className="profile-menu-item danger"
                onClick={() => {
                  setShowProfileMenu(false);
                  setShowLogoutConfirm(true);
                }}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout dialog */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={() => {
          toast.info('Session ended.');
          navigate('/admin');
        }}
        title="Administrative Logout"
        message="Sign out of Slate Admin console?"
        confirmText="Log Out"
        cancelText="Cancel"
        isDestructive={false}
      />
    </header>
  );
}
