import { logoutUser } from "../services";

import getUser from "@/utils/getUser";

export default async function logout(to) {
  try {
    const { token_type, access_token } = getUser();
    const token = `${token_type} ${access_token}`;

    const response = await logoutUser(token);
    if (response.status === 200) {
      // clear local storage
      localStorage.removeItem("user");
      return { name: "login" };
    }
  } catch (error) {
    // clear local storage
    localStorage.removeItem("user");
    return { name: "login" };
  }
}
