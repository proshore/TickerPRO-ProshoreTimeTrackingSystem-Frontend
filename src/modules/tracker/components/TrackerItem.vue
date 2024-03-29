<script setup>
import { ref } from "vue";
import { trackerEdit, deleteLog, timeLog } from "../services";
import getToken from "@/utils/getToken";
import getUser from "@/utils/getUser";
import { useToast } from "vue-toast-notification";
import Datepicker from "@vuepic/vue-datepicker";
import sortTimeLog from "../utils/sortTimeLog";
import convertMsToHM from "../utils/convertMsToHM";
import getTotalTime from "../utils/getTotalTime";
import moment from "moment";

const $toast = useToast();
const token = getToken();
const userId = getUser().user.id;
const datePicker = ref(new Date().toISOString().slice(0, 10));
const tableLogs = ref([]);
const logs = ref([]);
const currentPage = ref(1);
const itemPerPage = ref(50);
const totalItems = ref();
const today = new Date().toISOString().slice(0, 10);
const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
const isLoading = ref(true);


const props = defineProps({
  log: {
    type: Object,
    required: true,
  },
});
const { log } = props;
let abc = new Date(log.start_date);
const date = ref(String(abc.toISOString().slice(0, 10)))
const emit = defineEmits(["handleTimeLog"]);
const modalLogId = ref(null);

function getBillable(x) {
  if (x == true) {
    return "Billable";
  } else {
    return "Non Billable";
  }
}

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
    $toast.info("Cannot show log at the moment.");
  }
}

async function handleTrackerDelete() {
  try {
    const response = await deleteLog(token, log.id);
    if (response.status === 200) {
      emit("handleTimeLog");
      $toast.success(response.data["message"]);

      if (logs.value.length) {
        location.reload();
      }
    }
  } catch (err) {
    $toast.error(err.data["message"]);
  }
}

async function editLogs() {

  try {
    let data = {
      activity_name: log.activity_name,
      user_id: userId,
      project_id: log.project.project_id,
      billable: log.billable,
      started_time: log.started_time,
      ended_time: log.ended_time,
      start_date: date.value,
      end_date: date.value,
    };

    const response = await trackerEdit(data, token, log.id);
    document.getElementById("editActivityName").blur();
    document.getElementById("editStartTime").blur();
    document.getElementById("editEndTime").blur();
    if (response.status == 200) {
      emit("handleTimeLog");
      $toast.success(response.data["message"]);
    }
  } catch (err) {
    $toast.error(response.data["message"]);
  }
}

function handleDate(updatedDate) {
  date.value = String(updatedDate.toISOString().slice(0, 10));
  editLogs();
}
</script>

<template>
  <div>
    <td>
      <input
        class="edit"
        id="editActivityName"
        type="text"
        v-model="log.activity_name"
        style="width: fit-content"
        data-cy="activityNameEdit"
        @keyup.enter="editLogs"
      />
    </td>
  </div>

  <div class="d-flex gap-3 align-items-center">
    <td>
      <button class="btn" style="background: #f7f7f7; border-radius: 9px">
        {{ log.project.project_name }}
      </button>
    </td>
    <td>
      <span
        style="cursor: pointer"
        :title="log.billable ? 'Billable' : 'Non billable'"
        data-cy="toggleBillablility"
        @click="editLogs"
      >
        <p
          v-if="getBillable(log.billable) === 'Billable'"
          data-cy="toggleBillable"
          class="my-1"
          @click="() => (log.billable = false)"
        >
          <svg
            width="25"
            height="25"
            title="Billable"
            viewBox="0 0 25 25"
            fill="red"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.0425435 15.8391C0.0845944 15.9979 0.157671 16.1467 0.257557 16.2771C0.357444 16.4075 0.482162 16.5168 0.624515 16.5988L3.01498 17.9804V20.7324C3.01498 21.0643 3.14684 21.3827 3.38155 21.6174C3.61626 21.8521 3.9346 21.9839 4.26653 21.9839H7.01869L8.4004 24.3743C8.5112 24.5637 8.6694 24.721 8.85944 24.8307C9.04948 24.9404 9.26481 24.9987 9.48424 25C9.70201 25 9.91853 24.9424 10.1113 24.831L12.4992 23.4507L14.8897 24.8323C15.1771 24.998 15.5185 25.043 15.839 24.9574C16.1594 24.8717 16.4329 24.6625 16.5993 24.3755L17.9798 21.9852H20.7319C21.0639 21.9852 21.3822 21.8533 21.6169 21.6186C21.8516 21.3839 21.9835 21.0656 21.9835 20.7337V17.9817L24.3739 16.6C24.5163 16.5177 24.6411 16.4082 24.7411 16.2777C24.8412 16.1471 24.9145 15.9982 24.9569 15.8393C24.9993 15.6804 25.01 15.5147 24.9884 15.3517C24.9667 15.1887 24.9132 15.0315 24.8308 14.8892L23.4503 12.5001L24.832 10.1123C24.9981 9.82501 25.0432 9.48354 24.9576 9.16296C24.8719 8.84238 24.6624 8.56894 24.3752 8.40277L21.9847 7.02113V4.26785C21.9847 3.93594 21.8529 3.61762 21.6182 3.38292C21.3835 3.14822 21.0651 3.01636 20.7332 3.01636H17.981L16.6006 0.627274C16.4338 0.340579 16.1609 0.131066 15.8409 0.0440808C15.6821 0.00104953 15.5164 -0.0100463 15.3534 0.0114365C15.1903 0.0329193 15.0331 0.0865535 14.8909 0.16923L12.4992 1.54962L10.11 0.167978C9.82272 0.00192378 9.48122 -0.0432384 9.16063 0.0424215C8.84003 0.128081 8.56658 0.337551 8.4004 0.624771L7.01869 3.01511H4.26653C3.9346 3.01511 3.61626 3.14697 3.38155 3.38167C3.14684 3.61636 3.01498 3.93469 3.01498 4.2666V7.01862L0.624515 8.40026C0.337362 8.56715 0.128054 8.84103 0.0424328 9.16192C-0.0431888 9.48281 0.00185488 9.82455 0.167699 10.1123L1.54941 12.5001L0.167699 14.888C0.00247818 15.1762 -0.0424891 15.5179 0.0425435 15.8391ZM12.4992 13.7516C8.14383 13.7516 7.49303 11.4001 7.49303 9.99716C7.49303 8.3865 8.78087 6.76457 11.2477 6.34908V5.00623H13.7508V6.39413C15.921 6.90724 16.7545 8.71314 16.7545 9.99716H15.503L14.2514 10.0197C14.2339 9.54412 13.9823 8.74568 12.4992 8.74568C10.8735 8.74568 9.99613 9.39019 9.99613 9.99716C9.99613 10.4652 9.99613 11.2487 12.4992 11.2487C16.8546 11.2487 17.5054 13.6002 17.5054 15.0031C17.5054 16.6138 16.2176 18.2357 13.7508 18.6512V20.0091H11.2477V18.6575C8.3203 18.1982 7.49303 16.1507 7.49303 15.0031H9.99613C10.0099 15.1821 10.1951 16.2546 12.4992 16.2546C14.2264 16.2546 15.0023 15.5225 15.0023 15.0031C15.0023 14.5964 15.0023 13.7516 12.4992 13.7516Z"
              fill="#FA602D"
            />
          </svg>
        </p>
        <p
          v-else
          class="my-1"
          data-cy="toggleNonBillable"
          @click="() => (log.billable = true)"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.0425435 15.8391C0.0845944 15.9979 0.157671 16.1467 0.257557 16.2771C0.357444 16.4075 0.482162 16.5168 0.624515 16.5988L3.01498 17.9804V20.7324C3.01498 21.0643 3.14684 21.3827 3.38155 21.6174C3.61626 21.8521 3.9346 21.9839 4.26653 21.9839H7.01869L8.4004 24.3743C8.5112 24.5637 8.6694 24.721 8.85944 24.8307C9.04948 24.9404 9.26481 24.9987 9.48424 25C9.70201 25 9.91853 24.9424 10.1113 24.831L12.4992 23.4507L14.8897 24.8323C15.1771 24.998 15.5185 25.043 15.839 24.9574C16.1594 24.8717 16.4329 24.6625 16.5993 24.3755L17.9798 21.9852H20.7319C21.0639 21.9852 21.3822 21.8533 21.6169 21.6186C21.8516 21.3839 21.9835 21.0656 21.9835 20.7337V17.9817L24.3739 16.6C24.5163 16.5177 24.6411 16.4082 24.7411 16.2777C24.8412 16.1471 24.9145 15.9982 24.9569 15.8393C24.9993 15.6804 25.01 15.5147 24.9884 15.3517C24.9667 15.1887 24.9132 15.0315 24.8308 14.8892L23.4503 12.5001L24.832 10.1123C24.9981 9.82501 25.0432 9.48354 24.9576 9.16296C24.8719 8.84238 24.6624 8.56894 24.3752 8.40277L21.9847 7.02113V4.26785C21.9847 3.93594 21.8529 3.61762 21.6182 3.38292C21.3835 3.14822 21.0651 3.01636 20.7332 3.01636H17.981L16.6006 0.627274C16.4338 0.340579 16.1609 0.131066 15.8409 0.0440808C15.6821 0.00104953 15.5164 -0.0100463 15.3534 0.0114365C15.1903 0.0329193 15.0331 0.0865535 14.8909 0.16923L12.4992 1.54962L10.11 0.167978C9.82272 0.00192378 9.48122 -0.0432384 9.16063 0.0424215C8.84003 0.128081 8.56658 0.337551 8.4004 0.624771L7.01869 3.01511H4.26653C3.9346 3.01511 3.61626 3.14697 3.38155 3.38167C3.14684 3.61636 3.01498 3.93469 3.01498 4.2666V7.01862L0.624515 8.40026C0.337362 8.56715 0.128054 8.84103 0.0424328 9.16192C-0.0431888 9.48281 0.00185488 9.82455 0.167699 10.1123L1.54941 12.5001L0.167699 14.888C0.00247818 15.1762 -0.0424891 15.5179 0.0425435 15.8391ZM12.4992 13.7516C8.14383 13.7516 7.49303 11.4001 7.49303 9.99716C7.49303 8.3865 8.78087 6.76457 11.2477 6.34908V5.00623H13.7508V6.39413C15.921 6.90724 16.7545 8.71314 16.7545 9.99716H15.503L14.2514 10.0197C14.2339 9.54412 13.9823 8.74568 12.4992 8.74568C10.8735 8.74568 9.99613 9.39019 9.99613 9.99716C9.99613 10.4652 9.99613 11.2487 12.4992 11.2487C16.8546 11.2487 17.5054 13.6002 17.5054 15.0031C17.5054 16.6138 16.2176 18.2357 13.7508 18.6512V20.0091H11.2477V18.6575C8.3203 18.1982 7.49303 16.1507 7.49303 15.0031H9.99613C10.0099 15.1821 10.1951 16.2546 12.4992 16.2546C14.2264 16.2546 15.0023 15.5225 15.0023 15.0031C15.0023 14.5964 15.0023 13.7516 12.4992 13.7516Z"
              fill="#E1E1E1"
            />
          </svg>
        </p>
      </span>
    </td>

    <td>
      <input
        class="edit"
        id="editStartTime"
        type="text"
        v-model="log.started_time"
        data-cy="startTimeEdit"
        @keyup.enter="editLogs"
      />
    </td>
    <td style="color: grey; font-size: large">-</td>
    <td>
      <input
        class="edit"
        id="editEndTime"
        type="text"
        v-model="log.ended_time"
        data-cy="endTimeEdit"
        @keyup.enter="editLogs"
      />
    </td>

    <td>
      <Datepicker :value="log.start_date" @update:modelValue="handleDate">
        <template #trigger>
          <img
            src="../../../assets/images/calendar.png"
            alt="calender-image"
            class="calender_icon"
            data-cy="datePicker_icon"
          />
        </template>
      </Datepicker>
    </td>

    <td class="text-secondary" style="font-weight: 600">
      {{ log.diffTime }}
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
      <div></div>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <div class="d-flex gap-4">
          <li>
            <!-- Button trigger modal -->
            <button
              type="button"
              class="btn btn-light btn-sm mx-2"
              data-bs-toggle="modal"
              :data-bs-target="'#staticBackdrop' + log.id "
              data-cy="deleteTimeLog"
           
            >
              Delete
            </button>
          </li>
        </div>
      </ul>
      <!-- Modal -->
      <div
        class="modal fade"
        :id="'staticBackdrop'+ log.id"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header text-center border-0">
              <h5 class="modal-title w-100" id="staticBackdropLabel">
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
                @click="handleTrackerDelete()"
                data-bs-dismiss="modal"
                data-cy="deleteTrackerList"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </td>
  </div>
</template>
