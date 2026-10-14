import React from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import { AlertCircle, User, Calendar, Shield, CheckCircle, XCircle } from 'lucide-react';

export default function ReportDetailsModal({
  isOpen,
  onClose,
  report,
  onUpdateStatus
}) {
  if (!report) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Incident Report: ${report.id}`} maxWidth="560px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Incident Summary Card */}
        <div
          style={{
            padding: '1.1rem',
            background: 'var(--navy-50)',
            borderRadius: '12px',
            border: '1px solid var(--navy-200)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--navy-500)' }}>
              {report.id}
            </span>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <Badge variant={report.severity}>{report.severity}</Badge>
              <Badge variant={report.status}>{report.status}</Badge>
            </div>
          </div>

          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)', lineHeight: 1.35, marginBottom: '0.35rem' }}>
            {report.subject}
          </h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--navy-600)', lineHeight: 1.45 }}>
            {report.description}
          </p>
        </div>

        {/* Target & Reporter Meta */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
          <div style={{ padding: '0.75rem', background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-400)', textTransform: 'uppercase', fontWeight: 600 }}>
              Flagged Entity
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--navy-800)', marginTop: '0.2rem' }}>
              {report.reportedItem}
            </div>
          </div>

          <div style={{ padding: '0.75rem', background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-400)', textTransform: 'uppercase', fontWeight: 600 }}>
              Category
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--navy-800)', marginTop: '0.2rem' }}>
              {report.category}
            </div>
          </div>

          <div style={{ padding: '0.75rem', background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-400)', textTransform: 'uppercase', fontWeight: 600 }}>
              Reported By
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--navy-800)', marginTop: '0.2rem' }}>
              {report.reporter}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-500)' }}>
              {report.reporterEmail}
            </div>
          </div>

          <div style={{ padding: '0.75rem', background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-400)', textTransform: 'uppercase', fontWeight: 600 }}>
              Report Timestamp
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--navy-800)', marginTop: '0.2rem' }}>
              {report.date}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="modal-footer" style={{ marginInline: '-1.5rem', marginBottom: '-1.5rem', marginTop: '1rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              onUpdateStatus(report.id, 'Dismissed');
              onClose();
            }}
          >
            <XCircle size={15} />
            <span>Dismiss Report</span>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onUpdateStatus(report.id, 'Resolved');
              onClose();
            }}
          >
            <CheckCircle size={15} />
            <span>Mark Resolved</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
