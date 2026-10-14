import React, { useState } from 'react';
import { ANALYTICS_DATA } from '../../data/sampleData';

export default function GrowthChart({ dateRange }) {
  const data = ANALYTICS_DATA.monthlyGrowth;
  const [hoverIndex, setHoverIndex] = useState(null);

  // Chart coordinates calculation (SVG viewBox: 0 0 600 200)
  const width = 600;
  const height = 180;
  const paddingX = 40;
  const paddingY = 25;

  const maxVal = 26000;
  const minVal = 10000;

  const getX = (index) => paddingX + (index * (width - 2 * paddingX)) / (data.length - 1);
  const getY = (val) => height - paddingY - ((val - minVal) * (height - 2 * paddingY)) / (maxVal - minVal);

  const pointsUsers = data.map((d, i) => `${getX(i)},${getY(d.users)}`).join(' ');
  const pointsActive = data.map((d, i) => `${getX(i)},${getY(d.active)}`).join(' ');

  // Area path for total users
  const areaPath = `M ${getX(0)},${height - paddingY} ` +
    data.map((d, i) => `L ${getX(i)},${getY(d.users)}`).join(' ') +
    ` L ${getX(data.length - 1)},${height - paddingY} Z`;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">User Growth & Retention Trend</h3>
          <p className="card-subtitle">Monthly trajectory of total registered vs. 30-day active users</p>
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#2563eb' }} />
            <span>Total Users</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#10b981' }} />
            <span>Active Users</span>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="chart-container" style={{ position: 'relative' }}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="chart-svg"
            style={{ width: '100%', height: '220px' }}
          >
            <defs>
              <linearGradient id="userGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[10000, 15000, 20000, 25000].map((val) => (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={getY(val)}
                  x2={width - paddingX}
                  y2={getY(val)}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 10}
                  y={getY(val) + 4}
                  fill="#94a3b8"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="inherit"
                >
                  {(val / 1000).toFixed(0)}k
                </text>
              </g>
            ))}

            {/* Area fill */}
            <path d={areaPath} fill="url(#userGlow)" />

            {/* Total Users Line */}
            <polyline
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={pointsUsers}
            />

            {/* Active Users Line */}
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeDasharray="5 3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={pointsActive}
            />

            {/* Data points & X-axis labels */}
            {data.map((d, i) => {
              const cx = getX(i);
              const cy = getY(d.users);
              const isHovered = hoverIndex === i;

              return (
                <g
                  key={d.month}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Invisible hit target for hover */}
                  <rect
                    x={cx - 20}
                    y={0}
                    width={40}
                    height={height}
                    fill="transparent"
                  />

                  {/* Indicator vertical guide line when hovered */}
                  {isHovered && (
                    <line
                      x1={cx}
                      y1={paddingY}
                      x2={cx}
                      y2={height - paddingY}
                      stroke="#cbd5e1"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  )}

                  {/* Circle point */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 6 : 4}
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth={isHovered ? 3 : 2}
                  />

                  {/* Month Label */}
                  <text
                    x={cx}
                    y={height - 6}
                    fill="#64748b"
                    fontSize="11"
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    {d.month}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive Tooltip Card */}
          {hoverIndex !== null && (
            <div
              style={{
                position: 'absolute',
                left: `${(getX(hoverIndex) / width) * 100}%`,
                top: '15px',
                transform: 'translateX(-50%)',
                background: '#0f172a',
                color: '#ffffff',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                fontSize: '0.78rem',
                pointerEvents: 'none',
                zIndex: 10,
                minWidth: '130px'
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: '0.25rem', borderBottom: '1px solid #334155', paddingBottom: '0.2rem' }}>
                {data[hoverIndex].month} 2025
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', color: '#93c5fd' }}>
                <span>Total:</span>
                <strong>{data[hoverIndex].users.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', color: '#6ee7b7' }}>
                <span>Active:</span>
                <strong>{data[hoverIndex].active.toLocaleString()}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
