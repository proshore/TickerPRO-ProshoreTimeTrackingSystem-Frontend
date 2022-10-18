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
    alert(response.data["message"]);
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
      errors.value.push(response.data["message"]);
    }
  }
}
</script>

<template>
  <form @submit.prevent="handleAddProject">
    <div class="border rounded shadow-sm">
      <!-- Success invite -->
      <BaseAlert
        v-if="successAdd"
        message="Project added successfully!"
        hex-font-color="198754"
      />

      <!-- Show error messages -->
      <div v-if="errors.length">
        <div v-for="error in errors" :key="error">
          <BaseAlert :message="error" hex-font-color="ff0000" />
        </div>
      </div>
      <div class="my-2 mx-2 d-flex justify-content-between gap-4">
        <input
          type="text"
          class="form-control"
          id="project_name"
          aria-describedby="project_name"
          placeholder="Please enter name for your project."
          v-model="project_name"
          data-cy="addProjectname"
          required
        />
        <select
          v-if="clients.length"
          id="client-id"
          class="form-select"
          v-model="clientId"
          aria-label="clients"
          data-cy="selectClient"
          :error="clientNameError"
          required
          style="border: 0; width: fit-content"
        >
          <option value="" disabled>Select Client</option>
          <option
            v-for="client in clients"
            :key="client.id"
            :value="client.id"
            v-text="client.client_name"
            data-cy="selectClientName"
          />
        </select>
        <span
          class="dollar"
          :title="billable ? 'Billable' : 'Non billable'"
          @click="billable = !billable"
          data-cy="toggleBillable"
        >
          <p v-if="billable === false" class="my-1">
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
          <p v-else class="my-1">
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
        </span>
        <!-- create new project button -->
        <button
          type="submit"
          class="btn btn-secondary"
          style="width: 15%"
          data-cy="newProjectCreateButton"
        >
          ADD PROJECT
        </button>
      </div>
    </div>
  </form>
</template>
<style>
  .dollar {
  color: #9d9d9d;
  font-size: 1.7rem;
  cursor: pointer;
}
</style>