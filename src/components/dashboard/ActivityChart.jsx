import React, { useState } from 'react';
import { ANALYTICS_DATA } from '../../data/sampleData';

export default function ActivityChart() {
  const data = ANALYTICS_DATA.weeklyActivity;
  const [hoverDay, setHoverDay] = useState(null);

  const maxVal = 20000;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Weekly Slate Engagement</h3>
          <p className="card-subtitle">Active daily sessions across weekdays</p>
        </div>
        <span className="badge badge-active" style={{ fontSize: '0.74rem' }}>
          Realtime Live
        </span>
      </div>

      <div className="card-body">
        <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '0.75rem', paddingTop: '1.5rem' }}>
          {data.map((item, idx) => {
            const heightPercent = (item.activeUsers / maxVal) * 100;
            const isHovered = hoverDay === idx;

            return (
              <div
                key={item.day}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onMouseEnter={() => setHoverDay(idx)}
                onMouseLeave={() => setHoverDay(null)}
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '0',
                      background: '#0f172a',
                      color: '#ffffff',
                      padding: '0.35rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                    }}
                  >
                    <strong>{item.activeUsers.toLocaleString()}</strong> active
                  </div>
                )}

                {/* Bar */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: '36px',
                    height: `${heightPercent}%`,
                    backgroundColor: isHovered ? '#1d4ed8' : '#2563eb',
                    borderRadius: '6px 6px 2px 2px',
                    transition: 'all 180ms ease-out',
                    background: isHovered
                      ? 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)'
                      : 'linear-gradient(180deg, #60a5fa 0%, #2563eb 100%)'
                  }}
                />

                {/* Day label */}
                <span
                  style={{
                    marginTop: '0.5rem',
                    fontSize: '0.78rem',
                    fontWeight: isHovered ? '700' : '500',
                    color: isHovered ? 'var(--navy-900)' : 'var(--navy-500)'
                  }}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
