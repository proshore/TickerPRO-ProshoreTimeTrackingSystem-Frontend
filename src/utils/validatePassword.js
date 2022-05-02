export default function (value) {
  const response = { isValid: true, errorMessage: "" };

  // if value is empty
  if (!value) {
    response.isValid = false;
    response.errorMessage = "Password field is required";
    return response;
  } else if (value.length < 6) {
    // if password length is less than 6
    response.isValid = false;
    response.errorMessage = "Password length must be at least 6 characters.";
    return response;
  }
  return response;
}
