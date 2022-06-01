<script setup>
import { ref } from "vue";
import axios from "axios";

import getToken from "@/utils/getToken";

const projects = ref([]);
const token = getToken();
async function loadData() {
  let result = await axios.get(
    "https://ccbackend.herokuapp.com/api/project/view-project",
    { headers: { Authorization: token } }
  );
  projects.value = result.data.users;
  console.log(projects.value);
}
loadData();

/*console.log(projects.value);
onMounted(() => {
  loadData.value;
});*/
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
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.project_name }}</td>
          <td>{{ project.project_color_code }}</td>
          <td>{{ project.client_id }}</td>
          <td>{{ project.billable }}</td>
          <td>{{ project.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
