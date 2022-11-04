<script setup>
import { clientList } from "@/modules/clients/services";
import { ref } from "vue";
import getToken from "@/utils/getToken";
import { useToast } from "vue-toast-notification";
import AddClient from "../components/AddClient.vue"

const clients = ref([]);
const token = getToken();
const $toast = useToast();

async function loadClients(token) {
  try {
    const response = await clientList(token);
    if (response.status === 200) {
      clients.value = response.data.clients;
    }
  } catch (err) {
    $toast.error(response.data["message"]);
  }
}
loadClients(token);

const clientStatus = (status) => {
  if (status === 1) {
    return "Active";
  } else {
    return "Done";
  }
};

</script>

<template>
  <AddClient :loadClients = "loadClients"/>
  <div v-if="clients.length">
    <table>
      <thead class="hey">
        <tr class="border text-primary">
          <th>S.N</th>
          <th>Client Name<i class="bi bi-arrow-down-up mx-1"></i></th>
          <th>Email<i class="bi bi-arrow-down-up mx-1"></i></th>
          <th>Contact Number<i class="bi bi-arrow-down-up mx-1"></i></th>
          <th>Status<i class="bi bi-arrow-down-up mx-1"></i></th>
        </tr>
      </thead>
      <tr class="border" v-for="(client, index) in clients" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ client.client_name }}</td>
        <td>{{ client.client_email }}</td>
        <td>{{ client.client_number }}</td>
        <td v-text="clientStatus(client.status)"></td>
      </tr>
    </table>
  </div>
  <p v-else class="mt-5 text-primary mx-1">
    <span>No clients yet. Let's get some clients.</span>
  </p>
</template>

<style scoped>

tr,
th,
td {
  text-align: center;
  padding: 15px;
}
table {
  width: 100%;
  border-spacing: 0 10px;
}
</style>
