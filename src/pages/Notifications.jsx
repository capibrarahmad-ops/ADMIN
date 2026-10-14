import React, { useState, useMemo } from 'react';
import {
  Bell,
  CheckCheck,
  Plus,
  Trash2,
  Check,
  Shield,
  Server,
  AlertTriangle,
  FileText,
  Clock
} from 'lucide-react';
import ComposeNotificationModal from '../components/notifications/ComposeNotificationModal';
import EmptyState from '../components/common/EmptyState';
import { useAdmin } from '../context/AdminContext';
import { useToast } from '../context/ToastContext';

export default function Notifications() {
  const {
    notifications,
    unreadCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    addNotification
  } = useAdmin();

  const toast = useToast();

  const [activeTab, setActiveTab] = useState('ALL');
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  // Filtered notifications based on active category tab
  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      if (activeTab === 'ALL') return true;
      if (activeTab === 'UNREAD') return !n.read;
      if (activeTab === 'SECURITY') return n.category === 'Security';
      if (activeTab === 'SYSTEM') return n.category === 'System';
      if (activeTab === 'ALERT') return n.category === 'Alert' || n.priority === 'high';
      return true;
    });
  }, [notifications, activeTab]);

  const handleSendNotification = (formData) => {
    addNotification(formData);
    toast.success(`Broadcast "${formData.title}" dispatched.`);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Security':
        return <Shield size={18} style={{ color: 'var(--primary-600)' }} />;
      case 'System':
        return <Server size={18} style={{ color: 'var(--navy-600)' }} />;
      case 'Alert':
        return <AlertTriangle size={18} style={{ color: 'var(--warning-solid)' }} />;
      default:
        return <Bell size={18} style={{ color: 'var(--navy-500)' }} />;
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1>Notification & Broadcast Dispatch</h1>
          <p>System alerts, security advisories, and administrative broadcast notifications</p>
        </div>

        <div className="page-header-actions">
          {unreadCount > 0 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                markAllNotificationsAsRead();
                toast.success('Marked all notifications as read');
              }}
            >
              <CheckCheck size={16} />
              <span>Mark All Read</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsComposeOpen(true)}
          >
            <Plus size={16} />
            <span>Compose Broadcast</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-nav">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'ALL' ? 'active' : ''}`}
          onClick={() => setActiveTab('ALL')}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'UNREAD' ? 'active' : ''}`}
          onClick={() => setActiveTab('UNREAD')}
        >
          Unread Only ({unreadCount})
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'SECURITY' ? 'active' : ''}`}
          onClick={() => setActiveTab('SECURITY')}
        >
          Security Advisories
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'SYSTEM' ? 'active' : ''}`}
          onClick={() => setActiveTab('SYSTEM')}
        >
          System Alerts
        </button>
      </div>

      {/* Notification Cards List */}
      {filteredNotifications.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={Bell}
            title="No notifications in this category"
            description="You're all caught up! No active notifications match this filter."
          />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className="card"
              style={{
                borderLeft: !notif.read ? '4px solid var(--primary-600)' : '1px solid var(--navy-200)',
                backgroundColor: !notif.read ? '#ffffff' : '#fafafa',
                transition: 'all 160ms ease'
              }}
            >
              <div
                style={{
                  padding: '1.2rem 1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                {/* Left side: Icon + Content */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--navy-50)',
                      border: '1px solid var(--navy-200)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {getCategoryIcon(notif.category)}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
                      <h4
                        style={{
                          fontSize: '0.98rem',
                          fontWeight: !notif.read ? 700 : 600,
                          color: 'var(--navy-900)'
                        }}
                      >
                        {notif.title}
                      </h4>

                      {!notif.read && (
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '9999px',
                            background: 'var(--primary-50)',
                            color: 'var(--primary-600)',
                            border: '1px solid var(--primary-100)'
                          }}
                        >
                          New
                        </span>
                      )}

                      {notif.priority === 'high' && (
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.45rem',
                            borderRadius: '9999px',
                            background: 'var(--danger-bg)',
                            color: 'var(--danger-solid)'
                          }}
                        >
                          Urgent
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '0.88rem', color: 'var(--navy-600)', lineHeight: 1.45, marginBottom: '0.45rem' }}>
                      {notif.message}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.76rem', color: 'var(--navy-400)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} />
                        {notif.timestamp}
                      </span>
                      <span>•</span>
                      <span>Category: {notif.category}</span>
                    </div>
                  </div>
                </div>

                {/* Right side: Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  {!notif.read ? (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        toast.success('Marked as read');
                      }}
                      title="Mark as read"
                    >
                      <Check size={14} />
                      <span>Mark Read</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.78rem', color: 'var(--navy-400)', marginRight: '0.5rem' }}>
                      Read
                    </span>
                  )}

                  <button
                    type="button"
                    className="action-icon-btn danger"
                    onClick={() => {
                      deleteNotification(notif.id);
                      toast.info('Notification dismissed');
                    }}
                    title="Delete notification"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Compose Notification Modal */}
      <ComposeNotificationModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={handleSendNotification}
      />
    </div>
  );
}
