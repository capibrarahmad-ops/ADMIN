import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AdminProvider } from './context/AdminContext';

// Layout
import AdminLayout from './layouts/AdminLayout';

// Pages
import AdminDashboard from './pages/AdminDashboard';
import Users from './pages/Users';
import ContentManagement from './pages/ContentManagement';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import AdminProfile from './pages/AdminProfile';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AdminProvider>
          <Routes>
            {/* Redirect root / to /admin */}
            <Route path="/" element={<Navigate to="/admin" replace />} />

            {/* Shared Admin Shell Layout with child routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="content" element={<ContentManagement />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="reports" element={<Reports />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
