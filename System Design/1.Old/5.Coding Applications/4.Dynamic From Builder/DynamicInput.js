// DynamicInput.js
import React from 'react';

export function DynamicInput({ field, value, onChange, error }) {
  switch (field.type) {
    case 'text':
    case 'number':
      return (
        <div style={{ marginBottom: 10 }}>
          <label>{field.label}</label>
          <input
            type={field.type}
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      );
    case 'textarea':
      return (
        <div style={{ marginBottom: 10 }}>
          <label>{field.label}</label>
          <textarea value={value || ''} onChange={(e) => onChange(field.id, e.target.value)} />
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      );
    case 'select':
      return (
        <div style={{ marginBottom: 10 }}>
          <label>{field.label}</label>
          <select value={value || ''} onChange={(e) => onChange(field.id, e.target.value)}>
            <option value="">Select</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      );
    case 'checkbox':
      return (
        <div style={{ marginBottom: 10 }}>
          <label>
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(field.id, e.target.checked)}
            />
            {field.label}
          </label>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      );
    case 'radio':
      return (
        <div style={{ marginBottom: 10 }}>
          <label>{field.label}</label>
          {field.options.map((opt) => (
            <label key={opt} style={{ marginLeft: 10 }}>
              <input
                type="radio"
                name={field.id}
                value={opt}
                checked={value === opt}
                onChange={(e) => onChange(field.id, e.target.value)}
              />
              {opt}
            </label>
          ))}
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      );
    default:
      return null;
  }
}
