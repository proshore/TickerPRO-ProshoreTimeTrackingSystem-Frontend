export default function sortTimeLog(logs) {
  logs.sort((a, b) => {
    return new Date(b.end_time) - new Date(a.end_time);
  });
  return logs;
}
