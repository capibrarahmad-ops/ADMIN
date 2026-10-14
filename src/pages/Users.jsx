import React from 'react';
import UserTable from '../components/users/UserTable';
import { useAdmin } from '../context/AdminContext';
import { Users as UsersIcon, ShieldCheck, UserX, Clock } from 'lucide-react';

export default function Users() {
  const { users } = useAdmin();

  const total = users.length;
  const active = users.filter((u) => u.status === 'Active').length;
  const inactive = users.filter((u) => u.status === 'Inactive').length;
  const suspended = users.filter((u) => u.status === 'Suspended').length;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1>User Governance & Directory</h1>
          <p>Inspect, provision, edit roles, and manage authentication status across Slate workspaces</p>
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
            <UsersIcon size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-500)', textTransform: 'uppercase', fontWeight: 600 }}>Total Accounts</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>{total}</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--success-bg)', color: 'var(--success-solid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-500)', textTransform: 'uppercase', fontWeight: 600 }}>Active Users</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>{active}</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--navy-100)', color: 'var(--navy-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-500)', textTransform: 'uppercase', fontWeight: 600 }}>Inactive Accounts</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>{inactive}</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--navy-200)', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--danger-bg)', color: 'var(--danger-solid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserX size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--navy-500)', textTransform: 'uppercase', fontWeight: 600 }}>Suspended Accounts</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>{suspended}</div>
          </div>
        </div>
      </div>

      {/* Main Users Table */}
      <UserTable />
    </div>
  );
}
