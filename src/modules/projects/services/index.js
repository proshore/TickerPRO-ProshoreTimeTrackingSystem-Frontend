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
  return await API.patch(
    `${apiUrl.PROJECT_ENABLE_URL}/${projectId}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

const projectList = async (token, page) => {
  return await API.get(`${apiUrl.PROJECT_LIST_URL}?page=${page}`, {
    headers: { Authorization: token },
  });
};

const deleteProject = async (token, projectId) => {
  return await API.delete(`${apiUrl.DELETE_PROJECT_URL}/${projectId}`, {
    headers: {
      authorization: token,
    },
  });
};

const searchProject = async (token, search, page) => {
  return await API.get(`${apiUrl.PROJECT_LIST_URL}?search=${search}&page=${page}`, {
    headers: {
      authorization: token,
    },
  });
}

export { addProject, editProject, enableDisable, projectList, deleteProject, searchProject };
