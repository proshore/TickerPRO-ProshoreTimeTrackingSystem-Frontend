export default function sortTimeLog(logs) {
  logs.sort((a, b) => {
    return new Date(b.end_date) - new Date(a.end_date);
  });
  return logs;
}
