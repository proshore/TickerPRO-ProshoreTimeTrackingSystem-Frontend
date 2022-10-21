import apiUrl from "@/constants/routes/clients";

import API from "@/services/API";

const clientList = async (token) => {
  return await API.get(apiUrl.CLIENT_LIST_URL, {
    headers: {
      Authorization: token,
    },
  });
};

const addClient = async (data, token) => {
  return await API.post(apiUrl.CLIENT_LIST_URL, data, {
    headers: {
      Authorization: token
    },
  });
}

export { clientList, addClient };
