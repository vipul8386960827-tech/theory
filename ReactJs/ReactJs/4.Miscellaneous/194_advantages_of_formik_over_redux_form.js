/* 194_advantages_of_formik_over_redux_form.js

=====================================
Advantages of Formik Over Redux Form
=====================================

Definition:
**Formik** and **Redux Form** are popular libraries for handling forms in React.  
Formik is generally preferred due to its simplicity, performance, and reduced boilerplate.

-------------------------------------
Key Advantages of Formik:
-------------------------------------
1. **Lightweight**
   - Formik doesn’t require integrating form state into Redux.
   - Less boilerplate and simpler setup.

2. **Better Performance**
   - Redux Form stores form state in Redux, causing unnecessary re-renders.
   - Formik keeps state locally, reducing performance overhead.

3. **Easier Learning Curve**
   - Simple API with `Formik` component, hooks, and helpers.
   - Less configuration compared to Redux Form.

4. **Declarative Validation**
   - Works seamlessly with Yup for schema-based validation.
   - Validation logic is local to the form, not spread across Redux.

5. **Flexible & Component-Based**
   - Works with controlled or uncontrolled components.
   - Easy to integrate with custom components or UI libraries.

-------------------------------------
Guidelines:
-------------------------------------
- Use Formik for most forms unless you specifically need global Redux-managed form state.  
- Pair Formik with Yup for clear validation rules.  
- Avoid Redux Form unless legacy code requires it.

-------------------------------------
Example:
-------------------------------------
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginForm = () => (
  <Formik
    initialValues={{ username: "", password: "" }}
    validationSchema={Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().min(6, "Min 6 chars").required("Required")
    })}
    onSubmit={(values) => console.log(values)}
  >
    <Form>
      <label>Username:</label>
      <Field name="username" />
      <ErrorMessage name="username" />

      <label>Password:</label>
      <Field type="password" name="password" />
      <ErrorMessage name="password" />

      <button type="submit">Login</button>
    </Form>
  </Formik>
);

-------------------------------------
Analogy:
-------------------------------------
Formik is like a **personal assistant for your forms**:  
- It keeps track of all inputs locally, validates them,  
  and submits efficiently.  
Redux Form is like a **centralized office clerk**, which works but adds unnecessary steps for simple tasks.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why is Formik considered more performant than Redux Form?  
A1: Because it keeps state local and avoids frequent Redux store updates that cause re-renders.  

Q2: Can Formik be used with Redux?  
A2: Yes, but it’s typically unnecessary since Formik manages state locally.  

Q3: What is the benefit of schema-based validation with Yup?  
A3: It allows centralized, declarative, and reusable validation rules.  

Q4: When would you still use Redux Form?  
A4: Only if the form state must be globally available across multiple components or routes.  

*/
