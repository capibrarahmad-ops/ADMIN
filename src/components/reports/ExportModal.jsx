import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Download, FileSpreadsheet, FileText, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ExportModal({ isOpen, onClose, reportsCount }) {
  const [format, setFormat] = useState('csv');
  const [timeframe, setTimeframe] = useState('30d');
  const [includeAuditLogs, setIncludeAuditLogs] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const toast = useToast();

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onClose();

      // Simulate download trigger via Blob
      const fileData = `Slate-Incident-Reports-${timeframe.toUpperCase()}.${format}`;
      const blob = new Blob([`# Slate Audit Export\nGenerated: ${new Date().toISOString()}\nTotal Records: ${reportsCount}\nFormat: ${format}`], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileData;
      a.click();
      URL.revokeObjectURL(url);

      toast.success(`Export generated: ${fileData}`);
    }, 800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate Platform Audit Report" maxWidth="480px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label className="form-label">Select Export Format</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div
              onClick={() => setFormat('csv')}
              style={{
                border: `2px solid ${format === 'csv' ? 'var(--primary-600)' : 'var(--navy-200)'}`,
                borderRadius: '10px',
                padding: '0.85rem',
                cursor: 'pointer',
                background: format === 'csv' ? 'var(--primary-50)' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <FileSpreadsheet size={22} style={{ color: format === 'csv' ? 'var(--primary-600)' : 'var(--navy-500)' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--navy-900)' }}>CSV / Excel</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--navy-500)' }}>Tabular data export</div>
              </div>
            </div>

            <div
              onClick={() => setFormat('pdf')}
              style={{
                border: `2px solid ${format === 'pdf' ? 'var(--primary-600)' : 'var(--navy-200)'}`,
                borderRadius: '10px',
                padding: '0.85rem',
                cursor: 'pointer',
                background: format === 'pdf' ? 'var(--primary-50)' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <FileText size={22} style={{ color: format === 'pdf' ? 'var(--primary-600)' : 'var(--navy-500)' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--navy-900)' }}>PDF Dossier</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--navy-500)' }}>Executive audit report</div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Timeframe Filter</label>
          <select
            className="form-select"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="7d">Last 7 Days (Recent Activity)</option>
            <option value="30d">Last 30 Days (Current Month)</option>
            <option value="90d">Last Quarter (Q1/Q2)</option>
            <option value="all">All-Time Historical Archive</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <input
            type="checkbox"
            id="auditLogsCheck"
            checked={includeAuditLogs}
            onChange={(e) => setIncludeAuditLogs(e.target.checked)}
            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
          />
          <label htmlFor="auditLogsCheck" style={{ fontSize: '0.84rem', color: 'var(--navy-700)', cursor: 'pointer', userSelect: 'none' }}>
            Include administrative IP addresses and authorization signatures
          </label>
        </div>

        <div className="modal-footer" style={{ marginInline: '-1.5rem', marginBottom: '-1.5rem', marginTop: '1rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isExporting}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleExport} disabled={isExporting}>
            <Download size={15} />
            <span>{isExporting ? 'Compiling Dossier...' : `Download ${format.toUpperCase()}`}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
