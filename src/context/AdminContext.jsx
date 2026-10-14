import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_ADMIN_PROFILE,
  INITIAL_USERS,
  INITIAL_CONTENT,
  INITIAL_REPORTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SETTINGS,
  INITIAL_RECENT_ACTIVITY
} from '../data/sampleData';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  // Sidebar states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('slate_sidebar_collapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Global Date Filter
  const [dateRange, setDateRange] = useState('30d');

  // Core Data Collections
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('slate_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('slate_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });

  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('slate_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('slate_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('slate_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [adminProfile, setAdminProfile] = useState(() => {
    const saved = localStorage.getItem('slate_admin_profile');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_PROFILE;
  });

  const [recentActivity, setRecentActivity] = useState(INITIAL_RECENT_ACTIVITY);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('slate_sidebar_collapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  useEffect(() => {
    localStorage.setItem('slate_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('slate_content', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('slate_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('slate_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('slate_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('slate_admin_profile', JSON.stringify(adminProfile));
  }, [adminProfile]);

  // User Actions
  const addUser = (userData) => {
    const newUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      documentsCount: 0,
      registrationDate: new Date().toISOString().split('T')[0],
      lastActive: 'Just now',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80',
      ...userData,
    };
    setUsers((prev) => [newUser, ...prev]);

    // Add activity
    addActivityLog({
      user: adminProfile.name,
      avatar: adminProfile.avatar,
      action: `Created user account for ${newUser.name} (${newUser.role})`,
      time: 'Just now',
      badge: 'Users',
      badgeType: 'primary'
    });

    return newUser;
  };

  const updateUser = (id, updatedFields) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updatedFields } : u))
    );
  };

  const deleteUser = (id) => {
    const user = users.find((u) => u.id === id);
    setUsers((prev) => prev.filter((u) => u.id !== id));

    if (user) {
      addActivityLog({
        user: adminProfile.name,
        avatar: adminProfile.avatar,
        action: `Deleted user ${user.name} (${user.email})`,
        time: 'Just now',
        badge: 'Users',
        badgeType: 'warning'
      });
    }
  };

  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === 'Active' ? 'Inactive' : 'Active';
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  // Content Actions
  const addContent = (contentData) => {
    const newContent = {
      id: `cnt-${Date.now().toString().slice(-4)}`,
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      ...contentData,
    };
    setContent((prev) => [newContent, ...prev]);

    addActivityLog({
      user: adminProfile.name,
      avatar: adminProfile.avatar,
      action: `Added content article: "${newContent.title}"`,
      time: 'Just now',
      badge: 'Content',
      badgeType: 'success'
    });

    return newContent;
  };

  const updateContent = (id, updatedFields) => {
    setContent((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              ...updatedFields,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : c
      )
    );
  };

  const deleteContent = (id) => {
    setContent((prev) => prev.filter((c) => c.id !== id));
  };

  // Reports Actions
  const updateReportStatus = (id, status) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const addReport = (reportData) => {
    const newRep = {
      id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Pending',
      ...reportData
    };
    setReports((prev) => [newRep, ...prev]);
    return newRep;
  };

  // Notification Actions
  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addNotification = (notifData) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
      priority: 'normal',
      ...notifData
    };
    setNotifications((prev) => [newNotif, ...prev]);
    return newNotif;
  };

  // Activity Log
  const addActivityLog = (entry) => {
    setRecentActivity((prev) => [{ id: `act-${Date.now()}`, ...entry }, ...prev.slice(0, 9)]);
  };

  // Reset to initial sample data
  const resetDemoData = () => {
    setUsers(INITIAL_USERS);
    setContent(INITIAL_CONTENT);
    setReports(INITIAL_REPORTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSettings(INITIAL_SETTINGS);
    setAdminProfile(INITIAL_ADMIN_PROFILE);
    localStorage.removeItem('slate_users');
    localStorage.removeItem('slate_content');
    localStorage.removeItem('slate_reports');
    localStorage.removeItem('slate_notifications');
    localStorage.removeItem('slate_settings');
    localStorage.removeItem('slate_admin_profile');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const pendingReportsCount = reports.filter((r) => r.status === 'Pending' || r.status === 'Under Review').length;

  return (
    <AdminContext.Provider
      value={{
        // Layout
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        dateRange,
        setDateRange,

        // Users
        users,
        addUser,
        updateUser,
        deleteUser,
        toggleUserStatus,

        // Content
        content,
        addContent,
        updateContent,
        deleteContent,

        // Reports
        reports,
        updateReportStatus,
        addReport,
        pendingReportsCount,

        // Notifications
        notifications,
        unreadCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        addNotification,

        // Settings
        settings,
        setSettings,

        // Admin Profile
        adminProfile,
        setAdminProfile,

        // Recent Activity
        recentActivity,
        addActivityLog,

        // Helpers
        resetDemoData
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
