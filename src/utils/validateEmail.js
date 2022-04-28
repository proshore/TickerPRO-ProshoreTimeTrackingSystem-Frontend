export default function (value) {
  // if the value is empty
  if (!value) {
    return { isValid: false, errorMessage: "Email field is required." };
  }

  // if email is not valid
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return { isValid: false, errorMessage: "Invalid email." };
  }

  return { isValid: true, errorMessage: "" };
}