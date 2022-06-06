<script setup>
import { ref } from "vue";

import { timeLog, deleteLog, trackerEdit } from "../services";

import getToken from "@/utils/getToken";
import getUser from "@/utils/getUser";
import sortTimeLog from "../utils/sortTimeLog";

const token = getToken();
const logs = ref([]);
const isLoading = ref(true);
// var billableValue = ref();

const userId = getUser().user.id;

async function handleTimeLog() {
  try {
    const response = await timeLog(token, userId);
    logs.value = response.data.logs;
    sortTimeLog(logs.value);
    isLoading.value = false;
  } catch (err) {
    alert("Something went wrong, please try again later");
  }
}

async function editLogs(name, userid, projectid, billable, start, end, id) {
  try {
    var data = {
      activity_name: name,
      user_id: userid,
      project_id: projectid,
      billable: billable,
      start_time: start,
      end_time: end,
    };
    const response = await trackerEdit(data, token, id);
    if (response.status == 200) {
      handleTimeLog();
      alert("Time Log Updated Successfully");
    }
  } catch (err) {
    console.log(err);
  }
}

handleTimeLog();

async function handleTrackerDelete(trackerId) {
  try {
    const response = await deleteLog(token, trackerId);
    if (response.status === 200) {
      alert("Timelog deleted successfully");
      handleTimeLog();
    }
  } catch (err) {
    alert("Something went wrong, please try again later");
  }
}
function getSingleTotalTime(startTime, endTime) {
  const time = new Date(endTime) - new Date(startTime);
  return new Date(time);
}
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
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
  // commenting next line gets you 24:00:00 instead of 00:00:00
  // or 36:15:31 instead of 12:15:31, etc.
  hours = hours % 24;
  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
}

function value(x) {
  if (x == true) {
    return "Billable";
  } else {
    return "Non Billable";
  }
}
</script>
<style scoped>
input {
  width: 5rem;
  padding: 5px;
  font-size: 16px;
}

.edit {
  border: none;
}
.edit :hover {
  border: 1px solid grey;
}
</style>

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
          <th scope="row" v-text="index++" />
          <td>
            <input class="edit" type="text" v-model="log.activity_name" />
          </td>

          <td>
            <div v-text="log.project_id"></div>
          </td>
          <td>
            <button
              class="btn btn-light btn-sm"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              v-text="value(log.billable)"
              aria-expanded="true"
            ></button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a class="dropdown-item" @click="() => (log.billable = true)">
                  Billable
                </a>
              </li>
              <li>
                <a class="dropdown-item" @click="() => (log.billable = false)">
                  Non Billable
                </a>
              </li>
            </ul>
          </td>
          <td><input class="edit" type="text" v-model="log.start_time" /></td>
          <td><input class="edit" type="text" v-model="log.end_time" /></td>

          <td>
            <button
              @click="
                editLogs(
                  log.activity_name,
                  userId,
                  log.project_id,
                  log.billable,
                  log.start_time,
                  log.end_time,
                  log.id
                )
              "
              class="btn btn-light btn-sm"
            >
              Edit
            </button>

            <button
              class="btn btn-light btn-sm mx-2"
              @click="handleTrackerDelete(log.id)"
            >
              Delete
            </button>
          </td>
          <td>
            {{
              convertMsToHM(getSingleTotalTime(log.start_time, log.end_time))
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
