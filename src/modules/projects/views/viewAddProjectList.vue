<script setup>
import { ref } from "vue";

import getToken from "@/utils/getToken";

import { enableDisable, projectList } from "../services";

const isLoading = ref(true);
const projects = ref([]);
const token = getToken();

async function loadProjects() {
  try {
    const response = await projectList(token);
    if (response.status === 200) {
      projects.value = response.data.users;
    }
  } catch (err) {
    alert("Something went wrong, please try again later");
  }
}
loadProjects();

async function enableDisableProject(projectId) {
  try {
    const response = await enableDisable(token, projectId);
    isLoading.value = false;
    if (response.status == 200) {
      alert("Project status changed successfully");
      loadProjects();
    }
  } catch (error) {
    alert("Something went wrong, please try again later");
  }
}
function status(x) {
  if (x == "1") {
    return "Disable";
  } else {
    return "Enable";
  }
}
</script>

<template>
  <div class="mt-3 border border-bottom-0 rounded">
    <table class="table table-hover">
      <thead class="text-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Project Name</th>
          <th scope="col">Color</th>
          <th scope="col">Client Name</th>
          <th scope="col">Billable</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.project_name }}</td>
          <td>{{ project.project_color_code }}</td>
          <td>{{ project.client_id }}</td>
          <td>{{ project.billable }}</td>
          <td>{{ status(project.status) }}</td>
          <td>
            <button
              class="btn btn-light btn-sm"
              @click="enableDisableProject(project.id)"
              v-text="
                status(project.status) === 'Enable' ? 'Disable' : 'Enable'
              "
            ></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
