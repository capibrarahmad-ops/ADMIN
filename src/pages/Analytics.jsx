import React from 'react';
import {
  Eye,
  Users,
  Clock,
  FileText,
  Calendar,
  Info
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import GrowthChart from '../components/dashboard/GrowthChart';
import TrafficSourcesBreakdown from '../components/analytics/TrafficSourcesBreakdown';
import DeviceBreakdown from '../components/analytics/DeviceBreakdown';
import { ANALYTICS_DATA } from '../data/sampleData';
import { useAdmin } from '../context/AdminContext';

export default function Analytics() {
  const { dateRange, setDateRange } = useAdmin();
  const overview = ANALYTICS_DATA.overview;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1>Analytics & Operational Telemetry</h1>
          <p>Product adoption velocity, document engagement telemetry, and client session attribution</p>
        </div>

        <div className="page-header-actions">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', padding: '0.25rem 0.5rem', borderRadius: '10px', border: '1px solid var(--navy-200)' }}>
            <Calendar size={16} style={{ color: 'var(--navy-500)', marginLeft: '0.25rem' }} />
            <select
              className="select-filter"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{ border: 'none', height: '32px', paddingRight: '1.75rem', fontSize: '0.82rem' }}
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="ytd">Year to Date (2025)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sample Data Disclaimer Callout */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.75rem 1rem',
          borderRadius: '10px',
          background: 'var(--info-bg)',
          border: '1px solid var(--info-border)',
          color: 'var(--info-text)',
          fontSize: '0.82rem',
          marginBottom: '1.5rem'
        }}
      >
        <Info size={16} style={{ flexShrink: 0 }} />
        <span>
          <strong>Sample Telemetry Data:</strong> The values shown below represent mock SaaS platform activity for demonstration purposes. In production, this module streams data directly from your ClickHouse / Segment telemetry warehouse.
        </span>
      </div>

      {/* KPI Cards Grid */}
      <div className="stat-cards-grid">
        <StatCard
          title="Total Page Views"
          value={overview.pageViews.value}
          change={overview.pageViews.change}
          isPositive={true}
          period="vs prior 30d"
          icon={Eye}
          variant="blue"
        />
        <StatCard
          title="Unique Visitors"
          value={overview.uniqueVisitors.value}
          change={overview.uniqueVisitors.change}
          isPositive={true}
          period="vs prior 30d"
          icon={Users}
          variant="emerald"
        />
        <StatCard
          title="Avg Session Duration"
          value={overview.avgSessionDuration.value}
          change={overview.avgSessionDuration.change}
          isPositive={true}
          period="active retention"
          icon={Clock}
          variant="indigo"
        />
        <StatCard
          title="Documents Generated"
          value={overview.documentsCreated.value}
          change={overview.documentsCreated.change}
          isPositive={true}
          period="in workspaces"
          icon={FileText}
          variant="amber"
        />
      </div>

      {/* Main Growth Curve */}
      <div style={{ marginBottom: '1.5rem' }}>
        <GrowthChart dateRange={dateRange} />
      </div>

      {/* Split Grid: Traffic Sources & Device Platforms */}
      <div className="dashboard-charts-grid">
        <TrafficSourcesBreakdown />
        <DeviceBreakdown />
      </div>

      {/* Feature Adoption Performance Table */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">Slate Core Feature Adoption Matrix</h3>
            <p className="card-subtitle">Telemetry signals across collaborative editing surfaces</p>
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Feature Module</th>
                <th>Monthly Active Workspaces</th>
                <th>Daily Interactions</th>
                <th>Adoption Rate</th>
                <th>Health Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--navy-900)' }}>
                  Realtime Collaborative Canvas
                </td>
                <td>1,842 Workspaces</td>
                <td>284,100 ops/day</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '100px', height: '6px', background: 'var(--navy-100)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '84%', height: '100%', background: 'var(--primary-600)' }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>84%</span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-active">Optimal</span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--navy-900)' }}>
                  Vector Semantic Search & Query
                </td>
                <td>1,120 Workspaces</td>
                <td>119,450 queries/day</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '100px', height: '6px', background: 'var(--navy-100)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '62%', height: '100%', background: 'var(--primary-600)' }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>62%</span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-active">Optimal</span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--navy-900)' }}>
                  External Public Share Links
                </td>
                <td>985 Workspaces</td>
                <td>68,200 views/day</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '100px', height: '6px', background: 'var(--navy-100)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '49%', height: '100%', background: 'var(--warning-solid)' }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>49%</span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-pending">Growing</span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--navy-900)' }}>
                  Webhook Sync & Zapier Integration
                </td>
                <td>420 Workspaces</td>
                <td>45,900 events/day</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '100px', height: '6px', background: 'var(--navy-100)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '28%', height: '100%', background: 'var(--navy-400)' }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>28%</span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-inactive">Standard</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
