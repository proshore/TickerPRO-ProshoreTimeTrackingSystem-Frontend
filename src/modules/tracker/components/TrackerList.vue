<script setup>
  import {
    ref
  } from "vue";
  import {
    timeLog,
    deleteLog
  } from "../services"
  import getToken from "@/utils/getToken";
  import sortTimeLog from "../utils/sortTimeLog"

  const token = getToken();

  const logs = ref([

  ]);
  const isLoading = ref(true);

  async function handletimeLog() {
    try {
      const response = await timeLog(token);
      console.log(response);

      logs.value = response.data.logs;
      const sortedLogs = sortTimeLog(logs.value);
      console.log(sortedLogs);
      console.log(logs.value);
      isLoading.value = false;
    } catch (error) {
      console.log(error);
    }
  }
  handletimeLog();

  async function handleTrackerDelete(trackerId) {
    try {
      const response = await deleteLog(token, trackerId);

      if (response.status === 200) {
        alert("Timelog deleted successfully")
        handletimeLog();
      }
    } catch (err) {
      alert("Something went wrong, please try again later")
    }
  }

  function getSingleTotalTime(startTime,endTime){
    const time= new Date(endTime) - new Date(startTime)
    return new Date(time);
  }

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function convertMsToHM(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  // 👇️ if seconds are greater than 30, round minutes up (optional)
  minutes = seconds >= 30 ? minutes + 1 : minutes;

  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}




  /*async function handelactivityname() {
    try {
      const token = getToken();
      const response = await invitedMembersList(token);
      const responseRoles = await getAllRoles();

      invitedMembers.value = response.data.invitedUsers;
      totalMembers.value = response.data.total;
      roles.value = responseRoles.data.roles;
      isLoading.value = false;
    } catch (error) {
      console.log(error);
    }
  }*/
</script>

<template>
  <div class="mt-3 border border-bottom-0 rounded">
    <table class="table table-hover">
      <thead class="text-primary">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Activity Name</th>
          <th scope="col">Project Id</th>
          <th scope="col">Billability</th>
          <th scope="col">Start Time</th>
          <th scope="col">End Time</th>
          <th scope="col">Action</th>
          <th scope="col">Total Time</th>
          <th scope="col"></th>
        </tr>
      </thead>

      <p v-if="isLoading">Loading...</p>

      <tbody v-if="logs.length">
        <tr v-for="(log, index) in logs" :key="log.id">
          <th scope="row" v-text="`${index + 1}`" />
          <td v-text="log.activity_name" />
          <td v-text="log.project_id" />
          <td v-text="log.billable" />
          <td v-text="log.start_time" />
          <td v-text="log.end_time" />
          <td>
          <button class="btn btn-light btn-sm">
            Edit
          </button>

          <button class="btn btn-light btn-sm mx-2" @click="handleTrackerDelete(log.id)">
            Delete
          </button>
          </td>
          <td>{{ convertMsToHM(getSingleTotalTime(log.start_time,log.end_time)) }} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>