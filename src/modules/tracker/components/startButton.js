export async function handleTimeTrackerz(data,token,showStartButton,showStopButton,newTimeLog) {
    try {
      const response = await trackerAdd(data, token);
      if (response.status === 200) {
        // toggle start and stop button
        showStartButton.value = false;
        showStopButton.value = true;
  
        // start timer
        startTimer();
  
        newTimeLog.value = response.data.log;
      }
    } catch (err) {
      alert("Something went wrong, please try again later");
    }
  }

  function startTimer() {
    if (interval) {
      return;
    }
  
    interval = setInterval(timer, 1000);
  }
  