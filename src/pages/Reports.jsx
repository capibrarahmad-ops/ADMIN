import React from 'react';
import ReportTable from '../components/reports/ReportTable';
import { useAdmin } from '../context/AdminContext';
import { Flag, AlertOctagon, CheckCircle2, Clock } from 'lucide-react';

export default function Reports() {
  const { reports } = useAdmin();

  const total = reports.length;
  const pending = reports.filter((r) => r.status === 'Pending').length;
  const underReview = reports.filter((r) => r.status === 'Under Review').length;
  const resolved = reports.filter((r) => r.status === 'Resolved').length;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1>System & Incident Reports</h1>
          <p>Triage abuse complaints, trust & safety escalations, and platform security flags</p>
        </div>
      </div>

      {/* Mini Counters */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}
      >
        <div style={{ background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary-50)', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flag size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-500)', textTransform: 'uppercase', fontWeight: 600 }}>Total Reports</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>{total}</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--danger-bg)', color: 'var(--danger-solid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertOctagon size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-500)', textTransform: 'uppercase', fontWeight: 600 }}>Pending Review</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>{pending}</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--warning-bg)', color: 'var(--warning-solid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-500)', textTransform: 'uppercase', fontWeight: 600 }}>Under Investigation</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>{underReview}</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--success-bg)', color: 'var(--success-solid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-500)', textTransform: 'uppercase', fontWeight: 600 }}>Resolved & Closed</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>{resolved}</div>
          </div>
        </div>
      </div>

      {/* Main Report Table */}
      <ReportTable />
    </div>
  );
}
