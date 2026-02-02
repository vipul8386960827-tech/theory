// App.js
import React from 'react';
import { ModalContainer } from './ModalContainer';
import { emitModal } from './ModalEmitterHook';

function App() {
  const openModal = (content) => {
    emitModal({ content });
  };

  return (
    <div>
      <button onClick={() => openModal(<div>This is Modal 1</div>)}>Open Modal 1</button>
      <button onClick={() => openModal(<div>This is Modal 2</div>)}>Open Modal 2</button>
      <ModalContainer />
    </div>
  );
}

export default App;
