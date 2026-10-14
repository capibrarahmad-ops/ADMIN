import React from 'react';
import { ANALYTICS_DATA } from '../../data/sampleData';

export default function TrafficSourcesBreakdown() {
  const sources = ANALYTICS_DATA.trafficSources;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Traffic Ingress Attribution</h3>
          <p className="card-subtitle">Source channels driving Slate workspaces usage</p>
        </div>
      </div>

      <div className="card-body">
        {/* Horizontal Stacked Progress Bar */}
        <div
          style={{
            height: '14px',
            width: '100%',
            borderRadius: '9999px',
            display: 'flex',
            overflow: 'hidden',
            marginBottom: '1.5rem',
            backgroundColor: 'var(--navy-100)'
          }}
        >
          {sources.map((item) => (
            <div
              key={item.source}
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
                transition: 'width 240ms ease'
              }}
              title={`${item.source}: ${item.percentage}%`}
            />
          ))}
        </div>

        {/* Detailed Breakdown List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {sources.map((item) => (
            <div
              key={item.source}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '0.65rem',
                borderBottom: '1px solid var(--navy-100)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: item.color
                  }}
                />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--navy-800)' }}>
                  {item.source}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--navy-500)' }}>
                  {item.visitors} visits
                </span>
                <span
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: 'var(--navy-900)',
                    minWidth: '40px',
                    textAlign: 'right'
                  }}
                >
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
