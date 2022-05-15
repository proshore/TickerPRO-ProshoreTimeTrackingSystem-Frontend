export default function (value) {
  // if the value is empty
  if (!value) {
    return { isValid: false, errorMessage: "Client Name is required." };
  }
  return { isValid: true, errorMessage: "" };
}
