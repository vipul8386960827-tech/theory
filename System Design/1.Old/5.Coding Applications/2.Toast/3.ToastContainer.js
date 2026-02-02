// ToastContainer.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Toast } from './Toast';
import { useToastEmitter } from './ToastEmitter';

export function ToastContainer() {
  const toasts = useToastEmitter();

  const toastRoot = document.getElementById('toast-root') || (() => {
    const div = document.createElement('div');
    div.id = 'toast-root';
    document.body.appendChild(div);
    return div;
  })();

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>,
    toastRoot
  );
}
