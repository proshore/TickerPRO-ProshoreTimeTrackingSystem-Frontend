import { logoutUser } from "../services";
import { useToggleContainer } from "@/stores/toggleContainer";

import getToken from "@/utils/getToken";

export default async function logout(to) {
  try {
    const token = getToken();
    const storeToggleContainer = useToggleContainer();

    const response = await logoutUser(token);
    if (response.status === 200) {
      // clear local storage
      localStorage.removeItem("user");
      storeToggleContainer.userStatus = true;
      return { name: "login" };
    }
  } catch (error) {
    // clear local storage
    localStorage.removeItem("user");
    return { name: "login" };
  }
}
