export default function getTime() {
  // date format
  // 2022-06-02 20:05:02

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  // month start from 0, now it start from 1 for backend
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

  // adding zero, if it is single digit
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
