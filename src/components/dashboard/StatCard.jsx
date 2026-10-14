import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({
  title,
  value,
  change,
  isPositive = true,
  period = 'vs last period',
  icon: Icon,
  variant = 'blue'
}) {
  const iconVariants = {
    blue: 'stat-icon-blue',
    emerald: 'stat-icon-emerald',
    amber: 'stat-icon-amber',
    indigo: 'stat-icon-indigo'
  };

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-card-label">{title}</span>
        <div className={`stat-card-icon ${iconVariants[variant] || 'stat-icon-blue'}`}>
          <Icon size={20} />
        </div>
      </div>

      <div className="stat-card-value">{value}</div>

      <div className="stat-card-trend">
        <span className={`trend-badge ${isPositive ? 'up' : 'down'}`}>
          {isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {change}
        </span>
        <span className="trend-context">{period}</span>
      </div>
    </div>
  );
}
