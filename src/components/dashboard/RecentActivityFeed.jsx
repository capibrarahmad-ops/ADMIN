import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Clock } from 'lucide-react';
import Badge from '../common/Badge';

export default function RecentActivityFeed() {
  const { recentActivity } = useAdmin();

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Recent Administrative Audit</h3>
          <p className="card-subtitle">Real-time actions executed within Slate</p>
        </div>
      </div>

      <div className="card-body">
        <div className="activity-feed-list">
          {recentActivity.slice(0, 5).map((act) => (
            <div key={act.id} className="activity-item">
              <img
                src={act.avatar}
                alt={act.user}
                className="activity-avatar"
              />
              <div className="activity-content">
                <div className="activity-user-row">
                  <span className="activity-user-name">{act.user}</span>
                  <span className="activity-time" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} />
                    {act.time}
                  </span>
                </div>
                <p className="activity-desc">{act.action}</p>
                <div style={{ marginTop: '0.35rem' }}>
                  <Badge variant={act.badgeType || 'admin'}>
                    {act.badge}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
