const container = document.getElementById("container")

const fields = {
  name: {
    label: "Name",
    type: "text",
    error: "Name field is required",
  },
  phone: {
    label: "Phone Number",
    type: "number",
    error: "Phone field is required",
  },
  email: { label: "Email", type: "text", error: "Email field is required" },
}
const output = {}
const submitButton = document.createElement("button")
submitButton.textContent = "Submit"
submitButton.disabled = true
const form = document.createElement("form")

Object.entries(fields).forEach(([key, value]) => {
  const label = document.createElement("label")
  const input = document.createElement("input")
  const errorMessage = document.createElement("p")

  errorMessage.textContent = value.error
  errorMessage.style.color = "red"
  label.textContent = value.label
  input.placeholder = value.label
  input.type = value.type
  label.setAttribute("for", key)
  value.input = input
  value.errorElement = errorMessage
  input.addEventListener("input", () => {
    if (input.value.trim() === "") {
      errorMessage.style.display = "block"
    } else {
      output[key] = input.value
      errorMessage.style.display = "none"
    }
    const allFilled = Object.values(fields).every(
      (f) => f.input.value.trim() !== "",
    )
    submitButton.disabled = !allFilled
  })
  form.appendChild(label)
  form.appendChild(input)
  form.appendChild(errorMessage)
  form.appendChild(document.createElement("br"))
})

form.appendChild(submitButton)
container.appendChild(form)
form.addEventListener("submit", (e) => {
  e.preventDefault()
  console.log(output)
  form.reset()
})