export default function (confirmPassword, password) {
  const response = { isValid: true, errorMessage: "" };

  if (confirmPassword === "") {
    response.isValid = false;
    response.errorMessage = "Confirm password field is required.";
    return response;
  } else if (confirmPassword !== password) {
    response.isValid = false;
    response.errorMessage =
      "Password and confirm password fields do not match.";
    return response;
  }
  return response;
}
