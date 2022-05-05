import apiUrl from "@/apiRoutesName/accounts";
import API from "@/services/API";

const signupUser = async (data) => {
  return await API.post(apiUrl.Signup_URL, data);
};

export { signupUser };
