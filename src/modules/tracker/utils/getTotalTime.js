export default function getSingleTotalTime(startTime, endTime) {
var sTimeSplit = startTime.split(":")
const sTimeMilli = ((sTimeSplit[0] * (60*60*1000 )) + (+sTimeSplit[1] * 60000) + sTimeSplit[2]*1000);
if(endTime){ 
    var eTimeSplit = endTime.split(":")
    const eTimeMilli = ((eTimeSplit[0] * (60000 * 60)) + (+eTimeSplit[1] * 60000) + eTimeSplit[2]*1000);
    return eTimeMilli - sTimeMilli
}
return 0;



}