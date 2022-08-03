// set user object in local storage
export default function setUser(userObj) {
  localStorage.setItem("user", JSON.stringify(userObj));
}
