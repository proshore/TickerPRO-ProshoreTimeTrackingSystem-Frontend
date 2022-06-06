import API from "@/services/API";
import getUser from "@/utils/getUser";

const user = getUser()
console.log(user)
const timeLog = async (token) => {

  return await API.get("/api/log/view-logs/" + user.user.id,

    {
      headers: {
        authorization: token
      }
    }
  );
};

const deleteLog = async (token, trackerId) => {

  return await API.get("/api/log/remove/" + trackerId,

    {
      headers: {
        authorization: token
      }
    }
  );
};

export {
  timeLog,
  deleteLog
};