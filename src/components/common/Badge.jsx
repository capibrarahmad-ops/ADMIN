import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  const normalizedVariant = variant.toLowerCase().replace(/\s+/g, '-');
  return (
    <span className={`badge badge-${normalizedVariant} ${className}`}>
      {children}
    </span>
  );
}
