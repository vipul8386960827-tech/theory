/* 130_redux_form.js */

/*
=====================================
Redux Form
=====================================

Definition:
Redux Form is a library that manages form state in the Redux store, allowing 
form values, validation, and submission state to be controlled centrally. 
It integrates form management into the Redux ecosystem.

-------------------------------------
Key Features:
-------------------------------------

1. **Centralized Form State**
   - Form values, errors, and submission status are stored in Redux.
   - Easy to access and manipulate from any component.

2. **Validation**
   - Supports synchronous, asynchronous, and field-level validation.
   - Validation results are stored in Redux, enabling dynamic error handling.

3. **Field-level Control**
   - Each input field is a connected component.
   - Changes are reflected immediately in Redux store.

4. **Form Submission**
   - Provides `handleSubmit` that works with Redux actions.
   - Submission status (submitting, success, failure) is tracked.

5. **Integration**
   - Works well with Redux middleware like Thunk or Saga for async submission.

-------------------------------------
Basic Example:
-------------------------------------
import React from "react";
import { Field, reduxForm } from "redux-form";

const MyForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" component="input" type="text" />
      <Field name="email" component="input" type="email" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default reduxForm({
  form: "myForm", // unique form name
})(MyForm);

-------------------------------------
Analogy:
-------------------------------------
- Redux Form is like a **central filing system**:
  - All form data is stored in one place (Redux store).
  - Any part of the app can access or modify the data consistently.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can Redux Form handle async validation?  
A1: Yes, it supports async validation via promises in field or form validators.

Q2: How is Redux Form different from uncontrolled forms?  
A2: Redux Form keeps state in Redux, enabling global access and predictable updates, whereas uncontrolled forms manage state internally in components.

Q3: Is Redux Form still recommended?  
A3: For new projects, alternatives like Formik or React Hook Form are often preferred due to lighter weight.

Q4: Can Redux Form integrate with Redux Saga or Thunk?  
A4: Yes, submission actions can trigger async logic in middleware like Saga or Thunk.
*/
