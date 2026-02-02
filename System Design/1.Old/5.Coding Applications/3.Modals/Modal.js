// Modal.js
import React, { useEffect } from 'react';

export function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // disable background scroll
    } else {
      document.body.style.overflow = ''; // enable scroll
    }

    return () => {
      document.body.style.overflow = ''; // reset on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
      }}
      onClick={onClose} // outside click closes modal
    >
      <div
        style={{ background: 'white', padding: 20, borderRadius: 8, minWidth: 300 }}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        {children}
      </div>
    </div>
  );
}
