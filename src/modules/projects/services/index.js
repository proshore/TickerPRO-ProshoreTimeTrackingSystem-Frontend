import apiUrl from "@/constants/routes/projects";

import API from "@/services/API";

const addProject = async (data, token) => {
  return await API.post(apiUrl.ADD_PROJECT_URL, data, {
    headers: {
      Authorization: token,
    },
  });
};

const editProject = async (data, token, projectId) => {
  return await API.patch(`${apiUrl.EDIT_PROJECT_URL}/${projectId}`, data, {
    headers: {
      Authorization: token,
    },
  });
};

const enableDisable = async (token, projectId) => {
  return await API.post(
    `${apiUrl.PROJECT_ENABLE_URL}/${projectId}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

const projectList = async (token) => {
  return await API.get(apiUrl.PROJECT_LIST_URL, {
    headers: { Authorization: token },
  });
};

export { addProject, editProject, enableDisable, projectList };
