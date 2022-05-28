import apiUrl from "@/constants/routes/teams";

import API from "@/services/API";

const addProject = async (data, token) => {
  return await API.post(apiUrl.ADD_PROJECT_URL, data, {
    headers: {
      Authorization: token,
    },
  });
};

export { addProject };
