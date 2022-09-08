<script setup>
import { ref } from "vue";
import { addProject } from "../services";
import getUser from "@/utils/getUser";
import getToken from "@/utils/getToken";
import { clientList } from "@/modules/clients/services";

import validateName from "@/utils/validateName";
import BaseInput from "@/components/BaseInput.vue";
import BaseAlert from "@/components/BaseAlert.vue";

const project_name = ref("");
const clientId = ref("");
const billable = ref("0");
const status = ref(1);
const clients = ref([]);
const projectNameError = ref("");
const clientNameError = ref("");
const successAdd = ref(false);
const errors = ref([]);
const token = getToken();

async function handleClientList(token) {
  try {
    const response = await clientList(token);
    if (response.status === 200) {
      clients.value = response.data.clients;
    }
  } catch (err) {
    alert("Something went wrong, please try again later");
  }
}

handleClientList(token);

async function handleAddProject() {
  projectNameError.value = "";
  clientNameError.value = "";
  errors.value = [];
  successAdd.value = false;

  const { isValid: validProjectName, errorMessage: errorProjectName } =
    validateName(project_name.value);

  if (
    projectNameError.value === "" &&
    clientNameError.value === "" &&
    errors.value.length === 0
  ) {
    try {
      const {
        user: { id },
      } = getUser();

      billable.value = billable.value === true ? "1" : "0";

      const projectInfo = {
        project_name: project_name.value,
        client_id: clientId.value,
        billable: billable.value,
        status: status.value,
        user_id: id,
      };
      const token = getToken();

      const response = await addProject(projectInfo, token);
      if (response.status === 200) {
        successAdd.value = true;
        location.reload();

        // reset successInvite after 3 seconds
        setTimeout(() => {
          successAdd.value = false;
        }, 3000);

        // empty form fields
        project_name.value = "";
        clientId.value = "";
        billable.value = "";
      }
    } catch (error) {
      errors.value.push("Something went wrong, please try again later.");
    }
  }
}
</script>

<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-sm btn-primary text-white"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    data-cy="addProjectButton"
  >
    Add Project
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Create New Project</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            data-cy="createNewProjectModalCloseButton"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleAddProject">
            <!-- Success invite -->
            <BaseAlert
              v-if="successAdd"
              message="Project add successfully!"
              hex-font-color="198754"
            />

            <!-- Show error messages -->
            <div v-if="errors.length">
              <div v-for="error in errors" :key="error">
                <BaseAlert :message="error" hex-font-color="ff0000" />
              </div>
            </div>

            <BaseInput
              type="text"
              name="project_name"
              label="Project name"
              v-model="project_name"
              :error="projectNameError"
              data-cy="addProjectName"
            />

            <div class="mt-4">
              <label class="form-label" for="client-id" data-cy="addClientName"
                >Client Name<span class="text-danger">*</span></label
              >
              <select
                v-if="clients.length"
                id="client-id"
                v-model="clientId"
                class="form-select"
                :error="clientNameError"
              >
                <option
                  v-for="client in clients"
                  :key="client.id"
                  :value="client.id"
                  v-text="client.client_name"
                />
              </select>
            </div>
            <!--Billable Yes No option-->
            <div class="mt-4">
              <label for="billable">Billable</label>
              <input
                type="radio"
                value="true"
                v-model="billable"
                name="billable"
                data-cy="billableRadioButton"
              />
            </div>
            <!-- submit -->
            <div class="mt-4 mb-2">
              <button
                type="submit"
                class="btn btn-primary text-white"
                data-cy="newProjectCreateButton"
              >
                CREATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
