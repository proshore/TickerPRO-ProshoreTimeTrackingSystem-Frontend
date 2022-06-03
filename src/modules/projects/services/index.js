import apiUrl from "@/constants/routes/projects";

import API from "@/services/API";

const projectsList = async (token) => {
  return await API.get(apiUrl.PROJECTS_LIST, {
    headers: {
      Authorization: token,
    },
  });
};

export { projectsList };
