/* 223_formik.js

=====================================
Formik in React
=====================================

Definition:
**Formik** is a popular React library for **form management**.  
It simplifies handling form state, validation, error messages, and submission logic, 
reducing boilerplate compared to managing forms manually or with Redux.

-------------------------------------
Key Points:
-------------------------------------
1. Handles **form state** (`values`, `touched`, `errors`) automatically.  
2. Integrates easily with **Yup** for schema-based validation.  
3. Supports **field-level and form-level validation**.  
4. Reduces repetitive code compared to managing forms manually.  
5. Provides helper components: `<Formik>`, `<Form>`, `<Field>`, `<ErrorMessage>`.

-------------------------------------
Guidelines:
-------------------------------------
- Use Formik for **complex forms** with multiple fields and validations.  
- For **simple forms**, React’s built-in state may suffice.  
- Always provide `initialValues` to Formik to initialize form state.  

-------------------------------------
Example:
-------------------------------------
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupForm = () => {
  const initialValues = { name: "", email: "" };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required")
  });

  const onSubmit = (values) => {
    console.log("Form Data:", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <label>Name:</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>

        <div>
          <label>Email:</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

-------------------------------------
Analogy:
-------------------------------------
- Formik = **form manager**  
- React state = **manual note-taking**  
- Formik keeps track of all input values, touched fields, and errors automatically.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: When to use Formik over React state?  
A1: For complex forms with multiple fields, validations, and error handling.

Q2: Can Formik work without Yup?  
A2: Yes, you can use custom validation functions instead of Yup.

Q3: Does Formik replace Redux?  
A3: No, Formik manages form state locally; Redux manages global application state.

Q4: Can Formik handle dynamic fields?  
A4: Yes, using `FieldArray` for arrays of inputs.
*/
