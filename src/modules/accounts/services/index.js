import apiUrl from "@/apiRoutesName/accounts";

import API from "@/services/API";

const loginUser = async (newUser) => {
  return await API.post(apiUrl.LOGIN_URL, newUser);
};

const passwordResetSend = async (email) => {
  return await API.post(apiUrl.FORGOT_PASSWORD_URL, { email });
};

const passwordReset = async (data) => {
  return await API.post(apiUrl.PASSWORD_RESET_URL, data);
};

export { loginUser, passwordResetSend, passwordReset };
