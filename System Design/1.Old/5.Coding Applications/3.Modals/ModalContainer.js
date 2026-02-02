// ModalContainer.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from './Modal';
import { useModalEmitter } from './ModalEmitterHook';

export function ModalContainer() {
  const { modals, closeModal } = useModalEmitter();

  const modalRoot =
    document.getElementById('modal-root') ||
    (() => {
      const div = document.createElement('div');
      div.id = 'modal-root';
      document.body.appendChild(div);
      return div;
    })();

  return ReactDOM.createPortal(
    <>
      {modals.map((modal) => (
        <Modal key={modal.id} isOpen={true} onClose={() => closeModal(modal.id)}>
          {modal.content}
        </Modal>
      ))}
    </>,
    modalRoot
  );
}
