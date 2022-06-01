<script setup>
import { ref, onMounted } from "vue";
import { updateProject } from "../services";
import { useRoute } from "vue-router";
import axios from "axios";
import getUser from "@/utils/getUser";
import getToken from "@/utils/getToken";

import validateName from "@/utils/validateName";
import validateColor from "@/utils/validateColor";
import BaseInput from "@/components/BaseInput.vue";
import BaseAlert from "@/components/BaseAlert.vue";

const route = useRoute();
const project_name = ref("");
const project_color_code = ref("");
const colors = ref([
  { id: 1, name: "Black", hex: "#000000" },
  { id: 2, name: "Red", hex: "#ff0000" },
  { id: 3, name: "Blue", hex: "#0000ff" },
  { id: 3, name: "Green", hex: "#008000" },
]);
const client_id = ref("");
const billable = ref("");
const status = ref(1);
const projectNameError = ref("");
const project_color_codeError = ref("");
const clientNameError = ref("");
const successAdd = ref(false);
const errors = ref([]);

async function handleUpdateProject() {
  projectNameError.value = "";
  project_color_codeError.value = "";
  clientNameError.value = "";
  errors.value = [];
  successAdd.value = false;

  const { isValid: validProjectName, errorMessage: errorProjectName } =
    validateName(project_name.value);

  const { isValid: validColor, errorMessage: errorColor } = validateColor(
    project_color_code.value
  );

  const { isValid: validClientName, errorMessage: errorClientName } =
    validateName(client_id.value);

  if (!validProjectName) {
    project_color_codeError.value = errorColor;
    project_color_code.value = "";
  }

  if (!validColor) {
    projectNameError.value = errorProjectName;
    project_name.value = "";
  }

  if (!validClientName) {
    clientNameError.value = errorClientName;
    client_id.value = "";
  }

  if (
    projectNameError.value === "" &&
    clientNameError.value === "" &&
    errors.value.length === 0
  ) {
    try {
      const {
        user: { id },
      } = getUser();

      const result = await axios.put(
        "https://ccbackend.herokuapp.com/api/project/update-project/" +
          route.params.id,
        {
          project_name: project_name.value,
          client_id: client_id.value,
          billable: billable.value,
          status: status.value,
          project_color_code: project_color_code.value,
          user_id: id,
        }
      );
      const token = getToken();

      const response = await updateProject(result, token);
      if (response.status === 200) {
        successAdd.value = true;

        // reset successInvite after 3 seconds
        setTimeout(() => {
          successAdd.value = false;
        }, 3000);

        // empty form fields
        project_name.value = "";
        client_id.value = "";
        billable.value = "";
        project_color_code.value = "";
      }

      onMounted(async () => {
        const result = await axios.get(
          "http://localhost:3000/restaurant/" + route.params.id
        );
        project_name.value = result.data;
        client_id.value = result.data;
        billable.value = result.data;
        project_color_code.value = result.data;
      });
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
  >
    Update Project
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
          <h5 class="modal-title" id="exampleModalLabel">Update Project</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleUpdateProject">
            <!-- Success invite -->
            <BaseAlert
              v-if="successAdd"
              message="Project update successfully!"
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
            />
            <div class="mt-4">
              <label class="form-label"
                >Color<span class="text-danger">*</span></label
              >
              <select
                id="color"
                v-model="project_color_code"
                @change="onChangeRole"
                class="form-select"
                :error="project_color_codeError"
              >
                <option
                  v-for="color in colors"
                  :key="color.id"
                  :value="color.hex"
                  :style="{ color: color.hex }"
                  v-text="color.name"
                />
              </select>
            </div>

            <div class="mt-4">
              <label class="form-label"
                >Client Name<span class="text-danger">*</span></label
              >
              <select
                id="role"
                v-model="client_id"
                @change="onChangeRole"
                class="form-select"
                :error="clientNameError"
              >
                <option value="1">Bimlendra Yadav</option>
                <option value="2">Saroj Yadav</option>
                <option value="3">Raghav Adhikari</option>
              </select>
            </div>
            <!--Billable Yes No option-->
            <div class="mt-4">
              <label for="nonbillable">Non-Billable</label>
              <input
                type="radio"
                value="false"
                v-model="billable"
                name="billable"
              />
              &nbsp;
              <label for="billable">Billable</label>
              <input
                type="radio"
                value="true"
                v-model="billable"
                name="billable"
              />
            </div>
            <!-- submit -->
            <div class="mt-4 mb-2">
              <button type="submit" class="btn btn-primary text-white">
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
