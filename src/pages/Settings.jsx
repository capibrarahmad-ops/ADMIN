import React, { useState } from 'react';
import {
  Save,
  RotateCcw,
  Sliders,
  Shield,
  Bell,
  Palette,
  AlertCircle
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useToast } from '../context/ToastContext';

export default function Settings() {
  const { settings, setSettings } = useAdmin();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState(settings);
  const [errors, setErrors] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleGeneralChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      general: { ...prev.general, [field]: value }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSecurityChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      security: { ...prev.security, [field]: value }
    }));
    setHasUnsavedChanges(true);
  };

  const handleNotificationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value }
    }));
    setHasUnsavedChanges(true);
  };

  const handleAppearanceChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      appearance: { ...prev.appearance, [field]: value }
    }));
    setHasUnsavedChanges(true);
  };

  const validate = () => {
    const errs = {};
    if (!formData.general.appName.trim()) {
      errs.appName = 'Application name cannot be empty';
    }
    if (!formData.general.supportEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.general.supportEmail)) {
      errs.supportEmail = 'Valid support email address is required';
    }
    if (formData.security.sessionTimeoutMinutes < 5 || formData.security.sessionTimeoutMinutes > 720) {
      errs.sessionTimeout = 'Session timeout must be between 5 and 720 minutes';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix validation errors before saving.');
      return;
    }
    setSettings(formData);
    setHasUnsavedChanges(false);
    toast.success('Configuration preferences saved successfully!');
  };

  const handleReset = () => {
    setFormData(settings);
    setErrors({});
    setHasUnsavedChanges(false);
    toast.info('Changes discarded.');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1>Platform Settings & Preferences</h1>
          <p>Configure global application parameters, security requirements, and notifications</p>
        </div>

        <div className="page-header-actions">
          {hasUnsavedChanges && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              <RotateCcw size={15} />
              <span>Discard Changes</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            <Save size={15} />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-nav">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          <Sliders size={16} />
          <span>General Preferences</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <Shield size={16} />
          <span>Security & Auth</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <Bell size={16} />
          <span>Notification Routing</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'appearance' ? 'active' : ''}`}
          onClick={() => setActiveTab('appearance')}
        >
          <Palette size={16} />
          <span>Theme & Interface</span>
        </button>
      </div>

      <form onSubmit={handleSave}>
        {/* Tab 1: General */}
        {activeTab === 'general' && (
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">General Application Parameters</h3>
                <p className="card-subtitle">Public branding, contact points, and workspace registration</p>
              </div>
            </div>

            <div className="card-body">
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Application Branding Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.general.appName}
                    onChange={(e) => handleGeneralChange('appName', e.target.value)}
                  />
                  {errors.appName && (
                    <div className="form-error-msg">
                      <AlertCircle size={13} /> {errors.appName}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Official Support Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.general.supportEmail}
                    onChange={(e) => handleGeneralChange('supportEmail', e.target.value)}
                  />
                  {errors.supportEmail && (
                    <div className="form-error-msg">
                      <AlertCircle size={13} /> {errors.supportEmail}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Parent Legal Organization</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.general.organization}
                    onChange={(e) => handleGeneralChange('organization', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Default System Timezone</label>
                  <select
                    className="form-select"
                    value={formData.general.timezone}
                    onChange={(e) => handleGeneralChange('timezone', e.target.value)}
                  >
                    <option value="America/New_York (UTC-5)">Eastern Time (US & Canada) UTC-5</option>
                    <option value="America/Los_Angeles (UTC-8)">Pacific Time (US & Canada) UTC-8</option>
                    <option value="Europe/London (UTC+0)">London (GMT / UTC+0)</option>
                    <option value="Asia/Singapore (UTC+8)">Singapore, Hong Kong (UTC+8)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', padding: '1.25rem', background: 'var(--navy-50)', borderRadius: '10px', border: '1px solid var(--navy-200)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--navy-900)', fontSize: '0.9rem' }}>
                      Emergency Maintenance Mode
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--navy-500)' }}>
                      Temporarily display maintenance banner and restrict workspace write operations.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.general.maintenanceMode}
                    onChange={(e) => handleGeneralChange('maintenanceMode', e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--navy-900)', fontSize: '0.9rem' }}>
                      Allow Open Workspace Signups
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--navy-500)' }}>
                      Permit self-service user account registrations with corporate domain verification.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.general.allowPublicRegistrations}
                    onChange={(e) => handleGeneralChange('allowPublicRegistrations', e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Security & Auth */}
        {activeTab === 'security' && (
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Security Policies & Authentication</h3>
                <p className="card-subtitle">Session TTL, password complexity rules, and MFA enforcement</p>
              </div>
            </div>

            <div className="card-body">
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    Session Inactivity Timeout (Minutes)
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.security.sessionTimeoutMinutes}
                    onChange={(e) => handleSecurityChange('sessionTimeoutMinutes', parseInt(e.target.value) || 60)}
                  />
                  {errors.sessionTimeout && (
                    <div className="form-error-msg">
                      <AlertCircle size={13} /> {errors.sessionTimeout}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Minimum Password Length</label>
                  <select
                    className="form-select"
                    value={formData.security.passwordMinLength}
                    onChange={(e) => handleSecurityChange('passwordMinLength', parseInt(e.target.value))}
                  >
                    <option value={8}>8 Characters</option>
                    <option value={12}>12 Characters (Recommended NIST)</option>
                    <option value={16}>16 Characters (High Security)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', padding: '1.25rem', background: 'var(--navy-50)', borderRadius: '10px', border: '1px solid var(--navy-200)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--navy-900)', fontSize: '0.9rem' }}>
                      Enforce Mandatory Two-Factor Authentication (2FA)
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--navy-500)' }}>
                      Require TOTP authenticator app verification for all administrative roles.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.security.enforce2FA}
                    onChange={(e) => handleSecurityChange('enforce2FA', e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--navy-900)', fontSize: '0.9rem' }}>
                      Immutable Audit Trail Logging
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--navy-500)' }}>
                      Record every write, mutation, and role upgrade to write-once WORM cloud storage.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.security.auditLogging}
                    onChange={(e) => handleSecurityChange('auditLogging', e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Notifications */}
        {activeTab === 'notifications' && (
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Notification Channels & Delivery</h3>
                <p className="card-subtitle">Manage automated notifications dispatched to administrators</p>
              </div>
            </div>

            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Digest Aggregation Frequency</label>
                <select
                  className="form-select"
                  value={formData.notifications.systemDigestFrequency}
                  onChange={(e) => handleNotificationChange('systemDigestFrequency', e.target.value)}
                >
                  <option value="Realtime">Instant (Every incident)</option>
                  <option value="Daily">Daily Executive Summary</option>
                  <option value="Weekly">Weekly Telemetry Digest</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', padding: '1.25rem', background: 'var(--navy-50)', borderRadius: '10px', border: '1px solid var(--navy-200)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--navy-900)', fontSize: '0.9rem' }}>
                      Email Alerts for Critical Incidents
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--navy-500)' }}>
                      Immediate high-priority email dispatch on P0 server errors and abuse spikes.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifications.securityIncidentAlert}
                    onChange={(e) => handleNotificationChange('securityIncidentAlert', e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--navy-900)', fontSize: '0.9rem' }}>
                      New User Registration Notices
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--navy-500)' }}>
                      Notify administrators when a new user completes corporate signup.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifications.newUserAlert}
                    onChange={(e) => handleNotificationChange('newUserAlert', e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--navy-900)', fontSize: '0.9rem' }}>
                      Slack Webhook Synchronization
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--navy-500)' }}>
                      Echo all admin notifications to #ops-slate-alerts Slack channel.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifications.slackWebhookSync}
                    onChange={(e) => handleNotificationChange('slackWebhookSync', e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Appearance & Theme */}
        {activeTab === 'appearance' && (
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Theme & Layout Appearance</h3>
                <p className="card-subtitle">Personalize dashboard density and color palette accents</p>
              </div>
            </div>

            <div className="card-body">
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Theme Palette Preset</label>
                  <select
                    className="form-select"
                    value={formData.appearance.theme}
                    onChange={(e) => handleAppearanceChange('theme', e.target.value)}
                  >
                    <option value="Slate Navy">Slate Navy & Crisp White (Default)</option>
                    <option value="Sapphire Modern">Sapphire Blue Accent</option>
                    <option value="Monochrome Minimalist">Monochrome Minimalist</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Table Display Density</label>
                  <select
                    className="form-select"
                    value={formData.appearance.density}
                    onChange={(e) => handleAppearanceChange('density', e.target.value)}
                  >
                    <option value="comfortable">Comfortable (Standard)</option>
                    <option value="compact">Compact (High Information Density)</option>
                  </select>
                </div>
              </div>

              <div style={{ padding: '1.25rem', background: 'var(--navy-50)', borderRadius: '10px', border: '1px solid var(--navy-200)', marginTop: '0.75rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--navy-900)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  Active Navy Color Palette Token Preview
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem' }}>
                    <span style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#0f172a', border: '1px solid #cbd5e1' }} />
                    <span>Navy Dark (#0f172a)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem' }}>
                    <span style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#2563eb' }} />
                    <span>Sapphire Accent (#2563eb)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem' }}>
                    <span style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#f8fafc', border: '1px solid #cbd5e1' }} />
                    <span>Light Canvas (#f8fafc)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
