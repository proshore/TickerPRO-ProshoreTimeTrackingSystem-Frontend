import apiUrl from "@/constants/routes/projects";

import API from "@/services/API";

const addProject = async (data, token) => {
  return await API.post(apiUrl.ADD_PROJECT_URL, data, {
    headers: {
      Authorization: token,
    },
  });
};

const enableDisable = async (token, projectId) => {
  return await API.post(
    `${apiUrl.PROJECT_ENABLE}/${projectId}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export { addProject, enableDisable };
