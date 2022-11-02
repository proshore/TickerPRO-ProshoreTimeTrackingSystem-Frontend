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
import Datepicker from "@vuepic/vue-datepicker";
import TrackerItem from "./TrackerItem.vue";

const token = getToken();
const logs = ref([]);
const isLoading = ref(true);
const userId = getUser().user.id;
const modalLogId = ref(null);

const tableLogs = ref([]);
const today = new Date().toISOString().slice(0, 10);
const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

const totalItems = ref();
const itemPerPage = ref(50);
const currentPage = ref(1);
const $toast = useToast();

// For DatePicker
const datePicker = ref(new Date().toISOString().slice(0, 10));

async function handleTimeLog() {
  try {
    const response = await timeLog(
      token,
      userId,
      currentPage?.["_rawValue"],
      itemPerPage?.["_rawValue"]
    );

    if (response.status === 200 && response.data.logs) {
      logs.value = response.data.logs;
      sortTimeLog(logs.value);
      totalItems.value = response.data.total;
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
      const date = item?.end_date;
      if (!groups[date]) {
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
      } else if (yesterday == date) {
        newDate = "Yesterday";
      } else {
        newDate = date;
      }
      return {
        date: newDate,
        logs: groups[date]?.map((item) => {
          item.sTime = moment(item.started_time, "hh:mm").format("hh:mm A");
          item.eTime = moment(item.ended_time, "hh:mm").format("hh:mm A");
          item.diffTime = convertMsToHM(
            getTotalTime(item.started_time, item.ended_time)
          );
          return item;
        }),
        time: convertMsToHM(
          moment.duration(
            groups[date].reduce(
              (acc, log) => {
                return {
                  time: moment
                    .duration(acc?.time)
                    ?.add(moment.duration(log?.diffTime)),
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
    isLoading.value = false;
  } catch (err) {
    console.log(err);
    $toast.info("Cannot show log at the moment.");
  }
}

// console.log(tableLogs);
handleTimeLog();
console.log(tableLogs);

async function handleTrackerDelete(trackerId) {
  try {
    const response = await deleteLog(token, trackerId);
    if (response.status === 200) {
      handleTimeLog();
      $toast.success(response.data["message"]);

      if (logs.value.length === 1) {
        location.reload();
      }
    }
  } catch (err) {
    $toast.error(response.data["message"]);
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
  onClickHandler(1);
  currentPage.value = 1;
  handleTimeLog();
};
</script>

<template>
  <div class="d-flex justify-content-between">
    <p class="h5 my-4">This week</p>
  </div>
  <div v-if="tableLogs.length">
    <table
      class="table table-hover"
      v-for="log in tableLogs"
      :key="log.id"
      style="border-collapse: separate; border-spacing: 0px 10px"
    >
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
          <TrackerItem :log="log" @handleTimeLog="handleTimeLog"></TrackerItem>
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
          data-cy="handleItemPerPage"
        >
          <option value="20" data-cy="sortListTwenty">20</option>
          <option selected value="50" data-cy="sortListfifty">50</option>
          <option value="100" data-cy="sortListHundred">100</option>
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
  padding: 5px;
  font-size: 16px;
}

.edit {
  border: none;
  width: 5em;
}

.edit :hover {
  border: 1px solid grey;
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

.calender_icon {
  width: 1.3rem;
  cursor: pointer;
}
</style>
