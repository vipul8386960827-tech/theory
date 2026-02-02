// Toast.js
import React from 'react';

export function Toast({ message, type = 'info' }) {
  const bgColor = {
    success: 'green',
    error: 'red',
    info: 'blue',
  }[type];

  return (
    <div
      style={{
        margin: '5px',
        padding: '10px 20px',
        color: 'white',
        backgroundColor: bgColor,
        borderRadius: '5px',
        minWidth: '200px',
      }}
    >
      {message}
    </div>
  );
}
