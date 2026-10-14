import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Send, AlertCircle, BellRing } from 'lucide-react';

export default function ComposeNotificationModal({ isOpen, onClose, onSend }) {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    category: 'System',
    priority: 'normal',
    targetAudience: 'All Slate Users'
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Notification title is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Notification body message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSend(formData);
    onClose();
    setFormData({
      title: '',
      message: '',
      category: 'System',
      priority: 'normal',
      targetAudience: 'All Slate Users'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Dispatch Administrative Broadcast" maxWidth="520px">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Target Audience
          </label>
          <select
            className="form-select"
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
          >
            <option value="All Slate Users">All Slate Workspace Members</option>
            <option value="Administrators Only">Administrators & Owners Only</option>
            <option value="Enterprise Tenants">Enterprise Tier Subscribers</option>
            <option value="Beta Testers">Slate AI Beta Cohort</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">
            Notification Title <span style={{ color: 'var(--danger-solid)' }}>*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Scheduled Infrastructure Maintenance"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          {errors.title && (
            <div className="form-error-msg">
              <AlertCircle size={13} /> {errors.title}
            </div>
          )}
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="System">System & Infrastructure</option>
              <option value="Security">Security Advisory</option>
              <option value="Alert">Moderation & Alert</option>
              <option value="Content">Editorial Announcement</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Priority Level</label>
            <select
              className="form-select"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="normal">Normal Priority</option>
              <option value="high">High (Urgent Banner)</option>
              <option value="low">Low (Silent Feed)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Message Body <span style={{ color: 'var(--danger-solid)' }}>*</span>
          </label>
          <textarea
            className="form-textarea"
            placeholder="Details regarding the maintenance, update, or advisory..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          {errors.message && (
            <div className="form-error-msg">
              <AlertCircle size={13} /> {errors.message}
            </div>
          )}
        </div>

        <div className="modal-footer" style={{ marginInline: '-1.5rem', marginBottom: '-1.5rem', marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Send size={15} />
            <span>Broadcast Notification</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
