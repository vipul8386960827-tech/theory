/* 
Key Points (Interviewer Keywords + Explanation):
1. useFormState - Hook from Next.js (App Router) to manage form state in Server Actions.
2. Server Actions - Functions running on the server to handle form submissions.
3. Form State Management - Tracks field values, submission status, errors, and validation.
4. 'use client' - Required on the component using useFormState for interactivity.
5. Integration with FormData - useFormState works with FormData to easily capture inputs.
6. Automatic submission status - useFormState provides properties like isPending, isSubmitted.
7. Simplifies client-server forms - Reduces boilerplate code for handling form submission.

Definition (Using Specific Terms):
**useFormState** is a hook in Next.js App Router that helps manage **form state** 
for forms that submit to **Server Actions**. It tracks input values, submission 
status, and errors automatically. Components using **useFormState** must be **Client Components** 
(marked with 'use client'), and it integrates easily with **FormData** to send values 
to Server Actions, simplifying client-server interaction.

Code Example:

// app/contact/page.js
'use client'
import { useFormState } from 'next/form' // Hypothetical import
import { submitContact } from '../actions/contact'

export default function ContactForm() {
  const { form, isPending, isSubmitted, errors } = useFormState(submitContact)

  return (
    <form action={form}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {isSubmitted && <p>Form submitted successfully!</p>}
      {errors && <p style={{ color: 'red' }}>{errors}</p>}
    </form>
  )
}

// app/actions/contact.js
'use server'
import { redirect } from 'next/navigation'

export async function submitContact(formData) {
  const name = formData.get('name')
  const email = formData.get('email')

  // Perform server-side operation, e.g., save to DB
  console.log('Received:', name, email)

  // Redirect after submission
  redirect('/thank-you')
}

Follow-up Questions + Answers:

Q1: Do you always need 'use client' for forms with useFormState?
A1: Yes, because the hook manages client-side interactivity and tracks form state.

Q2: How does useFormState simplify form submission?
A2: It automatically handles **submission status**, **errors**, and integrates with **Server Actions**, 
    reducing boilerplate code.

Q3: Can useFormState handle validation errors?
A3: Yes, it can track server-side or client-side errors and expose them in the 'errors' property.

Q4: Is FormData required when using useFormState?
A4: No, useFormState abstracts it internally, but Server Actions still receive a FormData object.

Q5: Can useFormState be used with multiple forms on a page?
A5: Yes, you can create separate useFormState hooks for each form, each bound to its own Server Action.
*/
