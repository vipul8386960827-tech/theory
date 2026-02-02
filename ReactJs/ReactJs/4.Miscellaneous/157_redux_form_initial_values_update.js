/* 157_redux_form_initial_values_update.js */

/*
=====================================
Redux Form: Initial Values Update
=====================================

Definition:
In **Redux Form**, `initialValues` is used to populate form fields with default values.
Updating `initialValues` allows the form to reinitialize with new values when the props change.

-------------------------------------
Key Points:
-------------------------------------

1. **Initial Values**
   - Set via `initialValues` prop on the form component.
   - Can come from Redux state or any parent component props.

2. **Enable Reinitialization**
   - By default, Redux Form does not update the form when `initialValues` change.
   - Use `enableReinitialize: true` in `reduxForm()` config to allow updates.

3. **Usage**
-------------------------------------
import React from "react";
import { reduxForm, Field } from "redux-form";

function MyForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" component="input" type="text" />
      <Field name="email" component="input" type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default reduxForm({
  form: "userForm",
  enableReinitialize: true
})(MyForm);

-------------------------------------
Updating Initial Values
-------------------------------------
<MyForm initialValues={{ username: "John", email: "john@example.com" }} />

- If `initialValues` props change, the form fields will reinitialize automatically.

-------------------------------------
Notes:
-------------------------------------
- `enableReinitialize: true` is important to allow dynamic updates.
- Avoid direct mutations of `initialValues`; always pass new objects.
- Useful in edit forms where initial data comes from API.

-------------------------------------
Analogy:
-------------------------------------
- Redux Form = **form template**
- `initialValues` = **prefilled fields** on template.
- Changing initialValues with `enableReinitialize` = **update the template dynamically**.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What happens if `enableReinitialize` is false?  
A1: Form will not update when `initialValues` props change; it keeps original values.

Q2: Can you dynamically populate initial values from API?  
A2: Yes, fetch data and pass as `initialValues` with `enableReinitialize: true`.

Q3: Is it okay to mutate initialValues directly?  
A3: No, always pass a new object to avoid unexpected behavior.

Q4: How does Redux Form track form state?  
A4: Redux Form stores form state in Redux under `state.form` key.
*/
