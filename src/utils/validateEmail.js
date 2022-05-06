export default function (value) {
  const response = { isValid: true, errorMessage: "" };
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  // if the value is empty
  if (!value) {
    response.isValid = false;
    response.errorMessage = "Email field is required.";
    return response;
  } else if (!regex.test(value)) {
    // if email is not valid
    response.isValid = false;
    response.errorMessage = "Please enter an valid email.";
    return response;
  }

  return response;
}
