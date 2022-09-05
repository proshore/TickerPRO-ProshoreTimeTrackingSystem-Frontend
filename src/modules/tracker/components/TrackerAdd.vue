<script setup>
import { ref, onBeforeMount, watch } from "vue";

import getTime from "@/utils/getTime";
import getToken from "@/utils/getToken";
import getUser from "@/utils/getUser";

import { projectList } from "@/modules/projects/services";

import { trackerAdd, trackerEdit } from "../services";

// import { timer, startTimer, stopTimer } from "../utils/setTimer";

const description = ref("");
const projectId = ref(null);
const projects = ref([]);
const isBillable = ref(false);
const showStartButton = ref(true);
const showStopButton = ref(false);
const newTimeLog = ref(null);
const stopWatch = ref("00:00:00");

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
    alert("Something went wrong, please try again later");
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
    alert("Something went wrong, please try again later");
  }
}

async function handleStopTimeTracker() {
  try {
    const dataToStopTracker = {
      activity_name: newTimeLog.value.activity_name,
      user_id: newTimeLog.value.user_id,
      project_id: newTimeLog.value.project_id,
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
    alert("Something went wrong, please try again later");
  }
}
</script>

<template>
  <div class="tracker px-3 py-2 border rounded shadow-sm">
    <form @submit.prevent="handleTimeTracker" class="">
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

      <label for="project" class="px-3">Projects</label>
      <select
        v-if="projects.length"
        id="project"
        class="form-select"
        v-model="projectId"
        aria-label="projects"
        data-cy="selectProjects"
        required
      >
        <option
          v-for="project in projects"
          :key="project.id"
          :value="project.id"
          v-text="project.project_name"
          data-cy="selectProjectName"
        />
      </select>
      <span v-else class="text-danger"> No projects. </span>

      <span
        class="dollar px-3 py-3"
        :title="isBillable ? 'Billable' : 'Non billable'"
        :class="{ 'text-primary': isBillable }"
        @click="isBillable = !isBillable"
        data-cy = "selectBillable"
      >
        $
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
    </form>
  </div>
</template>

<style scoped>
.tracker {
  width: 100%;
}

input[type="text"] {
  width: 40em;
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
