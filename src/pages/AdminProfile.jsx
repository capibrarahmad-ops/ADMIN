import React, { useState } from 'react';
import {
  Key,
  Smartphone,
  Laptop,
  Save,
  AlertCircle
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useToast } from '../context/ToastContext';
import Badge from '../components/common/Badge';

export default function AdminProfile() {
  const { adminProfile, setAdminProfile } = useAdmin();
  const toast = useToast();

  const [profileForm, setProfileForm] = useState(adminProfile);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  const [sessions, setSessions] = useState([
    {
      id: 'sess-1',
      device: 'macOS Chrome 124 (Current Session)',
      ip: '192.168.1.45',
      location: 'San Francisco, USA',
      lastActive: 'Active Now',
      isCurrent: true,
      icon: Laptop
    },
    {
      id: 'sess-2',
      device: 'Windows 11 Firefox 126',
      ip: '74.125.210.14',
      location: 'San Jose, USA',
      lastActive: '3 hours ago',
      isCurrent: false,
      icon: Laptop
    },
    {
      id: 'sess-3',
      device: 'iPhone 15 Pro Slate Mobile',
      ip: '172.56.21.89',
      location: 'Palo Alto, USA',
      lastActive: 'Yesterday at 8:40 PM',
      isCurrent: false,
      icon: Smartphone
    }
  ]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!profileForm.name.trim() || !profileForm.email.trim()) {
      toast.error('Name and Email are required.');
      return;
    }
    setAdminProfile(profileForm);
    toast.success('Admin profile credentials updated successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!passwordForm.currentPassword) {
      errs.current = 'Current password is required';
    }
    if (!passwordForm.newPassword) {
      errs.new = 'New password is required';
    } else if (passwordForm.newPassword.length < 10) {
      errs.new = 'New password must be at least 10 characters long';
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errs.confirm = 'Passwords do not match';
    }

    if (Object.keys(errs).length > 0) {
      setPasswordErrors(errs);
      return;
    }

    setPasswordErrors({});
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    toast.success('Password updated successfully. Session re-authenticated.');
  };

  const handleRevokeSession = (sessionId) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    toast.info('Session access token revoked.');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1>Administrator Profile & Security</h1>
          <p>Manage your identity, cryptographic credentials, active devices, and permissions</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        {/* Left Column: Profile Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ textAlign: 'center', padding: '1.75rem 1.25rem' }}>
            <div style={{ position: 'relative', width: '96px', height: '96px', margin: '0 auto 1rem' }}>
              <img
                src={profileForm.avatar}
                alt={profileForm.name}
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid var(--navy-200)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              />
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy-900)' }}>
              {profileForm.name}
            </h3>
            <div style={{ fontSize: '0.84rem', color: 'var(--navy-500)', marginTop: '0.2rem' }}>
              {profileForm.title}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
              <Badge variant="admin">{profileForm.role}</Badge>
              <Badge variant="active">2FA Enforced</Badge>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--navy-100)', margin: '1.25rem 0' }} />

            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.84rem' }}>
              <div>
                <span style={{ color: 'var(--navy-400)', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 600 }}>Email</span>
                <div style={{ color: 'var(--navy-800)', fontWeight: 500 }}>{profileForm.email}</div>
              </div>
              <div>
                <span style={{ color: 'var(--navy-400)', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 600 }}>Department</span>
                <div style={{ color: 'var(--navy-800)', fontWeight: 500 }}>{profileForm.department}</div>
              </div>
              <div>
                <span style={{ color: 'var(--navy-400)', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 600 }}>Location</span>
                <div style={{ color: 'var(--navy-800)', fontWeight: 500 }}>{profileForm.location}</div>
              </div>
            </div>
          </div>

          {/* Active Sessions Card */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Active Devices & Tokens</h3>
            </div>
            <div className="card-body" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {sessions.map((sess) => {
                  const Icon = sess.icon;
                  return (
                    <div
                      key={sess.id}
                      style={{
                        padding: '0.75rem',
                        border: '1px solid var(--navy-200)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <Icon size={18} style={{ color: sess.isCurrent ? 'var(--primary-600)' : 'var(--navy-400)' }} />
                        <div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--navy-900)' }}>
                            {sess.device}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--navy-500)' }}>
                            {sess.ip} • {sess.lastActive}
                          </div>
                        </div>
                      </div>

                      {!sess.isCurrent && (
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleRevokeSession(sess.id)}
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile & Password Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Profile Details Edit Form */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Identity & Profile Information</h3>
                <p className="card-subtitle">Personal data displayed across administrative audit logs</p>
              </div>
            </div>

            <form onSubmit={handleProfileSave} className="card-body">
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Professional Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileForm.department}
                    onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Phone Contact</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Avatar Image URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={profileForm.avatar}
                    onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Administrative Bio & Responsibility Summary</label>
                <textarea
                  className="form-textarea"
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                <button type="submit" className="btn btn-primary">
                  <Save size={15} />
                  <span>Update Profile</span>
                </button>
              </div>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Rotate Administrator Password</h3>
                <p className="card-subtitle">Ensure cryptographic security with high entropy passwords</p>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="card-body">
              <div className="form-group">
                <label className="form-label">Current Master Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••••••"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                />
                {passwordErrors.current && (
                  <div className="form-error-msg">
                    <AlertCircle size={13} /> {passwordErrors.current}
                  </div>
                )}
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Minimum 10 characters"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  />
                  {passwordErrors.new && (
                    <div className="form-error-msg">
                      <AlertCircle size={13} /> {passwordErrors.new}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Repeat new password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  />
                  {passwordErrors.confirm && (
                    <div className="form-error-msg">
                      <AlertCircle size={13} /> {passwordErrors.confirm}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                <button type="submit" className="btn btn-primary">
                  <Key size={15} />
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
