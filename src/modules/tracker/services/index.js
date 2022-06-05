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
  return await API.post(`${apiUrl.TRACKER_EDIT}/${trackerId}`, data, {
    headers: {
      Authorization: token,
    },
  });
};

export { trackerAdd, trackerEdit };
