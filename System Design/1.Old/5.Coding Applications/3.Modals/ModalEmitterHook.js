// ModalEmitterHook.js
import { useState, useEffect } from 'react';

let listeners = [];

export const useModalEmitter = () => {
  const [modals, setModals] = useState([]);

  useEffect(() => {
    const callback = (modal) => {
      const id = Date.now() + Math.random();
      setModals((prev) => [...prev, { ...modal, id }]);
    };

    listeners.push(callback);

    return () => {
      listeners = listeners.filter((l) => l !== callback);
    };
  }, []);

  const closeModal = (id) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  };

  return { modals, closeModal };
};

export const emitModal = (modal) => {
  listeners.forEach((callback) => callback(modal));
};
