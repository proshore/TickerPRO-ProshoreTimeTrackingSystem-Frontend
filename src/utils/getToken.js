import getUser from "./getUser";

export default function getToken() {
  const { token_type, access_token } = getUser();
  const token = `${token_type} ${access_token}`;
  return token;
}
