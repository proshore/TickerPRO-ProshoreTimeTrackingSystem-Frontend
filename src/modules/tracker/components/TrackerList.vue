<script setup>
import { ref } from "vue";
import { timeLog, deleteLog, trackerEdit } from "../services";
import getToken from "@/utils/getToken";
import getUser from "@/utils/getUser";
import sortTimeLog from "../utils/sortTimeLog";
import convertMsToHM from "../utils/convertMsToHM";
import getTotalTime from "../utils/getTotalTime";
import { useToast } from "vue-toast-notification";

const token = getToken();
const logs = ref([]);
const isLoading = ref(true);
const userId = getUser().user.id;
const $toast = useToast();

async function handleTimeLog() {
  try {
    const response = await timeLog(token, userId);

    if (response.status === 200 && response.data.logs) {
      logs.value = response.data.logs;
      sortTimeLog(logs.value);
    }
    isLoading.value = false;
  } catch (err) {
    $toast.error("Something went wrong, please try again later");
  }
}

handleTimeLog();

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
      $toast.success('Congratulations! Your Timelog updated successfully.');
    }
  } catch (err) {
    $toast.error('Unable to update your Timelog.');
  }
}

async function handleTrackerDelete(trackerId) {
  try {
    const response = await deleteLog(token, trackerId);
    if (response.status === 200) {
      handleTimeLog();
      $toast.success('Congratulations! Your Timelog deleted successfully.');

      if (logs.value.length === 1) {
        location.reload();
      }
    }
  } catch (err) {
      $toast.error('Unable to delete your Timelog.');
  }
}

function getBillable(x) {
  if (x == true) {
    return "Billable";
  } else {
    return "Non Billable";
  }
}



</script>

<template>
  <div v-if="logs.length" class="mt-5 border border-bottom-0 rounded">
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

      <tbody v-if="logs.length">
        <tr v-for="(log, index) in logs" :key="log.id">
          <th scope="row" class="align-middle" v-text="index + 1" />
          <td>
            <input class="edit" type="text" v-model="log.activity_name" @focusout="editLogs(log.activity_name, userId, log.project_id, log.billable, log.start_time, log.end_time, log.id)" @keyup.enter="editLogs(log.activity_name, userId, log.project_id, log.billable, log.start_time, log.end_time, log.id)" />
          </td>

          <td>
            <div v-text="log.project_id" />
          </td>
          <td>
            <button
              class="btn btn-light btn-sm"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              v-text="getBillable(log.billable)"
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
          <td><input class="edit" type="text" v-model="log.start_time" @focusout="editLogs(log.activity_name, userId, log.project_id, log.billable, log.start_time, log.end_time, log.id)" @keyup.enter="editLogs(log.activity_name, userId, log.project_id, log.billable, log.start_time, log.end_time, log.id)" /></td>
          <td><input class="edit" type="text" v-model="log.end_time" @focusout="editLogs(log.activity_name, userId, log.project_id, log.billable, log.start_time, log.end_time, log.id)" @keyup.enter="editLogs(log.activity_name, userId, log.project_id, log.billable, log.start_time, log.end_time, log.id)"/></td>
          <td>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-light btn-sm mx-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Delete
            </button>

            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog  modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header text-center border-0">
                    <h5 class="modal-title w-100" id="staticBackdropLabel">Are you sure you want to delete?</h5>
                  </div>
                  <div class="modal-footer pull-right justify-content-center border-0">
                    <button type="button" class="btn btn-secondary-outline" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary-outline text-primary" @click="handleTrackerDelete(log.id)" data-bs-dismiss="modal">Delete</button>
                  </div>
                </div>
              </div>
            </div>

          </td>
          <td>
            {{ convertMsToHM(getTotalTime(log.start_time, log.end_time)) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <p v-else class="mt-5 text-danger mx-1">
    <span v-if="!isLoading">No time logs. Let's start tracking</span>
  </p>

  <p v-if="isLoading">Loading...</p>
</template>

<style scoped>
input {
  width: 5rem;
  padding: 5px;
  font-size: 16px;
}

.edit {
  border: none;
  width: 12em;
}
.edit :hover {
  border: 1px solid grey;
}



</style>
