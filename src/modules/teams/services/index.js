import apiUrl from "@/constants/routes/teams";

import API from "@/services/API";

const getAllRoles = async () => {
  return await API.get(apiUrl.ALL_ROLES_URL);
};

const inviteMember = async (data, token) => {
  return await API.post(apiUrl.INVITE_MEMBER_URL, data, {
    headers: {
      Authorization: token,
    },
  });
};

const invitedMembersList = async (token) => {
  return await API.get(apiUrl.INVITED_MEMBERS_LIST_URL, {
    headers: {
      Authorization: token,
    },
  });
};

export { getAllRoles, inviteMember, invitedMembersList };
