// App.js
import React from 'react';
import { DynamicForm } from './DynamicForm';

const formSchema = [
  { id: 'name', label: 'Name', type: 'text', required: true },
  { id: 'age', label: 'Age', type: 'number', min: 1, max: 100 },
  { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
  { id: 'bio', label: 'Bio', type: 'textarea' },
  { id: 'subscribe', label: 'Subscribe', type: 'checkbox' },
  { id: 'role', label: 'Role', type: 'radio', options: ['Admin', 'User'] },
];

function App() {
  const handleSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <div>
      <h1>Dynamic Form Builder</h1>
      <DynamicForm schema={formSchema} onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
