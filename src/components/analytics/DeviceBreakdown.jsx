import React from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { ANALYTICS_DATA } from '../../data/sampleData';

export default function DeviceBreakdown() {
  const devices = ANALYTICS_DATA.devices;

  const getIcon = (name) => {
    if (name.includes('Desktop')) return Monitor;
    if (name.includes('Mobile')) return Smartphone;
    return Tablet;
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Client Platform Breakdown</h3>
          <p className="card-subtitle">Active client devices interacting with Slate</p>
        </div>
      </div>

      <div className="card-body">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
          {devices.map((dev) => {
            const Icon = getIcon(dev.device);
            return (
              <div
                key={dev.device}
                style={{
                  padding: '1.1rem',
                  borderRadius: '12px',
                  background: 'var(--navy-50)',
                  border: '1px solid var(--navy-200)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--navy-200)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: dev.color
                  }}
                >
                  <Icon size={20} />
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                  {dev.percentage}%
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--navy-600)', fontWeight: 500 }}>
                  {dev.device.split(' ')[0]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
