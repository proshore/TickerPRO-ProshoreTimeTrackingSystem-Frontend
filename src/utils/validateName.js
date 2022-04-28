export default function (value) {
  // if the value is empty
  if (!value) {
    return { isValid: false, errorMessage: "Full name Field is required." };
  }
  return { isValid: true, errorMessage: "" };
}
