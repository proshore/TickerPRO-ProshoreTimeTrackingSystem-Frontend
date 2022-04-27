import apiUrl from "@/apiRoutesName/accounts";

import API from "@/services/API";

const loginUser = async (newUser) => {
  return await API.post(apiUrl.LOGIN_URL, newUser);
};

const resetPassword = async (email) => {
  return await API.post(apiUrl.FORGOT_PASSWORD_URL, { email });
};

export { loginUser, resetPassword };
