import apiUrl from "@/constants/routes/accounts";

import API from "@/services/API";

const signupUser = async (data) => {
  return await API.post(apiUrl.SIGNUP_URL, data);
};

const loginUser = async (newUser) => {
  return await API.post(apiUrl.LOGIN_URL, newUser);
};

const passwordResetSend = async (email) => {
  return await API.post(apiUrl.FORGOT_PASSWORD_URL, { email });
};

const passwordReset = async (data) => {
  return await API.post(apiUrl.PASSWORD_RESET_URL, data);
};

const logoutUser = async (token) => {
  return await API.get(apiUrl.LOGOUT_URL, {
    headers: { Authorization: token },
  });
};

export { signupUser, loginUser, passwordResetSend, passwordReset, logoutUser };
