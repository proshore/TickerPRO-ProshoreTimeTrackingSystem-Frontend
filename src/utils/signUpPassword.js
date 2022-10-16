export default function (value) {
    const response = { isValid: true, errorMessage: "" };
    let paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/; // atleast 6 digit and one special character and one numeric digit 
    // if value is empty
    if (!value) {
      response.isValid = false;
      response.errorMessage = "Password field is required";
      return response;
    }
     else if (!paswd.test(value)){
      // if not matching passsword 
      response.isValid = false;
      response.errorMessage = "Please use atleast one numeric digit and one special character";
      return response;
  }
    return response;
  }
  