import apiUrl from "@/apiRoutesName/accounts";

import API from "@/services/API";

const loginUser = async (newUser) => {
  return await API.post(apiUrl.LOGIN_URL, newUser);
};

export default {
  loginUser,
};
