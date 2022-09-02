<script setup>
import { ref } from "vue";
import moment from "moment";

import { timeLog, deleteLog, trackerEdit } from "../services";

import getToken from "@/utils/getToken";
import getUser from "@/utils/getUser";

import sortTimeLog from "../utils/sortTimeLog";
import convertMsToHM from "../utils/convertMsToHM";
import getTotalTime from "../utils/getTotalTime";
import { useToast } from "vue-toast-notification";
import app from "../../../config/app";

const token = getToken();
const logs = ref([]);
const isLoading = ref(true);
const userId = getUser().user.id;

const tableLogs = ref([]);
const today = new Date().toISOString().slice(0, 10);
var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

const totalItems = ref();
const itemPerPage = ref(50);
const currentPage = ref(1);
const $toast = useToast();

async function handleTimeLog() {
  try {
    const response = await timeLog(token, userId, currentPage?.["_rawValue"], itemPerPage?.["_rawValue"]);

    if (response.status === 200 && response.data.logs) {
      logs.value = response.data.logs;
      sortTimeLog(logs.value);
      totalItems.value = response.data.total;
    }
    isLoading.value = false;
  } catch (err) {
    alert("Something went wrong, please try again later");
  }
}
handleTimeLog();

async function myFunction() {
  const response = await timeLog(token, userId);

  if (response.status === 200 && response.data.logs) {
    logs.value = response.data.logs;
  }

  let sortedTableLogs = sortTimeLog(
    response.data.logs?.filter((item, index) => {
      if (index < itemPerPage?.["_rawValue"]) {
        return item;
      } else {
        return null;
      }
    })
  );

  const groups = sortedTableLogs.reduce((groups, item) => {
    const date = item?.end_time?.split(" ")[0];
    const etime = item?.end_time?.split(" ")[1];

    
    if ((!groups[date]))  {
      groups[date] = [];
    } 
    

    groups[date].push(item);
  
    return groups;
  }, {});

  // Edit: to add it in the array format instead
  const groupArrays = Object.keys(groups).map((date) => {
    let newDate;
    
    if (today == date) {
      newDate = "Today";
    }else if (yesterday == date) {
      newDate = "Yesterday";
    } else {
      newDate = date;
    }
    return {
      date: newDate,
      logs: groups[date],
      time: convertMsToHM(
        moment.duration(
          groups[date].reduce(
            (acc, log) => {
              return {
                time: moment
                  .duration(acc?.time)
                  ?.add(
                    moment.duration(
                      moment(log?.end_time)?.diff(moment(log?.start_time))
                    )
                  ),
              };
            },
            { time: null }
          )?.time,
          "HH:mm:ss"
        )
      ),
    };
  });

  tableLogs.value = groupArrays;
  console.log(tableLogs)

}
myFunction();

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
    alert("Error: unable to edit the time log.");
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

const onClickHandler = (page) => {
  currentPage.value = page;
  handleTimeLog();
};

const handleItemPerPage = (e) => {
  itemPerPage.value = e.target.value;
  currentPage.value = 1;
  handleTimeLog();
  
};


</script>

<template>
  <div class="d-flex justify-content-between p-2">
    <p class="h5 my-4 font-weight-bold">This week</p>
    <div class="d-flex flex-column gap-1">
      <button class="border btn btn-light">Edit</button>
      <button class="border btn btn-light">Delete</button>
    </div>
  </div>
  <div v-if="tableLogs.length" class="">
    <table class="table table-hover" v-for="log in tableLogs" :key="log.id">
      <tr>
        <th colspan="7" style="background: #f6f6f6" class="border">
          <div class="d-flex justify-content-between">
            <p class="h6 my-2">{{ log.date }}</p>
            <p class="text-primary my-2">{{ log.time }}</p>
          </div>
        </th>
      </tr>

      <tbody v-if="log.logs.length" class="border rounded">
        <tr
          v-for="log in log.logs"
          :key="log.id"
          class="border d-flex justify-content-between align-items-center"
        >
          <div>
            <td>
              <input
                class="edit"
                type="text"
                v-model="log.activity_name"
                style="width: fit-content"
              />
            </td>
          </div>

          <div class="d-flex gap-3 align-items-center">
            <td>
              <button
                class="btn"
                style="background: #f7f7f7; border-radius: 9px; color: blue"
              >
                {{ log.project_id }}
              </button>
            </td>
            <td>
              <button
                class="btn btn-sm bg-transparent"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <p
                  v-if="getBillable(log.billable) === 'Billable'"
                  style="font-size: 25px"
                  class="my-1"
                >
                  <i class="bi bi-coin text-primary"></i>
                </p>
                <p v-else class="my-1" style="font-size: 25px">
                  <i class="bi bi-coin"></i>
                </p>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" @click="() => (log.billable = true)">
                    Billable
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    @click="() => (log.billable = false)"
                  >
                    Non Billable
                  </a>
                </li>
              </ul>  
            </td>
            <!-- //<input class="edit" type="text" v-model="log.start_time" /> -->
            <td><input class="edit" type="text" v-model="log.start_time" /></td>
            <td><input class="edit" type="text" v-model="log.end_time" /></td>
            <!-- //{{log.start_time.split(" ")[1]}} -->

            <td class="text-secondary" style="font-weight: 600">
              {{ convertMsToHM(getTotalTime(log.start_time, log.end_time)) }}
            </td>

            <td>
              <button
                class="btn btn-sm bg-transparent rounded"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <i class="bi bi-three-dots-vertical"></i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <div class="d-flex">
                  <li>
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
                  </li>
                  <li>
                    <button
                      type="button"
                      class="btn btn-light btn-sm mx-2"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Delete
                    </button>
                    <div
                      class="modal fade"
                      id="staticBackdrop"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabindex="-1"
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <div class="modal-header text-center border-0">
                            <h5
                              class="modal-title w-100"
                              id="staticBackdropLabel"
                            >
                              Are you sure you want to delete?
                            </h5>
                          </div>
                          <div
                            class="modal-footer pull-right justify-content-center border-0"
                          >
                            <button
                              type="button"
                              class="btn btn-secondary-outline"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary-outline text-primary"
                              @click="handleTrackerDelete(log.id)"
                              data-bs-dismiss="modal"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
              </ul>
            </td>
          </div>
        </tr>
      </tbody>
    </table>

    <div class="d-flex">
      <vue-awesome-paginate
        :total-items="totalItems"
        :items-per-page="Number(itemPerPage)"
        :max-pages-shown="2"
        :current-page="currentPage"
        :on-click="onClickHandler"
      />
      <div class="">
        <select
          class="form-select"
          style="width: 90px"
          @change="handleItemPerPage"
        >
          <option value= '20'>20</option>
          <option selected value= '50'>50</option>
          <option value= '100'>100</option>
        </select>
      </div>
    </div>
  </div>

  <p v-else class="mt-5 text-danger mx-1">
    <span v-if="!isLoading">No time logs. Let's start tracking</span>
  </p>

  <p v-if="isLoading">Loading...</p>
</template>

<style>
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
table {
  border-collapse: separate;
  border-spacing: 0 10px;
}
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  font-weight: 900;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: transparent;
  border: 0px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #040458;
  border: 1px solid #040458;
  color: white;
}
.active-page:hover {
  background-color: #040458;
}
</style>
