import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';

export default function RecentUsersTable({ users }) {
  const recentUsers = users.slice(0, 5);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Newly Registered Users</h3>
          <p className="card-subtitle">Recent accounts onboarding to Slate platform</p>
        </div>
        <Link
          to="/admin/users"
          className="btn btn-secondary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <span>View All Users</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="user-avatar"
                      style={{ width: '32px', height: '32px' }}
                    />
                    <div className="user-cell-meta">
                      <span className="user-cell-name">{user.name}</span>
                      <span className="user-cell-email">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge variant={user.role}>{user.role}</Badge>
                </td>
                <td>
                  <Badge variant={user.status}>{user.status}</Badge>
                </td>
                <td style={{ color: 'var(--navy-500)', fontSize: '0.84rem' }}>
                  {user.registrationDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
