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

const reinviteMember = async (token, data) => {
  return await API.post(apiUrl.REINVITE_URL, data, {
    headers: {
      Authorization: token,
    },
  });
};

const revokeInvitation = async (token, data) => {
  return await API.delete(
    `${apiUrl.REINVOKE_URL}${data}`,
    {
    headers: {
      Authorization: token,
    },
  });
};

const allUsersList = async (token) => {
  return await API.get(apiUrl.REGISTER_USER_LIST_URL, {
    headers: {
      Authorization: token,
    },
  });
};

const deleteUser = async (token, data) => {
  return await API.delete(
    `${apiUrl.DELETE_USER_URL}/${data}`,
      {
      headers: {
        Authorization: token,
      },
    }
  );
};

const enableDisable = async (token, data) => {
  return await API.patch(
    `${apiUrl.ENABLE_USER_URL}/${data}`, null,
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export {
  getAllRoles,
  inviteMember,
  invitedMembersList,
  reinviteMember,
  revokeInvitation,
  allUsersList,
  deleteUser,
  enableDisable,
};
