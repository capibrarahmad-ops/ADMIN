import React from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import { Mail, Calendar, Shield, Building, Phone, FileText, Activity } from 'lucide-react';

export default function UserDetailsModal({ isOpen, onClose, user, onToggleStatus, onEdit }) {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Profile & Security Metadata" maxWidth="540px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Top summary card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            background: 'var(--navy-50)',
            borderRadius: '12px',
            border: '1px solid var(--navy-200)'
          }}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="user-avatar"
            style={{ width: '56px', height: '56px', border: '2px solid var(--navy-300)' }}
          />
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy-900)' }}>
              {user.name}
            </h4>
            <div style={{ color: 'var(--navy-500)', fontSize: '0.84rem', marginTop: '0.15rem' }}>
              {user.email}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Badge variant={user.role}>{user.role}</Badge>
              <Badge variant={user.status}>{user.status}</Badge>
            </div>
          </div>
        </div>

        {/* Detailed Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
          <div style={{ padding: '0.75rem', background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-400)', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Building size={14} /> Department
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy-800)', marginTop: '0.25rem' }}>
              {user.department || 'General'}
            </div>
          </div>

          <div style={{ padding: '0.75rem', background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-400)', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={14} /> Joined Date
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy-800)', marginTop: '0.25rem' }}>
              {user.registrationDate}
            </div>
          </div>

          <div style={{ padding: '0.75rem', background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-400)', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Activity size={14} /> Last Activity
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy-800)', marginTop: '0.25rem' }}>
              {user.lastActive || 'Recently'}
            </div>
          </div>

          <div style={{ padding: '0.75rem', background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-400)', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <FileText size={14} /> Docs Created
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy-800)', marginTop: '0.25rem' }}>
              {user.documentsCount ?? 0} Slate Docs
            </div>
          </div>
        </div>

        {/* Security & Access privileges overview */}
        <div style={{ padding: '0.85rem 1rem', background: 'var(--navy-50)', borderRadius: '8px', border: '1px solid var(--navy-200)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Shield size={15} style={{ color: 'var(--primary-600)' }} />
            Role Permissions Granted
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--navy-600)', lineHeight: 1.4 }}>
            {user.role === 'Admin' && 'Full platform super-admin privileges: access to user management, system audit logs, environment tokens, and destructive controls.'}
            {user.role === 'Editor' && 'Editorial publishing rights: can create, review, publish, and archive team documentation across shared Slate workspaces.'}
            {user.role === 'Contributor' && 'Content creation privileges: can author workspace drafts and request review from editors.'}
            {user.role === 'Moderator' && 'Trust & Safety privileges: can inspect flagged abuse reports, ban abusive posts, and resolve community flags.'}
            {user.role === 'Member' && 'Standard read/write privileges within assigned organization workspaces.'}
          </p>
        </div>

        <div className="modal-footer" style={{ marginInline: '-1.5rem', marginBottom: '-1.5rem', marginTop: '1rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              onToggleStatus(user.id);
            }}
          >
            {user.status === 'Active' ? 'Deactivate Account' : 'Activate Account'}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onEdit(user);
            }}
          >
            Edit User Profile
          </button>
        </div>
      </div>
    </Modal>
  );
}
