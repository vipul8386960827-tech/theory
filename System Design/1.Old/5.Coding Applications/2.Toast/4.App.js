// App.js
import React from 'react';
import { ToastContainer } from './ToastContainer';
import { emitToast } from './ToastEmitter';

function App() {
  return (
    <div>
      <button onClick={() => emitToast({ message: 'Success!', type: 'success' })}>
        Show Success
      </button>
      <button onClick={() => emitToast({ message: 'Error!', type: 'error' })}>
        Show Error
      </button>
      <button onClick={() => emitToast({ message: 'Info!', type: 'info'})}>
        Show Info
      </button>
      <ToastContainer />
    </div>
  );
}

export default App;
