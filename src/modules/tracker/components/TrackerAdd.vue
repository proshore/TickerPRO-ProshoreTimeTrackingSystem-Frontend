<script setup>
import { ref, onBeforeMount, watch } from "vue";

import getTime from "@/utils/getTime";
import getToken from "@/utils/getToken";
import getUser from "@/utils/getUser";

import { projectList } from "@/modules/projects/services";

import { trackerAdd, trackerEdit } from "../services";
import { useToast } from "vue-toast-notification";


// import { timer, startTimer, stopTimer } from "../utils/setTimer";

const description = ref("");
const projectId = ref(null);
const projects = ref([]);
const isBillable = ref(false);
const showStartButton = ref(true);
const showStopButton = ref(false);
const newTimeLog = ref(null);
const stopWatch = ref("00:00:00");
const $toast = useToast();
const token = getToken();


let seconds = 0;
let interval = null;
let changeDisable = ref(false);

function timer() {
  seconds++;

  // format our time
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - hours * 3600) / 60);
  let second = seconds % 60;

  if (second < 10) second = "0" + second;
  if (minutes < 10) minutes = "0" + minutes;
  if (hours < 10) hours = "0" + hours;

  stopWatch.value = `${hours}:${minutes}:${second}`;
}

function startTimer() {
  if (interval) {
    return;
  }

  interval = setInterval(timer, 1000);
  changeDisable.value = true;
  setTimeout(()=>{
    changeDisable.value = false;
  },2000)
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}


// load all projects
onBeforeMount(async () => {
  try {
    const response = await projectList(token);
    if (response.status === 200) {
      projects.value = response.data.projects;
    }
  } catch (err) {
    $toast.info("Server Down. Please try again later.");
  }
});

// Change billability based on default project's billable option
watch(projectId, () => {
  projects.value.forEach((p) => {
    if (p.id === projectId.value) {
      isBillable.value = p.billable;
    }
  });
});

async function handleTimeTracker() {
  const start_time = getTime();
  const user_id = getUser().user.id;

  const data = {
    activity_name: description.value,
    user_id,
    project_id: projectId.value,
    billable: isBillable.value,
    start_time,
  };

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
    $toast.error("Something went wrong, please try again later");
  }
}

async function handleStopTimeTracker() {
  try {
    const dataToStopTracker = {
      activity_name: newTimeLog.value.activity_name,
      user_id: newTimeLog.value.user_id,
      project_id: newTimeLog.value.project.project_id,
      billable: newTimeLog.value.billable,
      start_time: newTimeLog.value.start_time,
      end_time: getTime(),
    };

    // edit tracker
    const response_two = await trackerEdit(
      dataToStopTracker,
      token,
      newTimeLog.value.id
    );

    if (response_two.status === 200) {
      showStopButton.value = false;
      showStartButton.value = true;

      description.value = "";
      projectId.value = "";
      isBillable.value = false;

      // stop timer
      
      stopTimer();
      alert("Time log added successfully");

      location.reload();
    }
  } catch (err) {
    $toast.error("Something went wrong, please try again later");
  }
}
</script>

<template>
  <div class="tracker px-3 py-2 border rounded shadow-sm">

    <form
      @submit.prevent="handleTimeTracker"
      class="d-flex justify-content-between gap-4"
    >
      <div class="my-2" style="width: 60vmax">
        <input
          type="text"
          class="form-control"
          id="description"
          aria-describedby="description"
          placeholder="What are you working on?"
          v-model="description"
          data-cy="nameActivity"
          required
          />
      </div>
      <div class="d-flex align-items-center gap-4">
          <select
          v-if="projects.length"
          id="project"
          class="form-select"
          v-model="projectId"
          aria-label="projects"
          data-cy="selectProject"
          required
          >
          <option :value="null" disabled>Projects</option>
          <option
            v-for="project in projects"
            :key="project.id"
            :selected="project.project_name[0]"
            :value="project.id"
            v-text="project.project_name"
            data-cy = "selectProjectName"
            />
          </select>
          <span v-else class="text-danger"> No projects. </span>
          <span
                class="dollar"
                :title="isBillable ? 'Billable' : 'Non billable'"
                @click="isBillable = !isBillable"
                data-cy="toggleBillable"
              >
                <p
                  v-if="isBillable === true"
                  style="font-size: 25px"
                  class="my-1"
                >
                  <svg
                    width="25"
                    height="25"
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
                <p v-else class="my-1" style="font-size: 25px">
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
         
      
      <span class="fw-bold" v-if="stopWatch" v-text="stopWatch" />
      
      <!-- start button -->
      <button
      v-if="showStartButton"
      type="submit"
      class="btn btn-secondary mb-2 mx-4 mt-2"
      data-cy="start"
      >
      START
      </button>
      <!-- stop button -->
      <button
      v-if="showStopButton"
      @click="handleStopTimeTracker"
      :disabled = changeDisable
      data-cy = "submit"
      class="btn btn-primary text-white mb-2 mx-4 mt-2"
      >
      STOP
    </button>
    </div>
  </form>
  </div>
</template>

<style scoped>
  .tracker {
    width: 100%;
  }
  .form-select {
    border: 0px;
    width: 113px;
}
input[type="text"] {
  display: inline;
}

select {
  display: inline;
  width: 10em;
}

.dollar {
  color: #9d9d9d;
  font-size: 1.7rem;
  cursor: pointer;
}
</style>
