// DynamicForm.js
import React, { useState } from 'react';
import { DynamicInput } from './DynamicInput';

export function DynamicForm({ schema, onSubmit }) {
  const initialData = schema.reduce((acc, field) => {
    acc[field.id] = field.type === 'checkbox' ? false : '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const newErrors = {};
    schema.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = 'This field is required';
      }
      if (field.type === 'number') {
        if (field.min !== undefined && formData[field.id] < field.min) {
          newErrors[field.id] = `Minimum value is ${field.min}`;
        }
        if (field.max !== undefined && formData[field.id] > field.max) {
          newErrors[field.id] = `Maximum value is ${field.max}`;
        }
      }
      if (field.pattern) {
        const regex = new RegExp(field.pattern);
        if (!regex.test(formData[field.id])) {
          newErrors[field.id] = 'Invalid format';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.map((field) => (
        <DynamicInput
          key={field.id}
          field={field}
          value={formData[field.id]}
          onChange={handleChange}
          error={errors[field.id]}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
