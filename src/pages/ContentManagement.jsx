import React from 'react';
import ContentTable from '../components/content/ContentTable';
import { useAdmin } from '../context/AdminContext';
import { FileText, CheckCircle2, FileEdit, Eye } from 'lucide-react';

export default function ContentManagement() {
  const { content } = useAdmin();

  const total = content.length;
  const published = content.filter((c) => c.status === 'Published').length;
  const drafts = content.filter((c) => c.status === 'Draft' || c.status === 'Under Review').length;
  const totalViews = content.reduce((acc, curr) => acc + (curr.views || 0), 0);

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1>Slate Content & Knowledge Base</h1>
          <p>Author, review, publish, and audit documentation articles across organizational spaces</p>
        </div>
      </div>

      {/* Mini Metric Counters */}
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
            <FileText size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-500)', textTransform: 'uppercase', fontWeight: 600 }}>Total Documents</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>{total}</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--success-bg)', color: 'var(--success-solid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-500)', textTransform: 'uppercase', fontWeight: 600 }}>Published Public</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>{published}</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--warning-bg)', color: 'var(--warning-solid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileEdit size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-500)', textTransform: 'uppercase', fontWeight: 600 }}>Drafts & In-Review</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>{drafts}</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Eye size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-500)', textTransform: 'uppercase', fontWeight: 600 }}>Aggregate Views</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>{totalViews.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Main Content Table */}
      <ContentTable />
    </div>
  );
}
