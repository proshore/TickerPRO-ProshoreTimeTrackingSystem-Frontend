export default function (value) {
  const response = { isValid: true, errorMessage: "" };

  // if value is empty
  if (!value) {
    response.isValid = false;
    response.errorMessage = "Phone number field is required";
    return response;
  } else if (value.length < 10) {
    // if Phone length is less than 6
    response.isValid = false;
    response.errorMessage = "Phone Number is not valid";
    return response;
  }
  return response;
}
