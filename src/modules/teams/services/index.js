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

const reInvite = async (token, data) => {
  return await API.post(apiUrl.ReInvite_URL, data, {
    headers: {
      Authorization: token,
    },
  });
};

const revokeInvitation = async (token, data) => {
  return await API.get(apiUrl.RevokeInvitation_URL + data, {
    headers: {
      Authorization: token,
    },
  });
};

const allUsersList = async (token) => {
  return await API.get(apiUrl.All_UsersList_Url, {
    headers: {
      Authorization: token,
    },
  });
};

const deleteUser = async (token, data) => {
  return await API.post(
    `${apiUrl.DeleteUser_URL}/${data}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

const enableDisable = async (token, data) => {
  return await API.post(
    `${apiUrl.Enable_URL}/${data}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

// const enableDisable = async(token,data) =>{
//   return await API.post(apiUrl.Enable_URL+data,{
//     headers:{
//       Authorization:token
//     }
//   })
// }

export {
  getAllRoles,
  inviteMember,
  invitedMembersList,
  reInvite,
  revokeInvitation,
  allUsersList,
  deleteUser,
  enableDisable,
};
