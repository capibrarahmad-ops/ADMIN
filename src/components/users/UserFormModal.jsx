import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { UserPlus, UserCheck, AlertCircle } from 'lucide-react';

export default function UserFormModal({
  isOpen,
  onClose,
  onSubmit,
  userToEdit = null
}) {
  const isEditing = Boolean(userToEdit);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Member',
    status: 'Active',
    department: 'Engineering',
    phone: '',
    avatar: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name || '',
        email: userToEdit.email || '',
        role: userToEdit.role || 'Member',
        status: userToEdit.status || 'Active',
        department: userToEdit.department || 'Engineering',
        phone: userToEdit.phone || '',
        avatar: userToEdit.avatar || ''
      });
      setErrors({});
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'Member',
        status: 'Active',
        department: 'Engineering',
        phone: '',
        avatar: ''
      });
      setErrors({});
    }
  }, [userToEdit, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? `Edit User: ${userToEdit.name}` : 'Provision New Slate User'}
      maxWidth="560px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Full Name <span style={{ color: 'var(--danger-solid)' }}>*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Liam Sterling"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && (
            <div className="form-error-msg">
              <AlertCircle size={13} /> {errors.name}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Corporate Email Address <span style={{ color: 'var(--danger-solid)' }}>*</span>
          </label>
          <input
            type="email"
            className="form-input"
            placeholder="e.g. liam@apexcorp.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && (
            <div className="form-error-msg">
              <AlertCircle size={13} /> {errors.email}
            </div>
          )}
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Role Assignment</label>
            <select
              className="form-select"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Admin">Admin (Full Console Access)</option>
              <option value="Editor">Editor (Workspace Content)</option>
              <option value="Contributor">Contributor (Draft & Review)</option>
              <option value="Moderator">Moderator (Trust & Safety)</option>
              <option value="Member">Member (Read & Comment)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Account Status</label>
            <select
              className="form-select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
              <option value="Pending">Pending Verification</option>
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Department / Team</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Product Engineering"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Contact (Optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Avatar Image URL <span className="form-label-hint">(Unsplash or CDN link)</span>
          </label>
          <input
            type="url"
            className="form-input"
            placeholder="https://images.unsplash.com/..."
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          />
        </div>

        <div className="modal-footer" style={{ marginInline: '-1.5rem', marginBottom: '-1.5rem', marginTop: '1.5rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? <UserCheck size={16} /> : <UserPlus size={16} />}
            <span>{isEditing ? 'Save Changes' : 'Provision User'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
