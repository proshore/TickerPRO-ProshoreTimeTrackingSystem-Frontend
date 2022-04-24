export default function (password, confirmPassword) {
  // if value is empty
  if (!confirmPassword) {
    return { isValid: false, errorMessage: "Confirm Password is required." };
  }

  // if password length is less than 6
  if (password !== confirmPassword) {
    return {
      isValid: false,
      errorMessage: "Password did not match",
    };
  }

  return { isValid: true, errorMessage: "" };
}