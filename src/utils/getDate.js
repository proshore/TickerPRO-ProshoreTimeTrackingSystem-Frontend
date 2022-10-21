export default function getDate() {
    // date format
    // 2022-06-02 20:05:02
  
    const currentDate = new Date();
  
    const year = currentDate.getFullYear();
    // month start from 0, now it start from 1 for backend
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
  
    // adding zero, if it is single digit
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
  
    return `${year}-${month}-${day}`;
  }
  