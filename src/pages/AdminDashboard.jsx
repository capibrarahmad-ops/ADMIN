import React from 'react';
import {
  Users,
  UserCheck,
  UserPlus,
  AlertTriangle,
  Calendar,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import GrowthChart from '../components/dashboard/GrowthChart';
import ActivityChart from '../components/dashboard/ActivityChart';
import RecentActivityFeed from '../components/dashboard/RecentActivityFeed';
import RecentUsersTable from '../components/dashboard/RecentUsersTable';
import { useAdmin } from '../context/AdminContext';

export default function AdminDashboard() {
  const { users, pendingReportsCount, dateRange, setDateRange } = useAdmin();

  // Compute dynamic stats based on current state
  const activeCount = users.filter((u) => u.status === 'Active').length;
  const totalCount = users.length;

  return (
    <div>
      {/* Page Title & Filter Bar */}
      <div className="page-header">
        <div className="page-header-info">
          <h1>Platform Executive Dashboard</h1>
          <p>Real-time metrics, user growth trajectory, and Slate infrastructure operations</p>
        </div>

        <div className="page-header-actions">
          {/* Date Filter selector */}
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
              <option value="90d">This Quarter (90d)</option>
              <option value="ytd">Year to Date (2025)</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="stat-cards-grid">
        <StatCard
          title="Total Users"
          value="24,582"
          change="+12.4%"
          isPositive={true}
          period="vs prior 30 days"
          icon={Users}
          variant="blue"
        />
        <StatCard
          title="30-Day Active Users"
          value="18,290"
          change="+8.1%"
          isPositive={true}
          period="vs prior period"
          icon={UserCheck}
          variant="emerald"
        />
        <StatCard
          title="New Registrations"
          value="1,429"
          change="+24.6%"
          isPositive={true}
          period="this week"
          icon={UserPlus}
          variant="indigo"
        />
        <StatCard
          title="Pending Incident Reports"
          value={pendingReportsCount.toString()}
          change={pendingReportsCount > 0 ? "Needs Review" : "All Clear"}
          isPositive={pendingReportsCount === 0}
          period="requires action"
          icon={AlertTriangle}
          variant="amber"
        />
      </div>

      {/* Charts Grid: Growth Trajectory & Weekly Engagement */}
      <div className="dashboard-charts-grid">
        <GrowthChart dateRange={dateRange} />
        <ActivityChart />
      </div>

      {/* Bottom Grid: Recent Audit Activity & Recent Users Snapshot */}
      <div className="dashboard-bottom-grid">
        <RecentUsersTable users={users} />
        <RecentActivityFeed />
      </div>
    </div>
  );
}
