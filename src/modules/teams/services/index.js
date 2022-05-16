import apiUrl from "@/constants/routes/teams";

import API from "@/services/API";

const getAllRoles = async () => {
  return await API.get(apiUrl.ALL_ROLES_URL);
};

export { getAllRoles };
