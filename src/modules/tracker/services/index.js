import apiUrl from "@/constants/routes/tracker";

import API from "@/services/API";

const trackerAdd = async (data, token) => {
  return await API.post(apiUrl.TRACKER_ADD, data, {
    headers: {
      Authorization: token,
    },
  });
};

const trackerEdit = async (data, token, trackerId) => {
  return await API.patch(`${apiUrl.TRACKER_EDIT}/${trackerId}`, data, {
    headers: {
      Authorization: token,
    },
  });
};

const timeLog = async (token, userId, page, size) => {
  return await API.get(
    `${apiUrl.TRACKER_LIST}/${userId}?size=${size}&page=${page}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
};

const deleteLog = async (token, trackerId) => {
  return await API.delete(`${apiUrl.TRACKER_DELETE}/${trackerId}`, {
    headers: {
      authorization: token,
    },
  });
};

export { timeLog, deleteLog, trackerAdd, trackerEdit };
