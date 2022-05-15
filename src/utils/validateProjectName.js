export default function (value) {
  // if the value is empty
  if (!value) {
    return { isValid: false, errorMessage: "Project Name is required." };
  }
  return { isValid: true, errorMessage: "" };
}
