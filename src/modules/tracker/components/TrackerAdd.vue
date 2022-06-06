<script setup>
import { ref, onBeforeMount, watch } from "vue";

import getTime from "@/utils/getTime";
import getToken from "@/utils/getToken";
import getUser from "@/utils/getUser";

import { projectList } from "@/modules/projects/services";
import { trackerAdd, trackerEdit } from "../services";

const description = ref("");
const projectId = ref("");
const projects = ref([]);
const isBillable = ref(false);
const showStartButton = ref(true);
const showStopButton = ref(false);
const newTimeLog = ref(null);

const token = getToken();

// load all projects
onBeforeMount(async () => {
  try {
    const response = await projectList(token);
    if (response.status === 200) {
      projects.value = response.data.users;
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
        required
      />

      <label for="project" class="px-3">Projects</label>
      <select
        v-if="projects.length"
        id="project"
        class="form-select"
        v-model="projectId"
        aria-label="projects"
        required
      >
        <option
          v-for="project in projects"
          :key="project.id"
          :value="project.id"
          v-text="project.project_name"
        />
      </select>
      <span v-else class="text-danger"> No projects. </span>

      <span
        class="dollar px-3 py-2"
        :title="isBillable ? 'Billable' : 'Non billable'"
        :class="{ 'text-primary': isBillable }"
        @click="isBillable = !isBillable"
      >
        $
      </span>

      <!-- start button -->
      <button
        v-if="showStartButton"
        type="submit"
        class="btn btn-secondary mb-2"
      >
        START
      </button>

      <!-- stop button -->
      <a
        v-if="showStopButton"
        @click="handleStopTimeTracker"
        class="btn btn-primary text-white mb-2"
      >
        STOP
      </a>
    </form>
  </div>
</template>

<style scoped>
.tracker {
  width: 90%;
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
