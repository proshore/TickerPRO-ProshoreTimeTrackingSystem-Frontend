<script setup>
import { ref } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import { addClient } from "../services";
import getUser from "@/utils/getUser";
import validateName from "@/utils/validateName";
import validateEmail from "@/utils/validateEmail";
import getToken from "../../../utils/getToken";

const name = ref("");
const email = ref("");
const number = ref("");
const nameError = ref("");
const emailError = ref("");
const numberError = ref("");
const errors = ref([]);
const successAdd = ref(false);

const showAddClient = ref(false);
function closeDialog() {
  showAddClient.value = false;
}

async function handleAddClient() {
  const token = getToken();
  const clientInfo = {
    client_name: name.value,
    client_email: email.value,
    client_number: number.value,
    status: 1,
  };
  const response = await addClient(clientInfo, token);
  if (response.status === 200) {
    location.reload();
  }
}
</script>
<template>
  <div class="d-flex gap-2 justify-content-end my-5">
    <button
      class="btn btn-outline-primary d-flex"
      data-cy="addNewClients"
      @click="showAddClient = true"
    >
      Add New Client
    </button>
    <input
      type="text"
      name=""
      id=""
      class="form-control"
      data-cy="searchClientName"
      placeholder="Search Client"
    />
    <button class="btn btn-primary" data-cy="searchClientsButton">
      <i class="bi bi-search text-white"></i>
    </button>
  </div>
  <div class="popup" v-if="showAddClient">
    <div class="popup-inner">
      <div class="d-flex justify-content-between">
        <div class="d-flex gap-3 text-secondary">
          <i class="bi bi-person-fill h4"></i>
          <p class="h5">Add New Client</p>
        </div>
        <button
          @click="closeDialog"
          type="button"
          class="btn-close"
          data-cy="clearFieldWhenClose"
        ></button>
      </div>
      <p>Add a new client to Proshore</p>

      <form id="myForm" @submit.prevent="handleAddClient">
        <BaseInput
          type="text"
          name="name"
          label="Client name"
          data-cy="clientNameBox"
          v-model="name"
          :error="nameError"
        />
        <BaseInput
          type="email"
          name="name"
          label="Client Email"
          data-cy="clientEmailBox"
          v-model="email"
          :error="emailError"
        />
        <BaseInput
          type="text"
          name="name"
          label="Client Number"
          data-cy="clientNumberBox"
          v-model="number"
          :error="Error"
        />
      </form>

      <div class="my-3 p-2">
        <button
          class="btn btn-outline-secondary"
          data-cy="cancelAddingMember"
          @click="closeDialog"
        >
          Cancel
        </button>
        <button
          class="btn btn-outline-primary mx-2"
          data-cy="confirmAddingMember"
          form="myForm"
          type="submit"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.form-control {
  width: 40vh;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-inner {
  background: #fff;
  width: 50vh;
  padding: 22px;
  border-radius: 10px;
}
.warning {
  border: 2px dotted red;
  padding: 10px;
}
</style>
