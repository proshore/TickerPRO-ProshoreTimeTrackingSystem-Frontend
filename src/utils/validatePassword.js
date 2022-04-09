export default function (value) {
  // if value is empty
  if (!value) {
    return { isValid: false, errorMessage: "Password field is required." };
  }

  // if password length is less than 8
  if (value.length < 8) {
    return {
      isValid: false,
      errorMessage: "Password length must be greater than 8 characters.",
    };
  }

  return { isValid: true, errorMessage: "" };
}
