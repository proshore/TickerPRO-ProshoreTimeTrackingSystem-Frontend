export default function getSingleTotalTime(startTime, endTime) {
  const time = new Date(endTime) - new Date(startTime);
  return new Date(time);
}
